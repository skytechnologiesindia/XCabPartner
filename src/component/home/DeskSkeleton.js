import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

/**
 * DeskSkeleton / HomeSkeleton
 * Exact-dimension skeleton loading placeholder for the Desk/HomeScreen.
 * Pure inline CSS styles with smooth pulsing animation.
 */
function DeskSkeleton() {
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
    <View style={{ flex: 1 }}>
      {/* 1. Ready / Online Status Card Skeleton */}
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#FAF8F1',
          borderColor: '#ECE7DB',
          borderRadius: 20,
          borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 8,
          marginHorizontal: 16,
          marginTop: 4,
          paddingHorizontal: 14,
          paddingVertical: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.04,
          shadowRadius: 3,
          elevation: 1,
        }}
      >
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            flexDirection: 'row',
            marginRight: 10,
          }}
        >
          {/* Indicator circle */}
          <Animated.View
            style={{
              backgroundColor: '#D1EAD8',
              borderRadius: 17,
              height: 34,
              opacity: pulseAnim,
              width: 34,
            }}
          />
          {/* Text lines */}
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Animated.View
              style={{
                backgroundColor: '#DDD8CB',
                borderRadius: 4,
                height: 14,
                opacity: pulseAnim,
                width: 100,
              }}
            />
            <Animated.View
              style={{
                backgroundColor: '#EBE7DC',
                borderRadius: 3,
                height: 10,
                marginTop: 4,
                opacity: pulseAnim,
                width: 170,
              }}
            />
          </View>
        </View>

        {/* Go Offline / Online Button */}
        <Animated.View
          style={{
            backgroundColor: '#F5E49F',
            borderRadius: 14,
            height: 38,
            opacity: pulseAnim,
            width: 110,
          }}
        />
      </View>

      {/* 2. Large Dark Map Skeleton Silhouette */}
      <View
        style={{
          backgroundColor: '#1C262E',
          borderColor: '#2D3A44',
          borderRadius: 24,
          borderWidth: 1,
          height: 345,
          marginBottom: 12,
          marginHorizontal: 16,
          overflow: 'hidden',
          position: 'relative',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.18,
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        {/* Top Left Live Area Pill */}
        <Animated.View
          style={{
            backgroundColor: '#26343F',
            borderRadius: 12,
            height: 36,
            left: 14,
            opacity: pulseAnim,
            position: 'absolute',
            top: 14,
            width: 96,
            zIndex: 5,
          }}
        />

        {/* Top Right Controls Stack */}
        <View
          style={{
            gap: 8,
            position: 'absolute',
            right: 14,
            top: 14,
            zIndex: 5,
          }}
        >
          {[1, 2, 3, 4].map(idx => (
            <Animated.View
              key={idx}
              style={{
                backgroundColor: '#26343F',
                borderRadius: 12,
                height: 38,
                opacity: pulseAnim,
                width: 38,
              }}
            />
          ))}
        </View>

        {/* Map Road Lines Simulation */}
        <View
          style={{
            backgroundColor: 'rgba(74, 96, 110, 0.4)',
            height: 3,
            left: '-10%',
            position: 'absolute',
            top: '35%',
            transform: [{ rotate: '-35deg' }],
            width: '130%',
          }}
        />
        <View
          style={{
            backgroundColor: 'rgba(74, 96, 110, 0.4)',
            height: 3,
            left: '-10%',
            position: 'absolute',
            top: '60%',
            transform: [{ rotate: '25deg' }],
            width: '130%',
          }}
        />

        {/* Center Driver Location Marker with Pulse */}
        <View
          style={{
            alignItems: 'center',
            left: '50%',
            marginLeft: -48,
            marginTop: -48,
            position: 'absolute',
            top: '49%',
            zIndex: 4,
          }}
        >
          <Animated.View
            style={{
              alignItems: 'center',
              backgroundColor: 'rgba(255, 210, 26, 0.15)',
              borderRadius: 48,
              height: 96,
              justifyContent: 'center',
              opacity: pulseAnim,
              width: 96,
            }}
          >
            <View
              style={{
                backgroundColor: '#4A401A',
                borderColor: 'rgba(255, 255, 255, 0.4)',
                borderRadius: 24,
                borderWidth: 2,
                height: 48,
                width: 48,
              }}
            />
          </Animated.View>
          <Animated.View
            style={{
              backgroundColor: '#4A401A',
              borderRadius: 10,
              height: 18,
              marginTop: -6,
              opacity: pulseAnim,
              width: 76,
            }}
          />
        </View>
      </View>

      {/* 3. Scanning Bar Skeleton */}
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderColor: '#ECE7DB',
          borderRadius: 20,
          borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 12,
          marginHorizontal: 16,
          paddingHorizontal: 14,
          paddingVertical: 13,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.04,
          shadowRadius: 3,
          elevation: 1,
        }}
      >
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            flexDirection: 'row',
            marginRight: 10,
          }}
        >
          <Animated.View
            style={{
              backgroundColor: '#D1EAD8',
              borderRadius: 16,
              height: 32,
              opacity: pulseAnim,
              width: 32,
            }}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Animated.View
              style={{
                backgroundColor: '#DDD8CB',
                borderRadius: 4,
                height: 13,
                opacity: pulseAnim,
                width: '80%',
              }}
            />
            <Animated.View
              style={{
                backgroundColor: '#EBE7DC',
                borderRadius: 3,
                height: 10,
                marginTop: 4,
                opacity: pulseAnim,
                width: '55%',
              }}
            />
          </View>
        </View>

        {/* Radar Radar Icon */}
        <Animated.View
          style={{
            backgroundColor: '#EBE7DC',
            borderRadius: 17,
            height: 34,
            opacity: pulseAnim,
            width: 34,
          }}
        />
      </View>

      {/* 4. Stats Row Skeleton (3 Cards) */}
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          marginBottom: 12,
          marginHorizontal: 16,
        }}
      >
        {[1, 2, 3].map(cardIdx => (
          <View
            key={cardIdx}
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: '#ECE7DB',
              borderRadius: 18,
              borderWidth: 1,
              flex: 1,
              justifyContent: 'space-between',
              paddingHorizontal: 11,
              paddingVertical: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.04,
              shadowRadius: 3,
              elevation: 1,
            }}
          >
            {/* Icon placeholder */}
            <Animated.View
              style={{
                backgroundColor: '#F0ECE1',
                borderRadius: 10,
                height: 32,
                opacity: pulseAnim,
                width: 32,
              }}
            />
            {/* Label line */}
            <Animated.View
              style={{
                backgroundColor: '#EBE7DC',
                borderRadius: 3,
                height: 8.5,
                marginTop: 8,
                opacity: pulseAnim,
                width: '85%',
              }}
            />
            {/* Value line */}
            <Animated.View
              style={{
                backgroundColor: '#DDD8CB',
                borderRadius: 4,
                height: 18,
                marginTop: 6,
                opacity: pulseAnim,
                width: '65%',
              }}
            />
          </View>
        ))}
      </View>

      {/* 5. Promotional Incentive Card Skeleton */}
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#FAF5EA',
          borderColor: '#ECE0C8',
          borderRadius: 20,
          borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 16,
          marginHorizontal: 16,
          paddingBottom: 12,
          paddingLeft: 12,
          paddingRight: 10,
          paddingTop: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.03,
          shadowRadius: 2,
          elevation: 1,
        }}
      >
        <View
          style={{
            alignItems: 'flex-start',
            flex: 1,
            flexDirection: 'row',
            marginRight: 6,
          }}
        >
          {/* Icon Circle */}
          <Animated.View
            style={{
              backgroundColor: '#DDD8CB',
              borderRadius: 18,
              height: 36,
              opacity: pulseAnim,
              width: 36,
            }}
          />

          {/* Texts & CTA */}
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Animated.View
              style={{
                backgroundColor: '#DDD8CB',
                borderRadius: 4,
                height: 13.5,
                opacity: pulseAnim,
                width: '75%',
              }}
            />
            <Animated.View
              style={{
                backgroundColor: '#EBE7DC',
                borderRadius: 3,
                height: 10,
                marginTop: 4,
                opacity: pulseAnim,
                width: '90%',
              }}
            />
            <Animated.View
              style={{
                backgroundColor: '#DDD8CB',
                borderRadius: 14,
                height: 24,
                marginTop: 8,
                opacity: pulseAnim,
                width: 90,
              }}
            />
          </View>
        </View>

        {/* Gift Box Silhouette */}
        <Animated.View
          style={{
            backgroundColor: '#F0E6D2',
            borderRadius: 16,
            height: 70,
            opacity: pulseAnim,
            width: 70,
          }}
        />
      </View>
    </View>
  );
}

export default DeskSkeleton;
