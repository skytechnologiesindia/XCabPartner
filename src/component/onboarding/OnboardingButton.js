import React from 'react';
import {
  Pressable,
  Text,
  View,
} from 'react-native';

/**
 * OnboardingButton
 * High-emphasis primary CTA button used across onboarding slides (Next / Get Started).
 */
function OnboardingButton({
  label = 'Next',
  onPress,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          alignItems: 'center',
          backgroundColor: '#FFC928',
          borderRadius: 16,
          height: 52,
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
          elevation: 2,
          width: '100%',
        },
        pressed && {
          backgroundColor: '#F5BE18',
          transform: [{ scale: 0.99 }],
        },
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label} step`}
    >
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: '#17191C',
            fontSize: 16,
            fontWeight: '800',
            letterSpacing: -0.2,
          }}>
          {label}
        </Text>
        <Text
          style={{
            color: '#17191C',
            fontSize: 16,
            fontWeight: '800',
            marginLeft: 8,
          }}>
          →
        </Text>
      </View>
    </Pressable>
  );
}

export default OnboardingButton;
