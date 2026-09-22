import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  PanResponder,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import RideStatus from './RideStatus';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DISMISS_THRESHOLD = 80;

/**
 * RideDetailsModal
 * Detailed trip review bottom sheet overlay.
 * Uses a pure-animated overlay (no native Modal Dialog lifecycle glitch)
 * ensuring 100% smooth swipe/drag-down dismiss with ZERO flash or flicker.
 */
function RideDetailsModal({ visible, ride, onClose }) {
  const [isRendered, setIsRendered] = useState(visible);
  const lastRideRef = useRef(ride);
  if (ride) {
    lastRideRef.current = ride;
  }
  const currentRide = ride || lastRideRef.current;

  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;
  const isClosingRef = useRef(false);

  useEffect(() => {
    if (visible) {
      setIsRendered(true);
      isClosingRef.current = false;
      translateY.setValue(SCREEN_HEIGHT);
      backdropAnim.setValue(0);

      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 260,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 1,
          duration: 260,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (isRendered && !isClosingRef.current) {
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const closeModal = () => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 220,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(backdropAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsRendered(false);
      isClosingRef.current = false;
      if (onClose) {
        onClose();
      }
    });
  };

  // PanResponder to handle drag-down to dismiss
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 4;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
          const progress = Math.max(0, 1 - gestureState.dy / 350);
          backdropAnim.setValue(progress);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > DISMISS_THRESHOLD || gestureState.vy > 0.5) {
          closeModal();
        } else {
          // Snap back to top
          Animated.parallel([
            Animated.spring(translateY, {
              toValue: 0,
              bounciness: 4,
              useNativeDriver: true,
            }),
            Animated.timing(backdropAnim, {
              toValue: 1,
              duration: 150,
              useNativeDriver: true,
            }),
          ]).start();
        }
      },
    }),
  ).current;

  if (!isRendered || !currentRide) return null;

  const isCancelled = currentRide.status === 'cancelled';
  const breakdown = currentRide.breakdown || {};

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        justifyContent: 'flex-end',
      }}>
      {/* Semi-transparent backdrop tap to dismiss */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.45)',
          opacity: backdropAnim,
        }}>
        <Pressable
          style={{ flex: 1 }}
          onPress={closeModal}
          accessibilityRole="button"
          accessibilityLabel="Dismiss trip details"
        />
      </Animated.View>

      {/* Animated draggable bottom sheet */}
      <Animated.View
        style={{
          backgroundColor: '#F7F5EF',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          maxHeight: '85%',
          paddingBottom: 28,
          paddingHorizontal: 16,
          paddingTop: 8,
          transform: [{ translateY }],
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 16,
        }}>
        {/* Top Drag & Drop Handle Area (PanResponder enabled) */}
        <View
          {...panResponder.panHandlers}
          style={{
            paddingBottom: 6,
            paddingTop: 4,
            width: '100%',
          }}>
          <View
            style={{
              alignSelf: 'center',
              backgroundColor: '#D0CCC2',
              borderRadius: 3,
              height: 5,
              marginBottom: 14,
              width: 48,
            }}
          />

          {/* Header Row */}
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 12,
            }}>
            <View>
              <Text
                style={{
                  color: '#17191C',
                  fontSize: 20,
                  fontWeight: '800',
                }}>
                Trip Details
              </Text>
              <Text
                style={{
                  color: '#687078',
                  fontSize: 12,
                  fontWeight: '500',
                  marginTop: 2,
                }}>
                #{currentRide.id} · {currentRide.date}
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: 12,
            paddingBottom: 16,
          }}>
          {/* Status & Fare Banner */}
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderColor: '#E6E2D8',
              borderRadius: 16,
              borderWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 16,
            }}>
            <View>
              <Text
                style={{
                  color: '#17191C',
                  fontSize: 26,
                  fontWeight: '900',
                  letterSpacing: -0.5,
                }}>
                {currentRide.fare}
              </Text>
              <Text
                style={{
                  color: '#687078',
                  fontSize: 12,
                  fontWeight: '500',
                  marginTop: 2,
                }}>
                Paid via {currentRide.paymentMethod || 'N/A'}
              </Text>
            </View>
            <RideStatus status={currentRide.status} />
          </View>

          {/* Route Timeline */}
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: '#E6E2D8',
              borderRadius: 16,
              borderWidth: 1,
              padding: 16,
            }}>
            <Text
              style={{
                color: '#17191C',
                fontSize: 14,
                fontWeight: '700',
                letterSpacing: -0.2,
                marginBottom: 12,
              }}>
              Route
            </Text>

            <View
              style={{
                flexDirection: 'row',
                gap: 12,
              }}>
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#FFC928',
                  borderRadius: 6,
                  borderWidth: 3,
                  height: 12,
                  marginTop: 4,
                  width: 12,
                }}
              />
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: '#687078',
                    fontSize: 10,
                    fontWeight: '700',
                    letterSpacing: 0.5,
                  }}>
                  PICKUP
                </Text>
                <Text
                  style={{
                    color: '#17191C',
                    fontSize: 14,
                    fontWeight: '600',
                    marginTop: 2,
                  }}>
                  {currentRide.pickup}, {currentRide.pickupCity}
                </Text>
                <Text
                  style={{
                    color: '#687078',
                    fontSize: 11,
                    marginTop: 2,
                  }}>
                  {currentRide.time}
                </Text>
              </View>
            </View>

            <View
              style={{
                borderColor: '#DDD9CF',
                borderLeftWidth: 1.5,
                borderStyle: 'dashed',
                height: 20,
                marginLeft: 5,
                marginVertical: 3,
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                gap: 12,
              }}>
              <View
                style={{
                  backgroundColor: '#17191C',
                  borderColor: '#17191C',
                  borderRadius: 6,
                  borderWidth: 3,
                  height: 12,
                  marginTop: 4,
                  width: 12,
                }}
              />
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: '#687078',
                    fontSize: 10,
                    fontWeight: '700',
                    letterSpacing: 0.5,
                  }}>
                  DROP-OFF
                </Text>
                <Text
                  style={{
                    color: '#17191C',
                    fontSize: 14,
                    fontWeight: '600',
                    marginTop: 2,
                  }}>
                  {currentRide.drop}, {currentRide.dropCity}
                </Text>
              </View>
            </View>
          </View>

          {/* Trip Stats */}
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: '#E6E2D8',
              borderRadius: 16,
              borderWidth: 1,
              flexDirection: 'row',
              paddingVertical: 14,
            }}>
            <View style={{alignItems: 'center', flex: 1}}>
              <Text
                style={{
                  color: '#687078',
                  fontSize: 11,
                  fontWeight: '500',
                }}>
                Distance
              </Text>
              <Text
                style={{
                  color: '#17191C',
                  fontSize: 14,
                  fontWeight: '700',
                  marginTop: 3,
                }}>
                {currentRide.distance}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#DDD9CF',
                width: 1,
              }}
            />
            <View style={{alignItems: 'center', flex: 1}}>
              <Text
                style={{
                  color: '#687078',
                  fontSize: 11,
                  fontWeight: '500',
                }}>
                Duration
              </Text>
              <Text
                style={{
                  color: '#17191C',
                  fontSize: 14,
                  fontWeight: '700',
                  marginTop: 3,
                }}>
                {currentRide.duration}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#DDD9CF',
                width: 1,
              }}
            />
            <View style={{alignItems: 'center', flex: 1}}>
              <Text
                style={{
                  color: '#687078',
                  fontSize: 11,
                  fontWeight: '500',
                }}>
                Rider
              </Text>
              <Text
                style={{
                  color: '#17191C',
                  fontSize: 14,
                  fontWeight: '700',
                  marginTop: 3,
                }}>
                {currentRide.rider}
              </Text>
            </View>
          </View>

          {/* Cancellation Notice if cancelled */}
          {isCancelled ? (
            <View
              style={{
                backgroundColor: '#FDE6E3',
                borderColor: '#F8B6AC',
                borderRadius: 14,
                borderWidth: 1,
                padding: 14,
              }}>
              <Text
                style={{
                  color: '#F26B5B',
                  fontSize: 13,
                  fontWeight: '700',
                }}>
                Cancellation Reason
              </Text>
              <Text
                style={{
                  color: '#9C3D32',
                  fontSize: 12,
                  marginTop: 2,
                }}>
                {currentRide.cancellationReason || 'Cancelled before trip started.'}
              </Text>
            </View>
          ) : null}

          {/* Fare Breakdown */}
          {!isCancelled ? (
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E6E2D8',
                borderRadius: 16,
                borderWidth: 1,
                padding: 16,
              }}>
              <Text
                style={{
                  color: '#17191C',
                  fontSize: 14,
                  fontWeight: '700',
                  letterSpacing: -0.2,
                  marginBottom: 12,
                }}>
                Fare Breakdown
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 4,
                }}>
                <Text style={{color: '#687078', fontSize: 13}}>Base Fare</Text>
                <Text style={{color: '#17191C', fontSize: 13, fontWeight: '600'}}>
                  {breakdown.baseFare || '₹50'}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 4,
                }}>
                <Text style={{color: '#687078', fontSize: 13}}>Distance Fare</Text>
                <Text style={{color: '#17191C', fontSize: 13, fontWeight: '600'}}>
                  {breakdown.distanceFare || '₹95'}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 4,
                }}>
                <Text style={{color: '#687078', fontSize: 13}}>Time Fare</Text>
                <Text style={{color: '#17191C', fontSize: 13, fontWeight: '600'}}>
                  {breakdown.timeFare || '₹35'}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 4,
                }}>
                <Text style={{color: '#687078', fontSize: 13}}>Platform Fee & Taxes</Text>
                <Text style={{color: '#17191C', fontSize: 13, fontWeight: '600'}}>
                  {breakdown.taxes || '₹15'}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#EBE7DC',
                  height: 1,
                  marginVertical: 8,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 4,
                }}>
                <Text
                  style={{
                    color: '#17191C',
                    fontSize: 14,
                    fontWeight: '700',
                  }}>
                  Driver Net Earnings
                </Text>
                <Text
                  style={{
                    color: '#18A66A',
                    fontSize: 16,
                    fontWeight: '800',
                  }}>
                  {breakdown.driverEarning || currentRide.fare}
                </Text>
              </View>
            </View>
          ) : null}

          {/* Done Button */}
          <Pressable
            style={{
              alignItems: 'center',
              backgroundColor: '#FFC928',
              borderRadius: 14,
              justifyContent: 'center',
              marginTop: 8,
              paddingVertical: 14,
            }}
            onPress={closeModal}
            accessibilityRole="button"
            accessibilityLabel="Done"
          >
            <Text
              style={{
                color: '#17191C',
                fontSize: 15,
                fontWeight: '700',
              }}>
              Done
            </Text>
          </Pressable>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

export default RideDetailsModal;
