import { createNavigationContainerRef } from '@react-navigation/native';
import { NEXT_STEP } from '../api';

/**
 * [API] A ref to the root navigator so code outside screens can navigate:
 * the 401 handler and logout must open the phone screen from anywhere.
 * Passed to <NavigationContainer ref={navigationRef}> in App.js.
 */
export const navigationRef = createNavigationContainerRef();

/**
 * [API] `nextStep` from GET /driver/me -> the route to open. The server decides
 * which screen the driver sees; the app never works it out on its own.
 */
export function routeForNextStep(nextStep) {
  switch (nextStep) {
    case NEXT_STEP.SUBMIT_DOCUMENTS:
      return { name: 'Documents', params: { mode: 'submit' } };
    case NEXT_STEP.FIX_DOCUMENTS:
      return { name: 'Documents', params: { mode: 'fix' } };
    case NEXT_STEP.WAIT_FOR_REVIEW:
      return { name: 'DocumentVerification' };
    case NEXT_STEP.READY:
      return { name: 'DriverDesk' };
    case NEXT_STEP.REJECTED:
      return { name: 'ApplicationRejected' };
    default:
      // Unknown value from a newer backend: the safest screen is the hub.
      return { name: 'Documents', params: { mode: 'submit' } };
  }
}

/** Replaces the whole stack with the screen for `nextStep` (no Back into login). */
export function resetToNextStep(navigation, nextStep) {
  navigation.reset({ index: 0, routes: [routeForNextStep(nextStep)] });
}

/** Opens the phone number screen with an empty stack. */
export function resetToLogin() {
  if (navigationRef.isReady()) {
    navigationRef.reset({ index: 0, routes: [{ name: 'RegMobile' }] });
  }
}
