import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '../../assets/colors/colors';
import {icons} from '../../assets/icons';
import ConfirmLocationModal from './ConfirmLocationModal';

function AtPickupSheet({
  riderName = 'Aarav M.',
  rating = '4.8 (120)',
  riderSubtitle = 'Rider · Cash | ₹180',
  pickupLocation = 'Main Road, Ranchi',
  dropLocation = 'Lalpur Market, Ranchi',
  initialSeconds = 134, // 02:14 in seconds
  isLocationConfirmed: propIsConfirmed,
  onLocationConfirmed,
  onEnterPin,
  onCantFind,
  onCallRider,
  onMessageRider,
  onOpenInMaps,
}) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const isLocationConfirmed =
    propIsConfirmed !== undefined ? propIsConfirmed : isConfirmed;

  const handleConfirmLocation = () => {
    setConfirmModalVisible(false);
    setIsConfirmed(true);
    if (onLocationConfirmed) {
      onLocationConfirmed();
    }
  };

  // Live waiting timer incrementing every second
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = totalSec => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    const pad = n => (n < 10 ? `0${n}` : `${n}`);
    return `${pad(mins)}:${pad(secs)}`;
  };

  return (
    <View style={styles.sheetContainer}>
      {/* Top Header: Badge, Heading, and Waiting Timer Card */}
      <View style={styles.topRow}>
        <View style={styles.topLeft}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>AT PICKUP</Text>
          </View>
          <Text style={styles.heading}>You’re at the pickup point</Text>
          <Text style={styles.subheading}>
            Wait for {riderName} to arrive before starting the trip.
          </Text>
        </View>

        {/* Waiting Timer Card */}
        <View style={styles.waitingCard}>
          <Text style={styles.waitingLabel}>WAITING</Text>
          <View style={styles.timerRow}>
            <Image source={icons.statClock} style={styles.clockIcon} />
            <Text style={styles.timerDigits}>{formatTimer(seconds)}</Text>
          </View>
          <Text style={styles.waitingUnit}>min</Text>
        </View>
      </View>

      {/* Trip Route Timeline & Open in Maps Button */}
      <View style={styles.routeRow}>
        {/* Timeline Visual Track */}
        <View style={styles.timelineTrack}>
          <View style={styles.pickupDot} />
          <View style={styles.timelineDash} />
          <View style={styles.timelineDash} />
          <View style={styles.timelineDash} />
          <View style={styles.dropSquare} />
        </View>

        {/* Addresses */}
        <View style={styles.addressesWrap}>
          <View style={styles.addressBlock}>
            <Text style={styles.addressLabel}>PICKUP</Text>
            <Text style={styles.addressValue} numberOfLines={1}>
              {pickupLocation}
            </Text>
          </View>

          <View style={[styles.addressBlock, styles.dropBlock]}>
            <Text style={styles.addressLabel}>DROP</Text>
            <Text style={styles.addressValue} numberOfLines={1}>
              {dropLocation}
            </Text>
          </View>
        </View>

        {/* Open in Maps Button */}
        <Pressable
          style={styles.openMapsButton}
          onPress={onOpenInMaps}
          accessibilityRole="button"
          accessibilityLabel="Open in Maps">
          <Image source={icons.pinDark} style={styles.openMapsIcon} />
          <Text style={styles.openMapsText}>Open in Maps</Text>
        </Pressable>
      </View>

      {/* Rider Info Card */}
      <View style={styles.riderCard}>
        <View style={styles.riderLeft}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarLetter}>
              {riderName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.riderMeta}>
            <View style={styles.riderNameRow}>
              <Text style={styles.riderName}>{riderName}</Text>
              <Text style={styles.starIcon}>★</Text>
              <Text style={styles.ratingText}>{rating}</Text>
            </View>
            <Text style={styles.riderSubtitle}>{riderSubtitle}</Text>
          </View>
        </View>

        {/* Call & Message Action Buttons */}
        <View style={styles.riderActions}>
          <Pressable
            style={styles.actionBtnItem}
            onPress={onCallRider}
            accessibilityRole="button"
            accessibilityLabel="Call Rider">
            <View style={styles.actionIconCircle}>
              <Image source={icons.phone} style={styles.actionBtnIcon} />
            </View>
            <Text style={styles.actionBtnLabel}>Call</Text>
          </Pressable>

          <Pressable
            style={styles.actionBtnItem}
            onPress={onMessageRider}
            accessibilityRole="button"
            accessibilityLabel="Message Rider">
            <View style={styles.actionIconCircle}>
              <Image source={icons.chat} style={styles.actionBtnIcon} />
            </View>
            <Text style={styles.actionBtnLabel}>Message</Text>
          </Pressable>
        </View>
      </View>

      {/* Primary Action Button: 'I am on location' vs 'Enter trip PIN' */}
      {!isLocationConfirmed ? (
        <Pressable
          style={({pressed}) => [
            styles.primaryButton,
            pressed && styles.primaryButtonPressed,
          ]}
          onPress={() => setConfirmModalVisible(true)}
          accessibilityRole="button"
          accessibilityLabel="I am on location">
          <Image source={icons.pinDark} style={styles.primaryPinIcon} />
          <Text style={styles.primaryButtonText}>I am on location</Text>
          <Image source={icons.chevronRight} style={styles.primaryChevron} />
        </Pressable>
      ) : (
        <Pressable
          style={({pressed}) => [
            styles.primaryButton,
            pressed && styles.primaryButtonPressed,
          ]}
          onPress={onEnterPin}
          accessibilityRole="button"
          accessibilityLabel="Enter Trip PIN">
          <Text style={styles.primaryButtonText}>Enter trip PIN</Text>
          <Image source={icons.chevronRight} style={styles.primaryChevron} />
        </Pressable>
      )}

      {/* Secondary Action Button: I can't find the rider */}
      <Pressable
        style={({pressed}) => [
          styles.secondaryButton,
          pressed && styles.secondaryButtonPressed,
        ]}
        onPress={onCantFind}
        accessibilityRole="button"
        accessibilityLabel="I Can't Find The Rider">
        <Image source={icons.cantFind} style={styles.cantFindIcon} />
        <Text style={styles.secondaryButtonText}>I can’t find the rider</Text>
      </Pressable>

      {/* Safety / PIN Disclaimer */}
      <View style={styles.safetyRow}>
        <Image source={icons.shield} style={styles.shieldIcon} />
        <Text style={styles.safetyText}>
          Never start without the rider PIN.
        </Text>
      </View>

      {/* Location Confirmation Modal */}
      <ConfirmLocationModal
        visible={confirmModalVisible}
        pickupLocation={pickupLocation}
        onConfirm={handleConfirmLocation}
        onCancel={() => setConfirmModalVisible(false)}
      />
    </View>
  );
}

