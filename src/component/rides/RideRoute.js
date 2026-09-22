import React from 'react';
import { Text, View } from 'react-native';

/**
 * RideRoute
 * Renders pickup and drop points with vertical timeline track on left,
 * and time, chevron, fare, payment method on right.
 */
function RideRoute({
  pickup,
  pickupCity = 'Ranchi',
  drop,
  dropCity = 'Ranchi',
  time,
  fare,
  paymentMethod,
  isCancelled = false,
}) {
  const pickupDotColor = isCancelled ? '#F26B5B' : '#FFC928';

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      {/* Left: Vertical Route Indicator + Location Texts */}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginRight: 12,
        }}
      >
        {/* Route Track Graphic */}
        <View
          style={{
            alignItems: 'center',
            marginRight: 12,
            paddingTop: 4,
            width: 14,
          }}
        >
          {/* Pickup Ring Dot */}
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: pickupDotColor,
              borderRadius: 7,
              borderWidth: 3.5,
              height: 14,
              width: 14,
            }}
          />

          {/* Dashed connector line */}
          <View
            style={{
              borderColor: '#969792',
              borderLeftWidth: 1.5,
              borderStyle: 'dashed',
              height: 22,
              marginVertical: 3,
            }}
          />

          {/* Drop Ring with center dot */}
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderColor: '#17191C',
              borderRadius: 6.5,
              borderWidth: 2.5,
              height: 13,
              justifyContent: 'center',
              width: 13,
            }}
          >
            <View
              style={{
                backgroundColor: '#17191C',
                borderRadius: 2,
                height: 4,
                width: 4,
              }}
            />
          </View>
        </View>

        {/* Location Names */}
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
          {/* Pickup */}
          <View style={{ marginBottom: 8 }}>
            <Text
              style={{
                color: '#17191C',
                fontSize: 15,
                fontWeight: '700',
                letterSpacing: -0.2,
              }}
              numberOfLines={1}
            >
              {pickup}
            </Text>
            <Text
              style={{
                color: '#687078',
                fontSize: 12,
                fontWeight: '500',
                marginTop: 1,
              }}
              numberOfLines={1}
            >
              {pickupCity}
            </Text>
          </View>

          {/* Drop */}
          <View style={{ marginTop: 2 }}>
            <Text
              style={{
                color: '#17191C',
                fontSize: 15,
                fontWeight: '700',
                letterSpacing: -0.2,
              }}
              numberOfLines={1}
            >
              {drop}
            </Text>
            <Text
              style={{
                color: '#687078',
                fontSize: 12,
                fontWeight: '500',
                marginTop: 1,
              }}
              numberOfLines={1}
            >
              {dropCity}
            </Text>
          </View>
        </View>
      </View>

      {/* Right: Time, Chevron, Fare, Payment */}
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        {/* Top: Time + Chevron */}
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            gap: 4,
          }}
        >
          <Text
            style={{
              color: '#687078',
              fontSize: 12,
              fontWeight: '500',
            }}
          >
            {time}
          </Text>
          <Text
            style={{
              color: '#17191C',
              fontSize: 18,
              fontWeight: '600',
              lineHeight: 18,
              marginTop: -1,
            }}
          >
            ›
          </Text>
        </View>

        {/* Bottom: Fare & Payment Method */}
        <View
          style={{
            alignItems: 'flex-end',
            marginTop: 8,
          }}
        >
          <Text
            style={{
              color: '#17191C',
              fontSize: 20,
              fontWeight: '800',
              letterSpacing: -0.4,
            }}
          >
            {fare}
          </Text>
          <Text
            style={{
              color: '#687078',
              fontSize: 12,
              fontWeight: '500',
              marginTop: 1,
            }}
          >
            {paymentMethod}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default RideRoute;
