import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  DocumentCard,
  DocumentsHeader,
  VehicleCard,
  documentItems,
  getStepStatus,
} from '../../component/documents';
import { RegistrationButton } from '../../component/onboarding';
import { useRegistration } from '../../context/RegistrationContext';
// [API] The hub is now where the driver submits (Screen 5) or fixes
// (Screen 7). These come from the API layer.
import {
  driverService,
  onboardingService,
  isStepComplete,
  mapErrorDetailsToSteps,
  DOCUMENT_STATUS,
  ERROR_CODES,
  STEP_KEYS,
} from '../../api';
import { showAccountBannedAlert } from '../../utils/apiAlerts';

function getVehicleLabel(vehicle = {}) {
  // [API] Prefer the API option (CAR / BIKE / AUTO) saved by the Vehicle Type
  // screen; fall back to the old free-text type for older drafts.
  const value = (vehicle.option || vehicle.type || '').toLowerCase();
  if (value.includes('auto')) {
    return 'Auto';
  }
  if (value.includes('bike')) {
    return 'Bike';
  }
  return 'Cab';
}

/**
 * DocumentsScreen
 * Hub listing every driver document with its current status.
 *
 * [API] Modes (set by the navigator from `nextStep`):
 *   'submit' -> SUBMIT_DOCUMENTS: show the steps from /requirements; when all
 *               are filled, "Submit for verification" sends ONE upload.
 *   'fix'    -> FIX_DOCUMENTS: show only the REJECTED steps with the admin's
 *               note; "Resubmit" sends only those steps.
 *   'view'   -> opened from the Driver Desk: statuses only.
 */
