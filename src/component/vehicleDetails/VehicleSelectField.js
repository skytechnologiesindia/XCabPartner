import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

/**
 * VehicleSelectField
 * Dropdown selector field matching the exact reference card design:
 * - Left icon (🚗, 🏢, 📅, 🎨)
 * - Stacked label & selected value
 * - Right chevron dropdown arrow (⌄)
 */
function VehicleSelectField({
  label,
  value,
  icon,
  onPress,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.containerPressed,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label}: ${value}`}
    >
      {/* Left Icon */}
      <View style={styles.iconWrapper}>
        <Text style={styles.iconText}>{icon}</Text>
      </View>

      {/* Stacked Label & Selected Value */}
      <View style={styles.contentColumn}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value} numberOfLines={1}>
          {value || `Select ${label}`}
        </Text>
      </View>

      {/* Right Chevron */}
      <View style={styles.chevronWrapper}>
        <Text style={styles.chevron}>⌄</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#DDD9CF',
    borderRadius: 14,
    borderWidth: 1.5,
    flexDirection: 'row',
    height: 58,
    marginBottom: 12,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
    width: '100%',
  },
  containerPressed: {
    backgroundColor: '#FAF8F1',
    borderColor: '#CCC8BD',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    width: 24,
  },
  iconText: {
    color: '#687078',
    fontSize: 18,
  },
  contentColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    color: '#687078',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.1,
    marginBottom: 2,
  },
  value: {
    color: '#17191C',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  chevronWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
  },
  chevron: {
    color: '#687078',
    fontSize: 16,
    fontWeight: '700',
    marginTop: -4,
  },
});

export default VehicleSelectField;
