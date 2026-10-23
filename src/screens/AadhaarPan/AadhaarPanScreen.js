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
import { AadhaarPanForm, identityDocuments } from '../../component/aadhaarPan';
import { useRegistration } from '../../context/RegistrationContext';

/**
 * AadhaarPanScreen
 * Opened from the Documents hub. One screen, two independent forms
 * (Aadhaar / PAN). Each keeps its own number and front/back images.
 * Data is stored in RegistrationContext (`aadhaar`, `pan`).
 */
function AadhaarPanScreen({
  onBack,
  onSubmit,
}) {
  const insets = useSafeAreaInsets();
  const { registrationData, updateRegistrationData } = useRegistration();

  // [API] Start on the identity the driver picked before (saved as identityType).
  const [docType, setDocType] = useState(registrationData.identityType || 'aadhaar');
  const [documents, setDocuments] = useState({
    aadhaar: {
      number: registrationData.aadhaar?.aadhaarNumber || '',
      frontDocument: registrationData.aadhaar?.frontDocument || null,
      backDocument: registrationData.aadhaar?.backDocument || null,
    },
    pan: {
      number: registrationData.pan?.panNumber || '',
      frontDocument: registrationData.pan?.frontDocument || null,
      backDocument: registrationData.pan?.backDocument || null,
    },
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const activeConfig = identityDocuments.find(doc => doc.id === docType);
  const currentDoc = documents[docType];

  const handleChangeDocType = id => {
    setDocType(id);
    setErrors({});
  };

  const handleDocumentFieldChange = (field, value) => {
    setDocuments(prev => ({
      ...prev,
      [docType]: { ...prev[docType], [field]: value },
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleNeedHelp = () => {
    Alert.alert(
      'TREEPS Support (24/7)',
      'Need help with your Aadhaar or PAN card?\n\nContact our 24/7 Driver Support at 1800-247-TREEPS (9222).',
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  // [API] Front photo only: the API has one identity photo slot.
  const isFormValid =
    activeConfig.isValidNumber(currentDoc.number || '') &&
    !!currentDoc.frontDocument;

  const validateForm = () => {
    const newErrors = {};
    if (!activeConfig.isValidNumber(currentDoc.number || '')) {
      newErrors.number = activeConfig.errorMessage;
    }
    if (!currentDoc.frontDocument) {
      newErrors.documents = `Please upload the front of your ${activeConfig.uploadName}.`;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinuePress = () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    // Stored locally; sent later with every other step from the Documents hub.
    // [API] Remember which document was picked: only that one is sent
    // (option AADHAAR or PAN_CARD).
    updateRegistrationData('identityType', docType);
    console.log('PERSONAL_IDENTITY saved:', docType, documents[docType]);
    updateRegistrationData('aadhaar', {
      aadhaarNumber: documents.aadhaar.number,
      frontDocument: documents.aadhaar.frontDocument,
      backDocument: documents.aadhaar.backDocument,
    });
    updateRegistrationData('pan', {
      panNumber: documents.pan.number,
      frontDocument: documents.pan.frontDocument,
      backDocument: documents.pan.backDocument,
    });
    setIsLoading(false);

    if (onSubmit) {
      onSubmit(documents);
    }
  };

  const safeTopInset = Platform.OS === 'ios' ? insets.top : 0;

  return (
    <KeyboardAvoidingView
      style={{ backgroundColor: '#FBFAF6', flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEF0F2" translucent={false} />

      <VerificationHeader
        title="Aadhaar or PAN Card"
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
          paddingTop: 24,
        }}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <AadhaarPanForm
          docType={docType}
          onChangeDocType={handleChangeDocType}
          documentData={currentDoc}
          onChangeDocumentField={handleDocumentFieldChange}
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

export default AadhaarPanScreen;
