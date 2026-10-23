import React, { useRef } from 'react';
import { Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRegistration } from '../context/RegistrationContext';
import { colors } from '../assets/colors/colors';
import DriverDesk from './DriverDesk';
// [API] Routing now follows the server (`nextStep` from GET /driver/me).
import { driverService, getToken, ERROR_CODES } from '../api';
import { resetToNextStep } from './navigationRef';
import { showAccountBannedAlert } from '../utils/apiAlerts';
import ApplicationRejectedScreen from '../screens/ApplicationRejected/ApplicationRejectedScreen';

import SplashScreen from '../screens/Splash/SplashScreen';
import MobileVerificationScreen from '../screens/MobileVerification/MobileVerificationScreen';
import PersonalDetailsOnboardingScreen from '../screens/PersonalDetailsOnboarding/PersonalDetailsOnboardingScreen';
import DrivingLicenceOnboardingScreen from '../screens/DrivingLicenceOnboarding/DrivingLicenceOnboardingScreen';
import VehicleDetailsOnboardingScreen from '../screens/VehicleDetailsOnboarding/VehicleDetailsOnboardingScreen';
import VehicleDocumentsOnboardingScreen from '../screens/VehicleDocumentsOnboarding/VehicleDocumentsOnboardingScreen';
import EmergencyContactOnboardingScreen from '../screens/EmergencyContactOnboarding/EmergencyContactOnboardingScreen';
import LocationPermissionScreen from '../screens/LocationPermission/LocationPermissionScreen';
import ReviewSubmissionScreen from '../screens/ReviewSubmission/ReviewSubmissionScreen';
import VerificationPendingScreen from '../screens/VerificationPending/VerificationPendingScreen';
import VerificationApprovedScreen from '../screens/VerificationApproved/VerificationApprovedScreen';
import DocumentsScreen from '../screens/Documents/DocumentsScreen';
import VehicleTypeScreen from '../screens/Documents/VehicleTypeScreen';
import PhotoAndNameScreen from '../screens/PhotoAndName/PhotoAndNameScreen';
import AadhaarPanScreen from '../screens/AadhaarPan/AadhaarPanScreen';
import PermitScreen from '../screens/Permit/PermitScreen';
import CabInsuranceScreen from '../screens/Insurance/CabInsuranceScreen';
import FitnessCertificateScreen from '../screens/Fitness/FitnessCertificateScreen';
import AppPermissionsScreen from '../screens/AppPermissions/AppPermissionsScreen';
import DocumentVerificationScreen from '../screens/DocumentVerification/DocumentVerificationScreen';

const paper = colors.ivory50 || '#F7F5EE';

const Stack = createNativeStackNavigator();

/**
 * Registration steps, in order. Index 0 => Step 1 ... index 7 => Step 8.
 */
const REGISTRATION_ROUTES = [
  'RegMobile', // Step 1: Mobile + OTP
  'RegPersonalDetails', // Step 2: Personal Details + Aadhaar
  'RegDrivingLicence', // Step 3: Driving Licence
  'RegVehicleDetails', // Step 4: Vehicle Details
  'RegVehicleDocuments', // Step 5: Vehicle Documents
  'RegEmergencyContact', // Step 6: Emergency Contact
  'RegLocation', // Step 7: Location Permission
  'RegReview', // Step 8: Review & Submit
];

/**
 * Builds a stack history: Step 1 -> ... -> Step `step`.
 * Used when the app is (re)opened mid-flow so the back button still works.
 */
function buildRegistrationRoutes(step) {
  const last = Math.min(Math.max(step, 1), REGISTRATION_ROUTES.length);
  return REGISTRATION_ROUTES.slice(0, last).map(name => ({ name }));
}

/**
 * Splash (Screen 3 of the guide): runs on every app open.
 *
 * [API] The old version decided the screen from local flags
 * (verificationStatus, registrationStep). Those can be stale (e.g. the admin
 * approved the driver while the app was closed), so now:
 *   no token  -> phone number screen
 *   token     -> GET /driver/me -> open the screen for `nextStep`
 */
