import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RegistrationButton } from '../../component/onboarding';
import { VerificationHeader } from '../../component/mobileVerification';
import {
  DateOfBirthField,
  FullNameField,
  GenderSelector,
  ProfilePhotoPicker,
  genderOptions,
  initialFormValues,
  personalDetailsConfig,
} from '../../component/personalDetailsOnboarding';
import { useRegistration } from '../../context/RegistrationContext';

const photoNameGenders = genderOptions.filter(
  option => option.id === 'male' || option.id === 'female',
);

/**
 * PhotoAndNameScreen
 * Opened from the Documents hub. Edits the profile photo, full name,
 * date of birth and gender held in RegistrationContext.personalDetails.
 * Navigation is injected: `onBack` / `onSubmit` both return to Documents.
 */
function PhotoAndNameScreen({
  onBack,
  onSubmit,
}) {
  const insets = useSafeAreaInsets();
  const { registrationData, updateRegistrationData } = useRegistration();

  const [formData, setFormData] = useState({
    ...initialFormValues,
    ...registrationData.personalDetails,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleNeedHelp = () => {
    Alert.alert(
      'TREEPS Support (24/7)',
      'Need help with your photo or name?\n\nContact our 24/7 Driver Support at 1800-247-TREEPS (9222).',
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName || formData.fullName.trim().length < personalDetailsConfig.minNameLength) {
      newErrors.fullName = `Please enter full legal name (minimum ${personalDetailsConfig.minNameLength} characters).`;
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required.';
    }
    if (!formData.gender) {
      newErrors.gender = 'Please select a gender.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    // Details are stored locally (no personal-details API exists yet).
    updateRegistrationData('personalDetails', formData);
    setIsLoading(false);
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const isFormValid =
    (formData.fullName || '').trim().length >= personalDetailsConfig.minNameLength &&
    !!formData.dateOfBirth &&
    !!formData.gender;

  const safeTopInset = Platform.OS === 'ios' ? insets.top : 0;

  return (
    <KeyboardAvoidingView
      style={{ backgroundColor: '#FBFAF6', flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEF0F2" translucent={false} />

      <VerificationHeader
        title="Photo and name"
        onBack={onBack}
        onNeedHelp={handleNeedHelp}
        backgroundColor="#EEF0F2"
        topInset={safeTopInset}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: Math.max(insets.bottom, 16),
          paddingHorizontal: 20,
          paddingTop: 28,
        }}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <ProfilePhotoPicker
          photo={formData.profilePhoto}
          onChangePhoto={val => handleFieldChange('profilePhoto', val)}
          errorMessage={errors.profilePhoto}
        />

        <View style={{ marginTop: 12 }}>
          <FullNameField
            value={formData.fullName}
            onChangeName={val => handleFieldChange('fullName', val)}
            errorMessage={errors.fullName}
          />
          <DateOfBirthField
            value={formData.dateOfBirth}
            onChangeDate={val => handleFieldChange('dateOfBirth', val)}
            errorMessage={errors.dateOfBirth}
          />
          <GenderSelector
            options={photoNameGenders}
            selectedGender={formData.gender}
            onSelectGender={val => handleFieldChange('gender', val)}
            errorMessage={errors.gender}
          />
        </View>

        <View style={{ flex: 1 }} />

        <RegistrationButton
          label="Submit"
          showArrow={false}
          onPress={handleSubmit}
          isDisabled={!isFormValid}
          isLoading={isLoading}
          style={{ paddingHorizontal: 0 }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default PhotoAndNameScreen;
