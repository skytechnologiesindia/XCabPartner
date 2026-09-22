import React from 'react';
import {
  Pressable,
  Text,
  View,
} from 'react-native';

/**
 * CountryCodeSelector
 * Displays country flag, dropdown chevron, and dialing code separated by subtle vertical dividers.
 */
function CountryCodeSelector({
  countryFlag = '🇮🇳',
  countryCode = '+91',
  onPress,
}) {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        height: '100%',
        paddingLeft: 12,
      }}>
      {/* Flag + Chevron */}
      <Pressable
        style={({ pressed }) => [
          {
            alignItems: 'center',
            flexDirection: 'row',
            paddingRight: 8,
          },
          pressed && { opacity: 0.7 },
        ]}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`Country ${countryFlag}, code ${countryCode}`}
      >
        <Text
          style={{
            fontSize: 20,
            marginRight: 4,
          }}>
          {countryFlag}
        </Text>
        <Text
          style={{
            color: '#17191C',
            fontSize: 14,
            fontWeight: '700',
            marginTop: -4,
          }}>
          ⌄
        </Text>
      </Pressable>

      {/* Vertical Divider 1 */}
      <View
        style={{
          backgroundColor: '#E5E2D8',
          height: 24,
          marginHorizontal: 8,
          width: 1,
        }}
      />

      {/* Dialing Code */}
      <Text
        style={{
          color: '#17191C',
          fontSize: 15,
          fontWeight: '700',
          letterSpacing: -0.2,
          marginHorizontal: 4,
        }}>
        {countryCode}
      </Text>

      {/* Vertical Divider 2 */}
      <View
        style={{
          backgroundColor: '#E5E2D8',
          height: 24,
          marginHorizontal: 8,
          width: 1,
        }}
      />
    </View>
  );
}

export default CountryCodeSelector;
