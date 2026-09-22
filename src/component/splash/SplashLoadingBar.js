import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Text,
  View,
} from 'react-native';

const TRACK_WIDTH = 140;

/**
 * SplashLoadingBar
 * Minimalist, animated progress bar with smooth timing and "Loading..." status text.
 */
function SplashLoadingBar({
  duration = 2400,
  onComplete,
}) {
  const animatedProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: 1,
      duration,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished && onComplete) {
        onComplete();
      }
    });
  }, [animatedProgress, duration, onComplete]);

  const fillWidth = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, TRACK_WIDTH],
  });

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 14,
      }}
    >
      {/* 1. Progress Bar Track */}
      <View
        style={{
          backgroundColor: '#ECEAE2',
          borderRadius: 2.5,
          height: 4.5,
          overflow: 'hidden',
          width: TRACK_WIDTH,
        }}
      >
        <Animated.View
          style={{
            backgroundColor: '#FFC928',
            borderRadius: 2.5,
            height: '100%',
            width: fillWidth,
          }}
        />
      </View>

      {/* 2. Status Label */}
      <Text
        style={{
          color: '#7A828A',
          fontSize: 12,
          fontWeight: '500',
          letterSpacing: 0.2,
          marginTop: 8,
        }}
      >
        Loading...
      </Text>
    </View>
  );
}

export default SplashLoadingBar;
