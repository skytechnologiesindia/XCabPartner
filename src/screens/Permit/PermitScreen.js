import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RegistrationButton } from '../../component/onboarding';
import { VerificationHeader } from '../../component/mobileVerification';
import {
  PermitForm,
  isValidityInFuture,
  permitConfig,
} from '../../component/permit';
import { useRegistration } from '../../context/RegistrationContext';

/**
 * PermitScreen
 * Opened from the Documents hub: permit images, permit number and validity.
 * Stored in RegistrationContext.permit (kept separate from other documents).
 */
function PermitScreen({
  onBack,
  onSubmit,
}) {
  const insets = useSafeAreaInsets();
  const { registrationData, updateRegistrationData } = useRegistration();

  const [formData, setFormData] = useState({
    number: registrationData.permit?.number || '',
    validTill: registrationData.permit?.validTill || '',
    frontDocument: registrationData.permit?.frontDocument || null,
    backDocument: registrationData.permit?.backDocument || null,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    const errorKey =
      field === 'frontDocument' || field === 'backDocument' ? 'documents' : field;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: null }));
    }
  };

  const handleNeedHelp = () => {
    Alert.alert(
      'TREEPS Support (24/7)',
      'Need help with your permit?\n\nContact our 24/7 Driver Support at 1800-247-TREEPS (9222).',
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  const isFormValid =
    (formData.number || '').trim().length >= permitConfig.minNumberLength &&
    isValidityInFuture(formData.validTill) &&
    !!formData.frontDocument &&
    !!formData.backDocument;

  const validateForm = () => {
    const newErrors = {};
    if ((formData.number || '').trim().length < permitConfig.minNumberLength) {
      newErrors.number = 'Please enter a valid permit number.';
    }
    if (!formData.validTill) {
      newErrors.validTill = 'Please select the permit validity date.';
    } else if (!isValidityInFuture(formData.validTill)) {
      newErrors.validTill = 'Permit validity date cannot be in the past.';
    }
    if (!formData.frontDocument || !formData.backDocument) {
      newErrors.documents = 'Please upload both sides of your permit.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinuePress = () => {
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    // Stored locally (no permit API exists yet).
    updateRegistrationData('permit', formData);
    setIsLoading(false);
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const safeTopInset = Platform.OS === 'ios' ? insets.top : 0;

  return (
    <KeyboardAvoidingView
      style={{ backgroundColor: '#FBFAF6', flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEF0F2" translucent={false} />

      <VerificationHeader
        title="Permit"
        centerTitle
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
          paddingTop: 12,
        }}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <PermitForm
          formData={formData}
          onChangeField={handleFieldChange}
          errors={errors}
        />

        <RegistrationButton
          label="Continue"
          onPress={handleContinuePress}
          isDisabled={!isFormValid}
          isLoading={isLoading}
          style={{ marginTop: 28 }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default PermitScreen;
