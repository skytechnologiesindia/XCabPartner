import React from 'react';
import {
  ActivityIndicator,
  Pressable,
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
    <View
      style={{
        paddingHorizontal: 20,
        marginTop: 4,
        width: '100%',
      }}>
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
        onPress={onPress}
        disabled={isDisabled || isLoading}
        accessibilityRole="button"
        accessibilityLabel={`${label} to Vehicle Details`}
      >
        {isLoading ? (
          <ActivityIndicator color="#17191C" size="small" />
        ) : (
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
              {label}
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
        )}
      </Pressable>
    </View>
  );
}

export default OnboardingContinueButton;
