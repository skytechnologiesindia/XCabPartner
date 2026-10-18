import React from 'react';
import {
  Text,
  View,
} from 'react-native';

/**
 * CountryCodeSelector
 * Displays the dialing code followed by a subtle vertical divider.
 */
function CountryCodeSelector({
  countryCode = '+91',
}) {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        height: '100%',
        paddingLeft: 16,
      }}>
      {/* Dialing Code */}
      <Text
        style={{
          color: '#17191C',
          fontSize: 16,
          fontWeight: '700',
          letterSpacing: -0.2,
          marginRight: 4,
        }}>
        {countryCode}
      </Text>

      {/* Vertical Divider */}
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
