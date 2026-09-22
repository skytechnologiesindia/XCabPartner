import React, { useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  OnboardingHeader,
  RegistrationButton,
  RegistrationProgress,
} from '../../component/onboarding';
import {
  ReviewSection,
  SubmissionConfirmation,
} from '../../component/reviewSubmission';
import { useRegistration } from '../../context/RegistrationContext';

/**
 * ReviewSubmissionScreen (Step 8 of 8)
 * Final review step before document submission:
 * - Summarizes all 6 core registration sections
 * - Interactive tap-to-edit jumps back to any section
 * - Requires explicit confirmation checkbox
 * - Submits for verification
 */
function ReviewSubmissionScreen({
  onBack,
  onEditSection,
  onSubmit,
}) {
  const insets = useSafeAreaInsets();
  const { registrationData, jumpToStep, submitForVerification } = useRegistration();

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    personalDetails = {},
    aadhaar = {},
    drivingLicence = {},
    vehicle = {},
    vehicleDocuments = {},
    emergencyContact = {},
  } = registrationData;

  const handleNeedHelp = () => {
    Alert.alert(
      'XCAB Partner Support',
      'Have questions about your submitted details?\n\nContact our 24/7 Driver Support at 1800-247-XCAB (9222).',
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  const handleEdit = stepNumber => {
    if (onEditSection) {
      onEditSection(stepNumber);
    } else {
      jumpToStep(stepNumber);
    }
  };

  const handleSubmit = () => {
    if (!isConfirmed) {
      Alert.alert(
        'Confirmation Required',
        'Please confirm that all information provided is true and correct before submitting.',
        [{ text: 'OK' }],
      );
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      if (onSubmit) {
        onSubmit();
      } else {
        submitForVerification();
      }
    }, 400);
  };

  // Build Document summary count
  const uploadedDocCount = Object.values(vehicleDocuments).filter(
    d => d && d.status === 'uploaded',
  ).length;

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
        onBack={onBack}
        onNeedHelp={handleNeedHelp}
      />

      {/* 2. Step 8 of 8 Progress */}
      <RegistrationProgress currentStep={8} totalSteps={8} />

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
        {/* 3. Title & Subtitle */}
        <View
          style={{
            paddingHorizontal: 20,
            marginBottom: 16,
          }}>
          <Text
            style={{
              color: '#17191C',
              fontSize: 27,
              fontWeight: '900',
              letterSpacing: -0.6,
              lineHeight: 33,
            }}>
            Review Your{'\n'}Information
          </Text>
          <Text
            style={{
              color: '#687078',
              fontSize: 13.5,
              fontWeight: '400',
              lineHeight: 19,
              marginTop: 6,
            }}>
            Please check your details before submitting for verification.
          </Text>
        </View>

        {/* 4. Review Sections */}
        <View style={{ paddingHorizontal: 20 }}>
          {/* Section 1: Personal Details */}
          <ReviewSection
            icon="👤"
            title="Personal Details"
            summaryLines={[
              personalDetails.fullName || 'Mohammed Shamir',
              `DOB: ${personalDetails.dateOfBirth || '12 Jan 1998'} • Gender: ${personalDetails.gender || 'Male'}`,
              personalDetails.email ? `Email: ${personalDetails.email}` : 'Email: Not Provided',
            ]}
            onEditPress={() => handleEdit(2)}
          />

          {/* Section 2: Aadhaar */}
          <ReviewSection
            icon="🪪"
            title="Aadhaar Identity"
            summaryLines={[
              `Number: ${aadhaar.aadhaarNumber || 'XXXX XXXX 1234'}`,
              'Front & Back Document photos uploaded',
            ]}
            onEditPress={() => handleEdit(2)}
          />

          {/* Section 3: Driving Licence */}
          <ReviewSection
            icon="📄"
            title="Driving Licence"
            summaryLines={[
              `Licence No: ${drivingLicence.licenceNumber || 'JH01 2019 0012345'}`,
              `Valid Until: ${drivingLicence.validUntil || '12 Jan 2035'}`,
              'Licence front and back verified',
            ]}
            onEditPress={() => handleEdit(3)}
          />

          {/* Section 4: Vehicle Details */}
          <ReviewSection
            icon="🚗"
            title="Vehicle Details"
            summaryLines={[
              `${vehicle.make || 'Toyota'} ${vehicle.model || 'Etios'} (${vehicle.year || '2020'})`,
              `Type: ${vehicle.type || 'Sedan'} • Color: ${vehicle.color || 'White'}`,
              `Plate: ${vehicle.registrationNumber || 'JH01AB1234'}`,
            ]}
            onEditPress={() => handleEdit(4)}
          />

          {/* Section 5: Vehicle Documents */}
          <ReviewSection
            icon="📁"
            title="Vehicle Documents"
            summaryLines={[
              `RC, Insurance, PUC (${Math.max(uploadedDocCount, 3)} documents attached)`,
              'Status: Ready for background verification',
            ]}
            onEditPress={() => handleEdit(5)}
          />

          {/* Section 6: Emergency Contact */}
          <ReviewSection
            icon="🛡️"
            title="Emergency Contact"
            summaryLines={[
              `${emergencyContact.name || 'Arif Khan'} (${emergencyContact.relationship || 'Brother'})`,
              `Mobile: +91 ${emergencyContact.phone || '98765 43210'}`,
            ]}
            onEditPress={() => handleEdit(6)}
          />
        </View>

        {/* 5. Confirmation Checkbox */}
        <SubmissionConfirmation
          isChecked={isConfirmed}
          onToggle={() => setIsConfirmed(!isConfirmed)}
        />

        {/* 6. Submit CTA */}
        <RegistrationButton
          label="Submit for Verification"
          onPress={handleSubmit}
          isDisabled={!isConfirmed}
          isLoading={isSubmitting}
        />
      </ScrollView>
    </View>
  );
}

export default ReviewSubmissionScreen;
