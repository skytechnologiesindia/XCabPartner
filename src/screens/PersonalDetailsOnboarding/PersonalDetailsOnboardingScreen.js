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
  PersonalDetailsForm,
  PersonalDetailsHelper,
  initialFormValues,
  personalDetailsConfig,
} from '../../component/personalDetailsOnboarding';
import { useRegistration } from '../../context/RegistrationContext';

/**
 * PersonalDetailsOnboardingScreen (Step 2 of 8)
 * Collects driver's personal details and Aadhaar identity verification:
 * - Full Name
 * - Date of Birth (18+ validation)
 * - Gender
 * - Email (Optional)
 * - Aadhaar Number & Front/Back uploads
 */
function PersonalDetailsOnboardingScreen({
  onBack,
  onContinue,
}) {
  const insets = useSafeAreaInsets();
  const { registrationData, updateRegistrationData } = useRegistration();

  const [formData, setFormData] = useState({
    ...initialFormValues,
    ...registrationData.personalDetails,
  });

  const [aadhaarData, setAadhaarData] = useState({
    aadhaarNumber: registrationData.aadhaar?.aadhaarNumber || '',
    frontDocument: registrationData.aadhaar?.frontDocument || null,
    backDocument: registrationData.aadhaar?.backDocument || null,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const handleAadhaarChange = (field, value) => {
    setAadhaarData(prev => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const handleNeedHelp = () => {
    Alert.alert(
      'XCAB Partner Support',
      'Need help with your personal details or Aadhaar verification?\n\nContact our 24/7 Driver Support at 1800-247-XCAB (9222).',
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  const validateForm = () => {
    const newErrors = {};

    // 1. Full Name Validation
    if (!formData.fullName || formData.fullName.trim().length < personalDetailsConfig.minNameLength) {
      newErrors.fullName = `Please enter full legal name (minimum ${personalDetailsConfig.minNameLength} characters).`;
    }

    // 2. Date of Birth Validation
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required.';
    }

    // 3. Gender Validation
    if (!formData.gender) {
      newErrors.gender = 'Please select a gender.';
    }

    // 4. Email Validation (Optional)
    if (formData.email && formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    // 5. Aadhaar Validation
    const cleanedAadhaar = (aadhaarData.aadhaarNumber || '').replace(/[^0-9]/g, '');
    if (!cleanedAadhaar || cleanedAadhaar.length !== 12) {
      newErrors.aadhaarNumber = 'Please enter a valid 12-digit Aadhaar number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinuePress = () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      updateRegistrationData('personalDetails', formData);
      updateRegistrationData('aadhaar', aadhaarData);

      if (onContinue) {
        onContinue({ formData, aadhaarData });
      }
    }, 300);
  };

  const cleanedAadhaar = (aadhaarData.aadhaarNumber || '').replace(/[^0-9]/g, '');
  const isFormValid =
    formData.fullName.trim().length >= personalDetailsConfig.minNameLength &&
    !!formData.dateOfBirth &&
    !!formData.gender &&
    cleanedAadhaar.length === 12;

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

      {/* 2. Step 2 of 8 Progress */}
      <RegistrationProgress currentStep={2} totalSteps={8} />

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
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* 3. Title & Subtitle */}
        <View
          style={{
            paddingHorizontal: 20,
            marginBottom: 14,
          }}>
          <Text
            style={{
              color: '#17191C',
              fontSize: 28,
              fontWeight: '900',
              letterSpacing: -0.6,
              lineHeight: 34,
            }}>
            Your Personal Details
          </Text>
          <Text
            style={{
              color: '#687078',
              fontSize: 14,
              fontWeight: '400',
              lineHeight: 20,
              marginTop: 4,
            }}>
            Tell us a bit about yourself.
          </Text>
        </View>

        {/* 4. Form Inputs */}
        <PersonalDetailsForm
          formData={formData}
          onChangeField={handleFieldChange}
          aadhaarData={aadhaarData}
          onChangeAadhaar={handleAadhaarChange}
          errors={errors}
        />

        {/* 5. Primary CTA */}
        <RegistrationButton
          label="Continue"
          onPress={handleContinuePress}
          isDisabled={!isFormValid}
          isLoading={isLoading}
        />

        {/* 6. Lower Automotive Hero */}
        <PersonalDetailsHelper />
      </ScrollView>
    </View>
  );
}

export default PersonalDetailsOnboardingScreen;
