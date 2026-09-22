import React from 'react';
import {
  Text,
  TextInput,
  View,
} from 'react-native';

/**
 * VehicleRegistrationField
 * Input card for vehicle license plate / registration number (e.g. JH01AB1234):
 * - Left icon (🪪)
 * - Stacked label & text input
 * - Automatic uppercase & whitespace trimming
 */
function VehicleRegistrationField({
  label = 'Registration Number',
  value = '',
  onChangeNumber,
  errorMessage,
}) {
  return (
    <View style={{ marginBottom: 12, width: '100%' }}>
      <View
        style={[
          {
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderColor: '#DDD9CF',
            borderRadius: 14,
            borderWidth: 1.5,
            flexDirection: 'row',
            height: 58,
            paddingHorizontal: 14,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.03,
            shadowRadius: 3,
            elevation: 1,
            width: '100%',
          },
          !!errorMessage && {
            borderColor: '#EF4444',
          },
        ]}
      >
        {/* Left Icon */}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
            width: 24,
          }}
        >
          <Text style={{ color: '#687078', fontSize: 18 }}>🪪</Text>
        </View>

        {/* Stacked Label & Text Input */}
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text
            style={{
              color: '#687078',
              fontSize: 11,
              fontWeight: '500',
              letterSpacing: 0.1,
              marginBottom: 2,
            }}
          >
            {label}
          </Text>
          <TextInput
            style={{
              color: '#17191C',
              fontSize: 15,
              fontWeight: '700',
              letterSpacing: 0.5,
              padding: 0,
              margin: 0,
            }}
            value={value}
            onChangeText={text => onChangeNumber(text.toUpperCase().replace(/\s/g, ''))}
            placeholder="JH01AB1234"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="characters"
            autoCorrect={false}
            maxLength={12}
            accessibilityRole="text"
            accessibilityLabel={label}
          />
        </View>
      </View>

      {errorMessage ? (
        <Text
          style={{
            color: '#EF4444',
            fontSize: 11.5,
            fontWeight: '500',
            marginTop: 4,
            paddingHorizontal: 4,
          }}
        >
          {errorMessage}
        </Text>
      ) : null}
    </View>
  );
}

export default VehicleRegistrationField;
