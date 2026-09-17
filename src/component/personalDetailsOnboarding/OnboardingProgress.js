import React from 'react';
import { StyleSheet, View } from 'react-native';

/**
 * OnboardingProgress
 * Segmented progress bar matching the Mobile + OTP screen:
 * - Step 2 of 3 filled (Bar 1: Yellow, Bar 2: Yellow, Bar 3: Gray)
 */
function OnboardingProgress({
  step = 2,
  totalSteps = 3,
}) {
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
            key={`onboarding-seg-${index}`}
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

export default OnboardingProgress;
