/**
 * Public entry of the API layer.
 *
 * [API] Screens import from 'src/api' only, never from axios or the client
 * directly, so the structure is: screen -> service -> apiClient -> backend.
 */
// Imported first and exported below, because the project's Babel setup does
// not support the shorter `export * as x from '...'` syntax.
import * as authService from './services/authService';
import * as driverService from './services/driverService';
import * as onboardingService from './services/onboardingService';

export { authService, driverService, onboardingService };
export { ApiError } from './ApiError';
export * from './constants';
export {
  isKnownStep,
  isStepComplete,
  mapErrorDetailsToSteps,
} from './mappers/onboardingMapper';
export { getToken, setSessionExpiredHandler } from './session';
