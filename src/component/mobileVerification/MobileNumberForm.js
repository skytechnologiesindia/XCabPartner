import React from 'react';
import {
  Text,
  TextInput,
  View,
} from 'react-native';
import CountryCodeSelector from './CountryCodeSelector';

/**
 * MobileNumberForm
 * State 1 UI container:
 * - "Enter Your Mobile Number" title
 * - "We'll send you a verification code to continue." description
 * - Unified rounded card with Country Selector (+91) + TextInput
 */
function MobileNumberForm({
  phoneNumber = '',
  onChangePhone,
  countryCode = '+91',
  countryFlag = '🇮🇳',
  onPressCountry,
  errorMessage,
}) {
  const handlePhoneChange = text => {
    // Strip non-digits and cap at 10 digits
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 10);
    if (onChangePhone) {
      onChangePhone(cleaned);
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: 20,
        width: '100%',
      }}>
      {/* 1. Header Titles */}
      <Text
        style={{
          color: '#17191C',
          fontSize: 27,
          fontWeight: '900',
          letterSpacing: -0.6,
          lineHeight: 33,
        }}>
        Enter Your{'\n'}Mobile Number
      </Text>
      <Text
        style={{
          color: '#687078',
          fontSize: 13.5,
          fontWeight: '400',
          lineHeight: 19,
          marginTop: 8,
          marginBottom: 20,
        }}>
        We’ll send you a verification code to continue.
      </Text>

      {/* 2. Unified Input Card */}
      <View
        style={[
          {
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderColor: '#DDD9CF',
            borderRadius: 14,
            borderWidth: 1.5,
            flexDirection: 'row',
            height: 56,
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.04,
            shadowRadius: 3,
            elevation: 1,
          },
          !!errorMessage && { borderColor: '#EF4444' },
        ]}>
        <CountryCodeSelector
          countryCode={countryCode}
          countryFlag={countryFlag}
          onPress={onPressCountry}
        />

        <TextInput
          style={{
            color: '#17191C',
            flex: 1,
            fontSize: 16,
            fontWeight: '700',
            height: '100%',
            letterSpacing: 0.5,
            paddingHorizontal: 12,
          }}
          placeholder="98765 43210"
          placeholderTextColor="#9CA3AF"
          value={phoneNumber}
          onChangeText={handlePhoneChange}
          keyboardType="phone-pad"
          maxLength={10}
          autoFocus={true}
          accessibilityRole="text"
          accessibilityLabel="10-digit Mobile Number"
        />
      </View>

      {/* Error Feedback */}
      {errorMessage ? (
        <Text
          style={{
            color: '#EF4444',
            fontSize: 12,
            fontWeight: '500',
            marginTop: 6,
            paddingHorizontal: 4,
          }}>
          {errorMessage}
        </Text>
      ) : null}
    </View>
  );
}

export default MobileNumberForm;
