import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

/**
 * OnboardingContinueButton
 * Large high-emphasis primary CTA button ("Continue →") with disabled and loading states.
 */
function OnboardingContinueButton({
  label = 'Continue',
  onPress,
  isDisabled = false,
  isLoading = false,
}) {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          isDisabled && styles.buttonDisabled,
          !isDisabled && pressed && styles.buttonPressed,
        ]}
        onPress={onPress}
        disabled={isDisabled || isLoading}
        accessibilityRole="button"
        accessibilityLabel={`${label} to Vehicle Details`}
      >
        {isLoading ? (
          <ActivityIndicator color="#17191C" size="small" />
        ) : (
          <View style={styles.contentRow}>
            <Text
              style={[
                styles.buttonText,
                isDisabled && styles.buttonTextDisabled,
              ]}
            >
              {label}
            </Text>
            <Text
              style={[
                styles.arrowIcon,
                isDisabled && styles.arrowIconDisabled,
              ]}
            >
              →
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 4,
    width: '100%',
  },
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
  buttonDisabled: {
    backgroundColor: '#EBE7DC',
    elevation: 0,
    shadowOpacity: 0,
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
  buttonTextDisabled: {
    color: '#9CA3AF',
  },
  arrowIcon: {
    color: '#17191C',
    fontSize: 16,
    fontWeight: '800',
    marginLeft: 8,
  },
  arrowIconDisabled: {
    color: '#9CA3AF',
  },
});

export default OnboardingContinueButton;
