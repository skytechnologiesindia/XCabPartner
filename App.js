import React, { useState } from 'react';
import { StatusBar, StyleSheet, View, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import EnterPinScreen from './src/screens/EnterPin/EnterPinScreen';
import {
  EmergencyContactScreen,
  HelpSafetyScreen,
  PersonalDetailsScreen,
  SettingsScreen,
  VehicleDocumentsScreen,
} from './src/screens/Profile';

// Onboarding & Registration Screens
import SplashScreen from './src/screens/Splash/SplashScreen';
import OnboardingScreen from './src/screens/Onboarding/OnboardingScreen';
import LanguageScreen from './src/screens/Language/LanguageScreen';
import MobileVerificationScreen from './src/screens/MobileVerification/MobileVerificationScreen';
import PersonalDetailsOnboardingScreen from './src/screens/PersonalDetailsOnboarding/PersonalDetailsOnboardingScreen';
import DrivingLicenceOnboardingScreen from './src/screens/DrivingLicenceOnboarding/DrivingLicenceOnboardingScreen';
import VehicleDetailsOnboardingScreen from './src/screens/VehicleDetailsOnboarding/VehicleDetailsOnboardingScreen';
import VehicleDocumentsOnboardingScreen from './src/screens/VehicleDocumentsOnboarding/VehicleDocumentsOnboardingScreen';
import EmergencyContactOnboardingScreen from './src/screens/EmergencyContactOnboarding/EmergencyContactOnboardingScreen';
import LocationPermissionScreen from './src/screens/LocationPermission/LocationPermissionScreen';
import ReviewSubmissionScreen from './src/screens/ReviewSubmission/ReviewSubmissionScreen';
import VerificationPendingScreen from './src/screens/VerificationPending/VerificationPendingScreen';
import VerificationApprovedScreen from './src/screens/VerificationApproved/VerificationApprovedScreen';

import { RegistrationProvider, useRegistration } from './src/context/RegistrationContext';
import { getOnboardingCompleted } from './src/component/onboarding';
import { colors } from './src/assets/colors/colors';

const paper = colors.ivory50 || '#F7F5EE';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <RegistrationProvider>
        <NavigationContainer>
          <AppFlowController />
        </NavigationContainer>
      </RegistrationProvider>
    </SafeAreaProvider>
  );
}

