import apiClient from '../apiClient';
import { ENDPOINTS } from '../endpoints';
import { clearSession, saveToken } from '../session';
import { getDeviceBlock } from '../../utils/deviceInfo';
import { storage, STORAGE_KEYS } from '../../utils/storage';

/**
 * authService: Screens 1, 2 and Logout of the binding guide.
 *
 * [API] Screens call these functions instead of building requests themselves.
 * Each one returns only `data` from the reply, or throws an ApiError.
 */

/**
 * Indian mobile check from the guide: 10 digits, first one 6, 7, 8 or 9.
 * [API] The server does not clean the number up, so the app must check it and
 * send exactly "+91XXXXXXXXXX".
 */
export function isValidIndianMobile(digits) {
  return /^[6-9]\d{9}$/.test(digits);
}

export function toE164(digits) {
  return `+91${digits}`;
}

/**
 * POST /driver/auth/send-otp (No token)
 * @returns {{ expiresInSeconds: number, resendAfterSeconds: number }}
 */
export async function sendOtp(phoneNumber) {
  const body = await apiClient.post('/driver/auth/send-otp',
    { phoneNumber },
    { skipAuth: true },
  );
  return body.data;
}

/**
 * POST /driver/auth/verify-otp (No token)
 * Saves the access token on success.
 * @returns {{ isNewDriver: boolean, driver: object, tokens: object }}
 */
export async function verifyOtp(phoneNumber, otp) {
  const body = await apiClient.post(
    '/driver/auth/verify-otp',
    {
      phoneNumber,
      // [API] OTP must be sent as text ("012345"), never as a number, or a
      // leading zero would be lost.
      otp: String(otp),
      device: await getDeviceBlock(),
    },
    { skipAuth: true },
  );

  const data = body.data;
  // [API] Save the token right away; every Token call reads it from session.
  await saveToken(data.tokens.accessToken);
  await storage.setItem(STORAGE_KEYS.PHONE, phoneNumber);
  await storage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');
  await storage.setItem(STORAGE_KEYS.DRIVER_DATA, data.driver);
  return data;
}

/**
 * POST /driver/auth/logout (Token)
 * [API] "Whatever the reply, delete the token", so a failed call (no internet,
 * already expired) still logs the driver out on the phone.
 */
export async function logout() {
  try {
    await apiClient.post('/driver/auth/logout');
  } catch (error) {
    // Ignored on purpose: the local logout below must always happen.
  }
  await clearSession();
  await storage.clearDraft();
}
