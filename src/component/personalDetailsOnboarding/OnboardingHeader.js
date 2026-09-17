import React from 'react';
import {
  Pressable,
  Text,
  View,
} from 'react-native';

/**
 * OnboardingHeader
 * Shared authentication & registration navigation header:
 * - Left: Back arrow (←)
 * - Center: XCAB Master Logo & DRIVER APP
 * - Right: Need Help? action
 */
function OnboardingHeader({
  onBack,
  onNeedHelp,
}) {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 10,
        width: '100%',
      }}>
      {/* 1. Left Back Action */}
      <Pressable
        style={({ pressed }) => [
          {
            alignItems: 'center',
            height: 36,
            justifyContent: 'center',
            width: 36,
          },
          pressed && { opacity: 0.6 },
        ]}
        onPress={onBack}
        hitSlop={{ top: 12, bottom: 12, left: 14, right: 14 }}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Text
          style={{
            color: '#17191C',
            fontSize: 22,
            fontWeight: '700',
          }}>
          ←
        </Text>
      </Pressable>

      {/* 2. Center Brand Logo */}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: '#FFC928',
              fontSize: 30,
              fontWeight: '900',
              letterSpacing: -0.8,
            }}>
            X
          </Text>
          <Text
            style={{
              color: '#17191C',
              fontSize: 30,
              fontWeight: '900',
              letterSpacing: -0.8,
            }}>
            CAB
          </Text>
        </View>
        <Text
          style={{
            color: '#687078',
            fontSize: 8.5,
            fontWeight: '700',
            letterSpacing: 3,
            marginTop: -1,
          }}>
          D R I V E R   A P P
        </Text>
      </View>

      {/* 3. Right Need Help Action */}
      <Pressable
        style={({ pressed }) => [
          {
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingVertical: 4,
          },
          pressed && { opacity: 0.6 },
        ]}
        onPress={onNeedHelp}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        accessibilityRole="button"
        accessibilityLabel="Need help with registration"
      >
        <Text
          style={{
            color: '#374151',
            fontSize: 13,
            fontWeight: '600',
          }}>
          Need Help?
        </Text>
      </Pressable>
    </View>
  );
}

export default OnboardingHeader;
