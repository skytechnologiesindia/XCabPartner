import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * RegistrationProgress
 * Logical 8-step progress indicator with a single clean horizontal progress bar.
 *
 * Visual spec:
 * Step X of 8
 * Completed portion: #FFC928
 * Remaining: #DDD9CF
 */
function RegistrationProgress({ currentStep = 1, totalSteps = 8 }) {
  const percentage = Math.min(Math.max((currentStep / totalSteps) * 100, 5), 100);

  return (
    <View style={styles.container}>
      <View style={styles.trackWrapper}>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${percentage}%` }]} />
        </View>
        <View style={[styles.thumb, { left: `${percentage}%` }]} />
      </View>
      <Text style={styles.stepText}>
        Step {currentStep} of {totalSteps}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 48,
    paddingTop: 4,
    paddingBottom: 8,
    width: '100%',
  },
  trackWrapper: {
    height: 12,
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
  track: {
    backgroundColor: '#C5CCD6',
    borderRadius: 3,
    height: 4,
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    backgroundColor: '#FFC928',
    borderRadius: 3,
    height: '100%',
  },
  thumb: {
    backgroundColor: '#FFC928',
    borderColor: '#FFC928',
    borderRadius: 6,
    height: 12,
    marginLeft: -6,
    position: 'absolute',
    top: 0,
    width: 12,
  },
  stepText: {
    color: '#17191C',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.1,
    marginTop: 6,
    textAlign: 'center',
  },
});

export default RegistrationProgress;
