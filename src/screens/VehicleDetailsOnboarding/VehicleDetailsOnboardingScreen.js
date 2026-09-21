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
  VehicleDetailsForm,
  initialVehicleValues,
} from '../../component/vehicleDetailsOnboarding';
import { useRegistration } from '../../context/RegistrationContext';

/**
 * VehicleDetailsOnboardingScreen (Step 4 of 8)
 * Configures driver's vehicle:
 * - Vehicle Type
 * - Brand / Make
 * - Model
 * - Year
 * - Color
 * - Registration Number
 */
function VehicleDetailsOnboardingScreen({
  onBack,
  onContinue,
}) {
  const insets = useSafeAreaInsets();
  const { registrationData, updateRegistrationData } = useRegistration();
  const scrollViewRef = useRef(null);

  const [formData, setFormData] = useState({
    ...initialVehicleValues,
    ...registrationData.vehicle,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isRegFocused, setIsRegFocused] = useState(false);

  useEffect(() => {
    const hideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setIsRegFocused(false);
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

  // When focusing specifically on Registration Number, expand bottom space & scroll into view
  const handleFocusRegistration = () => {
    setIsRegFocused(true);
    // Trigger scroll after keyboard begins animating up
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 280);
  };

  const handleBlurRegistration = () => {
    setIsRegFocused(false);
  };

  const handleNeedHelp = () => {
    Alert.alert(
      'XCAB Partner Support',
      'Need help selecting or entering your vehicle details?\n\nContact our 24/7 Driver Support at 1800-247-XCAB (9222).',
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.registrationNumber || formData.registrationNumber.trim().length < 6) {
      newErrors.registrationNumber = 'Please enter a valid registration number (e.g. JH01AB1234).';
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
      updateRegistrationData('vehicle', formData);

      if (onContinue) {
        onContinue(formData);
      }
    }, 300);
  };

  const isFormValid =
    !!formData.type &&
    !!formData.make &&
    !!formData.model &&
    !!formData.year &&
    !!formData.color &&
    !!formData.registrationNumber &&
    formData.registrationNumber.trim().length >= 6;

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

      {/* 2. Step 4 of 8 Progress */}
      <RegistrationProgress currentStep={4} totalSteps={8} />

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
          paddingBottom: isRegFocused ? 360 : safeBottomPadding + 20,
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
            Your Vehicle{'\n'}Details
          </Text>
          <Text
            style={{
              color: '#687078',
              fontSize: 13.5,
              fontWeight: '400',
              lineHeight: 19,
              marginTop: 6,
            }}>
            Tell us about your vehicle.
          </Text>
        </View>

        {/* 4. Form Inputs */}
        <VehicleDetailsForm
          formData={formData}
          onChangeField={handleFieldChange}
          onFocusRegistration={handleFocusRegistration}
          onBlurRegistration={handleBlurRegistration}
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

export default VehicleDetailsOnboardingScreen;
