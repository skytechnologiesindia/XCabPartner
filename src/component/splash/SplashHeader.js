import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * SplashHeader
 * Prominent branding header displaying:
 * - Top-left golden decorative arc
 * - Top-right "Miles Create Opportunities" tagline
 * - XCAB logo with yellow 'X' and dark charcoal 'CAB'
 * - 'DRIVER APP' spaced subtitle
 * - 'Drive Today' and 'A Better Tomorrow' headlines
 * - 'More Rides • Fair Earnings • Safer Roads' supporting line
 */
function SplashHeader() {
  return (
    <View style={styles.container}>
      {/* 1. Subtle decorative golden arc in background */}
      <View pointerEvents="none" style={styles.decorArc} />

      {/* 2. Top-right tagline */}
      <View style={styles.topRightBadge}>
        <Text style={styles.topRightText}>Miles{'\n'}Create{'\n'}Opportunities</Text>
        <View style={styles.topRightBar} />
      </View>

      {/* 3. XCAB Master Logo */}
      <View style={styles.brandBlock}>
        <View style={styles.logoRow}>
          <Text style={styles.logoX}>X</Text>
          <Text style={styles.logoCab}>CAB</Text>
        </View>
        <Text style={styles.driverAppText}>D R I V E R   A P P</Text>
      </View>

      {/* 4. Core Message */}
      <View style={styles.messageBlock}>
        <Text style={styles.headlineDark}>Drive Today</Text>
        <Text style={styles.headlineYellow}>A Better Tomorrow</Text>
        <Text style={styles.supportLine}>
          More Rides  •  Fair Earnings  •  Safer Roads
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 12,
    position: 'relative',
    width: '100%',
  },
  decorArc: {
    borderColor: 'rgba(255, 201, 40, 0.22)',
    borderRadius: 140,
    borderWidth: 22,
    height: 200,
    left: -70,
    position: 'absolute',
    top: -60,
    width: 200,
  },
  topRightBadge: {
    alignItems: 'flex-end',
    position: 'absolute',
    right: 20,
    top: 10,
  },
  topRightText: {
    color: '#7A828A',
    fontSize: 10.5,
    fontWeight: '500',
    lineHeight: 13.5,
    textAlign: 'right',
  },
  topRightBar: {
    backgroundColor: '#FFC928',
    borderRadius: 1.5,
    height: 2.5,
    marginTop: 4,
    width: 22,
  },
  brandBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  logoRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  logoX: {
    color: '#FFC928',
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: -1,
  },
  logoCab: {
    color: '#17191C',
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: -1,
  },
  driverAppText: {
    color: '#687078',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 4.5,
    marginTop: 2,
  },
  messageBlock: {
    alignItems: 'center',
    marginTop: 16,
  },
  headlineDark: {
    color: '#17191C',
    fontSize: 27,
    fontWeight: '900',
    letterSpacing: -0.6,
    lineHeight: 32,
    textAlign: 'center',
  },
  headlineYellow: {
    color: '#FFC928',
    fontSize: 27,
    fontWeight: '900',
    letterSpacing: -0.6,
    lineHeight: 32,
    textAlign: 'center',
  },
  supportLine: {
    color: '#687078',
    fontSize: 12.5,
    fontWeight: '500',
    letterSpacing: 0.2,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default SplashHeader;
