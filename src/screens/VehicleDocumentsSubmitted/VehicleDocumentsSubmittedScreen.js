import React from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PersonalDetailsHelper } from '../../component/personalDetailsOnboarding';
import {
  DocumentSubmissionSuccess,
  VehicleDocumentsContinueButton,
  VehicleDocumentsHeader,
  VehicleDocumentsProgress,
} from '../../component/vehicleDocumentsOnboarding';

/**
 * VehicleDocumentsSubmittedScreen
 * Screen 2 in the review & submission flow:
 * Reassuring success confirmation after the driver submits vehicle details & documents.
 * Navigates forward to Emergency Contact.
 */
function VehicleDocumentsSubmittedScreen({
  navigation,
  onBack,
  onContinue,
}) {
  const insets = useSafeAreaInsets();

  const handleNeedHelp = () => {
    Alert.alert(
      'XCAB Partner Support',
      'Have questions about your submitted documents?\n\nContact our 24/7 Driver Support at 1800-247-XCAB (9222).',
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  const handleContinueToNextStep = () => {
    if (onContinue) {
      onContinue();
    } else if (navigation && navigation.navigate) {
      try {
        navigation.navigate('EmergencyContact');
      } catch (err) {
        navigation.navigate('Desk');
      }
    }
  };

  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight || 28 : 0;
  const safeTopPadding = Math.max(insets.top, statusBarHeight) + 8;

  return (
    <View style={[styles.container, { paddingTop: safeTopPadding }]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F7F5EF"
        translucent={true}
      />

      {/* 1. Onboarding Header */}
      <VehicleDocumentsHeader
        onBack={handleBack}
        onNeedHelp={handleNeedHelp}
      />

      {/* 2. Progress Indicator (All 4 segments complete) */}
      <VehicleDocumentsProgress step={4} totalSteps={4} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* 3. Hero Success Graphic, Title & Info Card */}
        <DocumentSubmissionSuccess />

        {/* 4. Primary CTA: Continue to Next Step → */}
        <VehicleDocumentsContinueButton
          label="Continue to Next Step"
          onPress={handleContinueToNextStep}
          isDisabled={false}
          isLoading={false}
        />

        {/* 5. Lower Automotive Hero Visual & 3 Badges */}
        <PersonalDetailsHelper />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F5EF',
    flex: 1,
  },
  scroll: {
    backgroundColor: '#F7F5EF',
    flex: 1,
  },
  scrollContent: {
    backgroundColor: '#F7F5EF',
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingTop: 10,
  },
});

export default VehicleDocumentsSubmittedScreen;
