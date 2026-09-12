import React from 'react';
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

function EndTripSheet({
  pickupLocation = 'Main Road, Ranchi',
  dropLocation = 'Lalpur Market, Ranchi',
  tripDuration = '18 min',
  distance = '6.4 km',
  estimatedFare = '₹180',
  onComplete,
  onReportIssue,
}) {
  return (
    <View style={styles.sheetContainer}>
      {/* Top Badge: TRIP COMPLETE */}
      <View style={styles.badgeRow}>
        <View style={styles.badge}>
          <Image source={icons.checkCircle} style={styles.badgeIcon} />
          <Text style={styles.badgeText}>TRIP COMPLETE</Text>
        </View>
      </View>

      {/* Heading & Subtitle */}
      <Text style={styles.heading}>End this trip?</Text>
      <Text style={styles.subheading}>
        Confirm only after the rider has exited.
      </Text>

      {/* Trip Route Card */}
      <View style={styles.routeCard}>
        {/* Route Track */}
        <View style={styles.timelineTrack}>
          <View style={styles.pickupOuter}>
            <View style={styles.pickupInner} />
          </View>
          <View style={styles.timelineDash} />
          <View style={styles.timelineDash} />
          <View style={styles.dropOuter}>
            <View style={styles.dropInner} />
          </View>
        </View>

        {/* Addresses */}
        <View style={styles.addressesWrap}>
          <Text style={styles.addressText} numberOfLines={1}>
            {pickupLocation}
          </Text>
          <Text style={[styles.addressText, styles.dropAddressText]} numberOfLines={1}>
            {dropLocation}
          </Text>
        </View>
      </View>

      {/* 3 Trip Stats Cards */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{tripDuration}</Text>
          <Text style={styles.statLabel}>TRIP DURATION</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>{distance}</Text>
          <Text style={styles.statLabel}>DISTANCE</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>{estimatedFare}</Text>
          <Text style={styles.statLabel}>ESTIMATED FARE</Text>
        </View>
      </View>

      {/* Primary Action Button: Complete trip */}
      <Pressable
        style={({pressed}) => [
          styles.primaryButton,
          pressed && styles.primaryButtonPressed,
        ]}
        onPress={onComplete}
        accessibilityRole="button"
        accessibilityLabel="Complete Trip">
        <Text style={styles.primaryButtonText}>Complete trip</Text>
        <Text style={styles.primaryArrow}>→</Text>
      </Pressable>

      {/* Secondary Action Button: Report an issue */}
      <Pressable
        style={({pressed}) => [
          styles.secondaryButton,
          pressed && styles.secondaryButtonPressed,
        ]}
        onPress={onReportIssue}
        accessibilityRole="button"
        accessibilityLabel="Report an issue">
        <Image source={icons.flag} style={styles.flagIcon} />
        <Text style={styles.secondaryButtonText}>Report an issue</Text>
      </Pressable>
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
    paddingBottom: 14,
    paddingHorizontal: 16,
    paddingTop: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.08,
    shadowRadius: 10,
    width: '100%',
  },
  badgeRow: {
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  badge: {
    alignItems: 'center',
    backgroundColor: '#DDF5E9',
    borderColor: '#BFE7D3',
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeIcon: {
    height: 14,
    resizeMode: 'contain',
    width: 14,
  },
  badgeText: {
    color: '#16A34A',
    fontFamily: fontSans,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  heading: {
    color: '#111315',
    fontFamily: fontSans,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  subheading: {
    color: '#6B7280',
    fontFamily: fontSans,
    fontSize: 13,
    marginTop: 4,
  },
  routeCard: {
    alignItems: 'center',
    backgroundColor: '#F5F2E8',
    borderColor: '#E8E1D2',
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 12,
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  timelineTrack: {
    alignItems: 'center',
    marginRight: 12,
    width: 14,
  },
  pickupOuter: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#F5A623',
    borderRadius: 7,
    borderWidth: 2.5,
    height: 14,
    justifyContent: 'center',
    width: 14,
  },
  pickupInner: {
    backgroundColor: '#F5A623',
    borderRadius: 3,
    height: 5,
    width: 5,
  },
  timelineDash: {
    backgroundColor: '#B5AFA2',
    borderRadius: 1,
    height: 3.5,
    marginVertical: 1.5,
    width: 2,
  },
  dropOuter: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E8505B',
    borderRadius: 3,
    borderWidth: 2.5,
    height: 14,
    justifyContent: 'center',
    width: 14,
  },
  dropInner: {
    backgroundColor: '#E8505B',
    borderRadius: 1,
    height: 4.5,
    width: 4.5,
  },
  addressesWrap: {
    flex: 1,
  },
  addressText: {
    color: '#111315',
    fontFamily: fontSans,
    fontSize: 13.5,
    fontWeight: '700',
  },
  dropAddressText: {
    marginTop: 10,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 11,
  },
  statValue: {
    color: '#111315',
    fontFamily: fontSans,
    fontSize: 15.5,
    fontWeight: '800',
  },
  statLabel: {
    color: '#78716C',
    fontFamily: fontSans,
    fontSize: 8.5,
    fontWeight: '700',
    letterSpacing: 0.3,
    marginTop: 3,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.yellow500 || '#FFD21A',
    borderRadius: 14,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    marginBottom: 8,
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
    fontSize: 15.5,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  primaryArrow: {
    color: '#111315',
    fontSize: 20,
    fontWeight: '800',
    position: 'absolute',
    right: 20,
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#D8D4C8',
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    height: 46,
    justifyContent: 'center',
  },
  secondaryButtonPressed: {
    backgroundColor: '#F5F3EB',
  },
  flagIcon: {
    height: 16,
    resizeMode: 'contain',
    tintColor: '#111315',
    width: 16,
  },
  secondaryButtonText: {
    color: '#111315',
    fontFamily: fontSans,
    fontSize: 14,
    fontWeight: '700',
  },
});

export default EndTripSheet;
