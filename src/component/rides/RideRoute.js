import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
    <View style={styles.routeContainer}>
      {/* Left: Vertical Route Indicator + Location Texts */}
      <View style={styles.leftSection}>
        {/* Route Track Graphic */}
        <View style={styles.trackColumn}>
          {/* Pickup Ring Dot */}
          <View style={[styles.pickupDot, { borderColor: pickupDotColor }]} />

          {/* Dashed connector line */}
          <View style={styles.dashedLine} />

          {/* Drop Ring with center dot */}
          <View style={styles.dropOuterRing}>
            <View style={styles.dropInnerDot} />
          </View>
        </View>

        {/* Location Names */}
        <View style={styles.locationNamesColumn}>
          {/* Pickup */}
          <View style={styles.locationBlock}>
            <Text style={styles.locationTitle} numberOfLines={1}>
              {pickup}
            </Text>
            <Text style={styles.locationSubtitle} numberOfLines={1}>
              {pickupCity}
            </Text>
          </View>

          {/* Drop */}
          <View style={styles.locationBlockDrop}>
            <Text style={styles.locationTitle} numberOfLines={1}>
              {drop}
            </Text>
            <Text style={styles.locationSubtitle} numberOfLines={1}>
              {dropCity}
            </Text>
          </View>
        </View>
      </View>

      {/* Right: Time, Chevron, Fare, Payment */}
      <View style={styles.rightSection}>
        {/* Top: Time + Chevron */}
        <View style={styles.timeRow}>
          <Text style={styles.timeText}>{time}</Text>
          <Text style={styles.chevron}>›</Text>
        </View>

        {/* Bottom: Fare & Payment Method */}
        <View style={styles.fareBlock}>
          <Text style={styles.fareText}>{fare}</Text>
          <Text style={styles.paymentMethodText}>{paymentMethod}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  routeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 12,
  },
  trackColumn: {
    alignItems: 'center',
    marginRight: 12,
    paddingTop: 4,
    width: 14,
  },
  pickupDot: {
    backgroundColor: '#FFFFFF',
    borderRadius: 7,
    borderWidth: 3.5,
    height: 14,
    width: 14,
  },
  dashedLine: {
    borderColor: '#969792',
    borderLeftWidth: 1.5,
    borderStyle: 'dashed',
    height: 22,
    marginVertical: 3,
  },
  dropOuterRing: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#17191C',
    borderRadius: 6.5,
    borderWidth: 2.5,
    height: 13,
    justifyContent: 'center',
    width: 13,
  },
  dropInnerDot: {
    backgroundColor: '#17191C',
    borderRadius: 2,
    height: 4,
    width: 4,
  },
  locationNamesColumn: {
    flex: 1,
    justifyContent: 'space-between',
  },
  locationBlock: {
    marginBottom: 8,
  },
  locationBlockDrop: {
    marginTop: 2,
  },
  locationTitle: {
    color: '#17191C',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  locationSubtitle: {
    color: '#687078',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 1,
  },
  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  timeRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  timeText: {
    color: '#687078',
    fontSize: 12,
    fontWeight: '500',
  },
  chevron: {
    color: '#17191C',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 18,
    marginTop: -1,
  },
  fareBlock: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  fareText: {
    color: '#17191C',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  paymentMethodText: {
    color: '#687078',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 1,
  },
});

export default RideRoute;
