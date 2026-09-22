import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

/**
 * EarningsSkeleton
 * Exact-dimension skeleton loading placeholder for EarningsScreen.
 * Pure inline CSS styles with smooth pulsing animation.
 */
function EarningsSkeleton() {
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
      {/* 1. Hero Summary Card Skeleton (Dark Theme) */}
      <View
        style={{
          backgroundColor: '#17191C',
          borderRadius: 20,
          marginBottom: 16,
          paddingHorizontal: 20,
          paddingVertical: 18,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 10,
          elevation: 4,
        }}
      >
        {/* Total Earnings Subtitle */}
        <Animated.View
          style={{
            backgroundColor: '#2E3339',
            borderRadius: 4,
            height: 12,
            opacity: pulseAnim,
            width: 110,
          }}
        />

        {/* Big Amount */}
        <Animated.View
          style={{
            backgroundColor: '#383E46',
            borderRadius: 8,
            height: 36,
            marginTop: 10,
            opacity: pulseAnim,
            width: 160,
          }}
        />

        {/* Growth Row */}
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            gap: 6,
            marginTop: 10,
          }}
        >
          <Animated.View
            style={{
              backgroundColor: '#2A3036',
              borderRadius: 7.5,
              height: 15,
              opacity: pulseAnim,
              width: 15,
            }}
          />
          <Animated.View
            style={{
              backgroundColor: '#2A3036',
              borderRadius: 4,
              height: 13,
              opacity: pulseAnim,
              width: 130,
            }}
          />
        </View>

        {/* Embedded Chart Skeleton Bars */}
        <View
          style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            height: 110,
            justifyContent: 'space-between',
            marginTop: 18,
            paddingTop: 16,
          }}
        >
          {[65, 85, 45, 95, 75, 55, 80].map((heightPct, idx) => (
            <View
              key={idx}
              style={{
                alignItems: 'center',
                flex: 1,
                height: '100%',
                justifyContent: 'flex-end',
              }}
            >
              <Animated.View
                style={{
                  backgroundColor: idx === 3 ? '#5A5020' : '#2A2E34',
                  borderRadius: 6,
                  height: `${heightPct}%`,
                  opacity: pulseAnim,
                  width: 22,
                }}
              />
              <Animated.View
                style={{
                  backgroundColor: '#2A2E34',
                  borderRadius: 3,
                  height: 9,
                  marginTop: 8,
                  opacity: pulseAnim,
                  width: 18,
                }}
              />
            </View>
          ))}
        </View>
      </View>

      {/* 2. Performance Stats Card Skeleton */}
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderColor: '#DDD9CF',
          borderRadius: 16,
          borderWidth: 1,
          flexDirection: 'row',
          marginBottom: 16,
          paddingVertical: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.03,
          shadowRadius: 6,
          elevation: 2,
        }}
      >
        {/* Col 1 */}
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          <Animated.View
            style={{
              backgroundColor: '#EBE7DC',
              borderRadius: 6,
              height: 18,
              marginBottom: 8,
              opacity: pulseAnim,
              width: 20,
            }}
          />
          <Animated.View
            style={{
              backgroundColor: '#E2DDD0',
              borderRadius: 4,
              height: 18,
              opacity: pulseAnim,
              width: 44,
            }}
          />
          <Animated.View
            style={{
              backgroundColor: '#EBE7DC',
              borderRadius: 3,
              height: 11,
              marginTop: 6,
              opacity: pulseAnim,
              width: 36,
            }}
          />
        </View>

        <View style={{ backgroundColor: '#DDD9CF', height: 38, width: 1 }} />

        {/* Col 2 */}
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          <Animated.View
            style={{
              backgroundColor: '#EBE7DC',
              borderRadius: 6,
              height: 18,
              marginBottom: 8,
              opacity: pulseAnim,
              width: 20,
            }}
          />
          <Animated.View
            style={{
              backgroundColor: '#E2DDD0',
              borderRadius: 4,
              height: 18,
              opacity: pulseAnim,
              width: 58,
            }}
          />
          <Animated.View
            style={{
              backgroundColor: '#EBE7DC',
              borderRadius: 3,
              height: 11,
              marginTop: 6,
              opacity: pulseAnim,
              width: 62,
            }}
          />
        </View>

        <View style={{ backgroundColor: '#DDD9CF', height: 38, width: 1 }} />

        {/* Col 3 */}
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          <Animated.View
            style={{
              backgroundColor: '#EBE7DC',
              borderRadius: 6,
              height: 18,
              marginBottom: 8,
              opacity: pulseAnim,
              width: 20,
            }}
          />
          <Animated.View
            style={{
              backgroundColor: '#E2DDD0',
              borderRadius: 4,
              height: 18,
              opacity: pulseAnim,
              width: 48,
            }}
          />
          <Animated.View
            style={{
              backgroundColor: '#EBE7DC',
              borderRadius: 3,
              height: 11,
              marginTop: 6,
              opacity: pulseAnim,
              width: 50,
            }}
          />
        </View>
      </View>

      {/* 3. Next Payout Card Skeleton */}
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#FFFBEB',
          borderColor: '#FDE68A',
          borderRadius: 16,
          borderWidth: 1,
          flexDirection: 'row',
          marginBottom: 16,
          padding: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.03,
          shadowRadius: 4,
          elevation: 1,
        }}
      >
        <Animated.View
          style={{
            backgroundColor: '#F7E7A8',
            borderRadius: 12,
            height: 44,
            marginRight: 12,
            opacity: pulseAnim,
            width: 44,
          }}
        />
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'center', flexDirection: 'row', gap: 8 }}>
            <Animated.View
              style={{
                backgroundColor: '#EADB9D',
                borderRadius: 4,
                height: 13,
                opacity: pulseAnim,
                width: 75,
              }}
            />
            <Animated.View
              style={{
                backgroundColor: '#DCF4E7',
                borderRadius: 8,
                height: 18,
                opacity: pulseAnim,
                width: 70,
              }}
            />
          </View>
          <Animated.View
            style={{
              backgroundColor: '#EADB9D',
              borderRadius: 4,
              height: 15,
              marginTop: 7,
              opacity: pulseAnim,
              width: 160,
            }}
          />
        </View>
        <Animated.View
          style={{
            backgroundColor: '#EADB9D',
            borderRadius: 6,
            height: 16,
            marginRight: 4,
            opacity: pulseAnim,
            width: 10,
          }}
        />
      </View>

      {/* 4. Action Button Skeleton */}
      <Animated.View
        style={{
          backgroundColor: '#F0E2A5',
          borderRadius: 14,
          height: 48,
          marginBottom: 16,
          opacity: pulseAnim,
          width: '100%',
        }}
      />

      {/* 5. Transactions Header Skeleton */}
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 12,
          paddingHorizontal: 2,
        }}
      >
        <Animated.View
          style={{
            backgroundColor: '#E2DDD0',
            borderRadius: 4,
            height: 16,
            opacity: pulseAnim,
            width: 140,
          }}
        />
        <Animated.View
          style={{
            backgroundColor: '#EBE7DC',
            borderRadius: 4,
            height: 13,
            opacity: pulseAnim,
            width: 55,
          }}
        />
      </View>

      {/* 6. Transaction Cards Skeleton List (3 items) */}
      {[1, 2, 3].map(item => (
        <View
          key={item}
          style={{
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderColor: '#E6E2D8',
            borderRadius: 14,
            borderWidth: 1,
            flexDirection: 'row',
            marginBottom: 12,
            paddingHorizontal: 16,
            paddingVertical: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.03,
            shadowRadius: 4,
            elevation: 1,
          }}
        >
          {/* Avatar */}
          <Animated.View
            style={{
              backgroundColor: '#EBE7DC',
              borderRadius: 20,
              height: 40,
              marginRight: 12,
              opacity: pulseAnim,
              width: 40,
            }}
          />

          {/* Middle texts */}
          <View style={{ flex: 1 }}>
            <Animated.View
              style={{
                backgroundColor: '#DDD8CB',
                borderRadius: 4,
                height: 14,
                opacity: pulseAnim,
                width: '60%',
              }}
            />
            <Animated.View
              style={{
                backgroundColor: '#EBE7DC',
                borderRadius: 3,
                height: 11,
                marginTop: 6,
                opacity: pulseAnim,
                width: '85%',
              }}
            />
            <Animated.View
              style={{
                backgroundColor: '#F0ECE1',
                borderRadius: 3,
                height: 10,
                marginTop: 6,
                opacity: pulseAnim,
                width: '35%',
              }}
            />
          </View>

          {/* Right amount column */}
          <View style={{ alignItems: 'flex-end', marginLeft: 12 }}>
            <Animated.View
              style={{
                backgroundColor: '#DDD8CB',
                borderRadius: 4,
                height: 16,
                opacity: pulseAnim,
                width: 54,
              }}
            />
            <Animated.View
              style={{
                backgroundColor: '#EBE7DC',
                borderRadius: 3,
                height: 10,
                marginTop: 4,
                opacity: pulseAnim,
                width: 32,
              }}
            />
          </View>
        </View>
      ))}
    </View>
  );
}

export default EarningsSkeleton;
