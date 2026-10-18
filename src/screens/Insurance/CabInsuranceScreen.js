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
import { InsuranceCompanyField } from '../../component/insurance';
import { useRegistration } from '../../context/RegistrationContext';

/**
 * CabInsuranceScreen
 * Opened from the Documents hub: insurance images, policy number, company and
 * validity. Reuses PermitForm for images/number/date; stored in
 * RegistrationContext.insurance (separate from other documents).
 */
function CabInsuranceScreen({
  onBack,
  onSubmit,
}) {
  const insets = useSafeAreaInsets();
  const { registrationData, updateRegistrationData } = useRegistration();

  const [formData, setFormData] = useState({
    number: registrationData.insurance?.number || '',
    company: registrationData.insurance?.company || '',
    validTill: registrationData.insurance?.validTill || '',
    frontDocument: registrationData.insurance?.frontDocument || null,
    backDocument: registrationData.insurance?.backDocument || null,
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
      'Need help with your cab insurance?\n\nContact our 24/7 Driver Support at 1800-247-TREEPS (9222).',
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  const isFormValid =
    (formData.number || '').trim().length >= permitConfig.minNumberLength &&
    !!formData.company &&
    isValidityInFuture(formData.validTill) &&
    !!formData.frontDocument &&
    !!formData.backDocument;

  const validateForm = () => {
    const newErrors = {};
    if ((formData.number || '').trim().length < permitConfig.minNumberLength) {
      newErrors.number = 'Please enter a valid insurance number.';
    }
    if (!formData.company) {
      newErrors.company = 'Please select your insurance company.';
    }
    if (!formData.validTill) {
      newErrors.validTill = 'Please select the insurance validity date.';
    } else if (!isValidityInFuture(formData.validTill)) {
      newErrors.validTill = 'Insurance validity date cannot be in the past.';
    }
    if (!formData.frontDocument || !formData.backDocument) {
      newErrors.documents = 'Please upload both sides of your insurance.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinuePress = () => {
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    // Stored locally (no insurance API exists yet).
    updateRegistrationData('insurance', formData);
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
        title="Cab Insurance"
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
          docTitle="Cab Insurance"
          placeholder="POL1234567890"
          example="Eg: POL1234567890"
          formData={formData}
          onChangeField={handleFieldChange}
          errors={errors}
          extraFields={
            <InsuranceCompanyField
              value={formData.company}
              onChange={value => handleFieldChange('company', value)}
              errorMessage={errors.company}
            />
          }
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

export default CabInsuranceScreen;
