import React from 'react';
import {
  Pressable,
  StyleSheet,
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
    <View style={styles.container}>
      {/* Flag + Chevron */}
      <Pressable
        style={({ pressed }) => [
          styles.flagRow,
          pressed && styles.pressed,
        ]}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`Country ${countryFlag}, code ${countryCode}`}
      >
        <Text style={styles.flagText}>{countryFlag}</Text>
        <Text style={styles.chevronIcon}>⌄</Text>
      </Pressable>

      {/* Vertical Divider 1 */}
      <View style={styles.divider} />

      {/* Dialing Code */}
      <Text style={styles.codeText}>{countryCode}</Text>

      {/* Vertical Divider 2 */}
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    paddingLeft: 12,
  },
  flagRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 8,
  },
  pressed: {
    opacity: 0.7,
  },
  flagText: {
    fontSize: 20,
    marginRight: 4,
  },
  chevronIcon: {
    color: '#17191C',
    fontSize: 14,
    fontWeight: '700',
    marginTop: -4,
  },
  divider: {
    backgroundColor: '#E5E2D8',
    height: 24,
    marginHorizontal: 8,
    width: 1,
  },
  codeText: {
    color: '#17191C',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
    marginHorizontal: 4,
  },
});

export default CountryCodeSelector;
