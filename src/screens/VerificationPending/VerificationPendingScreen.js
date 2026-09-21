import React from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { OnboardingHeader, RegistrationButton } from '../../component/onboarding';
import {
  VerificationChecklist,
  VerificationStatus,
} from '../../component/verification';
import { useRegistration } from '../../context/RegistrationContext';

/**
 * VerificationPendingScreen
 * Status screen shown after document submission:
 * - Driver is "Under Verification"
 * - Displays itemized verification checklist
 * - Explains notification timeline
 * - Actions: "View Submitted Information" & "Simulate Approval" (demo helper)
 */
function VerificationPendingScreen({
  onBack,
  onViewDetails,
  onApproved,
}) {
  const insets = useSafeAreaInsets();
  const { jumpToStep, approveDriver } = useRegistration();

  const handleNeedHelp = () => {
    Alert.alert(
      'Verification Status Helpline',
      'Our team is reviewing your documents. Background checks usually complete within 24 hours.\n\nHelpline: 1800-247-XCAB (9222)',
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  const handleViewSubmittedInfo = () => {
    if (onViewDetails) {
      onViewDetails();
    } else {
      jumpToStep(8);
    }
  };

  const handleSimulateApproval = () => {
    if (onApproved) {
      onApproved();
    } else {
      approveDriver();
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
        onBack={onBack || handleViewSubmittedInfo}
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
        <View>
          {/* 2. Status Banner */}
          <VerificationStatus />

          {/* 3. Checklist */}
          <VerificationChecklist />
        </View>

        {/* 4. Action Buttons */}
        <View style={styles.actionContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.secondaryBtn,
              pressed && { opacity: 0.8 },
            ]}
            onPress={handleViewSubmittedInfo}
            accessibilityRole="button"
            accessibilityLabel="View Submitted Information"
          >
            <Text style={styles.secondaryBtnText}>
              View Submitted Information
            </Text>
          </Pressable>

          <RegistrationButton
            label="Simulate Approval"
            onPress={handleSimulateApproval}
            showArrow={true}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    marginTop: 20,
    width: '100%',
  },
  secondaryBtn: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#DDD9CF',
    borderRadius: 8,
    borderWidth: 1,
    height: 48,
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 4,
  },
  secondaryBtnText: {
    color: '#17191C',
    fontSize: 14.5,
    fontWeight: '700',
  },
});

export default VerificationPendingScreen;
