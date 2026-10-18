package com.xcab.partner

import android.content.ActivityNotFoundException
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.PowerManager
import android.provider.Settings
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

/**
 * Reads and opens the two Android settings TREEPS needs for ride alerts:
 * - "Display over other apps" (SYSTEM_ALERT_WINDOW)
 * - Battery optimisation exemption (background execution)
 */
class AppSettingsModule(private val appContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(appContext) {

  override fun getName(): String = "AppSettings"

  @ReactMethod
  fun canDrawOverlays(promise: Promise) {
    val granted =
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
          Settings.canDrawOverlays(appContext)
        } else {
          true
        }
    promise.resolve(granted)
  }

  @ReactMethod
  fun isIgnoringBatteryOptimizations(promise: Promise) {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) {
      promise.resolve(true)
      return
    }
    val powerManager = appContext.getSystemService(Context.POWER_SERVICE) as? PowerManager
    promise.resolve(powerManager?.isIgnoringBatteryOptimizations(appContext.packageName) ?: false)
  }

  @ReactMethod
  fun openOverlaySettings(promise: Promise) {
    openFirstAvailable(
        listOf(
            Intent(
                Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                Uri.parse("package:${appContext.packageName}")),
            appDetailsIntent()),
        promise)
  }

  @ReactMethod
  fun openBatterySettings(promise: Promise) {
    openFirstAvailable(
        listOf(Intent(Settings.ACTION_IGNORE_BATTERY_OPTIMIZATION_SETTINGS), appDetailsIntent()),
        promise)
  }

  private fun appDetailsIntent(): Intent =
      Intent(
          Settings.ACTION_APPLICATION_DETAILS_SETTINGS,
          Uri.parse("package:${appContext.packageName}"))

  /** Starts the first intent a device can handle; resolves false if none can. */
  private fun openFirstAvailable(intents: List<Intent>, promise: Promise) {
    for (intent in intents) {
      intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
      try {
        appContext.startActivity(intent)
        promise.resolve(true)
        return
      } catch (error: ActivityNotFoundException) {
        // try the next fallback
      } catch (error: SecurityException) {
        // try the next fallback
      }
    }
    promise.resolve(false)
  }
}
