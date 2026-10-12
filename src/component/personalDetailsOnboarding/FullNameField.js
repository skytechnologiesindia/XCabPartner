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
          color: '#17191C',
          fontSize: 17,
          fontWeight: '600',
          marginBottom: 10,
        }}>
        Full Name
      </Text>

      <View
        style={[
          {
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderColor: '#D9DCE0',
            borderRadius: 12,
            borderWidth: 1,
            flexDirection: 'row',
            height: 58,
            paddingHorizontal: 18,
          },
          !!errorMessage && { borderColor: '#EF4444' },
        ]}>
        <TextInput
          style={{
            color: '#17191C',
            flex: 1,
            fontSize: 17,
            fontWeight: '400',
            height: '100%',
          }}
          placeholder="Enter your full name"
          placeholderTextColor="#8A929B"
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
