import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import {
  LOCATION_STATUS,
  getLocationStatus,
  openAppSettings,
  openLocationSettings,
  requestLocationPermission,
} from '../utils/locationService';

// How often GPS ON/OFF is re-checked while the app is in the foreground.
const POLL_INTERVAL_MS = 2000;

/**
 * useLocationGuard
 * Keeps track of the device location state for the whole app.
 *
 * Re-checks when:
 * - the app starts
 * - the app returns to foreground (e.g. back from Settings)
 * - every few seconds while in foreground (user toggles GPS from the
 *   notification bar while using the app)
 */
export default function useLocationGuard() {
  // null until the first check completes, so the modal never flashes on start
  const [status, setStatus] = useState(null);
  const [isBusy, setIsBusy] = useState(false);

  const mountedRef = useRef(true);
  const blockedRef = useRef(false);

  const refresh = useCallback(async () => {
    let next = await getLocationStatus();

    if (next === LOCATION_STATUS.PERMISSION_DENIED && blockedRef.current) {
      next = LOCATION_STATUS.PERMISSION_BLOCKED;
    }
    if (next === LOCATION_STATUS.GRANTED || next === LOCATION_STATUS.SERVICE_OFF) {
      blockedRef.current = false;
    }

    if (mountedRef.current) {
      setStatus(prev => (prev === next ? prev : next));
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    let timer = null;

    const stopPolling = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const startPolling = () => {
      stopPolling();
      timer = setInterval(refresh, POLL_INTERVAL_MS);
    };

    refresh();
    if (AppState.currentState === 'active') {
      startPolling();
    }

    const subscription = AppState.addEventListener('change', nextState => {
      if (nextState === 'active') {
        refresh();
        startPolling();
      } else {
        stopPolling();
      }
    });

    return () => {
      mountedRef.current = false;
      stopPolling();
      subscription.remove();
    };
  }, [refresh]);

  // Primary button of the modal
  const handleAction = useCallback(async () => {
    if (isBusy) {
      return;
    }

    if (status === LOCATION_STATUS.PERMISSION_DENIED) {
      setIsBusy(true);
      const result = await requestLocationPermission();
      if (result === 'never_ask_again') {
        blockedRef.current = true;
      }
      await refresh();
      if (mountedRef.current) {
        setIsBusy(false);
      }
      return;
    }

    if (status === LOCATION_STATUS.PERMISSION_BLOCKED) {
      await openAppSettings();
      return;
    }

    if (status === LOCATION_STATUS.SERVICE_OFF) {
      await openLocationSettings();
    }
  }, [isBusy, status, refresh]);

  return {
    status,
    isBusy,
    isBlocking: status !== null && status !== LOCATION_STATUS.GRANTED,
    onAction: handleAction,
  };
}
