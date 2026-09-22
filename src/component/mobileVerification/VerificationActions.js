import React from 'react';
import {
  Pressable,
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
    <View
      style={{
        alignItems: 'center',
        marginTop: 18,
        paddingHorizontal: 20,
        width: '100%',
      }}>
      {/* 1. Primary Action CTA */}
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
          isDisabled && {
            backgroundColor: '#EBE7DC',
            elevation: 0,
            shadowOpacity: 0,
          },
          !isDisabled &&
            pressed && {
              backgroundColor: '#F5BE18',
              transform: [{ scale: 0.99 }],
            },
        ]}
        onPress={onPrimaryPress}
        disabled={isDisabled}
        accessibilityRole="button"
        accessibilityLabel={buttonLabel}
      >
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text
            style={[
              {
                color: '#17191C',
                fontSize: 16,
                fontWeight: '800',
                letterSpacing: -0.2,
              },
              isDisabled && { color: '#9CA3AF' },
            ]}
          >
            {buttonLabel}
          </Text>
          <Text
            style={[
              {
                color: '#17191C',
                fontSize: 16,
                fontWeight: '800',
                marginLeft: 8,
              },
              isDisabled && { color: '#9CA3AF' },
            ]}
          >
            →
          </Text>
        </View>
      </Pressable>

      {/* 2. Secondary Sub-Action */}
      {isPhoneMode ? (
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 12,
          }}>
          <Text
            style={{
              fontSize: 12,
              marginRight: 6,
            }}>
            🔒
          </Text>
          <Text
            style={{
              color: '#687078',
              fontSize: 12.5,
              fontWeight: '400',
            }}>
            Your number is safe with us.
          </Text>
        </View>
      ) : (
        <Pressable
          style={({ pressed }) => [
            {
              marginTop: 14,
              paddingVertical: 4,
            },
            pressed && { opacity: 0.6 },
          ]}
          onPress={onChangeNumber}
          hitSlop={{ top: 10, bottom: 10, left: 14, right: 14 }}
          accessibilityRole="button"
          accessibilityLabel="Change phone number"
        >
          <Text
            style={{
              color: '#0284C7',
              fontSize: 14.5,
              fontWeight: '700',
            }}>
            Change Number
          </Text>
        </Pressable>
      )}
    </View>
  );
}

export default VerificationActions;
