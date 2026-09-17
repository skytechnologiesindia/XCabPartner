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
import SplashScreen from './src/screens/Splash/SplashScreen';
import OnboardingScreen from './src/screens/Onboarding/OnboardingScreen';
import MobileVerificationScreen from './src/screens/MobileVerification/MobileVerificationScreen';
import PersonalDetailsOnboardingScreen from './src/screens/PersonalDetailsOnboarding/PersonalDetailsOnboardingScreen';
import VehicleDetailsScreen from './src/screens/VehicleDetails/VehicleDetailsScreen';
import VehicleDocumentsOnboardingScreen from './src/screens/VehicleDocumentsOnboarding/VehicleDocumentsOnboardingScreen';
import VehicleDocumentsReviewScreen from './src/screens/VehicleDocumentsReview/VehicleDocumentsReviewScreen';
import VehicleDocumentsSubmittedScreen from './src/screens/VehicleDocumentsSubmitted/VehicleDocumentsSubmittedScreen';
import { getOnboardingCompleted } from './src/component/onboarding';
import { colors } from './src/assets/colors/colors';

const paper = colors.ivory50 || '#F7F5EE';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(!getOnboardingCompleted());
  const [registrationStage, setRegistrationStage] = useState('phone'); // 'phone' | 'personalDetails' | 'vehicleDetails' | 'vehicleDocuments' | 'vehicleDocumentsReview' | 'vehicleDocumentsSubmitted' | 'emergencyContact' | 'complete'
  const [uploadedDocs, setUploadedDocs] = useState(null);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  const handleOnboardingFinish = () => {
    setShowOnboarding(false);
  };

  const handleAuthSuccess = () => {
    setRegistrationStage('personalDetails');
  };

  const handlePersonalDetailsSuccess = () => {
    setRegistrationStage('vehicleDetails');
  };

  const handleVehicleDetailsSuccess = () => {
    setRegistrationStage('vehicleDocuments');
  };

  const handleVehicleDocumentsSuccess = docs => {
    setUploadedDocs(docs);
    setRegistrationStage('vehicleDocumentsReview');
  };

  const handleReviewSuccess = docs => {
    setUploadedDocs(docs);
    setRegistrationStage('vehicleDocumentsSubmitted');
  };

  const handleSubmittedSuccess = () => {
    setRegistrationStage('emergencyContact');
  };

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        {showSplash ? (
          <SplashScreen onFinish={handleSplashFinish} />
        ) : showOnboarding ? (
          <OnboardingScreen onComplete={handleOnboardingFinish} />
        ) : registrationStage === 'phone' ? (
          <MobileVerificationScreen
            onBack={() => setShowOnboarding(true)}
            onSuccess={handleAuthSuccess}
          />
        ) : registrationStage === 'personalDetails' ? (
          <PersonalDetailsOnboardingScreen
            onBack={() => setRegistrationStage('phone')}
            onContinue={handlePersonalDetailsSuccess}
          />
        ) : registrationStage === 'vehicleDetails' ? (
          <VehicleDetailsScreen
            onBack={() => setRegistrationStage('personalDetails')}
            onContinue={handleVehicleDetailsSuccess}
          />
        ) : registrationStage === 'vehicleDocuments' ? (
          <VehicleDocumentsOnboardingScreen
            onBack={() => setRegistrationStage('vehicleDetails')}
            onContinue={handleVehicleDocumentsSuccess}
          />
        ) : registrationStage === 'vehicleDocumentsReview' ? (
          <VehicleDocumentsReviewScreen
            documents={uploadedDocs}
            onBack={() => setRegistrationStage('vehicleDocuments')}
            onContinue={handleReviewSuccess}
          />
        ) : registrationStage === 'vehicleDocumentsSubmitted' ? (
          <VehicleDocumentsSubmittedScreen
            onBack={() => setRegistrationStage('vehicleDocumentsReview')}
            onContinue={handleSubmittedSuccess}
          />
        ) : registrationStage === 'emergencyContact' ? (
          <EmergencyContactScreen
            showSkip={true}
            onBack={() => setRegistrationStage('vehicleDocumentsSubmitted')}
            onSave={() => setRegistrationStage('complete')}
            onContinue={() => setRegistrationStage('complete')}
            onSkip={() => setRegistrationStage('complete')}
          />
        ) : (
          <DriverDesk />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
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