function AppFlowController() {
  const {
    appStage,
    setAppStage,
    registrationStep,
    setRegistrationStep,
    nextRegistrationStep,
    prevRegistrationStep,
    jumpToStep,
    submitForVerification,
    approveDriver,
    enterDriverDesk,
    registrationData,
  } = useRegistration();

  // Splash Screen routing logic
  const handleSplashFinish = () => {
    // 1. If already verified driver -> go directly to Driver Desk
    if (registrationData.verificationStatus === 'approved') {
      setAppStage('driver_desk');
      return;
    }

    // 2. If under verification review -> go to Verification Pending
    if (registrationData.verificationStatus === 'pending') {
      setAppStage('verification_pending');
      return;
    }

    // 3. If onboarding previously finished -> resume at last registration step or language
    if (getOnboardingCompleted()) {
      if (registrationData.phone && registrationData.otpVerified) {
        setAppStage('registration');
      } else {
        setAppStage('language');
      }
      return;
    }

    // 4. Default for new users: 3-slide onboarding
    setAppStage('onboarding');
  };

  // 1. Splash Screen
  if (appStage === 'splash') {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  // 2. Onboarding Carousel (3 Slides)
  if (appStage === 'onboarding') {
    return (
      <OnboardingScreen
        onComplete={() => setAppStage('language')}
        onNavigateToLanguage={() => setAppStage('language')}
      />
    );
  }

  // 3. Language Selection
  if (appStage === 'language') {
    return (
      <LanguageScreen
        onBack={() => setAppStage('onboarding')}
        onContinue={() => {
          setRegistrationStep(1);
          setAppStage('registration');
        }}
      />
    );
  }

  // 4. Registration 8-Step Flow
  if (appStage === 'registration') {
    switch (registrationStep) {
      case 1:
        // Step 1: Mobile + OTP (Single Screen)
        return (
          <MobileVerificationScreen
            onBack={prevRegistrationStep}
            onSuccess={() => nextRegistrationStep()}
          />
        );

      case 2:
        // Step 2: Personal Details + Aadhaar
        return (
          <PersonalDetailsOnboardingScreen
            onBack={prevRegistrationStep}
            onContinue={() => nextRegistrationStep()}
          />
        );

      case 3:
        // Step 3: Driving Licence
        return (
          <DrivingLicenceOnboardingScreen
            onBack={prevRegistrationStep}
            onContinue={() => nextRegistrationStep()}
          />
        );

      case 4:
        // Step 4: Vehicle Details
        return (
          <VehicleDetailsOnboardingScreen
            onBack={prevRegistrationStep}
            onContinue={() => nextRegistrationStep()}
          />
        );

      case 5:
        // Step 5: Vehicle Documents
        return (
          <VehicleDocumentsOnboardingScreen
            onBack={prevRegistrationStep}
            onContinue={() => nextRegistrationStep()}
          />
        );

      case 6:
        // Step 6: Emergency Contact
        return (
          <EmergencyContactOnboardingScreen
            onBack={prevRegistrationStep}
            onContinue={() => nextRegistrationStep()}
          />
        );

      case 7:
        // Step 7: Location Permission
        return (
          <LocationPermissionScreen
            onBack={prevRegistrationStep}
            onContinue={() => nextRegistrationStep()}
          />
        );

      case 8:
        // Step 8: Review & Submit
        return (
          <ReviewSubmissionScreen
            onBack={prevRegistrationStep}
            onEditSection={stepNum => jumpToStep(stepNum)}
            onSubmit={submitForVerification}
          />
        );

      default:
        return (
          <MobileVerificationScreen
            onBack={prevRegistrationStep}
            onSuccess={() => nextRegistrationStep()}
          />
        );
    }
  }

  // 5. Status: Verification Pending
  if (appStage === 'verification_pending') {
    return (
      <VerificationPendingScreen
        onBack={() => jumpToStep(8)}
        onViewDetails={() => jumpToStep(8)}
        onApproved={approveDriver}
      />
    );
  }

  // 6. Status: Verification Approved
  if (appStage === 'verification_approved') {
    return (
      <VerificationApprovedScreen
        onContinueToDesk={enterDriverDesk}
      />
    );
  }

  // 7. Driver Desk (Existing Dashboard)
  return <DriverDesk />;
}

function DriverDesk() {
  const [tripStage, setTripStage] = useState('scanning');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [vehicleDocumentsOpen, setVehicleDocumentsOpen] = useState(false);
  const [personalDetailsOpen, setPersonalDetailsOpen] = useState(false);
  const [emergencyContactOpen, setEmergencyContactOpen] = useState(false);
  const [helpSafetyOpen, setHelpSafetyOpen] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.screen}>
        <BottomTabNavigator
          tripStage={tripStage}
          onTripChange={setTripStage}
          onOpenSettings={() => setSettingsOpen(true)}
          onOpenVehicleDocuments={() => setVehicleDocumentsOpen(true)}
          onOpenPersonalDetails={() => setPersonalDetailsOpen(true)}
          onOpenEmergencyContact={() => setEmergencyContactOpen(true)}
          onOpenHelpSafety={() => setHelpSafetyOpen(true)}
        />
        {personalDetailsOpen ? (
          <View style={StyleSheet.absoluteFill}>
            <PersonalDetailsScreen
              onBack={() => setPersonalDetailsOpen(false)}
            />
          </View>
        ) : null}
        {emergencyContactOpen ? (
          <View style={StyleSheet.absoluteFill}>
            <EmergencyContactScreen
              onBack={() => setEmergencyContactOpen(false)}
            />
          </View>
        ) : null}
        {helpSafetyOpen ? (
          <View style={StyleSheet.absoluteFill}>
            <HelpSafetyScreen
              onBack={() => setHelpSafetyOpen(false)}
              onOpenEmergencyContact={() => {
                setHelpSafetyOpen(false);
                setEmergencyContactOpen(true);
              }}
            />
          </View>
        ) : null}
        {settingsOpen ? (
          <View style={StyleSheet.absoluteFill}>
            <SettingsScreen
              onBack={() => setSettingsOpen(false)}
              onLogout={() => setSettingsOpen(false)}
              onDeleteAccount={() => setSettingsOpen(false)}
            />
          </View>
        ) : null}
        {vehicleDocumentsOpen ? (
          <View style={StyleSheet.absoluteFill}>
            <VehicleDocumentsScreen
              onBack={() => setVehicleDocumentsOpen(false)}
            />
          </View>
        ) : null}
        {tripStage === 'enterPin' ? (
          <View style={StyleSheet.absoluteFill}>
            <EnterPinScreen
              onBack={() => setTripStage('pickup')}
              onStartTrip={() => setTripStage('onTrip')}
              onResendHelp={() => {}}
            />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: paper,
  },
  screen: {
    flex: 1,
    backgroundColor: paper,
  },
});

export default App;
