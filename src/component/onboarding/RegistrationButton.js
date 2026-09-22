import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

/**
 * RegistrationButton
 * Canonical Continue CTA button for the XCAB Driver App registration flow.
 * Supports disabled, loading, custom label, and right arrow indicator.
 */
function RegistrationButton({
  label = 'Continue',
  onPress,
  isDisabled = false,
  isLoading = false,
  showArrow = true,
  style,
}) {
  return (
    <View style={[styles.wrapper, style]}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          isDisabled && styles.buttonDisabled,
          pressed && !isDisabled && !isLoading && styles.buttonPressed,
        ]}
        onPress={onPress}
        disabled={isDisabled || isLoading}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ disabled: isDisabled, busy: isLoading }}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#17191C" />
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
            {showArrow ? (
              <Text
                style={[
                  styles.arrowIcon,
                  isDisabled && styles.arrowIconDisabled,
                ]}
              >
                →
              </Text>
            ) : null}
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    width: '100%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#FFC928',
    borderRadius: 8,
    elevation: 2,
    height: 52,
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    width: '100%',
  },
  buttonPressed: {
    backgroundColor: '#E5B422',
    transform: [{ scale: 0.99 }],
  },
  buttonDisabled: {
    backgroundColor: '#EBE8DF',
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
    letterSpacing: 0.2,
  },
  buttonTextDisabled: {
    color: '#A2A5A8',
  },
  arrowIcon: {
    color: '#17191C',
    fontSize: 18,
    fontWeight: '800',
    marginLeft: 8,
  },
  arrowIconDisabled: {
    color: '#A2A5A8',
  },
});

export default RegistrationButton;