function DocumentsScreen({
  mode = 'view',
  onBack,
  onOpenDocument,
  onOpenVehicleType,
  onSubmitted,
}) {
  const insets = useSafeAreaInsets();
  const {
    registrationData,
    driverSession,
    setDriverSession,
    requirements,
    setRequirements,
    clearDraft,
  } = useRegistration();

  const [loadingRequirements, setLoadingRequirements] = useState(false);
  const [requirementsError, setRequirementsError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // [API] { STEP_KEY: message } from the last INVALID_INPUT reply.
  const [stepErrors, setStepErrors] = useState({});

  // ---- GET /driver/documents/requirements -------------------------------
  // [API] "Call it once when the steps open." It says which step cards to
  // show, in what order, and which options are available.
  const loadRequirements = useCallback(async () => {
    setLoadingRequirements(true);
    setRequirementsError(null);
    try {
      const steps = await driverService.getRequirements();
      console.log('Requirements reply:', JSON.stringify(steps, null, 2));
      setRequirements(steps);
    } catch (error) {
      // UNAUTHORIZED is handled by the api client (back to phone screen).
      if (error.code === ERROR_CODES.ACCOUNT_BANNED) {
        showAccountBannedAlert();
      } else if (error.code !== ERROR_CODES.UNAUTHORIZED) {
        setRequirementsError(error.message);
      }
    } finally {
      setLoadingRequirements(false);
    }
  }, [setRequirements]);

  useEffect(() => {
    if (!requirements) {
      loadRequirements();
    }
  }, [requirements, loadRequirements]);

  // [API] /me `documents`, by key: { status, reviewNote } for each sent step.
  const serverDocs = useMemo(() => {
    const byKey = {};
    ((driverSession && driverSession.documents) || []).forEach(doc => {
      byKey[doc.key] = doc;
    });
    return byKey;
  }, [driverSession]);

  // [API] Which step keys this screen deals with:
  //   submit/view -> every step in /requirements (that the app knows)
  //   fix         -> only steps the admin REJECTED; approved ones are not
  //                  shown and not sent again
  const activeStepKeys = useMemo(() => {
    const required = (requirements || []).map(step => step.key);
    if (mode === 'fix') {
      return required.filter(
        key => serverDocs[key] && serverDocs[key].status === DOCUMENT_STATUS.REJECTED,
      );
    }
    return required;
  }, [requirements, mode, serverDocs]);

  // [API] Cards follow the /requirements order. A step missing from the
  // reply is hidden (the backend can switch steps off without an app update).
  // A key the app does not know has no card and is skipped, never a crash.
  const visibleItems = useMemo(() => {
    const stepCards = activeStepKeys
      .map(key => documentItems.find(item => item.stepKey === key))
      .filter(Boolean);
    // The app-only Permissions card is not an API step; hide it while fixing.
    const appOnly = mode === 'fix' ? [] : documentItems.filter(item => !item.stepKey);
    return [...stepCards, ...appOnly];
  }, [activeStepKeys, mode]);

  const showVehicleCard = activeStepKeys.includes(STEP_KEYS.VEHICLE);

  // [API] Submit is enabled only when every step that will be sent is filled.
  // Optional steps (required: false) are sent only if the driver filled them.
  const stepsToSend = useMemo(() => {
    if (mode === 'fix') {
      return activeStepKeys;
    }
    return (requirements || [])
      .filter(step => step.required || isStepComplete(step.key, registrationData))
      .map(step => step.key);
  }, [mode, activeStepKeys, requirements, registrationData]);

  const canSubmit =
    mode !== 'view' &&
    stepsToSend.length > 0 &&
    stepsToSend.every(key => isStepComplete(key, registrationData));

  const statusFor = key =>
    getStepStatus({
      mode,
      stepError: stepErrors[key],
      serverDoc: serverDocs[key],
      isComplete: isStepComplete(key, registrationData),
    });

  // ---- POST /driver/onboarding -------------------------------------------
  const finishWithMe = async () => {
    // [API] After a submit (or a 409 "already submitted") the server decides
    // the next screen: call /me and follow `nextStep`.
    const me = await driverService.getMe();
    setDriverSession(me);
    if (onSubmitted) {
      onSubmitted(me);
    }
  };

  const handleSubmit = async () => {
    // [API] Disable Submit while sending: a second tap would get 409.
    if (isSubmitting || !canSubmit) {
      return;
    }
    setIsSubmitting(true);
    setStepErrors({});
    try {
      console.log('Submit sending steps:', stepsToSend);
      const { result } = await onboardingService.submitOnboarding(registrationData, stepsToSend);
      console.log('Submit success:', result);
      // [API] 200: delete the draft, then call /me (normally WAIT_FOR_REVIEW).
      await clearDraft();
      await finishWithMe();
    } catch (error) {
      handleSubmitError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // [API] On any error nothing is saved on the server, so the draft is kept
  // and the driver can fix and retry.
  const handleSubmitError = async error => {
    console.log('Submit failed:', error.code, error.status, error.message, error.details, 'requestId:', error.requestId);
    switch (error.code) {
      case ERROR_CODES.INVALID_INPUT: {
        const problems = mapErrorDetailsToSteps(error, error.sentKeys || stepsToSend);
        setStepErrors(problems);
        if (Object.keys(problems).length === 0) {
          // INVALID_INPUT without details: a photo is over 2 MB, a part name
          // is unknown, or there is a second text part.
          Alert.alert('Could not submit', 'A photo is too large or not allowed. Please retake it.');
          return;
        }
        // NOT_ALLOWED means an option/step was switched off: reload the list.
        if ((error.details || []).some(d => d.reason === 'NOT_ALLOWED')) {
          setRequirements(null);
        }
        Alert.alert('Please check your documents', 'Some details need fixing. Look for the red messages.');
        return;
      }
      case ERROR_CODES.CONFLICT:
        // Already submitted (e.g. a double tap): follow what the server says.
        try {
          await finishWithMe();
        } catch (meError) {
          Alert.alert('Something went wrong', meError.message);
        }
        return;
      case ERROR_CODES.ACCOUNT_BANNED:
        showAccountBannedAlert();
        return;
      case ERROR_CODES.UNAUTHORIZED:
        // Handled by the api client: token deleted, phone screen opened.
        return;
      default:
        // RATE_LIMITED, INTERNAL_ERROR, NETWORK_ERROR: let the driver retry.
        Alert.alert(
          error.isNetworkError ? 'No internet' : 'Could not submit',
          error.message,
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Retry', onPress: handleSubmit },
          ],
        );
    }
  };

  const handleHelp = () => {
    Alert.alert(
      'TREEPS Support (24/7)',
      'Need help with your documents?\n\nContact our 24/7 Driver Support at 1800-247-TREEPS (9222).',
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  const safeTopInset = Platform.OS === 'ios' ? insets.top : 0;

  return (
    <View style={{ backgroundColor: '#FBFAF6', flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEF0F2" translucent={false} />

      <DocumentsHeader
        title={mode === 'fix' ? 'Fix documents' : 'Documents'}
        onBack={onBack}
        onHelp={handleHelp}
        topInset={safeTopInset}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: Math.max(insets.bottom, 16) + 8,
          paddingHorizontal: 16,
          paddingTop: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* [API] Fix mode explains why only some cards are shown. */}
        {mode === 'fix' ? (
          <Text style={{ color: '#687078', fontSize: 14, marginBottom: 12 }}>
            Our team sent these documents back. Update each one, retake all of
            its photos, then tap Resubmit.
          </Text>
        ) : null}

        {/* [API] Loading / error state of GET /requirements, with Retry. */}
        {loadingRequirements && !requirements ? (
          <ActivityIndicator style={{ marginVertical: 24 }} color="#17191C" />
        ) : null}
        {requirementsError ? (
          <View style={{ alignItems: 'center', marginVertical: 16 }}>
            <Text style={{ color: '#DC2626', fontSize: 14, textAlign: 'center' }}>
              {requirementsError}
            </Text>
            <Pressable onPress={loadRequirements} style={{ marginTop: 8, padding: 8 }}>
              <Text style={{ color: '#0E8FC7', fontSize: 15, fontWeight: '700' }}>Retry</Text>
            </Pressable>
          </View>
        ) : null}

        {showVehicleCard ? (
          <VehicleCard
            title={`Vehicle - ${getVehicleLabel(registrationData.vehicle)}`}
            status={statusFor(STEP_KEYS.VEHICLE)}
            onPress={onOpenVehicleType}
          />
        ) : null}

        {visibleItems.map(item => (
          <DocumentCard
            key={item.id}
            title={item.title}
            icon={item.icon}
            tint={item.tint}
            status={item.stepKey ? statusFor(item.stepKey) : null}
            onPress={() => onOpenDocument && onOpenDocument(item.route)}
          />
        ))}

        {/* [API] One button sends everything (Screen 5) or only the rejected
            steps (Screen 7). Not shown in view mode. */}
        {mode !== 'view' && requirements ? (
          <RegistrationButton
            label={mode === 'fix' ? 'Resubmit' : 'Submit for verification'}
            showArrow={false}
            onPress={handleSubmit}
            isDisabled={!canSubmit}
            isLoading={isSubmitting}
            style={{ marginTop: 16, paddingHorizontal: 0 }}
          />
        ) : null}
      </ScrollView>
    </View>
  );
}

export default DocumentsScreen;
