import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

/**
 * RideCardSkeleton
 * Exact-dimension skeleton loading placeholder for individual RideCard components.
 * Pure inline CSS styles with smooth pulsing shimmer animation.
 */
function RideCardSkeleton() {
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
        backgroundColor: '#FFFFFF',
        borderColor: '#E6E2D8',
        borderRadius: 18,
        borderWidth: 1,
        marginBottom: 14,
        padding: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      {/* 1. Top: Route & Fare Section */}
      <View
        style={{
          alignItems: 'flex-start',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {/* Route Points */}
        <View style={{ flex: 1, flexDirection: 'row', marginRight: 12 }}>
          {/* Node indicator icons */}
          <View
            style={{
              alignItems: 'center',
              marginRight: 10,
              paddingTop: 3,
              width: 14,
            }}
          >
            {/* Pickup Dot */}
            <View
              style={{
                backgroundColor: '#FFC928',
                borderRadius: 5,
                height: 10,
                opacity: 0.6,
                width: 10,
              }}
            />
            {/* Dashed route line */}
            <View
              style={{
                backgroundColor: '#E6E2D8',
                borderRadius: 1,
                height: 24,
                marginVertical: 4,
                width: 2,
              }}
            />
            {/* Drop Square */}
            <View
              style={{
                backgroundColor: '#17191C',
                borderRadius: 2,
                height: 9,
                opacity: 0.4,
                width: 9,
              }}
            />
          </View>

          {/* Route text placeholders */}
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            {/* Pickup */}
            <View>
              <Animated.View
                style={{
                  backgroundColor: '#DCD7CB',
                  borderRadius: 4,
                  height: 14,
                  opacity: pulseAnim,
                  width: '70%',
                }}
              />
              <Animated.View
                style={{
                  backgroundColor: '#ECE8DF',
                  borderRadius: 3,
                  height: 10,
                  marginTop: 4,
                  opacity: pulseAnim,
                  width: '40%',
                }}
              />
            </View>

            {/* Drop */}
            <View style={{ marginTop: 10 }}>
              <Animated.View
                style={{
                  backgroundColor: '#DCD7CB',
                  borderRadius: 4,
                  height: 14,
                  opacity: pulseAnim,
                  width: '80%',
                }}
              />
              <Animated.View
                style={{
                  backgroundColor: '#ECE8DF',
                  borderRadius: 3,
                  height: 10,
                  marginTop: 4,
                  opacity: pulseAnim,
                  width: '45%',
                }}
              />
            </View>
          </View>
        </View>

        {/* Fare & Method Block */}
        <View style={{ alignItems: 'flex-end', minWidth: 64 }}>
          <Animated.View
            style={{
              backgroundColor: '#DCD7CB',
              borderRadius: 4,
              height: 18,
              opacity: pulseAnim,
              width: 58,
            }}
          />
          <Animated.View
            style={{
              backgroundColor: '#ECE8DF',
              borderRadius: 4,
              height: 12,
              marginTop: 5,
              opacity: pulseAnim,
              width: 44,
            }}
          />
        </View>
      </View>

      {/* 2. Middle: Metadata Chips + Status Badge */}
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 14,
        }}
      >
        <View style={{ flexDirection: 'row', gap: 6 }}>
          <Animated.View
            style={{
              backgroundColor: '#F2EFEB',
              borderRadius: 6,
              height: 22,
              opacity: pulseAnim,
              width: 55,
            }}
          />
          <Animated.View
            style={{
              backgroundColor: '#F2EFEB',
              borderRadius: 6,
              height: 22,
              opacity: pulseAnim,
              width: 55,
            }}
          />
          <Animated.View
            style={{
              backgroundColor: '#F2EFEB',
              borderRadius: 6,
              height: 22,
              opacity: pulseAnim,
              width: 65,
            }}
          />
        </View>

        <Animated.View
          style={{
            backgroundColor: '#F0ECE1',
            borderRadius: 12,
            height: 22,
            opacity: pulseAnim,
            width: 78,
          }}
        />
      </View>

      {/* 3. Bottom Bar: Trip ID & View Details CTA */}
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#F4F2EB',
          borderRadius: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 12,
          paddingHorizontal: 12,
          paddingVertical: 7,
        }}
      >
        <Animated.View
          style={{
            backgroundColor: '#DDD8CC',
            borderRadius: 3,
            height: 12,
            opacity: pulseAnim,
            width: 85,
          }}
        />

        <Animated.View
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#DDD9CF',
            borderRadius: 6,
            borderWidth: 1,
            height: 24,
            opacity: pulseAnim,
            width: 82,
          }}
        />
      </View>
    </View>
  );
}

export default RideCardSkeleton;
