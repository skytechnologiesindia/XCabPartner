import React from 'react';
import {
  Pressable,
  Text,
  View,
} from 'react-native';
import { genderOptions } from './personalDetailsOnboardingData';

/**
 * GenderSelector
 * Radio-style options (Male, Female, Other by default).
 * Pass `options` to show a subset.
 */
function GenderSelector({
  selectedGender = '',
  onSelectGender,
  errorMessage,
  options = genderOptions,
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
        Gender
      </Text>

      <View
        style={{
          flexDirection: 'row',
          gap: 14,
          width: '100%',
        }}>
        {options.map(option => {
          const isSelected = selectedGender === option.id;
          return (
            <Pressable
              key={option.id}
              style={({ pressed }) => [
                {
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  borderColor: isSelected ? '#17191C' : '#D9DCE0',
                  borderRadius: 12,
                  borderWidth: 1,
                  flexDirection: 'row',
                  height: 62,
                  paddingHorizontal: 16,
                },
                options.length > 2 ? { flex: 1 } : { width: '44%' },
                pressed && { opacity: 0.85 },
              ]}
              onPress={() => onSelectGender && onSelectGender(option.id)}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={option.label}
            >
              <View
                style={{
                  alignItems: 'center',
                  borderColor: '#17191C',
                  borderRadius: 14,
                  borderWidth: 2,
                  height: 28,
                  justifyContent: 'center',
                  marginRight: 14,
                  width: 28,
                }}>
                {isSelected ? (
                  <View
                    style={{
                      backgroundColor: '#17191C',
                      borderRadius: 7,
                      height: 14,
                      width: 14,
                    }}
                  />
                ) : null}
              </View>
              <Text
                style={{
                  color: '#17191C',
                  fontSize: 17,
                  fontWeight: '400',
                }}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
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

export default GenderSelector;
