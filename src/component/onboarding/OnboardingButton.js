import React from 'react';
import {
  Pressable,
  StyleSheet,
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
        styles.button,
        pressed && styles.buttonPressed,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label} step`}
    >
      <View style={styles.contentRow}>
        <Text style={styles.buttonText}>{label}</Text>
        <Text style={styles.arrowIcon}>→</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
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
  buttonPressed: {
    backgroundColor: '#F5BE18',
    transform: [{ scale: 0.99 }],
  },
  contentRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#17191C',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  arrowIcon: {
    color: '#17191C',
    fontSize: 16,
    fontWeight: '800',
    marginLeft: 8,
  },
});

export default OnboardingButton;
