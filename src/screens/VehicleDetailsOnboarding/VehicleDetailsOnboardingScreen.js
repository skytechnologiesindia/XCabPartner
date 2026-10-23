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
  VehicleDetailsForm,
  initialVehicleValues,
  vehicleDocumentConfig,
} from '../../component/vehicleDetailsOnboarding';
import { useRegistration } from '../../context/RegistrationContext';

/**
 * VehicleDetailsOnboardingScreen (Step 4 of 8)
 * Vehicle documents: choose Vehicle RC or Road Tax, then
 * - Fuel Type
 * - Front / Back images
 * - Document number
 * RC and Road Tax keep separate state; the RC number is stored as the
 * vehicle's registrationNumber.
 */
function VehicleDetailsOnboardingScreen({
  onBack,
  onContinue,
}) {
  const insets = useSafeAreaInsets();
  const { registrationData, updateRegistrationData } = useRegistration();

  const saved = { ...initialVehicleValues, ...registrationData.vehicle };

  // [API] Start on the document the driver picked before (RC or Road Tax).
  const [docType, setDocType] = useState(saved.numberDocType || 'rc');
  const [fuelType, setFuelType] = useState(saved.fuelType || '');
  const [documents, setDocuments] = useState({
    rc: {
      number: saved.registrationNumber || '',
      frontDocument: saved.rcDocuments?.frontDocument || null,
      backDocument: saved.rcDocuments?.backDocument || null,
    },
    roadTax: {
      number: saved.roadTax?.number || '',
      frontDocument: saved.roadTax?.frontDocument || null,
      backDocument: saved.roadTax?.backDocument || null,
    },
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  const handleFuelChange = value => {
    setFuelType(value);
    if (errors.fuelType) {
      setErrors(prev => ({ ...prev, fuelType: null }));
    }
  };

  const handleNeedHelp = () => {
    Alert.alert(
      'TREEPS Support (24/7)',
      'Need help with your vehicle documents?\n\nContact our 24/7 Driver Support at 1800-247-TREEPS (9222).',
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  const isDocValid =
    (currentDoc.number || '').trim().length >= vehicleDocumentConfig.minNumberLength &&
    !!currentDoc.frontDocument &&
    !!currentDoc.backDocument;
  const isFormValid = !!fuelType && isDocValid;

  const validateForm = () => {
    const newErrors = {};
    const docName = docType === 'rc' ? 'RC' : 'Road Tax';

    if (!fuelType) {
      newErrors.fuelType = 'Please select a fuel type.';
    }
    if (!currentDoc.frontDocument || !currentDoc.backDocument) {
      newErrors.documents = `Please upload both sides of your ${docName}.`;
    }
    if ((currentDoc.number || '').trim().length < vehicleDocumentConfig.minNumberLength) {
      newErrors.number = `Please enter a valid ${docName} number.`;
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
      // Keep existing vehicle fields (type/make/...) untouched.
      console.log('VEHICLE_NUMBER saved:', docType, fuelType, documents[docType]);
      updateRegistrationData('vehicle', {
        // [API] Which document VEHICLE_NUMBER sends: option VEHICLE_RC or ROAD_TAX.
        numberDocType: docType,
        registrationNumber: documents.rc.number,
        fuelType,
        rcDocuments: {
          frontDocument: documents.rc.frontDocument,
          backDocument: documents.rc.backDocument,
        },
        roadTax: documents.roadTax,
      });

      if (onContinue) {
        onContinue(documents);
      }
    }, 300);
  };

  const safeTopInset = Platform.OS === 'ios' ? insets.top : 0;
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

      <VerificationHeader
        title="Vehicle Details"
        onBack={onBack}
        onNeedHelp={handleNeedHelp}
        backgroundColor="#EEF0F2"
        topInset={safeTopInset}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: safeBottomPadding,
          paddingTop: 24,
        }}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <VehicleDetailsForm
          docType={docType}
          onChangeDocType={handleChangeDocType}
          fuelType={fuelType}
          onChangeFuelType={handleFuelChange}
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

export default VehicleDetailsOnboardingScreen;
