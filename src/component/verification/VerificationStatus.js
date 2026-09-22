import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

/**
 * VerificationStatus
 * Header card for "Under Verification" screen
 */
function VerificationStatus() {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>🔍</Text>
      </View>

      <Text style={styles.title}>Under Verification</Text>
      <Text style={styles.description}>
        We’re verifying your details and documents. This usually takes less than 24 hours.
      </Text>

      <View style={styles.banner}>
        <Text style={styles.bannerIcon}>ℹ️</Text>
        <Text style={styles.bannerText}>
          We’ll notify you once your account is verified. You cannot go online until verification is complete.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  iconCircle: {
    alignItems: 'center',
    backgroundColor: '#FFF4C7',
    borderRadius: 36,
    height: 72,
    justifyContent: 'center',
    marginBottom: 16,
    width: 72,
  },
  icon: {
    fontSize: 34,
  },
  title: {
    color: '#17191C',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.5,
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    color: '#687078',
    fontSize: 13.5,
    fontWeight: '500',
    lineHeight: 20,
    textAlign: 'center',
  },
  banner: {
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    width: '100%',
  },
  bannerIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  bannerText: {
    color: '#92400E',
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 17,
  },
});

export default VerificationStatus;
