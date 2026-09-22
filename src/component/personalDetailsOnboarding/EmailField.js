import React from 'react';
import {
  Text,
  TextInput,
  View,
} from 'react-native';

/**
 * EmailField
 * Optional email input field with mail envelope icon.
 */
function EmailField({
  value = '',
  onChangeEmail,
  errorMessage,
}) {
  return (
    <View
      style={{
        marginBottom: 16,
        width: '100%',
      }}>
      <Text
        style={{
          color: '#687078',
          fontSize: 13,
          fontWeight: '600',
          marginBottom: 6,
        }}>
        Email (Optional)
      </Text>

      <View
        style={[
          {
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderColor: '#DDD9CF',
            borderRadius: 14,
            borderWidth: 1.5,
            flexDirection: 'row',
            height: 52,
            paddingHorizontal: 14,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.04,
            shadowRadius: 3,
            elevation: 1,
          },
          !!errorMessage && { borderColor: '#EF4444' },
        ]}>
        {/* Email Envelope Icon */}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
            width: 22,
          }}>
          <Text
            style={{
              color: '#687078',
              fontSize: 16,
            }}>
            ✉
          </Text>
        </View>

        <TextInput
          style={{
            color: '#17191C',
            flex: 1,
            fontSize: 15,
            fontWeight: '600',
            height: '100%',
            letterSpacing: -0.1,
          }}
          placeholder="Enter your email address"
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          accessibilityRole="text"
          accessibilityLabel="Email Address (Optional)"
        />
      </View>

      {errorMessage ? (
        <Text
          style={{
            color: '#EF4444',
            fontSize: 11.5,
            fontWeight: '500',
            marginTop: 4,
            paddingHorizontal: 4,
          }}>
          {errorMessage}
        </Text>
      ) : null}
    </View>
  );
}

export default EmailField;
