import React from 'react';
import {
  Pressable,
  StyleSheet,
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
        styles.skipButton,
        pressed && styles.skipButtonPressed,
      ]}
      onPress={onSkip}
      hitSlop={{ top: 12, bottom: 12, left: 16, right: 16 }}
      accessibilityRole="button"
      accessibilityLabel="Skip onboarding"
    >
      <Text style={styles.skipText}>Skip</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  skipButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  skipButtonPressed: {
    opacity: 0.6,
  },
  skipText: {
    color: '#17191C',
    fontSize: 14.5,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
});

export default OnboardingSkip;
