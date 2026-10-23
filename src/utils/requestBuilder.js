/**
 * DEPRECATED: kept only so old imports do not break.
 *
 * [API] All calls now go through the API layer in src/api:
 *   screen -> src/api/services/*Service.js -> src/api/apiClient.js
 * The client adds the token, the ngrok header and error handling in one place.
 * Use the services (authService, driverService, onboardingService) instead.
 */
import apiClient from '../api/apiClient';
import { API_BASE_URL } from '../api/config';

export const BASE_URL = API_BASE_URL;

export const post = (endpoint, data = {}) => apiClient.post(`/${endpoint.replace(/^\/+/, '')}`, data);

export const get = (endpoint, params = {}) =>
  apiClient.get(`/${endpoint.replace(/^\/+/, '')}`, { params });