const fontSans = Platform.select({
  ios: 'System',
  android: 'sans-serif',
});

const styles = StyleSheet.create({
  sheetContainer: {
    backgroundColor: '#FAF8F1',
    borderColor: '#ECE5D6',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 1,
    elevation: 10,
    marginTop: 0,
    paddingBottom: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -6},
    shadowOpacity: 0.12,
    shadowRadius: 12,
    width: '100%',
    zIndex: 20,
  },
  topRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  topLeft: {
    flex: 1,
    marginRight: 10,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FDE047',
    borderRadius: 8,
    marginBottom: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    color: '#111315',
    fontFamily: fontSans,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  heading: {
    color: '#111315',
    fontFamily: fontSans,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  subheading: {
    color: '#6B7280',
    fontFamily: fontSans,
    fontSize: 11,
    marginTop: 2,
  },
  waitingCard: {
    alignItems: 'center',
    backgroundColor: '#FAF5EA',
    borderColor: '#EFE6D4',
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  waitingLabel: {
    color: '#9CA3AF',
    fontFamily: fontSans,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  timerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 1,
  },
  clockIcon: {
    height: 14,
    marginRight: 4,
    resizeMode: 'contain',
    tintColor: '#111315',
    width: 14,
  },
  timerDigits: {
    color: '#111315',
    fontFamily: fontSans,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.2,
  },
  waitingUnit: {
    color: '#9CA3AF',
    fontFamily: fontSans,
    fontSize: 8.5,
    fontWeight: '500',
    marginTop: 1,
  },
  routeRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 6,
    marginTop: 0,
    paddingLeft: 4,
  },
  timelineTrack: {
    alignItems: 'center',
    marginRight: 10,
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
    marginTop: 8,
  },
  addressLabel: {
    color: '#9CA3AF',
    fontFamily: fontSans,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  addressValue: {
    color: '#111315',
    fontFamily: fontSans,
    fontSize: 13.5,
    fontWeight: '700',
    marginTop: 1,
  },
  openMapsButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E2DCD2',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 6,
    marginLeft: 8,
    paddingHorizontal: 11,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  openMapsIcon: {
    height: 14,
    resizeMode: 'contain',
    tintColor: '#111315',
    width: 14,
  },
  openMapsText: {
    color: '#111315',
    fontFamily: fontSans,
    fontSize: 11.5,
    fontWeight: '700',
  },
  riderCard: {
    alignItems: 'center',
    backgroundColor: '#F5F2E8',
    borderColor: '#E8E1D2',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  riderLeft: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatarCircle: {
    alignItems: 'center',
    backgroundColor: '#EBE6DC',
    borderRadius: 17,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  avatarLetter: {
    color: '#111315',
    fontFamily: fontSans,
    fontSize: 14.5,
    fontWeight: '800',
  },
  riderMeta: {
    marginLeft: 10,
  },
  riderNameRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  riderName: {
    color: '#111315',
    fontFamily: fontSans,
    fontSize: 14,
    fontWeight: '700',
  },
  starIcon: {
    color: '#EAB308',
    fontSize: 11.5,
    marginLeft: 6,
    marginRight: 3,
  },
  ratingText: {
    color: '#6B7280',
    fontFamily: fontSans,
    fontSize: 11.5,
    fontWeight: '600',
  },
  riderSubtitle: {
    color: '#6B7280',
    fontFamily: fontSans,
    fontSize: 11,
    marginTop: 1,
  },
  riderActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtnItem: {
    alignItems: 'center',
  },
  actionIconCircle: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E2DCD2',
    borderRadius: 17,
    borderWidth: 1,
    height: 34,
    justifyContent: 'center',
    width: 34,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  actionBtnIcon: {
    height: 14,
    resizeMode: 'contain',
    tintColor: '#111315',
    width: 14,
  },
  actionBtnLabel: {
    color: '#6B7280',
    fontFamily: fontSans,
    fontSize: 9,
    fontWeight: '600',
    marginTop: 1,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.yellow500 || '#FFD21A',
    borderRadius: 14,
    flexDirection: 'row',
    height: 44,
    justifyContent: 'center',
    marginBottom: 6,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  primaryButtonPressed: {
    backgroundColor: colors.yellow600 || '#E9B900',
    opacity: 0.92,
  },
  primaryButtonText: {
    color: '#111315',
    fontFamily: fontSans,
    fontSize: 14.5,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  primaryPinIcon: {
    height: 15,
    marginRight: 8,
    resizeMode: 'contain',
    tintColor: '#111315',
    width: 15,
  },
  primaryChevron: {
    height: 12,
    position: 'absolute',
    resizeMode: 'contain',
    right: 18,
    tintColor: '#111315',
    width: 12,
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#D8D4C8',
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    height: 38,
    justifyContent: 'center',
    marginBottom: 6,
  },
  secondaryButtonPressed: {
    backgroundColor: '#F5F3EB',
  },
  cantFindIcon: {
    height: 15,
    resizeMode: 'contain',
    tintColor: '#111315',
    width: 15,
  },
  secondaryButtonText: {
    color: '#111315',
    fontFamily: fontSans,
    fontSize: 13,
    fontWeight: '700',
  },
  safetyRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 0,
  },
  shieldIcon: {
    height: 13,
    marginRight: 5,
    resizeMode: 'contain',
    tintColor: '#6B7280',
    width: 13,
  },
  safetyText: {
    color: '#6B7280',
    fontFamily: fontSans,
    fontSize: 11.5,
    fontWeight: '500',
  },
});

export default AtPickupSheet;