function SplashRoute({ navigation }) {
  const { setDriverSession } = useRegistration();

  const goToLogin = () => navigation.replace(REGISTRATION_ROUTES[0]);

  const handleFinish = async () => {
    // [API] "Skip the call and open Screen 1 if no token is saved."
    const token = await getToken();
    if (!token) {
      goToLogin();
      return;
    }

    try {
      const me = driverService.getMe();
      setDriverSession(me);
      resetToNextStep(navigation, me.nextStep);
    } catch (error) {
      if (error.code === ERROR_CODES.UNAUTHORIZED) {
        return;
      }
      if (error.code === ERROR_CODES.ACCOUNT_BANNED) {
        showAccountBannedAlert(goToLogin);
        return;
      }

      Alert.alert(
        error.isNetworkError ? 'No internet' : 'Something went wrong',
        error.message,
        [{ text: 'Retry', onPress: handleFinish }],
        { cancelable: false },
      );
    }
  };

  return <SplashScreen onFinish={handleFinish} />;
}

/**
 * Creates the route component for one registration step.
 * - back      -> previous screen in the stack
 * - continue  -> next step (or back to Review when opened from Review)
 */
function createStepRoute(StepScreen, stepIndex) {
  function StepRoute({ navigation, route }) {
    const { setRegistrationStep } = useRegistration();
    const fromDocuments = Boolean(route.params && route.params.fromDocuments);
    // Opened from Review or from the Documents hub: finish/back returns there.
    const fromReview =
      Boolean(route.params && route.params.fromReview) || fromDocuments;

    const openedFromReview = Boolean(route.params && route.params.fromReview);
    // Driving Licence (step index 2) is entered straight after OTP, so its Back
    // leads to the Documents hub instead of the language/login screens.
    const backGoesToDocuments =
      fromDocuments || (stepIndex === 2 && !openedFromReview);

    const handleBack = () => {
      if (fromDocuments && navigation.canGoBack()) {
        navigation.goBack();
      } else if (backGoesToDocuments) {
        // No Documents screen underneath (e.g. right after OTP): open it.
        navigation.replace('Documents');
      } else if (navigation.canGoBack()) {
        navigation.goBack();
      }
    };

    const handleContinue = () => {
      if (fromReview) {
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else if (fromDocuments) {
          navigation.replace('Documents');
        }
        return;
      }
      // Driving Licence is followed by Photo and name, then Vehicle Details.
      if (stepIndex === 2) {
        navigation.push('PhotoAndName', { fromRegistration: true });
        return;
      }
      // Vehicle Details is followed by the Aadhaar or PAN card, then Vehicle Documents.
      if (stepIndex === 3) {
        navigation.push('AadhaarPan', { fromRegistration: true });
        return;
      }
      setRegistrationStep(stepIndex + 2);
      navigation.push(REGISTRATION_ROUTES[stepIndex + 1]);
    };

    return <StepScreen onBack={handleBack} onContinue={handleContinue} />;
  }
  StepRoute.displayName = `StepRoute_${REGISTRATION_ROUTES[stepIndex]}`;
  return StepRoute;
}

function MobileRoute({ navigation }) {
  const hasNavigated = useRef(false);

  return (
    <MobileVerificationScreen
      onSuccess={me => {
        // Fires only after the backend verified the OTP. Guard against repeats.
        if (hasNavigated.current) {
          return;
        }
        hasNavigated.current = true;
        // [API] Was: always go to Driving Licence. Now open the screen for the
        // `nextStep` from GET /driver/me, because a returning driver can be
        // under review, approved, etc. Reset so Back never returns to OTP.
        resetToNextStep(navigation, me.nextStep);
      }}
    />
  );
}

function ReviewRoute({ navigation }) {
  const { submitForVerification } = useRegistration();

  return (
    <ReviewSubmissionScreen
      onBack={() => navigation.goBack()}
      onEditSection={stepNum => {
        const target = REGISTRATION_ROUTES[stepNum - 1];
        if (target) {
          navigation.push(target, { fromReview: true });
        }
      }}
      onSubmit={() => {
        submitForVerification();
        navigation.push('VerificationPending');
      }}
    />
  );
}

function VerificationPendingRoute({ navigation }) {
  const { approveDriver } = useRegistration();

  const goToReview = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      const routes = buildRegistrationRoutes(REGISTRATION_ROUTES.length);
      navigation.reset({ index: routes.length - 1, routes });
    }
  };

  return (
    <VerificationPendingScreen
      onBack={goToReview}
      onViewDetails={goToReview}
      onApproved={() => {
        approveDriver();
        navigation.reset({
          index: 0,
          routes: [{ name: 'VerificationApproved' }],
        });
      }}
    />
  );
}

function VerificationApprovedRoute({ navigation }) {
  const { enterDriverDesk } = useRegistration();

  return (
    <VerificationApprovedScreen
      onContinueToDesk={() => {
        enterDriverDesk();
        navigation.reset({ index: 0, routes: [{ name: 'DriverDesk' }] });
      }}
    />
  );
}

