import axios from 'axios';
import { API_BASE_URL, REQUEST_TIMEOUT_MS } from './config';
import { toApiError } from './ApiError';
import { ERROR_CODES } from './constants';
import { getToken, handleSessionExpired } from './session';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    Accept: 'application/json',
    // [API] Without this ngrok answers with its HTML warning page instead of
    // passing the request to the backend.
    'ngrok-skip-browser-warning': 'true',
  },
  // [API] No default 'Content-Type' on purpose: axios sets application/json
  // for objects by itself, and a JSON content type on a FormData body would
  // make axios turn the photos into JSON and break the upload.
});

// ---- Request: attach the token -------------------------------------------
apiClient.interceptors.request.use(async config => {
  // [API] Calls marked "No token" in the guide (send-otp, verify-otp) pass
  // `skipAuth: true` so an old token is never sent with them.
  if (!config.skipAuth) {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  return config;
});

// ---- Response: unwrap success, normalise errors --------------------------
apiClient.interceptors.response.use(
  response => {
    const body = response.data;
    if (body && body.success === false) {
      return Promise.reject(
        toApiError({ response: { status: response.status, data: body } }),
      );
    }
    // Services receive the whole body: { success, data, requestId }.
    return body;
  },
  async error => {
    const apiError = toApiError(error);
    const hadToken = !!(error.config && !error.config.skipAuth);

    // [API] "Any 401 from a Token call means: delete the token and open the
    // phone number screen." Login calls never trigger this.
    if (apiError.code === ERROR_CODES.UNAUTHORIZED && hadToken) {
      await handleSessionExpired();
    }

    // [API] Log every error with its requestId so the backend can find it.
    if (__DEV__) {
      console.warn(
        `[API] ${error.config?.method?.toUpperCase()} ${error.config?.url} ->`,
        apiError.status,
        apiError.code,
        apiError.message,
        `requestId=${apiError.requestId}`,
      );
    }

    return Promise.reject(apiError);
  },
);

export default apiClient;
