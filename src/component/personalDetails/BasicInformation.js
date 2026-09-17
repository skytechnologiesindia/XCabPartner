import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PersonalDetailRow from './PersonalDetailRow';

/**
 * BasicInformation
 * Card section displaying personal driver records.
 * Provides edit triggers for allowed fields (Email, Address)
 * and read-only verified locks for legal records (Full Name, Mobile, DOB, Gender).
 */
function BasicInformation({ data, onEditField }) {
  const fullName = data?.fullName || 'Raj Kumar';
  const phone = data?.phone || '+91 91234 56789';
  const email = data?.email || 'rajkumar@gmail.com';
  const dateOfBirth = data?.dateOfBirth || '14 Feb 1995';
  const gender = data?.gender || 'Male';
  const addressLine1 = data?.address?.line1 || 'Main Road, Ranchi';
  const addressLine2 = data?.address?.line2 || 'Jharkhand - 834001';

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Basic Information</Text>

      {/* 1. Full Name (Read-only / Verified) */}
      <PersonalDetailRow
        icon="user"
        label="Full Name"
        value={fullName}
        editable={false}
        verified={true}
      />

      {/* 2. Mobile Number (Read-only / Verified) */}
      <PersonalDetailRow
        icon="phone"
        label="Mobile Number"
        value={phone}
        editable={false}
        verified={true}
      />

      {/* 3. Email Address (Editable with subtle pencil + right arrow) */}
      <PersonalDetailRow
        icon="mail"
        label="Email Address"
        value={email}
        editable={true}
        verified={false}
        onPress={() => onEditField && onEditField('email')}
      />

      {/* 4. Date of Birth (Read-only / Verified) */}
      <PersonalDetailRow
        icon="calendar"
        label="Date of Birth"
        value={dateOfBirth}
        editable={false}
        verified={true}
      />

      {/* 5. Gender (Read-only / Verified) */}
      <PersonalDetailRow
        icon="gender"
        label="Gender"
        value={gender}
        editable={false}
        verified={true}
      />

      {/* 6. Address (Editable with subtle pencil + right arrow) */}
      <PersonalDetailRow
        icon="location"
        label="Address"
        value={addressLine1}
        subValue={addressLine2}
        editable={true}
        verified={false}
        isLast={true}
        onPress={() => onEditField && onEditField('address')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#EFECE6',
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1.5,
  },
  sectionTitle: {
    color: '#17191C',
    fontSize: 16.5,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginBottom: 4,
  },
});

export default BasicInformation;
