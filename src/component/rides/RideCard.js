import React from 'react';
import { Pressable, Text, View } from 'react-native';
import RideRoute from './RideRoute';
import RideMeta from './RideMeta';
import RideStatus from './RideStatus';

/**
 * RideCard
 * Clean white card matching XCAB visual standards.
 * Composes RideRoute, RideMeta, RideStatus, Trip ID and View Details CTA.
 */
function RideCard({ ride, onPressDetails }) {
  if (!ride) return null;

  const isCancelled = ride.status === 'cancelled';

  return (
    <Pressable
      style={({ pressed }) => [
        {
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
        },
        pressed && {
          opacity: 0.95,
          transform: [{ scale: 0.995 }],
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Trip to ${ride.drop}, fare ${ride.fare}`}
      onPress={() => onPressDetails && onPressDetails(ride)}
    >
      {/* 1. Top: Route & Fare Section */}
      <RideRoute
        pickup={ride.pickup}
        pickupCity={ride.pickupCity}
        drop={ride.drop}
        dropCity={ride.dropCity}
        time={ride.time}
        fare={ride.fare}
        paymentMethod={ride.paymentMethod}
        isCancelled={isCancelled}
      />

      {/* 2. Middle: Metadata Chips + Status Badge */}
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 14,
        }}
      >
        <RideMeta
          duration={ride.duration}
          distance={ride.distance}
          rider={ride.rider}
        />
        <RideStatus status={ride.status} />
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
        <Text
          style={{
            color: '#687078',
            fontSize: 12,
            fontWeight: '600',
            letterSpacing: -0.1,
          }}
        >
          Trip ID: #{ride.id}
        </Text>

        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: '#FFFFFF',
              borderColor: '#17191C',
              borderRadius: 6,
              borderWidth: 1,
              paddingHorizontal: 12,
              paddingVertical: 5,
            },
            pressed && {
              backgroundColor: '#F0EFEA',
            },
          ]}
          onPress={() => onPressDetails && onPressDetails(ride)}
          accessibilityRole="button"
          accessibilityLabel={`View details for Trip ${ride.id}`}
        >
          <Text
            style={{
              color: '#17191C',
              fontSize: 11.5,
              fontWeight: '700',
              letterSpacing: -0.1,
            }}
          >
            View Details
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

export default RideCard;
