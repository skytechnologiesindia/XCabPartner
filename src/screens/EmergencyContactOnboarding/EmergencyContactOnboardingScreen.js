import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Keyboard,
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
  EmergencyContactForm,
  initialEmergencyContactValues,
} from '../../component/emergencyContactOnboarding';
import { useRegistration } from '../../context/RegistrationContext';

/**
 * EmergencyContactOnboardingScreen (Step 6 of 8)
 * Safety contact registration:
 * - Contact Name
 * - Relationship
 * - Mobile Number
 */
function EmergencyContactOnboardingScreen({
  onBack,
  onContinue,
}) {
  const insets = useSafeAreaInsets();
  const { registrationData, updateRegistrationData } = useRegistration();
  const scrollViewRef = useRef(null);

  const [formData, setFormData] = useState({
    ...initialEmergencyContactValues,
    ...registrationData.emergencyContact,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);

  useEffect(() => {
    const hideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setIsPhoneFocused(false);
      },
    );

    return () => {
      hideSub.remove();
    };
  }, []);

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

  // When focusing specifically on the bottom Mobile Number field, expand space & scroll into view
  const handleFocusPhone = () => {
    setIsPhoneFocused(true);
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 280);
  };

  const handleBlurPhone = () => {
    setIsPhoneFocused(false);
  };

  const handleNeedHelp = () => {
    Alert.alert(
      'XCAB Partner Support',
      'Need help adding your emergency contact?\n\nContact our 24/7 Driver Support at 1800-247-XCAB (9222).',
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter contact full name.';
    }

    if (!formData.relationship) {
      newErrors.relationship = 'Please select a relationship.';
    }

    const cleanedPhone = (formData.phone || '').replace(/[^0-9]/g, '');
    if (!cleanedPhone || cleanedPhone.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
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
      updateRegistrationData('emergencyContact', formData);

      if (onContinue) {
        onContinue(formData);
      }
    }, 300);
  };

  const cleanedPhone = (formData.phone || '').replace(/[^0-9]/g, '');
  const isFormValid =
    !!formData.name &&
    formData.name.trim().length >= 2 &&
    !!formData.relationship &&
    cleanedPhone.length === 10;

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

      {/* 2. Step 6 of 8 Progress */}
      <RegistrationProgress currentStep={6} totalSteps={8} />

      <ScrollView
        ref={scrollViewRef}
        style={{
          backgroundColor: '#F7F5EF',
          flex: 1,
        }}
        contentContainerStyle={{
          backgroundColor: '#F7F5EF',
          flexGrow: 1,
          justifyContent: 'space-between',
          paddingBottom: isPhoneFocused ? 360 : safeBottomPadding + 20,
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
            Emergency Contact
          </Text>
          <Text
            style={{
              color: '#687078',
              fontSize: 13.5,
              fontWeight: '400',
              lineHeight: 19,
              marginTop: 6,
            }}>
            Add a trusted person we can contact in case of an emergency.
          </Text>
        </View>

        {/* 4. Form Inputs */}
        <EmergencyContactForm
          formData={formData}
          onChangeField={handleFieldChange}
          onFocusPhone={handleFocusPhone}
          onBlurPhone={handleBlurPhone}
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

export default EmergencyContactOnboardingScreen;
