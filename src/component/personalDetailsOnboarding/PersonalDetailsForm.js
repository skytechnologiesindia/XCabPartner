import React from 'react';
import { View } from 'react-native';
import ProfilePhotoPicker from './ProfilePhotoPicker';
import FullNameField from './FullNameField';
import DateOfBirthField from './DateOfBirthField';
import GenderSelector from './GenderSelector';
import EmailField from './EmailField';
import AadhaarSection from './AadhaarSection';

/**
 * PersonalDetailsForm
 * Composes the driver registration personal details inputs:
 * 0. Profile Photo (Avatar with yellow camera badge)
 * 1. Full Name (Required)
 * 2. Date of Birth (Required, 18+)
 * 3. Gender (Required)
 * 4. Email (Optional)
 * 5. Aadhaar Number & Front/Back Uploads (Required)
 */
function PersonalDetailsForm({
  formData,
  onChangeField,
  aadhaarData = {},
  onChangeAadhaar,
  errors = {},
}) {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        width: '100%',
      }}>
      {/* 0. Profile Photo */}
      <ProfilePhotoPicker
        photo={formData.profilePhoto}
        onChangePhoto={val => onChangeField('profilePhoto', val)}
        errorMessage={errors.profilePhoto}
      />

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

      {/* 5. Aadhaar Section */}
      <AadhaarSection
        aadhaarData={aadhaarData}
        onChangeAadhaar={onChangeAadhaar}
        errorMessage={errors.aadhaarNumber}
      />
    </View>
  );
}

export default PersonalDetailsForm;
