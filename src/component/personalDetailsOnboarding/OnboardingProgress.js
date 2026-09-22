import React from 'react';
import { Text, View } from 'react-native';

/**
 * OnboardingProgress
 * Clean, single-line onboarding step indicator:
 * - Top text: "Step {step} of {totalSteps}"
 * - Single thin horizontal progress bar with current position marker
 */
function OnboardingProgress({
  step = 3,
  totalSteps = 7,
}) {
  const percentage = Math.min(100, Math.max(0, (step / totalSteps) * 100));

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
        marginBottom: 14,
        paddingHorizontal: 32,
        width: '100%',
      }}
      accessibilityRole="progressbar"
      accessibilityLabel={`Step ${step} of ${totalSteps}`}
    >
      {/* 1. Step Indicator Text */}
      <Text
        style={{
          color: '#525960',
          fontSize: 12,
          fontWeight: '700',
          letterSpacing: 0.2,
          marginBottom: 6,
        }}
      >
        Step {step} of {totalSteps}
      </Text>

      {/* 2. Single Continuous Progress Line with Marker */}
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          height: 12,
          justifyContent: 'flex-start',
          position: 'relative',
          width: '100%',
        }}
      >
        {/* Background Track (Remaining portion) */}
        <View
          style={{
            backgroundColor: '#DDD9CF',
            borderRadius: 2,
            height: 3.5,
            width: '100%',
          }}
        />

        {/* Completed portion (XCAB Yellow) */}
        <View
          style={{
            backgroundColor: '#FFC928',
            borderRadius: 2,
            height: 3.5,
            left: 0,
            position: 'absolute',
            top: 4.25,
            width: `${percentage}%`,
          }}
        />

        {/* Small Current-Position Marker */}
        <View
          style={{
            backgroundColor: '#FFC928',
            borderColor: '#F7F5EF',
            borderRadius: 5,
            borderWidth: 1.5,
            height: 10,
            left: `${percentage}%`,
            marginLeft: -5,
            position: 'absolute',
            top: 1,
            width: 10,
          }}
        />
      </View>
    </View>
  );
}

export default OnboardingProgress;

