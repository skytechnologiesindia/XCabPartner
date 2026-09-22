import React from 'react';
import {
  Pressable,
  Text,
  View,
} from 'react-native';
import { genderOptions } from './personalDetailsOnboardingData';

/**
 * GenderSelector
 * 3-way segmented pill selection (Male, Female, Other) with icons.
 */
function GenderSelector({
  selectedGender = 'male',
  onSelectGender,
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
        Gender
      </Text>

      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          width: '100%',
        }}>
        {genderOptions.map(option => {
          const isSelected = selectedGender === option.id;
          return (
            <Pressable
              key={option.id}
              style={({ pressed }) => [
                {
                  alignItems: 'center',
                  borderRadius: 14,
                  borderWidth: 1.5,
                  flex: 1,
                  flexDirection: 'row',
                  height: 48,
                  justifyContent: 'center',
                  paddingHorizontal: 8,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.03,
                  shadowRadius: 2,
                  elevation: 1,
                  backgroundColor: isSelected ? '#FFF4C7' : '#FFFFFF',
                  borderColor: isSelected ? '#FFC928' : '#DDD9CF',
                },
                pressed && { opacity: 0.85 },
              ]}
              onPress={() => onSelectGender && onSelectGender(option.id)}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={option.label}
            >
              <Text
                style={{
                  color: isSelected ? '#17191C' : '#687078',
                  fontSize: 15,
                  fontWeight: '700',
                  marginRight: 6,
                }}>
                {option.symbol}
              </Text>
              <Text
                style={{
                  color: isSelected ? '#17191C' : '#687078',
                  fontSize: 14,
                  fontWeight: isSelected ? '800' : '600',
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
