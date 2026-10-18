import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RegistrationButton } from '../../component/onboarding';
import { VerificationHeader } from '../../component/mobileVerification';
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
      'TREEPS Support (24/7)',
      'Need help with your Driving Licence details or upload?\n\nContact our 24/7 Driver Support at 1800-247-TREEPS (9222).',
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.licenceNumber || formData.licenceNumber.trim().length < licenceConfig.minLicenceLength) {
      newErrors.licenceNumber = 'Please enter a valid Driving Licence number.';
    }

    if (!formData.frontDocument || !formData.backDocument) {
      newErrors.documents = 'Please upload both sides of your driving licence.';
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
    !!formData.frontDocument &&
    !!formData.backDocument;

  const safeBottomPadding = Math.max(insets.bottom, 16);

  return (
    <KeyboardAvoidingView
      style={{
        backgroundColor: '#FBFAF6',
        flex: 1,
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#EEF0F2"
        translucent={false}
      />

      {/* 1. Grey header: back + Need Help? */}
      <VerificationHeader
        onBack={onBack}
        onNeedHelp={handleNeedHelp}
        backgroundColor="#EEF0F2"
      />

      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: safeBottomPadding,
          paddingTop: 28,
        }}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* 2. Title & Subtitle */}
        <View
          style={{
            paddingHorizontal: 20,
            marginBottom: 28,
          }}>
          <Text
            style={{
              color: '#17191C',
              fontSize: 32,
              fontWeight: '800',
              letterSpacing: -0.8,
              lineHeight: 40,
            }}>
            Your Driving{'\n'}Licence
          </Text>
          {/* <Text
            style={{
              color: '#8A929B',
              fontSize: 17,
              fontWeight: '400',
              lineHeight: 24,
              marginTop: 10,
            }}>
            Add your driving licence to continue.
          </Text> */}
        </View>

        {/* 3. Form Inputs */}
        <DrivingLicenceForm
          formData={formData}
          onChangeField={handleFieldChange}
          errors={errors}
        />

        {/* 4. Primary CTA */}
        <RegistrationButton
          label="Continue"
          onPress={handleContinuePress}
          isDisabled={!isFormValid}
          isLoading={isLoading}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default DrivingLicenceOnboardingScreen;
