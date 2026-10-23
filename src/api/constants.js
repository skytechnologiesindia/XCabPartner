/**
 * Values the backend sends or expects, written once so the app never compares
 * against hand-typed strings.
 */

// [API] GET /driver/me returns `nextStep`; the server (not the app) decides
// which screen opens. These are all the values it can send today.
export const NEXT_STEP = {
  SUBMIT_DOCUMENTS: 'SUBMIT_DOCUMENTS',
  WAIT_FOR_REVIEW: 'WAIT_FOR_REVIEW',
  FIX_DOCUMENTS: 'FIX_DOCUMENTS',
  READY: 'READY',
  REJECTED: 'REJECTED',
};

// [API] Step keys used by /requirements, /me `documents` and the onboarding
// upload. The order here is the order the backend sends today; the app still
// follows the order of the live /requirements reply.
export const STEP_KEYS = {
  VEHICLE: 'VEHICLE',
  PERSONAL_INFO: 'PERSONAL_INFO',
  PERSONAL_IDENTITY: 'PERSONAL_IDENTITY',
  DRIVING_LICENCE: 'DRIVING_LICENCE',
  VEHICLE_NUMBER: 'VEHICLE_NUMBER',
  PERMIT: 'PERMIT',
  CAB_INSURANCE: 'CAB_INSURANCE',
  FITNESS: 'FITNESS',
};

// [API] Status of one submitted step inside /me `documents`.
export const DOCUMENT_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

// [API] Status of one option inside /requirements (e.g. BIKE is COMING_SOON).
export const OPTION_STATUS = {
  AVAILABLE: 'AVAILABLE',
  COMING_SOON: 'COMING_SOON',
};

// [API] `error.code` values from the guide's error reference. The app decides
// what to do from these codes, never from the message text.
export const ERROR_CODES = {
  INVALID_INPUT: 'INVALID_INPUT',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  ACCOUNT_BANNED: 'ACCOUNT_BANNED',
  CONFLICT: 'CONFLICT',
  OTP_INVALID: 'OTP_INVALID',
  OTP_EXPIRED: 'OTP_EXPIRED',
  OTP_ATTEMPTS_EXCEEDED: 'OTP_ATTEMPTS_EXCEEDED',
  RATE_LIMITED: 'RATE_LIMITED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  OTP_PROVIDER_ERROR: 'OTP_PROVIDER_ERROR',
  // Not from the server: set by the app when there is no reply at all.
  NETWORK_ERROR: 'NETWORK_ERROR',
};

// [API] Support line shown for ACCOUNT_BANNED / REJECTED (no support screen yet).
export const SUPPORT_PHONE = '1800-247-TREEPS (9222)';
