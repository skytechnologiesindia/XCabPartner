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
  OnboardingContinueButton,
  OnboardingHeader,
  OnboardingProgress,
  PersonalDetailsForm,
  PersonalDetailsHelper,
  initialFormValues,
  personalDetailsConfig,
} from '../../component/personalDetailsOnboarding';

/**
 * PersonalDetailsOnboardingScreen
 * Registration step collecting driver's personal information:
 * - Full Name
 * - Date of Birth (with 18+ eligibility validation)
 * - Gender
 * - Email (Optional)
 *
 * Visually matches the Mobile + OTP screen and navigates to Vehicle Details upon completion.
 */
function PersonalDetailsOnboardingScreen({
  navigation,
  onBack,
  onContinue,
}) {
  const insets = useSafeAreaInsets();

  const [formData, setFormData] = useState(initialFormValues);
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

  const handleNeedHelp = () => {
    Alert.alert(
      'XCAB Partner Support',
      'Need help with your personal details or registration?\n\nContact our 24/7 Driver Support at 1800-247-XCAB (9222).',
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

  const validateForm = () => {
    const newErrors = {};

    // 1. Full Name Validation
    if (!formData.fullName || formData.fullName.trim().length < personalDetailsConfig.minNameLength) {
      newErrors.fullName = `Please enter full legal name (minimum ${personalDetailsConfig.minNameLength} characters).`;
    }

    // 2. Date of Birth Validation
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required.';
    } else {
      const parts = formData.dateOfBirth.split(' ');
      const year = parseInt(parts[2], 10);
      const currentYear = new Date().getFullYear();
      if (!year || currentYear - year < personalDetailsConfig.minDriverAge) {
        newErrors.dateOfBirth = `Driver must be at least ${personalDetailsConfig.minDriverAge} years old.`;
      }
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

      if (onContinue) {
        onContinue(formData);
      } else if (navigation && navigation.navigate) {
        try {
          navigation.navigate('VehicleDetails');
        } catch (err) {
          navigation.navigate('Desk');
        }
      }
    }, 400);
  };

  const isFormValid =
    formData.fullName.trim().length >= personalDetailsConfig.minNameLength &&
    !!formData.dateOfBirth &&
    !!formData.gender;

  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight || 28 : 0;
  const safeTopPadding = Math.max(insets.top, statusBarHeight) + 8;

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

      {/* 1. Header with Back Arrow & Need Help? */}
      <OnboardingHeader
        onBack={handleBack}
        onNeedHelp={handleNeedHelp}
      />

      {/* 2. Progress Indicator (Step 2 of 3) */}
      <OnboardingProgress step={2} totalSteps={3} />

      <ScrollView
        style={{
          backgroundColor: '#F7F5EF',
          flex: 1,
        }}
        contentContainerStyle={{
          backgroundColor: '#F7F5EF',
          flexGrow: 1,
          justifyContent: 'space-between',
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
            Your Personal{'\n'}Details
          </Text>
          <Text
            style={{
              color: '#687078',
              fontSize: 13.5,
              fontWeight: '400',
              lineHeight: 19,
              marginTop: 6,
            }}>
            Tell us a bit about yourself.
          </Text>
        </View>

        {/* 4. Form Inputs */}
        <PersonalDetailsForm
          formData={formData}
          onChangeField={handleFieldChange}
          errors={errors}
        />

        {/* 5. Primary CTA */}
        <OnboardingContinueButton
          label="Continue"
          onPress={handleContinuePress}
          isDisabled={!isFormValid}
          isLoading={isLoading}
        />

        {/* 6. Helper Message & Lower Automotive Hero */}
        <PersonalDetailsHelper />
      </ScrollView>
    </View>
  );
}

export default PersonalDetailsOnboardingScreen;
