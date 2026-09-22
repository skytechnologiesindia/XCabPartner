import React, {useEffect, useRef} from 'react';
import {Animated, Easing, Text, View} from 'react-native';

const NUM_DOTS = 12;

function ScanningBar() {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 2500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    animation.start();

    return () => animation.stop();
  }, [spinAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
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
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.04,
        shadowRadius: 3,
        elevation: 1,
      }}>
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          flexDirection: 'row',
          marginRight: 10,
        }}>
        {/* Green Dual-Ring Status Dot */}
        <View
          style={{
            alignItems: 'center',
            backgroundColor: 'rgba(34, 197, 94, 0.22)',
            borderRadius: 16,
            height: 32,
            justifyContent: 'center',
            width: 32,
          }}>
          <View
            style={{
              backgroundColor: '#10B981',
              borderRadius: 6,
              height: 12,
              width: 12,
            }}
          />
        </View>

        {/* Text Hierarchy */}
        <View
          style={{
            flex: 1,
            marginLeft: 10,
          }}>
          <Text
            style={{
              color: '#111315',
              fontSize: 13.5,
              fontWeight: '700',
              letterSpacing: -0.1,
            }}
            numberOfLines={1}>
            No active trip – scanning for requests
          </Text>
          <Text
            style={{
              color: '#6B7280',
              fontSize: 11,
              marginTop: 2,
            }}
            numberOfLines={1}>
            You&apos;ll get notified immediately.
          </Text>
        </View>
      </View>

      {/* Animated Radar Scanning Indicator */}
      <Animated.View
        style={{
          alignItems: 'center',
          height: 34,
          justifyContent: 'center',
          transform: [{rotate: spin}],
          width: 34,
        }}>
        {Array.from({length: NUM_DOTS}).map((_, index) => {
          const angle = (index * (360 / NUM_DOTS) * Math.PI) / 180;
          const radius = 13;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          const opacity = 0.15 + (index / NUM_DOTS) * 0.85;

          return (
            <View
              key={index}
              style={{
                backgroundColor: '#10B981',
                borderRadius: 2.2,
                height: 4.4,
                opacity,
                position: 'absolute',
                transform: [{translateX: x}, {translateY: y}],
                width: 4.4,
              }}
            />
          );
        })}
      </Animated.View>
    </View>
  );
}

export default ScanningBar;
