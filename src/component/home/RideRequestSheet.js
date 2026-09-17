import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../assets/colors/colors';
import { icons } from '../../assets/icons';

const SAMPLE_REQUESTS = [
  {
    id: 'req_1',
    riderName: 'Aarav M.',
    rating: '4.8 (120)',
    pickupLocation: 'Main Road, Ranchi',
    dropLocation: 'Lalpur Market, Ranchi',
    distance: '3.2 km',
    estimatedFare: '₹180',
    paymentMethod: 'Cash / UPI',
    demand: 'NORMAL',
    pickupTime: '4 min',
  },
  {
    id: 'req_2',
    riderName: 'Priya S.',
    rating: '4.9 (86)',
    pickupLocation: 'Kanke Road, Ranchi',
    dropLocation: 'Hinoo Bridge, Ranchi',
    distance: '5.4 km',
    estimatedFare: '₹260',
    paymentMethod: 'Online / UPI',
    demand: 'HIGH DEMAND',
    pickupTime: '3 min',
  },
  {
    id: 'req_3',
    riderName: 'Rahul K.',
    rating: '4.7 (54)',
    pickupLocation: 'Circular Road, Ranchi',
    dropLocation: 'Doranda, Ranchi',
    distance: '4.1 km',
    estimatedFare: '₹210',
    paymentMethod: 'Cash',
    demand: 'NORMAL',
    pickupTime: '5 min',
  },
];

