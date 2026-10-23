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

// [API] Name rule from the guide: 2-50 characters, at least 2 letters,
// letters (any language), spaces and . ' ’ - only; no digits; no hyphen at the
// start or end and no "--".
// (Written without \p{L} regex escapes, which older Hermes builds do not support.)
const NAME_PUNCTUATION = /[ .'’-]/g;
const NOT_A_NAME_CHARACTER = /[0-9_!@#$%^&*()+=[\]{};:"\\|,<>/?~`]/;
function isValidApiName(value) {
  const name = (value || '').trim();
  if (name.length < 2 || name.length > 50) return false;
  if (NOT_A_NAME_CHARACTER.test(name)) return false;
  // Whatever is left after removing spaces and . ' ’ - counts as letters.
  if (name.replace(NAME_PUNCTUATION, '').length < 2) return false;
  return !name.startsWith('-') && !name.endsWith('-') && !name.includes('--');
}

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
    } else if (!isValidApiName(formData.fullName)) {
      newErrors.fullName = 'Use letters only (no digits), up to 50 characters.';
    }
    // [API] PERSONAL_INFO needs one face photo (PERSONAL_INFO_PHOTO).
    if (!formData.profilePhoto) {
      newErrors.profilePhoto = 'Please add a photo of your face.';
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
    // Stored locally; sent later with every other step from the Documents hub.
    updateRegistrationData('personalDetails', formData);
    console.log('PERSONAL_INFO saved:', formData);
    setIsLoading(false);
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const isFormValid =
    (formData.fullName || '').trim().length >= personalDetailsConfig.minNameLength &&
    isValidApiName(formData.fullName) &&
    !!formData.profilePhoto &&
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
