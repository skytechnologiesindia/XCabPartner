import React from 'react';
import {
  Text,
  TextInput,
  View,
} from 'react-native';

/**
 * FullNameField
 * Rounded input card with user outline icon for capturing driver's full legal name.
 */
function FullNameField({
  value = '',
  onChangeName,
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
        Full Name
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
        {/* User Outline Icon */}
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
            👤
          </Text>
        </View>

        <TextInput
          style={{
            color: '#17191C',
            flex: 1,
            fontSize: 15.5,
            fontWeight: '600',
            height: '100%',
            letterSpacing: -0.1,
          }}
          placeholder="Mohammed Shamir"
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeName}
          autoCapitalize="words"
          accessibilityRole="text"
          accessibilityLabel="Full Name"
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

export default FullNameField;