function DocumentsRoute({ navigation, route }) {
  // [API] The hub has three modes:
  //   'submit' -> nextStep SUBMIT_DOCUMENTS: fill every step, then Submit
  //   'fix'    -> nextStep FIX_DOCUMENTS: only the REJECTED steps, Resubmit
  //   'view'   -> opened from the Driver Desk: statuses only, nothing to send
  const mode = (route.params && route.params.mode) || 'view';

  return (
    <DocumentsScreen
      mode={mode}
      // [API] After a successful submit the server decides the next screen
      // (normally WAIT_FOR_REVIEW -> Under review).
      onSubmitted={me => resetToNextStep(navigation, me.nextStep)}
      onBack={() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else if (mode === 'view') {
          navigation.replace('DriverDesk');
        }
        // [API] In submit/fix mode the hub is the first screen: a driver who
        // is not approved must not reach the Driver Desk, so Back does nothing.
      }}
      onOpenDocument={routeName =>
        navigation.navigate(routeName, { fromDocuments: true })
      }
      onOpenVehicleType={() => navigation.navigate('VehicleType')}
    />
  );
}

function VehicleTypeRoute({ navigation }) {
  return <VehicleTypeScreen onBack={() => navigation.goBack()} />;
}

/**
 * Returns to the Documents hub: pops when it is directly underneath,
 * otherwise replaces the current screen with it (no duplicate instances).
 */
function returnToDocuments(navigation) {
  const { routes, index } = navigation.getState();
  const documentsIndex = routes.findIndex(r => r.name === 'Documents');
  if (documentsIndex >= 0 && documentsIndex < index) {
    if (documentsIndex === index - 1) {
      navigation.goBack();
    } else {
      // Documents is deeper in the stack: pop back to that instance.
      navigation.popTo('Documents');
    }
  } else {
    navigation.replace('Documents');
  }
}

function PhotoAndNameRoute({ navigation, route }) {
  const { setRegistrationStep } = useRegistration();
  const fromRegistration = Boolean(route.params && route.params.fromRegistration);

  // Back always lands on the Documents hub.
  const goToDocuments = () => returnToDocuments(navigation);

  // Submit continues the registration flow (Vehicle Details) when reached
  // from the Driving Licence step; otherwise it returns to Documents.
  const handleSubmit = () => {
    if (fromRegistration) {
      setRegistrationStep(4);
      navigation.push(REGISTRATION_ROUTES[3]);
      return;
    }
    goToDocuments();
  };

  return (
    <PhotoAndNameScreen onBack={goToDocuments} onSubmit={handleSubmit} />
  );
}

function AadhaarPanRoute({ navigation, route }) {
  const fromRegistration = Boolean(route.params && route.params.fromRegistration);

  // Back always returns to the Documents hub.
  const goToDocuments = () => returnToDocuments(navigation);

  // Continue moves on to Permit when reached from Vehicle Details;
  // otherwise (opened from Documents) it returns to the hub.
  const handleSubmit = () => {
    if (fromRegistration) {
      navigation.push('Permit', { fromRegistration: true });
      return;
    }
    goToDocuments();
  };

  return <AadhaarPanScreen onBack={goToDocuments} onSubmit={handleSubmit} />;
}

function PermitRoute({ navigation, route }) {
  const fromRegistration = Boolean(route.params && route.params.fromRegistration);

  // Back always returns to the Documents hub.
  const goToDocuments = () => returnToDocuments(navigation);

  // Continue moves on to Cab Insurance when reached from Aadhaar/PAN;
  // otherwise (opened from Documents) it returns to the hub.
  const handleSubmit = () => {
    if (fromRegistration) {
      navigation.push('CabInsurance', { fromRegistration: true });
      return;
    }
    goToDocuments();
  };

  return <PermitScreen onBack={goToDocuments} onSubmit={handleSubmit} />;
}

function CabInsuranceRoute({ navigation, route }) {
  const fromRegistration = Boolean(route.params && route.params.fromRegistration);

  // Back always returns to the Documents hub.
  const goToDocuments = () => returnToDocuments(navigation);

  // Continue moves on to Fitness Certificate when reached from Permit;
  // otherwise (opened from Documents) it returns to the hub.
  const handleSubmit = () => {
    if (fromRegistration) {
      navigation.push('FitnessCertificate', { fromRegistration: true });
      return;
    }
    goToDocuments();
  };

  return <CabInsuranceScreen onBack={goToDocuments} onSubmit={handleSubmit} />;
}