function RideRequestSheet({
  visible = true,
  onAccept,
  onDecline,
  onCallRider,
  onMessageRider,
}) {
  const insets = useSafeAreaInsets();
  const [requestIndex, setRequestIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(5);

  const progressAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const timerTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);

  const currentReq = SAMPLE_REQUESTS[requestIndex] || SAMPLE_REQUESTS[0];

  const clearTimers = useCallback(() => {
    if (timerTimeoutRef.current) {
      clearTimeout(timerTimeoutRef.current);
      timerTimeoutRef.current = null;
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    progressAnim.stopAnimation();
  }, [progressAnim]);

  const goToNextRequest = useCallback(() => {
    clearTimers();

    // Smooth fade transition
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 180,
      useNativeDriver: true,
    }).start(() => {
      setRequestIndex(prev => (prev + 1) % SAMPLE_REQUESTS.length);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }).start();
    });
  }, [clearTimers, fadeAnim]);

  // Start 5-second countdown on mount or when requestIndex changes
  useEffect(() => {
    if (!visible) {
      clearTimers();
      return;
    }

    clearTimers();
    setSecondsLeft(5);
    progressAnim.setValue(1);

    // Animate progress bar from 100% to 0% over 5000ms
    Animated.timing(progressAnim, {
      toValue: 0,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    // Update countdown seconds every 1000ms
    timerIntervalRef.current = setInterval(() => {
      setSecondsLeft(prev => (prev > 1 ? prev - 1 : 1));
    }, 1000);

    // Auto-switch to next request when 5 seconds elapse
    timerTimeoutRef.current = setTimeout(() => {
      goToNextRequest();
    }, 5000);

    return () => clearTimers();
  }, [visible, requestIndex, clearTimers, goToNextRequest, progressAnim]);

  const handleAccept = () => {
    clearTimers();
    if (onAccept) {
      onAccept(currentReq);
    }
  };

  const handleDecline = () => {
    goToNextRequest();
    if (onDecline) {
      onDecline();
    }
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const bottomPadding = (insets?.bottom || 0) > 0 ? insets.bottom + 8 : 16;
  const sheetContainerStyle = useMemo(
    () => [styles.sheetContainer, { paddingBottom: bottomPadding }],
    [bottomPadding],
  );

  if (!visible) {
    return null;
  }

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={handleDecline}>
      <View style={styles.backdrop}>
        <Pressable
          style={styles.backdropDismissArea}
          onPress={handleDecline}
          accessibilityRole="button"
          accessibilityLabel="Dismiss ride request"
        />
        <View style={sheetContainerStyle}>
          <Animated.View style={{ opacity: fadeAnim }}>
        {/* Header Row: Badge, Title & Rider Contact Buttons */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>NEW RIDE REQUEST</Text>
            </View>
            <Text style={styles.title}>
              Pickup in{' '}
              <Text style={styles.pickupHighlight}>{currentReq.pickupTime}</Text>
            </Text>
          </View>

          {/* Circular Phone & Message Contact Buttons */}
          <View style={styles.contactButtonsRow}>
            <Pressable
              style={styles.contactButton}
              onPress={onCallRider}
              accessibilityRole="button"
              accessibilityLabel="Call Rider">
              <Image source={icons.phone} style={styles.contactIcon} />
            </Pressable>
            <Pressable
              style={styles.contactButton}
              onPress={onMessageRider}
              accessibilityRole="button"
              accessibilityLabel="Message Rider">
              <Image source={icons.chat} style={styles.contactIcon} />
            </Pressable>
          </View>
        </View>

        {/* Rider Info Row */}
        <View style={styles.riderRow}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarLetter}>
              {currentReq.riderName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.riderMeta}>
            <Text style={styles.riderName}>{currentReq.riderName}</Text>
            <View style={styles.ratingRow}>
              <Text style={styles.starIcon}>★</Text>
              <Text style={styles.ratingText}>{currentReq.rating}</Text>
            </View>
          </View>
        </View>

        {/* Route Timeline (Pickup & Drop) */}
        <View style={styles.routeContainer}>
          {/* Timeline Visual Track */}
          <View style={styles.timelineTrack}>
            <View style={styles.pickupDot} />
            <View style={styles.timelineDash} />
            <View style={styles.timelineDash} />
            <View style={styles.timelineDash} />
            <View style={styles.dropSquare} />
          </View>

          {/* Address Texts */}
          <View style={styles.addressesWrap}>
            <View style={styles.addressBlock}>
              <Text style={styles.addressLabel}>PICKUP</Text>
              <Text style={styles.addressValue} numberOfLines={1}>
                {currentReq.pickupLocation}
              </Text>
            </View>

            <View style={[styles.addressBlock, styles.dropBlock]}>
              <Text style={styles.addressLabel}>DROP</Text>
              <Text style={styles.addressValue} numberOfLines={1}>
                {currentReq.dropLocation}
              </Text>
            </View>
          </View>
        </View>

        {/* Trip Information Row (4 stats columns) */}
        <View style={styles.tripInfoRow}>
          {/* Distance */}
          <View style={styles.infoCol}>
            <Image source={icons.road} style={styles.infoIcon} />
            <Text style={styles.infoValue}>{currentReq.distance}</Text>
            <Text style={styles.infoLabel}>Distance</Text>
          </View>

          {/* Est. Fare */}
          <View style={styles.infoCol}>
            <Text style={styles.currencySymbol}>₹</Text>
            <Text style={styles.infoValue}>{currentReq.estimatedFare}</Text>
            <Text style={styles.infoLabel}>Est. Fare</Text>
          </View>

          {/* Payment */}
          <View style={styles.infoCol}>
            <Image source={icons.payment} style={styles.infoIcon} />
            <Text style={styles.infoValue}>{currentReq.paymentMethod}</Text>
            <Text style={styles.infoLabel}>Payment</Text>
          </View>

          {/* Demand */}
          <View style={styles.infoCol}>
            <Image source={icons.meter} style={styles.infoIcon} />
            <Text style={styles.infoValue}>{currentReq.demand}</Text>
            <Text style={styles.infoLabel}>Demand</Text>
          </View>
        </View>
      </Animated.View>

      {/* Primary Action: Accept ride with 5-second countdown progress animation */}
      <Pressable
        style={({ pressed }) => [
          styles.acceptButton,
          pressed && styles.acceptButtonPressed,
        ]}
        onPress={handleAccept}
        accessibilityRole="button"
        accessibilityLabel="Accept Ride">
        {/* Animated Timer Progress Bar */}
        <Animated.View
          style={[
            styles.timerProgressBar,
            {
              width: progressWidth,
            },
          ]}
        />

        {/* Button Content */}
        <View style={styles.acceptContentRow}>
          <Text style={styles.acceptButtonText}>Accept ride</Text>
          <View style={styles.countdownPill}>
            <Text style={styles.countdownText}>{secondsLeft}s</Text>
          </View>
        </View>

        <Image source={icons.chevronRight} style={styles.acceptChevron} />
      </Pressable>

      {/* Secondary Action: Decline */}
      <Pressable
        style={({ pressed }) => [
          styles.declineButton,
          pressed && styles.declineButtonPressed,
        ]}
        onPress={handleDecline}
        accessibilityRole="button"
        accessibilityLabel="Decline Ride">
        <Text style={styles.declineClose}>✕</Text>
        <Text style={styles.declineButtonText}>Decline</Text>
      </Pressable>

      {/* Rider Privacy Disclaimer */}
      <View style={styles.privacyRow}>
        <View style={styles.checkboxIcon} />
        <Text style={styles.privacyText}>
          Rider details unlock after acceptance
        </Text>
      </View>
    </View>
  </View>
</Modal>
  );
}

const fontSans = Platform.select({
  ios: 'System',
  android: 'sans-serif',
});

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(17, 19, 21, 0.65)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdropDismissArea: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: '#FAF8F1',
    borderColor: '#ECE5D6',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
    width: '100%',
  },
  headerRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerLeft: {
    flex: 1,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FDE047',
    borderRadius: 8,
    marginBottom: 6,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#111315',
    fontFamily: fontSans,
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  title: {
    color: '#111315',
    fontFamily: fontSans,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  pickupHighlight: {
    color: '#EAB308',
  },
  contactButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  contactButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#EAE4D7',
    borderRadius: 22,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  contactIcon: {
    height: 18,
    resizeMode: 'contain',
    tintColor: '#111315',
    width: 18,
  },
  riderRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 14,
  },
  avatarCircle: {
    alignItems: 'center',
    backgroundColor: '#FDE68A',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  avatarLetter: {
    color: '#111315',
    fontFamily: fontSans,
    fontSize: 15,
    fontWeight: '800',
  },
  riderMeta: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
  },
  riderName: {
    color: '#111315',
    fontFamily: fontSans,
    fontSize: 15.5,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  ratingRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
  },
  starIcon: {
    color: '#EAB308',
    fontSize: 13,
    marginRight: 4,
  },
  ratingText: {
    color: '#6B7280',
    fontFamily: fontSans,
    fontSize: 13,
    fontWeight: '600',
  },
  routeContainer: {
    flexDirection: 'row',
    marginBottom: 14,
    paddingLeft: 4,
  },
  timelineTrack: {
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
    width: 16,
  },
  pickupDot: {
    backgroundColor: '#FFFFFF',
    borderColor: colors.yellow500 || '#FFD21A',
    borderRadius: 7,
    borderWidth: 3,
    height: 14,
    width: 14,
  },
  timelineDash: {
    backgroundColor: '#B5AFA2',
    borderRadius: 1,
    height: 4,
    marginVertical: 2,
    width: 2,
  },
  dropSquare: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E87861',
    borderRadius: 2,
    borderWidth: 3,
    height: 12,
    width: 12,
  },
  addressesWrap: {
    flex: 1,
  },
  addressBlock: {
    justifyContent: 'center',
  },
  dropBlock: {
    marginTop: 10,
  },
  addressLabel: {
    color: '#9CA3AF',
    fontFamily: fontSans,
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  addressValue: {
    color: '#111315',
    fontFamily: fontSans,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  tripInfoRow: {
    alignItems: 'center',
    backgroundColor: '#F5F2E8',
    borderColor: '#E8E1D2',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  infoCol: {
    alignItems: 'center',
    flex: 1,
  },
  infoIcon: {
    height: 15,
    resizeMode: 'contain',
    tintColor: '#111315',
    width: 15,
  },
  currencySymbol: {
    color: '#111315',
    fontFamily: fontSans,
    fontSize: 14,
    fontWeight: '800',
    height: 15,
    lineHeight: 16,
  },
  infoValue: {
    color: '#111315',
    fontFamily: fontSans,
    fontSize: 12.5,
    fontWeight: '800',
    letterSpacing: -0.1,
    marginTop: 3,
  },
  infoLabel: {
    color: '#6B7280',
    fontFamily: fontSans,
    fontSize: 9.5,
    fontWeight: '500',
    marginTop: 1,
  },
  acceptButton: {
    alignItems: 'center',
    backgroundColor: colors.yellow500 || '#FFD21A',
    borderRadius: 14,
    flexDirection: 'row',
    height: 48,
    justifyContent: 'center',
    marginBottom: 8,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  acceptButtonPressed: {
    opacity: 0.92,
  },
  timerProgressBar: {
    backgroundColor: '#E0A600',
    bottom: 0,
    left: 0,
    position: 'absolute',
    top: 0,
  },
  acceptContentRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 2,
  },
  acceptButtonText: {
    color: '#111315',
    fontFamily: fontSans,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  countdownPill: {
    backgroundColor: 'rgba(17, 19, 21, 0.15)',
    borderRadius: 10,
    marginLeft: 8,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  countdownText: {
    color: '#111315',
    fontFamily: fontSans,
    fontSize: 11.5,
    fontWeight: '800',
  },
  acceptChevron: {
    height: 12,
    position: 'absolute',
    resizeMode: 'contain',
    right: 18,
    tintColor: '#111315',
    width: 12,
    zIndex: 2,
  },
  declineButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#D8D4C8',
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 6,
    height: 44,
    justifyContent: 'center',
    marginBottom: 10,
  },
  declineButtonPressed: {
    backgroundColor: '#F5F3EB',
  },
  declineClose: {
    color: '#111315',
    fontSize: 13,
    fontWeight: '800',
  },
  declineButtonText: {
    color: '#111315',
    fontFamily: fontSans,
    fontSize: 14,
    fontWeight: '700',
  },
  privacyRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxIcon: {
    borderColor: '#9CA3AF',
    borderRadius: 3,
    borderWidth: 1.5,
    height: 12,
    marginRight: 6,
    width: 12,
  },
  privacyText: {
    color: '#6B7280',
    fontFamily: fontSans,
    fontSize: 11.5,
    fontWeight: '500',
  },
});

export default RideRequestSheet;


