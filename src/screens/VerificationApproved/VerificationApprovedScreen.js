import React from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { OnboardingHeader, RegistrationButton } from '../../component/onboarding';
import { VerificationSuccess } from '../../component/verification';
import { useRegistration } from '../../context/RegistrationContext';

/**
 * VerificationApprovedScreen
 * Shown once driver is verified and approved:
 * - Green check badge
 * - "You're Approved!" title
 * - Perks and benefits list
 * - Primary CTA: "Go to Driver Desk →"
 */
function VerificationApprovedScreen({
  onContinueToDesk,
}) {
  const insets = useSafeAreaInsets();
  const { enterDriverDesk } = useRegistration();

  const handleNeedHelp = () => {
    Alert.alert(
      'XCAB Partner Support',
      'Welcome to XCAB! Need help getting started or understanding the driver app?\n\nDriver Helpline: 1800-247-XCAB (9222)',
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  const handleGoToDriverDesk = () => {
    if (onContinueToDesk) {
      onContinueToDesk();
    } else {
      enterDriverDesk();
    }
  };

  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight || 28 : 0;
  const safeTopPadding = Math.max(insets.top, statusBarHeight) + 8;
  const safeBottomPadding = Math.max(insets.bottom, 16);

  return (
    <View
      style={{
        backgroundColor: '#F7F5EF',
        flex: 1,
        paddingTop: safeTopPadding,
      }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F7F5EF"
        translucent={true}
      />

      {/* 1. Header */}
      <OnboardingHeader
        showBack={false}
        onNeedHelp={handleNeedHelp}
      />

      <ScrollView
        style={{
          backgroundColor: '#F7F5EF',
          flex: 1,
        }}
        contentContainerStyle={{
          backgroundColor: '#F7F5EF',
          flexGrow: 1,
          justifyContent: 'space-between',
          paddingBottom: safeBottomPadding,
          paddingTop: 10,
        }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* 2. Success Badge & Benefits */}
        <VerificationSuccess />

        {/* 3. Primary Action */}
        <RegistrationButton
          label="Go to Driver Desk"
          onPress={handleGoToDriverDesk}
        />
      </ScrollView>
    </View>
  );
}

export default VerificationApprovedScreen;
