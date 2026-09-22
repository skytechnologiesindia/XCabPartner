import React from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

/**
 * OnboardingHeader
 * Common header across all onboarding and registration screens.
 * ←    XCAB DRIVER APP    Need Help?
 */
function OnboardingHeader({
  onBack,
  onNeedHelp,
  showBack = true,
  showHelp = true,
}) {
  const defaultNeedHelp = () => {
    Alert.alert(
      'XCAB Partner Support',
      'Need assistance with your registration or document verification?\n\nCall our 24/7 Driver Helpline at 1800-247-XCAB (9222).',
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  return (
    <View style={styles.container}>
      {/* 1. Left Action / Back */}
      <View style={styles.actionLeft}>
        {showBack ? (
          <Pressable
            style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.6 }]}
            onPress={onBack}
            hitSlop={{ top: 12, bottom: 12, left: 14, right: 14 }}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text style={styles.backIcon}>←</Text>
          </Pressable>
        ) : null}
      </View>

      {/* 2. Center Brand Logo */}
      <View style={styles.brandContainer}>
        <View style={styles.logoRow}>
          <Text style={styles.logoYellow}>X</Text>
          <Text style={styles.logoDark}>CAB</Text>
        </View>
        <Text style={styles.driverAppText}>
          D R I V E R   A P P
        </Text>
      </View>

      {/* 3. Right Need Help Action */}
      <View style={styles.actionRight}>
        {showHelp ? (
          <Pressable
            style={({ pressed }) => [styles.helpButton, pressed && { opacity: 0.6 }]}
            onPress={onNeedHelp || defaultNeedHelp}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityRole="button"
            accessibilityLabel="Need help with registration"
          >
            <Text style={styles.helpText}>Need Help?</Text>
          </Pressable>
        ) : null}
      </View>
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
  actionLeft: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 60,
  },
  backButton: {
    alignItems: 'center',
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  backIcon: {
    color: '#17191C',
    fontSize: 22,
    fontWeight: '700',
  },
  brandContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  logoRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  logoYellow: {
    color: '#FFC928',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.8,
  },
  logoDark: {
    color: '#17191C',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.8,
  },
  driverAppText: {
    color: '#687078',
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 2.6,
    marginTop: -1,
  },
  actionRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: 80,
  },
  helpButton: {
    paddingVertical: 4,
  },
  helpText: {
    color: '#374151',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default OnboardingHeader;
