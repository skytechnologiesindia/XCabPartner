import React, { useRef } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRegistration } from '../context/RegistrationContext';
import { getOnboardingCompleted } from '../component/onboarding';
import { colors } from '../assets/colors/colors';
import DriverDesk from './DriverDesk';

import SplashScreen from '../screens/Splash/SplashScreen';
import LanguageScreen from '../screens/Language/LanguageScreen';
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
import PhotoAndNameScreen from '../screens/PhotoAndName/PhotoAndNameScreen';

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
 * Builds a stack history: Language -> Step 1 -> ... -> Step `step`.
 * Used when the app is (re)opened mid-flow so the back button still works.
 */
function buildRegistrationRoutes(step) {
  const last = Math.min(Math.max(step, 1), REGISTRATION_ROUTES.length);
  return [
    { name: 'Language' },
    ...REGISTRATION_ROUTES.slice(0, last).map(name => ({ name })),
  ];
}

function SplashRoute({ navigation }) {
  const { registrationData, registrationStep } = useRegistration();

  const handleFinish = () => {
    // 1. Already verified driver -> Driver Desk
    if (registrationData.verificationStatus === 'approved') {
      navigation.reset({ index: 0, routes: [{ name: 'DriverDesk' }] });
      return;
    }

    // 2. Under verification review -> Verification Pending
    if (registrationData.verificationStatus === 'pending') {
      navigation.reset({ index: 0, routes: [{ name: 'VerificationPending' }] });
      return;
    }

    // 3. Onboarding finished earlier -> resume registration
    if (
      getOnboardingCompleted() &&
      registrationData.phone &&
      registrationData.otpVerified
    ) {
      const routes = buildRegistrationRoutes(registrationStep);
      navigation.reset({ index: routes.length - 1, routes });
      return;
    }

    // 4. Default (new users / not verified yet) -> Language selection
    navigation.replace('Language');
  };

  return <SplashScreen onFinish={handleFinish} />;
}

function LanguageRoute({ navigation }) {
  const { setRegistrationStep } = useRegistration();

  return (
    <LanguageScreen
      onBack={() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      }}
      onContinue={() => {
        setRegistrationStep(1);
        navigation.push(REGISTRATION_ROUTES[0]);
      }}
    />
  );
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
      setRegistrationStep(stepIndex + 2);
      navigation.push(REGISTRATION_ROUTES[stepIndex + 1]);
    };

    return <StepScreen onBack={handleBack} onContinue={handleContinue} />;
  }
  StepRoute.displayName = `StepRoute_${REGISTRATION_ROUTES[stepIndex]}`;
  return StepRoute;
}

function MobileRoute({ navigation }) {
  const { setRegistrationStep } = useRegistration();
  const hasNavigated = useRef(false);

  return (
    <MobileVerificationScreen
      onSuccess={() => {
        // Fires only after the backend verified the OTP. Guard against repeats.
        if (hasNavigated.current) {
          return;
        }
        hasNavigated.current = true;
        // Step 3: Driving Licence. Replace so Back never returns to the OTP screen.
        setRegistrationStep(3);
        navigation.replace(REGISTRATION_ROUTES[2]);
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

function DocumentsRoute({ navigation }) {
  return (
    <DocumentsScreen
      onBack={() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          navigation.replace('DriverDesk');
        }
      }}
      onOpenDocument={routeName =>
        navigation.navigate(routeName, { fromDocuments: true })
      }
    />
  );
}

function PhotoAndNameRoute({ navigation }) {
  // Back and Submit always land on the Documents hub.
  const goToDocuments = () => {
    const { routes, index } = navigation.getState();
    if (index > 0 && routes[index - 1].name === 'Documents') {
      navigation.goBack();
    } else {
      navigation.replace('Documents');
    }
  };

  return (
    <PhotoAndNameScreen onBack={goToDocuments} onSubmit={goToDocuments} />
  );
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
      <Stack.Screen name="Language" component={LanguageRoute} />

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
      <Stack.Screen name="PhotoAndName" component={PhotoAndNameRoute} />
    </Stack.Navigator>
  );
}

export default RootNavigator;
