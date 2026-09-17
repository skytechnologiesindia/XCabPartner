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
  PersonalDetailsHelper,
} from '../../component/personalDetailsOnboarding';
import {
  VehicleDetailsForm,
  initialVehicleDetails,
} from '../../component/vehicleDetails';

/**
 * VehicleDetailsScreen
 * Onboarding screen capturing the driver's vehicle information:
 * - Vehicle Type (Sedan, Hatchback, SUV, etc.)
 * - Make (Toyota, Maruti Suzuki, etc.)
 * - Model (Etios, Dzire, etc.)
 * - Year (2020, etc.)
 * - Color (White, etc.)
 * - Registration Number (JH01AB1234)
 *
 * Visually matches the reference design with consistent header, progress,
 * rounded input cards, yellow CTA, and lower automotive visual.
 */
function VehicleDetailsScreen({
  navigation,
  onBack,
  onContinue,
}) {
  const insets = useSafeAreaInsets();

  const [formData, setFormData] = useState(initialVehicleDetails);
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
      'Need help adding your vehicle details?\n\nContact our 24/7 Driver Support at 1800-247-XCAB (9222).',
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

    // Validate Registration Number
    const regNum = (formData.registrationNumber || '').trim();
    if (!regNum) {
      newErrors.registrationNumber = 'Please enter vehicle registration number.';
    } else if (regNum.length < 6) {
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

      if (onContinue) {
        onContinue(formData);
      } else if (navigation && navigation.navigate) {
        try {
          navigation.navigate('VehicleDocuments');
        } catch (err) {
          navigation.navigate('Desk');
        }
      }
    }, 400);
  };

  const isFormValid =
    !!formData.vehicleType &&
    !!formData.make &&
    !!formData.model &&
    !!formData.year &&
    !!formData.color &&
    (formData.registrationNumber || '').trim().length >= 6;

  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight || 28 : 0;
  const safeTopPadding = Math.max(insets.top, statusBarHeight) + 8;

  return (
    <View style={{ backgroundColor: '#F7F5EF', flex: 1, paddingTop: safeTopPadding }}>
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

      {/* 2. Progress Indicator */}
      <OnboardingProgress step={2} totalSteps={3} />

      <ScrollView
        style={{ backgroundColor: '#F7F5EF', flex: 1 }}
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
        <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
          <Text
            style={{
              color: '#17191C',
              fontSize: 27,
              fontWeight: '900',
              letterSpacing: -0.6,
              lineHeight: 33,
            }}
          >
            Vehicle Details
          </Text>
          <Text
            style={{
              color: '#687078',
              fontSize: 13.5,
              fontWeight: '400',
              lineHeight: 19,
              marginTop: 6,
            }}
          >
            Tell us about your vehicle.
          </Text>
        </View>

        {/* 4. Form Inputs */}
        <VehicleDetailsForm
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

export default VehicleDetailsScreen;
