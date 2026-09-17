import React from 'react';
import { View } from 'react-native';
import DateOfBirthField from './DateOfBirthField';
import EmailField from './EmailField';
import FullNameField from './FullNameField';
import GenderSelector from './GenderSelector';

/**
 * PersonalDetailsForm
 * Composes the driver registration personal details inputs:
 * 1. Full Name (Required)
 * 2. Date of Birth (Required, 18+)
 * 3. Gender (Required)
 * 4. Email (Optional)
 */
function PersonalDetailsForm({
  formData,
  onChangeField,
  errors = {},
}) {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        width: '100%',
      }}>
      {/* 1. Full Name */}
      <FullNameField
        value={formData.fullName}
        onChangeName={val => onChangeField('fullName', val)}
        errorMessage={errors.fullName}
      />

      {/* 2. Date of Birth */}
      <DateOfBirthField
        value={formData.dateOfBirth}
        onChangeDate={val => onChangeField('dateOfBirth', val)}
        errorMessage={errors.dateOfBirth}
      />

      {/* 3. Gender */}
      <GenderSelector
        selectedGender={formData.gender}
        onSelectGender={val => onChangeField('gender', val)}
        errorMessage={errors.gender}
      />

      {/* 4. Email (Optional) */}
      <EmailField
        value={formData.email}
        onChangeEmail={val => onChangeField('email', val)}
        errorMessage={errors.email}
      />
    </View>
  );
}

export default PersonalDetailsForm;
