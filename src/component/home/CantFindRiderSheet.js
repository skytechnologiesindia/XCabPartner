import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  Modal,
  PanResponder,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { icons } from '../../assets/icons';
import CantFindRiderOption from './CantFindRiderOption';
import { cantFindRiderOptions } from './rideIssueData';

/**
 * CantFindRiderSheet
 * Bottom sheet modal opened from At Pickup screen when driver taps "I can't find the rider".
 * Features interactive drag-down to dismiss gesture and clean header without close button.
 * Pure inline CSS styles.
 */
function CantFindRiderSheet({
  visible = false,
  waitTime = '02:23 min',
  onClose,
  onContinueWaiting,
  onCancelRide,
  onCallRider,
  onMessageRider,
  onOpenInMaps,
  onSubmitOtherIssue,
}) {
  const [selectedReason, setSelectedReason] = useState(null);
  const [otherText, setOtherText] = useState('');
  const translateY = useRef(new Animated.Value(450)).current;

  const handleClose = () => {
    Animated.timing(translateY, {
      toValue: 500,
      duration: 180,
      useNativeDriver: true,
    }).start(() => {
      if (onClose) {
        onClose();
      }
    });
  };

  // Drag down gesture responder
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 4,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 80 || gestureState.vy > 0.4) {
          Animated.timing(translateY, {
            toValue: 550,
            duration: 180,
            useNativeDriver: true,
          }).start(() => {
            if (onClose) {
              onClose();
            }
          });
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            damping: 20,
            stiffness: 250,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  // Slide up on open and reset reason
  useEffect(() => {
    if (visible) {
      setSelectedReason(null);
      setOtherText('');
      translateY.setValue(450);
      Animated.spring(translateY, {
        toValue: 0,
        damping: 22,
        stiffness: 220,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, translateY]);

  if (!visible) return null;

  const handleSelectOption = reasonId => {
    setSelectedReason(reasonId);
  };

  const handleBackToOptions = () => {
    setSelectedReason(null);
  };

  const handleConfirmCancel = () => {
    if (onCancelRide) {
      onCancelRide(selectedReason);
    }
    handleClose();
  };

  const handleSubmitOther = () => {
    if (onSubmitOtherIssue) {
      onSubmitOtherIssue(otherText);
    }
    handleClose();
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={handleClose}
    >
      {/* 1. Full Dark Translucent Backdrop (Locks Background Interaction) */}
      <Pressable
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          flex: 1,
          justifyContent: 'flex-end',
        }}
        onPress={handleClose}
      >
        {/* 2. Bottom Sheet Container with Drag Down Animation */}
        <Animated.View
          style={{
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            elevation: 16,
            paddingBottom: 24,
            paddingHorizontal: 16,
            paddingTop: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -6 },
            shadowOpacity: 0.16,
            shadowRadius: 14,
            transform: [{ translateY }],
            width: '100%',
          }}
          onStartShouldSetResponder={() => true}
          onTouchEnd={e => e.stopPropagation()}
        >
          {/* Top Interactive Drag Handle Area */}
          <View
            {...panResponder.panHandlers}
            style={{
              alignItems: 'center',
              paddingBottom: 10,
              paddingTop: 4,
              width: '100%',
            }}
          >
            <View
              style={{
                backgroundColor: '#C5C0B6',
                borderRadius: 2.5,
                height: 4.5,
                width: 40,
              }}
            />
          </View>

          {/* MAIN STEP: Reasons List (Exact Match with Provided Design) */}
          {!selectedReason ? (
            <>
              {/* Header: Sad face badge, title & subtitle (No cross button) */}
              <View
                style={{
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  marginBottom: 16,
                }}
              >
                {/* Left Sad Face Icon Badge */}
                <View
                  style={{
                    alignItems: 'center',
                    backgroundColor: '#FFF4C7',
                    borderRadius: 22,
                    height: 44,
                    justifyContent: 'center',
                    marginRight: 12,
                    width: 44,
                  }}
                >
                  <Text style={{ fontSize: 24, lineHeight: 28 }}>☹</Text>
                </View>

                {/* Title & Description */}
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: '#17191C',
                      fontSize: 19,
                      fontWeight: '800',
                      letterSpacing: -0.3,
                    }}
                  >
                    Can’t find the rider?
                  </Text>
                  <Text
                    style={{
                      color: '#687078',
                      fontSize: 12.5,
                      fontWeight: '400',
                      lineHeight: 17,
                      marginTop: 3,
                    }}
                  >
                    Let us know what’s happening. This helps us assist you faster.
                  </Text>
                </View>
              </View>

              {/* Options List */}
              <View style={{ marginBottom: 4 }}>
                {cantFindRiderOptions.map(option => (
                  <CantFindRiderOption
                    key={option.id}
                    id={option.id}
                    title={option.title}
                    subtitle={option.subtitle}
                    icon={option.icon}
                    onPress={handleSelectOption}
                  />
                ))}
              </View>

              {/* Bottom Cancel Button */}
              <Pressable
                style={({ pressed }) => [
                  {
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    borderColor: '#DDD9CF',
                    borderRadius: 14,
                    borderWidth: 1,
                    height: 48,
                    justifyContent: 'center',
                    marginTop: 4,
                    width: '100%',
                  },
                  pressed && { backgroundColor: '#F5F3EB' },
                ]}
                onPress={handleClose}
                accessibilityRole="button"
                accessibilityLabel="Cancel"
              >
                <Text
                  style={{
                    color: '#17191C',
                    fontSize: 15,
                    fontWeight: '700',
                  }}
                >
                  Cancel
                </Text>
              </Pressable>
            </>
          ) : selectedReason === 'rider_not_at_location' ? (
            /* STEP: Rider not at location */
            <View>
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: '#FFF4C7',
                  borderRadius: 26,
                  height: 52,
                  justifyContent: 'center',
                  marginBottom: 12,
                  width: 52,
                }}
              >
                <Image
                  source={icons.pinDark}
                  style={{ height: 24, width: 24, tintColor: '#17191C' }}
                  resizeMode="contain"
                />
              </View>

              <Text
                style={{
                  color: '#17191C',
                  fontSize: 19,
                  fontWeight: '800',
                  letterSpacing: -0.3,
                }}
              >
                Confirm rider not found?
              </Text>
              <Text
                style={{
                  color: '#687078',
                  fontSize: 13,
                  lineHeight: 18,
                  marginTop: 4,
                }}
              >
                You have reached the pickup point. We recommend waiting or contacting the rider before ending the trip.
              </Text>

              {/* Wait Time Info Box */}
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: '#FAF8F1',
                  borderColor: '#ECE7DB',
                  borderRadius: 14,
                  borderWidth: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 16,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                }}
              >
                <View style={{ alignItems: 'center', flexDirection: 'row', gap: 8 }}>
                  <Image
                    source={icons.statClock}
                    style={{ height: 18, width: 18, tintColor: '#17191C' }}
                    resizeMode="contain"
                  />
                  <Text style={{ color: '#17191C', fontSize: 13.5, fontWeight: '700' }}>
                    Current Wait Time:
                  </Text>
                </View>
                <Text style={{ color: '#10B981', fontSize: 15, fontWeight: '800' }}>
                  {waitTime}
                </Text>
              </View>

              {/* Actions */}
              <Pressable
                style={({ pressed }) => [
                  {
                    alignItems: 'center',
                    backgroundColor: pressed ? '#E5B420' : '#FFC928',
                    borderRadius: 14,
                    height: 48,
                    justifyContent: 'center',
                    marginBottom: 10,
                    width: '100%',
                  },
                ]}
                onPress={() => {
                  if (onContinueWaiting) onContinueWaiting();
                  handleClose();
                }}
              >
                <Text style={{ color: '#17191C', fontSize: 15, fontWeight: '800' }}>
                  Continue Waiting
                </Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  {
                    alignItems: 'center',
                    backgroundColor: pressed ? '#FDE8E8' : '#FFFFFF',
                    borderColor: '#F26B5B',
                    borderRadius: 14,
                    borderWidth: 1,
                    height: 48,
                    justifyContent: 'center',
                    marginBottom: 8,
                    width: '100%',
                  },
                ]}
                onPress={handleConfirmCancel}
              >
                <Text style={{ color: '#F26B5B', fontSize: 14.5, fontWeight: '700' }}>
                  End / Cancel Ride
                </Text>
              </Pressable>

              <Pressable
                style={{ alignItems: 'center', paddingVertical: 8 }}
                onPress={handleBackToOptions}
              >
                <Text style={{ color: '#687078', fontSize: 13, fontWeight: '600' }}>
                  ← Back to options
                </Text>
              </Pressable>
            </View>
          ) : selectedReason === 'cannot_reach_rider' ? (
            /* STEP: Cannot reach rider */
            <View>
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: '#EDF8F2',
                  borderRadius: 26,
                  height: 52,
                  justifyContent: 'center',
                  marginBottom: 12,
                  width: 52,
                }}
              >
                <Image
                  source={icons.phone}
                  style={{ height: 22, width: 22, tintColor: '#17191C' }}
                  resizeMode="contain"
                />
              </View>

              <Text
                style={{
                  color: '#17191C',
                  fontSize: 19,
                  fontWeight: '800',
                  letterSpacing: -0.3,
                }}
              >
                Can’t reach the rider?
              </Text>
              <Text
                style={{
                  color: '#687078',
                  fontSize: 13,
                  lineHeight: 18,
                  marginTop: 4,
                }}
              >
                Try connecting via call or chat. If they are still unreachable, you can report and cancel the trip.
              </Text>

              {/* Call & Message Buttons */}
              <View style={{ flexDirection: 'row', gap: 10, marginVertical: 16 }}>
                <Pressable
                  style={({ pressed }) => [
                    {
                      alignItems: 'center',
                      backgroundColor: pressed ? '#F0ECE1' : '#FFFFFF',
                      borderColor: '#DDD9CF',
                      borderRadius: 14,
                      borderWidth: 1,
                      flex: 1,
                      flexDirection: 'row',
                      gap: 8,
                      height: 48,
                      justifyContent: 'center',
                    },
                  ]}
                  onPress={() => {
                    if (onCallRider) onCallRider();
                    handleClose();
                  }}
                >
                  <Image
                    source={icons.phone}
                    style={{ height: 16, width: 16, tintColor: '#17191C' }}
                    resizeMode="contain"
                  />
                  <Text style={{ color: '#17191C', fontSize: 14, fontWeight: '700' }}>
                    Call Rider
                  </Text>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [
                    {
                      alignItems: 'center',
                      backgroundColor: pressed ? '#F0ECE1' : '#FFFFFF',
                      borderColor: '#DDD9CF',
                      borderRadius: 14,
                      borderWidth: 1,
                      flex: 1,
                      flexDirection: 'row',
                      gap: 8,
                      height: 48,
                      justifyContent: 'center',
                    },
                  ]}
                  onPress={() => {
                    if (onMessageRider) onMessageRider();
                    handleClose();
                  }}
                >
                  <Image
                    source={icons.chat}
                    style={{ height: 16, width: 16, tintColor: '#17191C' }}
                    resizeMode="contain"
                  />
                  <Text style={{ color: '#17191C', fontSize: 14, fontWeight: '700' }}>
                    Message Rider
                  </Text>
                </Pressable>
              </View>

              <Pressable
                style={({ pressed }) => [
                  {
                    alignItems: 'center',
                    backgroundColor: pressed ? '#FDE8E8' : '#FFFFFF',
                    borderColor: '#F26B5B',
                    borderRadius: 14,
                    borderWidth: 1,
                    height: 48,
                    justifyContent: 'center',
                    marginBottom: 8,
                    width: '100%',
                  },
                ]}
                onPress={handleConfirmCancel}
              >
                <Text style={{ color: '#F26B5B', fontSize: 14.5, fontWeight: '700' }}>
                  I still can’t reach the rider
                </Text>
              </Pressable>

              <Pressable
                style={{ alignItems: 'center', paddingVertical: 8 }}
                onPress={handleBackToOptions}
              >
                <Text style={{ color: '#687078', fontSize: 13, fontWeight: '600' }}>
                  ← Back to options
                </Text>
              </Pressable>
            </View>
          ) : selectedReason === 'wrong_pickup_location' ? (
            /* STEP: Wrong pickup location */
            <View>
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: '#EEF4FA',
                  borderRadius: 26,
                  height: 52,
                  justifyContent: 'center',
                  marginBottom: 12,
                  width: 52,
                }}
              >
                <Image
                  source={icons.chat}
                  style={{ height: 22, width: 22, tintColor: '#17191C' }}
                  resizeMode="contain"
                />
              </View>

              <Text
                style={{
                  color: '#17191C',
                  fontSize: 19,
                  fontWeight: '800',
                  letterSpacing: -0.3,
                }}
              >
                Wrong pickup location
              </Text>
              <Text
                style={{
                  color: '#687078',
                  fontSize: 13,
                  lineHeight: 18,
                  marginTop: 4,
                }}
              >
                The pickup location shown seems incorrect. Open navigation to check alternative routes or contact the rider.
              </Text>

              <View style={{ gap: 10, marginVertical: 16 }}>
                <Pressable
                  style={({ pressed }) => [
                    {
                      alignItems: 'center',
                      backgroundColor: pressed ? '#E5B420' : '#FFC928',
                      borderRadius: 14,
                      flexDirection: 'row',
                      gap: 8,
                      height: 48,
                      justifyContent: 'center',
                      width: '100%',
                    },
                  ]}
                  onPress={() => {
                    if (onOpenInMaps) onOpenInMaps();
                    handleClose();
                  }}
                >
                  <Image
                    source={icons.pinDark}
                    style={{ height: 16, width: 16, tintColor: '#17191C' }}
                    resizeMode="contain"
                  />
                  <Text style={{ color: '#17191C', fontSize: 15, fontWeight: '800' }}>
                    Open in Maps
                  </Text>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [
                    {
                      alignItems: 'center',
                      backgroundColor: pressed ? '#F0ECE1' : '#FFFFFF',
                      borderColor: '#DDD9CF',
                      borderRadius: 14,
                      borderWidth: 1,
                      flexDirection: 'row',
                      gap: 8,
                      height: 48,
                      justifyContent: 'center',
                      width: '100%',
                    },
                  ]}
                  onPress={() => {
                    if (onCallRider) onCallRider();
                    handleClose();
                  }}
                >
                  <Image
                    source={icons.phone}
                    style={{ height: 16, width: 16, tintColor: '#17191C' }}
                    resizeMode="contain"
                  />
                  <Text style={{ color: '#17191C', fontSize: 14.5, fontWeight: '700' }}>
                    Contact Rider
                  </Text>
                </Pressable>
              </View>

              <Pressable
                style={{ alignItems: 'center', paddingVertical: 8 }}
                onPress={handleBackToOptions}
              >
                <Text style={{ color: '#687078', fontSize: 13, fontWeight: '600' }}>
                  ← Back to options
                </Text>
              </Pressable>
            </View>
          ) : (
            /* STEP: Other issue */
            <View>
              <Text
                style={{
                  color: '#17191C',
                  fontSize: 19,
                  fontWeight: '800',
                  letterSpacing: -0.3,
                }}
              >
                Tell us what happened
              </Text>
              <Text
                style={{
                  color: '#687078',
                  fontSize: 13,
                  marginTop: 4,
                }}
              >
                Describe the issue you encountered at pickup.
              </Text>

              <TextInput
                style={{
                  backgroundColor: '#FAF8F1',
                  borderColor: '#DDD9CF',
                  borderRadius: 14,
                  borderWidth: 1,
                  color: '#17191C',
                  fontSize: 14,
                  height: 96,
                  marginVertical: 14,
                  padding: 12,
                  textAlignVertical: 'top',
                }}
                multiline={true}
                placeholder="Type your issue here..."
                placeholderTextColor="#9CA3AF"
                value={otherText}
                onChangeText={setOtherText}
              />

              <Pressable
                style={({ pressed }) => [
                  {
                    alignItems: 'center',
                    backgroundColor: pressed ? '#E5B420' : '#FFC928',
                    borderRadius: 14,
                    height: 48,
                    justifyContent: 'center',
                    marginBottom: 10,
                    width: '100%',
                  },
                ]}
                onPress={handleSubmitOther}
              >
                <Text style={{ color: '#17191C', fontSize: 15, fontWeight: '800' }}>
                  Submit
                </Text>
              </Pressable>

              <Pressable
                style={{ alignItems: 'center', paddingVertical: 8 }}
                onPress={handleBackToOptions}
              >
                <Text style={{ color: '#687078', fontSize: 13, fontWeight: '600' }}>
                  ← Back to options
                </Text>
              </Pressable>
            </View>
          )}
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

export default CantFindRiderSheet;
