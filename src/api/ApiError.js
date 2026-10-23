import { ERROR_CODES } from './constants';

export class ApiError extends Error {
  constructor({
    code = ERROR_CODES.INTERNAL_ERROR,
    message = 'Something went wrong. Please try again.',
    field = null,
    details = [],
    status = null,
    requestId = null,
  } = {}) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.field = field;
    // [API] `details` only comes with INVALID_INPUT; default to [] so callers
    // can always loop over it.
    this.details = Array.isArray(details) ? details : [];
    this.status = status;
    // [API] Keep requestId on every error: the backend owner can find the exact
    // request with it.
    this.requestId = requestId;
  }

  get isNetworkError() {
    return this.code === ERROR_CODES.NETWORK_ERROR;
  }
}

/**
 * Turns an axios error (or anything thrown) into an ApiError.
 */
export function toApiError(error) {
  if (error instanceof ApiError) {
    return error;
  }

  const response = error && error.response;

  // [API] No reply at all: no internet, ngrok down, or timeout.
  if (!response) {
    return new ApiError({
      code: ERROR_CODES.NETWORK_ERROR,
      message: 'No internet connection. Please check your network and try again.',
    });
  }

  const body = response.data || {};
  const apiError = body.error || {};

  return new ApiError({
    code: apiError.code || codeFromStatus(response.status),
    // [API] error.message is written for the driver and can be shown as it is.
    message: apiError.message || 'Something went wrong. Please try again.',
    field: apiError.field || null,
    details: apiError.details,
    status: response.status,
    requestId: body.requestId || null,
  });
}

// Fallback when a reply has no JSON error body (e.g. an ngrok error page).
function codeFromStatus(status) {
  switch (status) {
    case 400:
      return ERROR_CODES.INVALID_INPUT;
    case 401:
      return ERROR_CODES.UNAUTHORIZED;
    case 403:
      return ERROR_CODES.FORBIDDEN;
    case 409:
      return ERROR_CODES.CONFLICT;
    case 429:
      return ERROR_CODES.RATE_LIMITED;
    case 503:
      return ERROR_CODES.OTP_PROVIDER_ERROR;
    default:
      return ERROR_CODES.INTERNAL_ERROR;
  }
}

export default ApiError;
