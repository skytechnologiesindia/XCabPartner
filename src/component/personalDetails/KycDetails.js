import React from 'react';
import { Text, View } from 'react-native';
import PersonalDetailRow from './PersonalDetailRow';

/**
 * KycDetails
 * Read-only card displaying government and KYC identity records:
 * - Aadhaar Number (XXXX XXXX 4821)
 * - PAN Number (XXXXXXX732K)
 * - Driver ID (XC784521)
 *
 * All fields are strictly verified and locked from inline editing.
 */
function KycDetails({ data }) {
  const aadhaar = data?.aadhaar || 'XXXX XXXX 4821';
  const pan = data?.pan || 'XXXXXXX732K';
  const driverId = data?.driverId || 'XC784521';

  return (
    <View
      style={{
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
      }}>
      <Text
        style={{
          color: '#17191C',
          fontSize: 16.5,
          fontWeight: '800',
          letterSpacing: -0.3,
          marginBottom: 4,
        }}>
        KYC & Government Details
      </Text>

      {/* 1. Aadhaar Number (Read-only / Verified) */}
      <PersonalDetailRow
        icon="shield"
        label="Aadhaar Number"
        value={aadhaar}
        editable={false}
        verified={true}
      />

      {/* 2. PAN Number (Read-only / Verified) */}
      <PersonalDetailRow
        icon="document"
        label="PAN Number"
        value={pan}
        editable={false}
        verified={true}
      />

      {/* 3. Driver ID (Read-only / Verified) */}
      <PersonalDetailRow
        icon="idCard"
        label="Driver ID"
        value={driverId}
        editable={false}
        verified={true}
        isLast={true}
      />
    </View>
  );
}

export default KycDetails;
