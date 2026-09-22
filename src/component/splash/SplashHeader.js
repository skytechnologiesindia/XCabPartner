import React from 'react';
import { Text, View } from 'react-native';

/**
 * SplashHeader
 * Prominent branding header displaying:
 * - Top-left golden decorative arc
 * - Top-right "Miles Create Opportunities" tagline
 * - XCAB logo with yellow 'X' and dark charcoal 'CAB'
 * - 'DRIVER APP' spaced subtitle
 * - 'Drive Today' and 'A Better Tomorrow' headlines
 * - 'More Rides • Fair Earnings • Safer Roads' supporting line
 */
function SplashHeader() {
  return (
    <View
      style={{
        paddingHorizontal: 24,
        paddingTop: 12,
        position: 'relative',
        width: '100%',
      }}
    >
      {/* 1. Subtle decorative golden arc in background */}
      <View
        pointerEvents="none"
        style={{
          borderColor: 'rgba(255, 201, 40, 0.22)',
          borderRadius: 140,
          borderWidth: 22,
          height: 200,
          left: -70,
          position: 'absolute',
          top: -60,
          width: 200,
        }}
      />

      {/* 2. Top-right tagline */}
      <View
        style={{
          alignItems: 'flex-end',
          position: 'absolute',
          right: 20,
          top: 10,
        }}
      >
        <Text
          style={{
            color: '#7A828A',
            fontSize: 10.5,
            fontWeight: '500',
            lineHeight: 13.5,
            textAlign: 'right',
          }}
        >
          Miles{'\n'}Create{'\n'}Opportunities
        </Text>
        <View
          style={{
            backgroundColor: '#FFC928',
            borderRadius: 1.5,
            height: 2.5,
            marginTop: 4,
            width: 22,
          }}
        />
      </View>

      {/* 3. XCAB Master Logo */}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 24,
        }}
      >
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              color: '#FFC928',
              fontSize: 42,
              fontWeight: '900',
              letterSpacing: -1,
            }}
          >
            X
          </Text>
          <Text
            style={{
              color: '#17191C',
              fontSize: 42,
              fontWeight: '900',
              letterSpacing: -1,
            }}
          >
            CAB
          </Text>
        </View>
        <Text
          style={{
            color: '#687078',
            fontSize: 11,
            fontWeight: '700',
            letterSpacing: 4.5,
            marginTop: 2,
          }}
        >
          D R I V E R   A P P
        </Text>
      </View>

      {/* 4. Core Message */}
      <View
        style={{
          alignItems: 'center',
          marginTop: 16,
        }}
      >
        <Text
          style={{
            color: '#17191C',
            fontSize: 27,
            fontWeight: '900',
            letterSpacing: -0.6,
            lineHeight: 32,
            textAlign: 'center',
          }}
        >
          Drive Today
        </Text>
        <Text
          style={{
            color: '#FFC928',
            fontSize: 27,
            fontWeight: '900',
            letterSpacing: -0.6,
            lineHeight: 32,
            textAlign: 'center',
          }}
        >
          A Better Tomorrow
        </Text>
        <Text
          style={{
            color: '#687078',
            fontSize: 12.5,
            fontWeight: '500',
            letterSpacing: 0.2,
            marginTop: 8,
            textAlign: 'center',
          }}
        >
          More Rides  •  Fair Earnings  •  Safer Roads
        </Text>
      </View>
    </View>
  );
}

export default SplashHeader;
