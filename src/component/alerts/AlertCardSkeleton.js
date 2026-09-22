import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

/**
 * AlertCardSkeleton
 * Exact-dimension skeleton loading placeholder for individual AlertCard components.
 * Pure inline CSS styles with smooth pulsing shimmer animation.
 */
function AlertCardSkeleton() {
  const pulseAnim = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.85,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.35,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  return (
    <View
      style={{
        alignItems: 'flex-start',
        backgroundColor: '#FFFFFF',
        borderColor: '#EFECE6',
        borderRadius: 20,
        borderWidth: 1,
        flexDirection: 'row',
        marginBottom: 12,
        paddingHorizontal: 16,
        paddingVertical: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 1.5,
      }}
    >
      {/* 1. Left Icon Accent Circle */}
      <View style={{ marginRight: 12, marginTop: 4 }}>
        <Animated.View
          style={{
            backgroundColor: '#F4F2EB',
            borderRadius: 22,
            height: 44,
            opacity: pulseAnim,
            width: 44,
          }}
        />
      </View>

      {/* 2. Center Content Column */}
      <View style={{ flex: 1, paddingRight: 4 }}>
        {/* Title */}
        <Animated.View
          style={{
            backgroundColor: '#DCD7CB',
            borderRadius: 4,
            height: 15,
            opacity: pulseAnim,
            width: '75%',
          }}
        />

        {/* Subtitle */}
        <Animated.View
          style={{
            backgroundColor: '#ECE8DF',
            borderRadius: 4,
            height: 13,
            marginTop: 7,
            opacity: pulseAnim,
            width: '90%',
          }}
        />

        {/* Details / Route bullet points */}
        <View style={{ gap: 6, marginTop: 10 }}>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <View
              style={{
                backgroundColor: '#FFC928',
                borderRadius: 3,
                height: 6,
                marginRight: 8,
                opacity: 0.6,
                width: 6,
              }}
            />
            <Animated.View
              style={{
                backgroundColor: '#F0ECE1',
                borderRadius: 3,
                height: 11,
                opacity: pulseAnim,
                width: '65%',
              }}
            />
          </View>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <View
              style={{
                backgroundColor: '#F26B5B',
                borderRadius: 3,
                height: 6,
                marginRight: 8,
                opacity: 0.5,
                width: 6,
              }}
            />
            <Animated.View
              style={{
                backgroundColor: '#F0ECE1',
                borderRadius: 3,
                height: 11,
                opacity: pulseAnim,
                width: '50%',
              }}
            />
          </View>
        </View>
      </View>

      {/* 3. Right: Time & Chevron Circle */}
      <View
        style={{
          alignItems: 'flex-end',
          alignSelf: 'stretch',
          justifyContent: 'space-between',
          marginLeft: 8,
          minHeight: 64,
          paddingTop: 4,
        }}
      >
        <Animated.View
          style={{
            backgroundColor: '#ECE8DF',
            borderRadius: 4,
            height: 12,
            opacity: pulseAnim,
            width: 48,
          }}
        />

        <Animated.View
          style={{
            backgroundColor: '#F4F2EB',
            borderRadius: 16,
            height: 32,
            opacity: pulseAnim,
            width: 32,
          }}
        />
      </View>
    </View>
  );
}

export default AlertCardSkeleton;
