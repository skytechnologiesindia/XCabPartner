import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LicenceUpload from './LicenceUpload';
// Imported from the file (not the permit index) to avoid a circular import:
// PermitForm itself imports LicenceUpload from this folder.
import { ValidTillField } from '../permit/PermitForm';

/**
 * DrivingLicenceForm
 * Form inputs for Driving Licence:
 * 1. Licence Number (JH01 2019 0012345)
 * 2. Upload Driving Licence (Front & Back)
 */
function DrivingLicenceForm({
  formData = {},
  onChangeField,
  errors = {},
}) {
  const handleLicenceNumberChange = text => {
    // Keep uppercase and alphanumeric
    const formatted = text.toUpperCase();
    onChangeField('licenceNumber', formatted);
  };

  const handleDocUpload = (side, doc) => {
    onChangeField(side, doc);
  };

  const handleDocRemove = side => {
    onChangeField(side, null);
  };

  return (
    <View style={styles.container}>
      {/* 1. Licence Number */}
      <Text style={styles.inputLabel}>Licence Number</Text>
      <TextInput
        style={[styles.textInput, !!errors.licenceNumber && styles.textInputError]}
        value={formData.licenceNumber || ''}
        onChangeText={handleLicenceNumberChange}
        placeholder="JH01 2019 0012345"
        placeholderTextColor="#8A929B"
        autoCapitalize="characters"
        accessibilityLabel="Licence Number"
      />
      {errors.licenceNumber ? (
        <Text style={styles.errorText}>{errors.licenceNumber}</Text>
      ) : null}

      {/* 2. Upload Driving Licence */}
      <LicenceUpload
        frontDoc={formData.frontDocument}
        backDoc={formData.backDocument}
        onUploadDoc={handleDocUpload}
        onRemoveDoc={handleDocRemove}
      />
      {errors.documents ? (
        <Text style={styles.errorText}>{errors.documents}</Text>
      ) : null}

      {/* [API] New field: the DRIVING_LICENCE step requires an expiryDate,
          and an expired licence cannot be submitted. */}
      <ValidTillField
        docTitle="Driving Licence"
        value={formData.validUntil}
        onChange={value => onChangeField('validUntil', value)}
        errorMessage={errors.validUntil}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    width: '100%',
  },
  inputLabel: {
    color: '#17191C',
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D9DCE0',
    borderRadius: 14,
    borderWidth: 1,
    color: '#17191C',
    fontSize: 17,
    fontWeight: '600',
    height: 58,
    paddingHorizontal: 18,
  },
  textInputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 6,
  },
});

export default DrivingLicenceForm;
