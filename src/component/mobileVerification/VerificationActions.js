import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

/**
 * VerificationActions
 * Primary CTA and secondary helpers tailored for Phone and OTP verification states:
 * - Phone mode: "Send OTP →" button + "🔒 Your number is safe with us."
 * - OTP mode: "Verify & Continue →" button + "Change Number" link
 */
function VerificationActions({
  mode = 'phone',
  isDisabled = false,
  onPrimaryPress,
  onChangeNumber,
}) {
  const isPhoneMode = mode === 'phone';
  const buttonLabel = isPhoneMode ? 'Send OTP' : 'Verify & Continue';

  return (
    <View style={styles.container}>
      {/* 1. Primary Action CTA */}
      <Pressable
        style={({ pressed }) => [
          styles.primaryButton,
          isDisabled && styles.primaryButtonDisabled,
          !isDisabled && pressed && styles.primaryButtonPressed,
        ]}
        onPress={onPrimaryPress}
        disabled={isDisabled}
        accessibilityRole="button"
        accessibilityLabel={buttonLabel}
      >
        <View style={styles.buttonContent}>
          <Text
            style={[
              styles.buttonText,
              isDisabled && styles.buttonTextDisabled,
            ]}
          >
            {buttonLabel}
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
      </Pressable>

      {/* 2. Secondary Sub-Action */}
      {isPhoneMode ? (
        <View style={styles.privacyRow}>
          <Text style={styles.lockIcon}>🔒</Text>
          <Text style={styles.privacyText}>
            Your number is safe with us.
          </Text>
        </View>
      ) : (
        <Pressable
          style={({ pressed }) => [
            styles.changeNumberButton,
            pressed && styles.pressed,
          ]}
          onPress={onChangeNumber}
          hitSlop={{ top: 10, bottom: 10, left: 14, right: 14 }}
          accessibilityRole="button"
          accessibilityLabel="Change phone number"
        >
          <Text style={styles.changeNumberText}>Change Number</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 18,
    paddingHorizontal: 20,
    width: '100%',
  },
  primaryButton: {
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
  primaryButtonPressed: {
    backgroundColor: '#F5BE18',
    transform: [{ scale: 0.99 }],
  },
  primaryButtonDisabled: {
    backgroundColor: '#EBE7DC',
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonContent: {
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
  privacyRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  lockIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  privacyText: {
    color: '#687078',
    fontSize: 12.5,
    fontWeight: '400',
  },
  changeNumberButton: {
    marginTop: 14,
    paddingVertical: 4,
  },
  pressed: {
    opacity: 0.6,
  },
  changeNumberText: {
    color: '#0284C7',
    fontSize: 14.5,
    fontWeight: '700',
  },
});

export default VerificationActions;
