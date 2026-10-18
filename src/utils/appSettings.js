import { NativeModules, Platform } from 'react-native';

/**
 * JS wrapper for the Android `AppSettings` native module
 * (android/.../AppSettingsModule.kt).
 *
 * Every method resolves to `null` when the module is unavailable
 * (iOS, or an Android build made before the module was added), so callers can
 * tell "not granted" (false) from "cannot be determined" (null).
 */
const native = Platform.OS === 'android' ? NativeModules.AppSettings : null;

const call = async (method, fallback = null) => {
  if (!native || typeof native[method] !== 'function') {
    return fallback;
  }
  try {
    return await native[method]();
  } catch (error) {
    return fallback;
  }
};

/** true | false | null (unknown) */
export const canDrawOverlays = () => call('canDrawOverlays');

/** true | false | null (unknown) */
export const isIgnoringBatteryOptimizations = () =>
  call('isIgnoringBatteryOptimizations');

/** Opens the overlay permission page; resolves true when a page was opened. */
export const openOverlaySettings = () => call('openOverlaySettings', false);

/** Opens the battery optimisation page; resolves true when a page was opened. */
export const openBatterySettings = () => call('openBatterySettings', false);
