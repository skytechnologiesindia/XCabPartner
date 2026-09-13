import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
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
        styles.cardContainer,
        pressed && styles.cardPressed,
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
      <View style={styles.middleRow}>
        <RideMeta
          duration={ride.duration}
          distance={ride.distance}
          rider={ride.rider}
        />
        <RideStatus status={ride.status} />
      </View>

      {/* 3. Bottom Bar: Trip ID & View Details CTA */}
      <View style={styles.bottomBar}>
        <Text style={styles.tripIdText}>Trip ID: #{ride.id}</Text>

        <Pressable
          style={({ pressed }) => [
            styles.detailsButton,
            pressed && styles.detailsButtonPressed,
          ]}
          onPress={() => onPressDetails && onPressDetails(ride)}
          accessibilityRole="button"
          accessibilityLabel={`View details for Trip ${ride.id}`}
        >
          <Text style={styles.detailsButtonText}>View Details</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
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
  cardPressed: {
    opacity: 0.95,
    transform: [{ scale: 0.995 }],
  },
  middleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  bottomBar: {
    alignItems: 'center',
    backgroundColor: '#F4F2EB',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  tripIdText: {
    color: '#687078',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  detailsButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#17191C',
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  detailsButtonPressed: {
    backgroundColor: '#F0EFEA',
  },
  detailsButtonText: {
    color: '#17191C',
    fontSize: 11.5,
    fontWeight: '700',
    letterSpacing: -0.1,
  },
});

export default RideCard;
