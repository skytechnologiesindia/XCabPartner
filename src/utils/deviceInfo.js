import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { storage, STORAGE_KEYS } from './storage';

/**
 * Device block for POST /driver/auth/verify-otp.
 *
 * [API] The old code sent a fixed deviceId ("driver-android-device") and a
 * fixed appVersion ("1.4.2"). The guide needs:
 *   - deviceId: an id of THIS install, made once on first launch, kept forever
 *     (1-64 chars: letters, digits, _ and -)
 *   - platform: ANDROID or IOS
 *   - appVersion: the real app version (1-20 chars: letters, digits . + _ -)
 */

// UUID v4 made from Math.random: unique enough for an install id, and needs no
// extra native library. Only letters, digits and "-", as the API allows.
function createUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, char => {
    // 'y' must be 8, 9, a or b (the UUID v4 variant bits).
    const value =
      char === 'x'
        ? Math.floor(Math.random() * 16)
        : 8 + Math.floor(Math.random() * 4);
    return value.toString(16);
  });
}

export async function getDeviceId() {
  const saved = await storage.getItem(STORAGE_KEYS.DEVICE_ID);
  if (saved) {
    return saved;
  }
  const id = createUuid();
  await storage.setItem(STORAGE_KEYS.DEVICE_ID, id);
  return id;
}

export function getAppVersion() {
  // e.g. "1.0+1" (version + build number), the same shape as the guide's
  // "1.4.2+37" example.
  const version = `${DeviceInfo.getVersion()}+${DeviceInfo.getBuildNumber()}`;
  return version.replace(/[^A-Za-z0-9.+_-]/g, '').slice(0, 20) || '1.0';
}

export async function getDeviceBlock() {
  return {
    deviceId: await getDeviceId(),
    platform: Platform.OS === 'ios' ? 'IOS' : 'ANDROID',
    appVersion: getAppVersion(),
    // [API] fcmToken is optional. Push notifications are not set up yet, so it
    // is left out (the guide: "Leave it out or send null").
  };
}
