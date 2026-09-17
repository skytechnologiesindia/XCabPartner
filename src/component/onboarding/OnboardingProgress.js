import React from 'react';
import { Pressable, View } from 'react-native';

/**
 * OnboardingProgress
 * Minimal dot pagination indicator tracking current onboarding slide position.
 * Supports optional onSelectDot callback for direct slide navigation.
 */
function OnboardingProgress({
  total = 2,
  current = 0,
  onSelectDot,
}) {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'center',
        marginVertical: 18,
      }}
      accessibilityRole="progressbar"
      accessibilityLabel={`Step ${current + 1} of ${total}`}
    >
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === current;
        return (
          <Pressable
            key={`dot-${index}`}
            onPress={() => onSelectDot && onSelectDot(index)}
            disabled={!onSelectDot}
            hitSlop={{ top: 12, bottom: 12, left: 8, right: 8 }}
            accessibilityRole="button"
            accessibilityLabel={`Go to slide ${index + 1}`}
          >
            <View
              style={[
                {
                  borderRadius: 4,
                  height: 8,
                  width: 8,
                  backgroundColor: '#DDD9CF',
                },
                isActive && {
                  backgroundColor: '#FFC928',
                  transform: [{ scale: 1.15 }],
                },
              ]}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

export default OnboardingProgress;
