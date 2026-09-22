import React from 'react';
import {
  Pressable,
  Text,
} from 'react-native';

/**
 * OnboardingSkip
 * Discreet yet easily accessible Skip button positioned in the top navigation area.
 */
function OnboardingSkip({ onSkip }) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          paddingHorizontal: 8,
          paddingVertical: 4,
        },
        pressed && { opacity: 0.6 },
      ]}
      onPress={onSkip}
      hitSlop={{ top: 12, bottom: 12, left: 16, right: 16 }}
      accessibilityRole="button"
      accessibilityLabel="Skip onboarding"
    >
      <Text
        style={{
          color: '#17191C',
          fontSize: 14.5,
          fontWeight: '600',
          letterSpacing: -0.1,
        }}>
        Skip
      </Text>
    </Pressable>
  );
}

export default OnboardingSkip;
