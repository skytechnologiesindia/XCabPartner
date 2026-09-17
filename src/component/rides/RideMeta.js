import React from 'react';
import { Image, Text, View } from 'react-native';
import { icons } from '../../assets/icons';

/**
 * RideMeta
 * Renders the 3 metadata chips (Duration, Distance, Rider)
 * with small outline icons and bold values.
 */
function RideMeta({ duration = '-', distance = '-', rider = '-' }) {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        gap: 6,
      }}
    >
      {/* 1. Duration Chip */}
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#F4F2EB',
          borderRadius: 10,
          flexDirection: 'row',
          gap: 6,
          paddingHorizontal: 8,
          paddingVertical: 6,
        }}
      >
        <Image
          source={icons.statClock}
          style={{
            height: 14,
            width: 14,
          }}
          tintColor="#17191C"
          resizeMode="contain"
        />
        <View style={{ justifyContent: 'center' }}>
          <Text
            style={{
              color: '#17191C',
              fontSize: 11.5,
              fontWeight: '700',
              letterSpacing: -0.1,
            }}
            numberOfLines={1}
          >
            {duration}
          </Text>
          <Text
            style={{
              color: '#687078',
              fontSize: 9.5,
              fontWeight: '500',
              marginTop: 1,
            }}
          >
            Duration
          </Text>
        </View>
      </View>

      {/* 2. Distance Chip */}
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#F4F2EB',
          borderRadius: 10,
          flexDirection: 'row',
          gap: 6,
          paddingHorizontal: 8,
          paddingVertical: 6,
        }}
      >
        {/* Route / Distance icon graphic */}
        <View
          style={{
            height: 14,
            justifyContent: 'space-between',
            position: 'relative',
            width: 14,
          }}
        >
          <View
            style={{
              borderColor: '#17191C',
              borderLeftWidth: 1.8,
              borderTopLeftRadius: 3,
              borderTopWidth: 1.8,
              height: 8,
              width: 8,
            }}
          />
          <View
            style={{
              alignSelf: 'flex-end',
              borderColor: '#17191C',
              borderBottomRightRadius: 3,
              borderBottomWidth: 1.8,
              borderRightWidth: 1.8,
              height: 8,
              marginTop: -2,
              width: 8,
            }}
          />
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text
            style={{
              color: '#17191C',
              fontSize: 11.5,
              fontWeight: '700',
              letterSpacing: -0.1,
            }}
            numberOfLines={1}
          >
            {distance}
          </Text>
          <Text
            style={{
              color: '#687078',
              fontSize: 9.5,
              fontWeight: '500',
              marginTop: 1,
            }}
          >
            Distance
          </Text>
        </View>
      </View>

      {/* 3. Rider Chip */}
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#F4F2EB',
          borderRadius: 10,
          flexDirection: 'row',
          gap: 6,
          paddingHorizontal: 8,
          paddingVertical: 6,
        }}
      >
        <Image
          source={icons.profile}
          style={{
            height: 14,
            width: 14,
          }}
          tintColor="#17191C"
          resizeMode="contain"
        />
        <View style={{ justifyContent: 'center' }}>
          <Text
            style={{
              color: '#17191C',
              fontSize: 11.5,
              fontWeight: '700',
              letterSpacing: -0.1,
            }}
            numberOfLines={1}
          >
            {rider}
          </Text>
          <Text
            style={{
              color: '#687078',
              fontSize: 9.5,
              fontWeight: '500',
              marginTop: 1,
            }}
          >
            Rider
          </Text>
        </View>
      </View>
    </View>
  );
}

export default RideMeta;
