import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import RideStatus from './RideStatus';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DISMISS_THRESHOLD = 90;

/**
 * RideDetailsModal
 * Detailed trip review bottom sheet.
 * Features a swipe/drag-down gesture to dismiss (no close cross button).
 */
function RideDetailsModal({ visible, ride, onClose }) {
  const translateY = useRef(new Animated.Value(0)).current;

  // Reset position whenever modal opens
  useEffect(() => {
    if (visible) {
      translateY.setValue(0);
    }
  }, [visible, translateY]);

  // PanResponder to handle drag-down to dismiss
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Activate drag gesture when moving downwards
        return gestureState.dy > 4;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > DISMISS_THRESHOLD || gestureState.vy > 0.6) {
          // Animate down and close
          Animated.timing(translateY, {
            toValue: SCREEN_HEIGHT,
            duration: 180,
            useNativeDriver: true,
          }).start(() => {
            onClose && onClose();
            translateY.setValue(0);
          });
        } else {
          // Snap back to top
          Animated.spring(translateY, {
            toValue: 0,
            bounciness: 4,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  if (!ride) return null;

  const isCancelled = ride.status === 'cancelled';
  const breakdown = ride.breakdown || {};

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Semi-transparent backdrop tap to dismiss */}
        <Pressable
          style={styles.backdrop}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Dismiss trip details"
        />

        {/* Animated draggable bottom sheet */}
        <Animated.View
          style={[
            styles.sheet,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          {/* Top Drag & Drop Handle Area (PanResponder enabled) */}
          <View {...panResponder.panHandlers} style={styles.dragArea}>
            <View style={styles.handle} />

            {/* Header Row (Cross button removed as requested) */}
            <View style={styles.headerRow}>
              <View>
                <Text style={styles.title}>Trip Details</Text>
                <Text style={styles.tripId}>#{ride.id} · {ride.date}</Text>
              </View>
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
          >
            {/* Status & Fare Banner */}
            <View style={styles.statusBanner}>
              <View>
                <Text style={styles.fareAmount}>{ride.fare}</Text>
                <Text style={styles.paymentMethod}>
                  Paid via {ride.paymentMethod || 'N/A'}
                </Text>
              </View>
              <RideStatus status={ride.status} />
            </View>

            {/* Route Timeline */}
            <View style={styles.cardSection}>
              <Text style={styles.sectionHeading}>Route</Text>

              <View style={styles.routeItem}>
                <View style={[styles.dot, styles.pickupDot]} />
                <View style={styles.routeTextCol}>
                  <Text style={styles.routeRole}>PICKUP</Text>
                  <Text style={styles.routeAddress}>
                    {ride.pickup}, {ride.pickupCity}
                  </Text>
                  <Text style={styles.routeTime}>{ride.time}</Text>
                </View>
              </View>

              <View style={styles.routeConnector} />

              <View style={styles.routeItem}>
                <View style={[styles.dot, styles.dropDot]} />
                <View style={styles.routeTextCol}>
                  <Text style={styles.routeRole}>DROP-OFF</Text>
                  <Text style={styles.routeAddress}>
                    {ride.drop}, {ride.dropCity}
                  </Text>
                </View>
              </View>
            </View>

            {/* Trip Stats */}
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Distance</Text>
                <Text style={styles.statValue}>{ride.distance}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Duration</Text>
                <Text style={styles.statValue}>{ride.duration}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Rider</Text>
                <Text style={styles.statValue}>{ride.rider}</Text>
              </View>
            </View>

            {/* Cancellation Notice if cancelled */}
            {isCancelled ? (
              <View style={styles.cancelledNotice}>
                <Text style={styles.cancelledTitle}>Cancellation Reason</Text>
                <Text style={styles.cancelledDesc}>
                  {ride.cancellationReason || 'Cancelled before trip started.'}
                </Text>
              </View>
            ) : null}

            {/* Fare Breakdown */}
            {!isCancelled ? (
              <View style={styles.cardSection}>
                <Text style={styles.sectionHeading}>Fare Breakdown</Text>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>Base Fare</Text>
                  <Text style={styles.breakdownValue}>
                    {breakdown.baseFare || '₹50'}
                  </Text>
                </View>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>Distance Fare</Text>
                  <Text style={styles.breakdownValue}>
                    {breakdown.distanceFare || '₹95'}
                  </Text>
                </View>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>Time Fare</Text>
                  <Text style={styles.breakdownValue}>
                    {breakdown.timeFare || '₹35'}
                  </Text>
                </View>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>Platform Fee & Taxes</Text>
                  <Text style={styles.breakdownValue}>
                    {breakdown.taxes || '₹15'}
                  </Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.breakdownRow}>
                  <Text style={styles.earningLabel}>Driver Net Earnings</Text>
                  <Text style={styles.earningValue}>
                    {breakdown.driverEarning || ride.fare}
                  </Text>
                </View>
              </View>
            ) : null}

            {/* Done Button */}
            <Pressable
              style={styles.actionButton}
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Done"
            >
              <Text style={styles.actionButtonText}>Done</Text>
            </Pressable>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  sheet: {
    backgroundColor: '#F7F5EF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    paddingBottom: 28,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  dragArea: {
    paddingBottom: 6,
    paddingTop: 4,
    width: '100%',
  },
  handle: {
    alignSelf: 'center',
    backgroundColor: '#D0CCC2',
    borderRadius: 3,
    height: 5,
    marginBottom: 14,
    width: 48,
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    color: '#17191C',
    fontSize: 20,
    fontWeight: '800',
  },
  tripId: {
    color: '#687078',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  content: {
    gap: 12,
    paddingBottom: 16,
  },
  statusBanner: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E6E2D8',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  fareAmount: {
    color: '#17191C',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  paymentMethod: {
    color: '#687078',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  cardSection: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E6E2D8',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  sectionHeading: {
    color: '#17191C',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.2,
    marginBottom: 12,
  },
  routeItem: {
    flexDirection: 'row',
    gap: 12,
  },
  dot: {
    borderRadius: 6,
    borderWidth: 3,
    height: 12,
    marginTop: 4,
    width: 12,
  },
  pickupDot: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFC928',
  },
  dropDot: {
    backgroundColor: '#17191C',
    borderColor: '#17191C',
  },
  routeConnector: {
    borderColor: '#DDD9CF',
    borderLeftWidth: 1.5,
    borderStyle: 'dashed',
    height: 20,
    marginLeft: 5,
    marginVertical: 3,
  },
  routeTextCol: {
    flex: 1,
  },
  routeRole: {
    color: '#687078',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  routeAddress: {
    color: '#17191C',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  routeTime: {
    color: '#687078',
    fontSize: 11,
    marginTop: 2,
  },
  statsRow: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E6E2D8',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    paddingVertical: 14,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    backgroundColor: '#DDD9CF',
    width: 1,
  },
  statLabel: {
    color: '#687078',
    fontSize: 11,
    fontWeight: '500',
  },
  statValue: {
    color: '#17191C',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 3,
  },
  cancelledNotice: {
    backgroundColor: '#FDE6E3',
    borderColor: '#F8B6AC',
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
  },
  cancelledTitle: {
    color: '#F26B5B',
    fontSize: 13,
    fontWeight: '700',
  },
  cancelledDesc: {
    color: '#9C3D32',
    fontSize: 12,
    marginTop: 2,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  breakdownLabel: {
    color: '#687078',
    fontSize: 13,
  },
  breakdownValue: {
    color: '#17191C',
    fontSize: 13,
    fontWeight: '600',
  },
  divider: {
    backgroundColor: '#EBE7DC',
    height: 1,
    marginVertical: 8,
  },
  earningLabel: {
    color: '#17191C',
    fontSize: 14,
    fontWeight: '700',
  },
  earningValue: {
    color: '#18A66A',
    fontSize: 16,
    fontWeight: '800',
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: '#FFC928',
    borderRadius: 14,
    justifyContent: 'center',
    marginTop: 8,
    paddingVertical: 14,
  },
  actionButtonText: {
    color: '#17191C',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default RideDetailsModal;
