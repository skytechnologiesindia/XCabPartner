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
  DrivingLicenceForm,
  initialLicenceValues,
  licenceConfig,
} from '../../component/drivingLicenceOnboarding';
import { useRegistration } from '../../context/RegistrationContext';

/**
 * DrivingLicenceOnboardingScreen (Step 3 of 8)
 * Eligibility document verification step:
 * - Licence Number
 * - Date of Birth
 * - Licence Valid Until
 * - Front & Back Uploads
 */
function DrivingLicenceOnboardingScreen({
  onBack,
  onContinue,
}) {
  const insets = useSafeAreaInsets();
  const { registrationData, updateRegistrationData } = useRegistration();

  const [formData, setFormData] = useState({
    ...initialLicenceValues,
    ...registrationData.drivingLicence,
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

  const handleNeedHelp = () => {
    Alert.alert(
      'XCAB Partner Support',
      'Need help with your Driving Licence details or upload?\n\nContact our 24/7 Driver Support at 1800-247-XCAB (9222).',
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.licenceNumber || formData.licenceNumber.trim().length < licenceConfig.minLicenceLength) {
      newErrors.licenceNumber = 'Please enter a valid Driving Licence number.';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required.';
    }

    if (!formData.validUntil) {
      newErrors.validUntil = 'Licence validity date is required.';
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
      updateRegistrationData('drivingLicence', formData);

      if (onContinue) {
        onContinue(formData);
      }
    }, 300);
  };

  const isFormValid =
    !!formData.licenceNumber &&
    formData.licenceNumber.trim().length >= licenceConfig.minLicenceLength &&
    !!formData.dateOfBirth &&
    !!formData.validUntil;

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

      {/* 2. Step 3 of 8 Progress */}
      <RegistrationProgress currentStep={3} totalSteps={8} />

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
            Your Driving{'\n'}Licence
          </Text>
          <Text
            style={{
              color: '#687078',
              fontSize: 13.5,
              fontWeight: '400',
              lineHeight: 19,
              marginTop: 6,
            }}>
            Add your driving licence to continue.
          </Text>
        </View>

        {/* 4. Form Inputs */}
        <DrivingLicenceForm
          formData={formData}
          onChangeField={handleFieldChange}
          errors={errors}
        />

        {/* 5. Primary CTA */}
        <RegistrationButton
          label="Continue"
          onPress={handleContinuePress}
          isDisabled={!isFormValid}
          isLoading={isLoading}
        />
      </ScrollView>
    </View>
  );
}

export default DrivingLicenceOnboardingScreen;
