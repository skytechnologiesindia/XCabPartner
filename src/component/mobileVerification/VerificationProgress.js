import React from 'react';
import { View } from 'react-native';

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
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'center',
        marginTop: 6,
        marginBottom: 16,
        width: '100%',
      }}
      accessibilityRole="progressbar"
      accessibilityLabel={`Step ${step} of ${totalSteps}`}
    >
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isFilled = index < step;
        return (
          <View
            key={`step-seg-${index}`}
            style={{
              backgroundColor: isFilled ? '#FFC928' : '#DDD9CF',
              borderRadius: 2,
              height: 3.5,
              width: 54,
            }}
          />
        );
      })}
    </View>
  );
}

export default VerificationProgress;
