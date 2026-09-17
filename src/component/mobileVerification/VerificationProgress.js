import React from 'react';
import { StyleSheet, View } from 'react-native';

/**
 * VerificationProgress
 * 3-stage segmented pill indicator:
 * - Phone mode: 1 bar filled (● ○ ○)
 * - OTP mode: 2 bars filled (● ● ○)
 * - Personal details: 3 bars filled (● ● ●)
 */
function VerificationProgress({ step = 1, totalSteps = 3 }) {
  return (
    <View
      style={styles.container}
      accessibilityRole="progressbar"
      accessibilityLabel={`Step ${step} of ${totalSteps}`}
    >
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isFilled = index < step;
        return (
          <View
            key={`step-seg-${index}`}
            style={[
              styles.segment,
              isFilled ? styles.segmentFilled : styles.segmentUnfilled,
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    marginTop: 6,
    marginBottom: 16,
    width: '100%',
  },
  segment: {
    borderRadius: 2,
    height: 3.5,
    width: 54,
  },
  segmentFilled: {
    backgroundColor: '#FFC928',
  },
  segmentUnfilled: {
    backgroundColor: '#DDD9CF',
  },
});

export default VerificationProgress;
