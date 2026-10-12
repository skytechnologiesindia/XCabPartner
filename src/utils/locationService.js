import { Linking, PermissionsAndroid, Platform } from 'react-native';
import { isLocationEnabled } from 'react-native-device-info';

/**
 * Location status values:
 * - 'granted'            : permission given and device location (GPS) is ON
 * - 'permission_denied'  : app has no location permission (can still be asked)
 * - 'permission_blocked' : user chose "Don't ask again" -> must open app settings
 * - 'service_off'        : permission given but device location (GPS) is OFF
 */
export const LOCATION_STATUS = {
  GRANTED: 'granted',
  PERMISSION_DENIED: 'permission_denied',
  PERMISSION_BLOCKED: 'permission_blocked',
  SERVICE_OFF: 'service_off',
};

const FINE = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
const COARSE = PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION;

/**
 * Reads the current location status without showing any system dialog.
 * `blocked` is remembered by the caller (Android cannot tell "denied once"
 * from "never ask again" until a request has been made).
 */
export async function getLocationStatus() {
  if (Platform.OS === 'android') {
    try {
      const hasFine = await PermissionsAndroid.check(FINE);
      if (!hasFine) {
        return LOCATION_STATUS.PERMISSION_DENIED;
      }
    } catch (error) {
      return LOCATION_STATUS.PERMISSION_DENIED;
    }
  }

  try {
    const enabled = await isLocationEnabled();
    return enabled ? LOCATION_STATUS.GRANTED : LOCATION_STATUS.SERVICE_OFF;
  } catch (error) {
    // If the check itself fails, do not lock the driver out of the app.
    return LOCATION_STATUS.GRANTED;
  }
}

/**
 * Shows the system permission dialog (Android).
 * Returns 'granted' | 'denied' | 'never_ask_again'.
 */
export async function requestLocationPermission() {
  if (Platform.OS !== 'android') {
    return 'granted';
  }

  try {
    const result = await PermissionsAndroid.requestMultiple([FINE, COARSE]);
    const fine = result[FINE];

    if (fine === PermissionsAndroid.RESULTS.GRANTED) {
      return 'granted';
    }
    if (fine === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      return 'never_ask_again';
    }
    return 'denied';
  } catch (error) {
    return 'denied';
  }
}

/**
 * Opens the phone's location (GPS) settings page.
 */
export async function openLocationSettings() {
  try {
    if (Platform.OS === 'android') {
      await Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
    } else {
      await Linking.openSettings();
    }
  } catch (error) {
    try {
      await Linking.openSettings();
    } catch (innerError) {
      // nothing else we can do
    }
  }
}

/**
 * Opens this app's settings page (to re-enable a blocked permission).
 */
export async function openAppSettings() {
  try {
    await Linking.openSettings();
  } catch (error) {
    // nothing else we can do
  }
}