function FitnessCertificateRoute({ navigation }) {
  // Back always returns to the Documents hub.
  const goToDocuments = () => returnToDocuments(navigation);

  // [API] Was: jump to DocumentVerification as if the certificate had been
  // sent. Nothing is uploaded per step any more; every step is sent together
  // from the Documents hub, so Continue just goes back there.
  return (
    <FitnessCertificateScreen onBack={goToDocuments} onSubmit={goToDocuments} />
  );
}

function AppPermissionsRoute({ navigation }) {
  return (
    <AppPermissionsScreen onBack={() => returnToDocuments(navigation)} />
  );
}

/**
 * Under review (Screen 6 of the guide), nextStep WAIT_FOR_REVIEW.
 * [API] There is no push notification yet, so the screen calls GET
 * /driver/me again (pull-to-refresh, button, app back to foreground) and
 * moves on as soon as `nextStep` changes (FIX_DOCUMENTS, READY, REJECTED).
 */
function DocumentVerificationRoute({ navigation }) {
  return (
    <DocumentVerificationScreen
      onNextStep={nextStep => resetToNextStep(navigation, nextStep)}
      // TEMPORARY: remove together with the button in the screen.
      onGoHome={() =>
        navigation.reset({ index: 0, routes: [{ name: 'DriverDesk' }] })
      }
    />
  );
}

/** [API] nextStep REJECTED: end state, the driver cannot resubmit. */
function ApplicationRejectedRoute() {
  return <ApplicationRejectedScreen />;
}

const PersonalDetailsRoute = createStepRoute(PersonalDetailsOnboardingScreen, 1);
const DrivingLicenceRoute = createStepRoute(DrivingLicenceOnboardingScreen, 2);
const VehicleDetailsRoute = createStepRoute(VehicleDetailsOnboardingScreen, 3);
const VehicleDocumentsRoute = createStepRoute(
  VehicleDocumentsOnboardingScreen,
  4,
);
const EmergencyContactRoute = createStepRoute(
  EmergencyContactOnboardingScreen,
  5,
);
const LocationRoute = createStepRoute(LocationPermissionScreen, 6);

const screenOptions = {
  headerShown: false,
  contentStyle: { backgroundColor: paper },
};

const noGesture = { gestureEnabled: false };

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={screenOptions}>
      <Stack.Screen name="Splash" component={SplashRoute} options={noGesture} />

      <Stack.Screen name="RegMobile" component={MobileRoute} />
      <Stack.Screen
        name="RegPersonalDetails"
        component={PersonalDetailsRoute}
      />
      <Stack.Screen name="RegDrivingLicence" component={DrivingLicenceRoute} />
      <Stack.Screen name="RegVehicleDetails" component={VehicleDetailsRoute} />
      <Stack.Screen
        name="RegVehicleDocuments"
        component={VehicleDocumentsRoute}
      />
      <Stack.Screen
        name="RegEmergencyContact"
        component={EmergencyContactRoute}
      />
      <Stack.Screen name="RegLocation" component={LocationRoute} />
      <Stack.Screen name="RegReview" component={ReviewRoute} />

      <Stack.Screen
        name="VerificationPending"
        component={VerificationPendingRoute}
      />
      <Stack.Screen
        name="VerificationApproved"
        component={VerificationApprovedRoute}
        options={noGesture}
      />

      <Stack.Screen
        name="DriverDesk"
        component={DriverDesk}
        options={noGesture}
      />
      <Stack.Screen name="Documents" component={DocumentsRoute} />
      <Stack.Screen name="VehicleType" component={VehicleTypeRoute} />
      <Stack.Screen name="PhotoAndName" component={PhotoAndNameRoute} />
      <Stack.Screen name="AadhaarPan" component={AadhaarPanRoute} />
      <Stack.Screen name="Permit" component={PermitRoute} />
      <Stack.Screen name="CabInsurance" component={CabInsuranceRoute} />
      <Stack.Screen
        name="FitnessCertificate"
        component={FitnessCertificateRoute}
      />
      <Stack.Screen name="AppPermissions" component={AppPermissionsRoute} />
      <Stack.Screen
        name="DocumentVerification"
        component={DocumentVerificationRoute}
        options={noGesture}
      />
      {/* [API] new end-state screen for nextStep REJECTED */}
      <Stack.Screen
        name="ApplicationRejected"
        component={ApplicationRejectedRoute}
        options={noGesture}
      />
    </Stack.Navigator>
  );
}

export default RootNavigator;
