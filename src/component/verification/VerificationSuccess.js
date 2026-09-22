import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { approvalBenefits } from './verificationData';

/**
 * VerificationSuccess
 * Approved Driver Badge and Benefits Display for "You're Approved!" screen
 */
function VerificationSuccess() {
  return (
    <View style={styles.container}>
      {/* Large Green Check Badge */}
      <View style={styles.badgeCircle}>
        <Text style={styles.badgeCheck}>✓</Text>
      </View>

      <Text style={styles.title}>You’re Approved!</Text>
      <Text style={styles.subtitle}>
        Your account has been verified. You’re all set to start driving with XCAB.
      </Text>

      {/* Benefits Card */}
      <View style={styles.benefitsCard}>
        {approvalBenefits.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.benefitRow,
              index === approvalBenefits.length - 1 && styles.benefitRowLast,
            ]}
          >
            <View style={styles.benefitIconBox}>
              <Text style={styles.benefitCheck}>✓</Text>
            </View>
            <View style={styles.benefitTextBox}>
              <Text style={styles.benefitTitle}>{item.title}</Text>
              <Text style={styles.benefitSubtitle}>{item.subtitle}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  badgeCircle: {
    alignItems: 'center',
    backgroundColor: '#18A66A',
    borderRadius: 45,
    elevation: 4,
    height: 90,
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10,
    shadowColor: '#18A66A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    width: 90,
  },
  badgeCheck: {
    color: '#FFFFFF',
    fontSize: 44,
    fontWeight: '900',
  },
  title: {
    color: '#17191C',
    fontSize: 27,
    fontWeight: '900',
    letterSpacing: -0.6,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    color: '#687078',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: 24,
    textAlign: 'center',
  },
  benefitsCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DDD9CF',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '100%',
  },
  benefitRow: {
    alignItems: 'flex-start',
    borderBottomColor: '#F1EEE5',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: 14,
  },
  benefitRowLast: {
    borderBottomWidth: 0,
  },
  benefitIconBox: {
    alignItems: 'center',
    backgroundColor: '#DDF5E9',
    borderRadius: 12,
    height: 24,
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
    width: 24,
  },
  benefitCheck: {
    color: '#18A66A',
    fontSize: 14,
    fontWeight: '900',
  },
  benefitTextBox: {
    flex: 1,
  },
  benefitTitle: {
    color: '#17191C',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 2,
  },
  benefitSubtitle: {
    color: '#687078',
    fontSize: 12,
    lineHeight: 16,
  },
});

export default VerificationSuccess;
