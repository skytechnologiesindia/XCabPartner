import React from 'react';
import {
  Image,
  Text,
  View,
} from 'react-native';
import { icons } from '../../assets/icons';

/**
 * SplashBenefits
 * Three subtle horizontally aligned benefits:
 * 1. Safer Journeys (shield icon badge)
 * 2. Better Earnings (bar chart badge)
 * 3. Stronger Communities / More Rides (people/rides badge)
 */
function SplashBenefits({ thirdLabel = 'STRONGER\nCOMMUNITIES' }) {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 22,
        paddingHorizontal: 16,
        width: '100%',
      }}
    >
      {/* 1. Benefit: Safer Journeys */}
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#FFF3CF',
            borderColor: 'rgba(255, 201, 40, 0.28)',
            borderRadius: 22,
            borderWidth: 1,
            height: 44,
            justifyContent: 'center',
            width: 44,
          }}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={icons.shield}
              style={{
                height: 19,
                width: 19,
              }}
              tintColor="#17191C"
              resizeMode="contain"
            />
          </View>
        </View>
        <Text
          style={{
            color: '#525B64',
            fontSize: 10,
            fontWeight: '700',
            letterSpacing: 0.6,
            lineHeight: 14,
            marginTop: 8,
            textAlign: 'center',
          }}
        >
          {'SAFER\nJOURNEYS'}
        </Text>
      </View>

      {/* Thin Vertical Divider */}
      <View
        style={{
          backgroundColor: '#ECEAE2',
          height: 38,
          width: 1,
        }}
      />

      {/* 2. Benefit: Better Earnings */}
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#FFF3CF',
            borderColor: 'rgba(255, 201, 40, 0.28)',
            borderRadius: 22,
            borderWidth: 1,
            height: 44,
            justifyContent: 'center',
            width: 44,
          }}
        >
          <View
            style={{
              alignItems: 'flex-end',
              flexDirection: 'row',
              gap: 3,
              height: 18,
            }}
          >
            <View
              style={{
                backgroundColor: '#17191C',
                borderRadius: 1.5,
                width: 3.5,
                height: 8,
              }}
            />
            <View
              style={{
                backgroundColor: '#17191C',
                borderRadius: 1.5,
                width: 3.5,
                height: 13,
              }}
            />
            <View
              style={{
                backgroundColor: '#17191C',
                borderRadius: 1.5,
                width: 3.5,
                height: 18,
              }}
            />
          </View>
        </View>
        <Text
          style={{
            color: '#525B64',
            fontSize: 10,
            fontWeight: '700',
            letterSpacing: 0.6,
            lineHeight: 14,
            marginTop: 8,
            textAlign: 'center',
          }}
        >
          {'BETTER\nEARNINGS'}
        </Text>
      </View>

      {/* Thin Vertical Divider */}
      <View
        style={{
          backgroundColor: '#ECEAE2',
          height: 38,
          width: 1,
        }}
      />

      {/* 3. Benefit: More Rides / Stronger Communities */}
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#FFF3CF',
            borderColor: 'rgba(255, 201, 40, 0.28)',
            borderRadius: 22,
            borderWidth: 1,
            height: 44,
            justifyContent: 'center',
            width: 44,
          }}
        >
          <View
            style={{
              alignItems: 'center',
              height: 20,
              justifyContent: 'center',
              position: 'relative',
              width: 24,
            }}
          >
            <View
              style={{
                backgroundColor: '#17191C',
                borderRadius: 4,
                height: 8,
                position: 'absolute',
                top: 1,
                width: 8,
              }}
            />
            <View
              style={{
                backgroundColor: '#17191C',
                borderTopLeftRadius: 6,
                borderTopRightRadius: 6,
                bottom: 0,
                height: 8,
                position: 'absolute',
                width: 14,
              }}
            />
            <View
              style={{
                backgroundColor: '#525B64',
                borderRadius: 3,
                height: 6,
                left: 1,
                position: 'absolute',
                top: 4,
                width: 6,
              }}
            />
            <View
              style={{
                backgroundColor: '#525B64',
                borderRadius: 3,
                height: 6,
                position: 'absolute',
                right: 1,
                top: 4,
                width: 6,
              }}
            />
          </View>
        </View>
        <Text
          style={{
            color: '#525B64',
            fontSize: 10,
            fontWeight: '700',
            letterSpacing: 0.6,
            lineHeight: 14,
            marginTop: 8,
            textAlign: 'center',
          }}
        >
          {thirdLabel}
        </Text>
      </View>
    </View>
  );
}

export default SplashBenefits;
