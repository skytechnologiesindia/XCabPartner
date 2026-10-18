import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RegistrationButton } from '../../component/onboarding';
import { VerificationHeader } from '../../component/mobileVerification';
import {
  PermitForm,
  isValidityInFuture,
  permitConfig,
} from '../../component/permit';
import { InsuranceCompanyField } from '../../component/insurance';
import { issuingAuthorities } from '../../component/fitness/fitnessData';
import { useRegistration } from '../../context/RegistrationContext';

/**
 * FitnessCertificateScreen
 * Opened from the Documents hub: certificate images, number, issuing authority
 * and validity. Reuses PermitForm for images/number/date; stored in
 * RegistrationContext.fitness (separate from other documents).
 */
function FitnessCertificateScreen({
  onBack,
  onSubmit,
}) {
  const insets = useSafeAreaInsets();
  const { registrationData, updateRegistrationData } = useRegistration();

  const [formData, setFormData] = useState({
    number: registrationData.fitness?.number || '',
    authority: registrationData.fitness?.authority || '',
    validTill: registrationData.fitness?.validTill || '',
    frontDocument: registrationData.fitness?.frontDocument || null,
    backDocument: registrationData.fitness?.backDocument || null,
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
      'Need help with your fitness certificate?\n\nContact our 24/7 Driver Support at 1800-247-TREEPS (9222).',
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  const isFormValid =
    (formData.number || '').trim().length >= permitConfig.minNumberLength &&
    !!formData.authority &&
    isValidityInFuture(formData.validTill) &&
    !!formData.frontDocument &&
    !!formData.backDocument;

  const validateForm = () => {
    const newErrors = {};
    if ((formData.number || '').trim().length < permitConfig.minNumberLength) {
      newErrors.number = 'Please enter a valid fitness certificate number.';
    }
    if (!formData.authority) {
      newErrors.authority = 'Please select the issuing authority.';
    }
    if (!formData.validTill) {
      newErrors.validTill = 'Please select the certificate validity date.';
    } else if (!isValidityInFuture(formData.validTill)) {
      newErrors.validTill = 'Certificate validity date cannot be in the past.';
    }
    if (!formData.frontDocument || !formData.backDocument) {
      newErrors.documents = 'Please upload both sides of your fitness certificate.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinuePress = async () => {
    // Ignore repeated taps while a submission is in progress.
    if (isLoading) {
      return;
    }
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    try {
      // No fitness certificate API exists yet: the submission is stored locally
      // and marked pending. Replace with the API call when it is available.
      updateRegistrationData('fitness', { ...formData, status: 'pending' });
      if (onSubmit) {
        await onSubmit(formData);
      }
    } catch (error) {
      setErrors({
        submit:
          error?.response?.data?.error?.message ||
          error?.message ||
          'Could not submit your fitness certificate. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const safeTopInset = Platform.OS === 'ios' ? insets.top : 0;

  return (
    <KeyboardAvoidingView
      style={{ backgroundColor: '#FBFAF6', flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEF0F2" translucent={false} />

      <VerificationHeader
        title="Fitness Certificate"
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
          docTitle="Fitness Certificate"
          placeholder="FC12345678"
          example="Eg: FC12345678"
          formData={formData}
          onChangeField={handleFieldChange}
          errors={errors}
          extraFields={
            <InsuranceCompanyField
              label="Issuing Authority"
              placeholder="Select Issuing Authority"
              options={issuingAuthorities}
              value={formData.authority}
              onChange={value => handleFieldChange('authority', value)}
              errorMessage={errors.authority}
            />
          }
        />

        {errors.submit ? (
          <Text
            style={{
              color: '#EF4444',
              fontSize: 13,
              marginTop: 16,
              paddingHorizontal: 20,
            }}>
            {errors.submit}
          </Text>
        ) : null}

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

export default FitnessCertificateScreen;
