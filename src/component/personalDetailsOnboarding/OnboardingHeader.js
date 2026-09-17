import React from 'react';
import {
  Pressable,
  StyleSheet,
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
    <View style={styles.container}>
      {/* 1. Left Back Action */}
      <Pressable
        style={({ pressed }) => [
          styles.iconButton,
          pressed && styles.buttonPressed,
        ]}
        onPress={onBack}
        hitSlop={{ top: 12, bottom: 12, left: 14, right: 14 }}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Text style={styles.backArrow}>←</Text>
      </Pressable>

      {/* 2. Center Brand Logo */}
      <View style={styles.centerBrand}>
        <View style={styles.logoRow}>
          <Text style={styles.logoX}>X</Text>
          <Text style={styles.logoCab}>CAB</Text>
        </View>
        <Text style={styles.driverAppText}>D R I V E R   A P P</Text>
      </View>

      {/* 3. Right Need Help Action */}
      <Pressable
        style={({ pressed }) => [
          styles.helpButton,
          pressed && styles.buttonPressed,
        ]}
        onPress={onNeedHelp}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        accessibilityRole="button"
        accessibilityLabel="Need help with registration"
      >
        <Text style={styles.helpText}>Need Help?</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    width: '100%',
  },
  iconButton: {
    alignItems: 'center',
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  buttonPressed: {
    opacity: 0.6,
  },
  backArrow: {
    color: '#17191C',
    fontSize: 22,
    fontWeight: '700',
  },
  centerBrand: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  logoX: {
    color: '#FFC928',
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -0.8,
  },
  logoCab: {
    color: '#17191C',
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -0.8,
  },
  driverAppText: {
    color: '#687078',
    fontSize: 8.5,
    fontWeight: '700',
    letterSpacing: 3,
    marginTop: -1,
  },
  helpButton: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  helpText: {
    color: '#374151',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default OnboardingHeader;
