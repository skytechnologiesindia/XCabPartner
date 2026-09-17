import React from 'react';
import { View } from 'react-native';

/**
 * VehicleDocumentsProgress
 * Segmented progress bar matching the reference image:
 * - Step 3 active (Bars 1, 2, 3: Yellow #FFC928, Bar 4: Gray #DDD9CF)
 */
function VehicleDocumentsProgress({
  step = 3,
  totalSteps = 4,
}) {
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
            key={`veh-doc-seg-${index}`}
            style={[
              {
                borderRadius: 2,
                height: 3.5,
                width: 42,
              },
              isFilled
                ? { backgroundColor: '#FFC928' }
                : { backgroundColor: '#DDD9CF' },
            ]}
          />
        );
      })}
    </View>
  );
}

export default VehicleDocumentsProgress;
