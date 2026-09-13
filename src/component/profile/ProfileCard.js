import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { icons } from '../../assets/icons';

/**
 * ProfileCard
 * Dark hero card displaying driver identity, verification status,
 * vehicle information, and quick navigation.
 */
function ProfileCard({ profile, onEditAvatar, onPressCard, onViewVehicle }) {
  if (!profile) return null;

  return (
    <View style={styles.card}>
      {/* Decorative Golden Arcs in Background */}
      <View pointerEvents="none" style={styles.decorArcOuter} />
      <View pointerEvents="none" style={styles.decorArcInner} />

      {/* Top Section: Avatar + Driver Info + Chevron */}
      <Pressable
        style={styles.topRow}
        onPress={onPressCard}
        accessibilityRole="button"
        accessibilityLabel={`Driver ${profile.name}, ${profile.phone}`}
      >
        {/* Avatar with Edit Pencil Badge */}
        <View style={styles.avatarContainer}>
          <Image
            source={profile.avatar}
            style={styles.avatarImage}
            resizeMode="cover"
          />
          <Pressable
            style={styles.editBadge}
            onPress={onEditAvatar || onPressCard}
            accessibilityRole="button"
            accessibilityLabel="Edit profile picture"
          >
            <Text style={styles.pencilIcon}>✎</Text>
          </Pressable>
        </View>

        {/* Info Column */}
        <View style={styles.infoCol}>
          <Text style={styles.driverName} numberOfLines={1}>
            {profile.name}
          </Text>
          <Text style={styles.driverPhone}>{profile.phone}</Text>

          {profile.verified ? (
            <View style={styles.verifiedBadge}>
              <View style={styles.checkCircle}>
                <Text style={styles.checkMark}>✓</Text>
              </View>
              <Text style={styles.verifiedText}>Verified Driver</Text>
            </View>
          ) : null}
        </View>

        {/* Golden Chevron */}
        <View style={styles.chevronWrapper}>
          <Text style={styles.goldChevron}>›</Text>
        </View>
      </Pressable>

      {/* Horizontal Divider */}
      <View style={styles.divider} />

      {/* Bottom Section: Vehicle Info + "View Vehicle Details" CTA */}
      <View style={styles.bottomRow}>
        <View style={styles.vehicleInfo}>
          <Image
            source={icons.rides}
            style={styles.carIcon}
            tintColor="#FFFFFF"
            resizeMode="contain"
          />
          <View style={styles.vehicleTextCol}>
            <Text style={styles.vehicleType} numberOfLines={1}>
              {profile.vehicle?.type || 'White Sedan'}
            </Text>
            <Text style={styles.vehiclePlate} numberOfLines={1}>
              {profile.vehicle?.registration || 'JH01 AB 4821'}
            </Text>
          </View>
        </View>

        {/* Thin Vertical Divider */}
        <View style={styles.verticalDivider} />

        {/* View Vehicle Details CTA */}
        <Pressable
          style={({ pressed }) => [
            styles.vehicleButton,
            pressed && styles.vehicleButtonPressed,
          ]}
          onPress={onViewVehicle}
          accessibilityRole="button"
          accessibilityLabel="View Vehicle Details"
        >
          <Text style={styles.vehicleButtonText}>View Vehicle Details</Text>
          <Text style={styles.vehicleButtonChevron}>›</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#15171B',
    borderRadius: 20,
    marginBottom: 14,
    overflow: 'hidden',
    padding: 16,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  decorArcOuter: {
    borderColor: 'rgba(255, 201, 40, 0.14)',
    borderRadius: 150,
    borderWidth: 1.5,
    height: 220,
    position: 'absolute',
    right: -60,
    top: -60,
    width: 220,
  },
  decorArcInner: {
    borderColor: 'rgba(255, 201, 40, 0.10)',
    borderRadius: 120,
    borderWidth: 1.5,
    height: 170,
    position: 'absolute',
    right: -35,
    top: -35,
    width: 170,
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarImage: {
    borderColor: '#FFFFFF',
    borderRadius: 30,
    borderWidth: 2,
    height: 60,
    width: 60,
  },
  editBadge: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#15171B',
    borderRadius: 11,
    borderWidth: 1.5,
    bottom: -2,
    height: 22,
    justifyContent: 'center',
    position: 'absolute',
    right: -2,
    width: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  pencilIcon: {
    color: '#17191C',
    fontSize: 11,
    fontWeight: '800',
    marginTop: -1,
  },
  infoCol: {
    flex: 1,
    marginLeft: 14,
  },
  driverName: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  driverPhone: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 2,
  },
  verifiedBadge: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(22, 163, 74, 0.2)',
    borderRadius: 12,
    flexDirection: 'row',
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  checkCircle: {
    alignItems: 'center',
    backgroundColor: '#22C55E',
    borderRadius: 6,
    height: 12,
    justifyContent: 'center',
    marginRight: 5,
    width: 12,
  },
  checkMark: {
    color: '#15171B',
    fontSize: 8,
    fontWeight: '900',
    lineHeight: 9,
  },
  verifiedText: {
    color: '#22C55E',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  chevronWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 8,
  },
  goldChevron: {
    color: '#FFC928',
    fontSize: 24,
    fontWeight: '600',
  },
  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    height: 1,
    marginVertical: 14,
  },
  bottomRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vehicleInfo: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  carIcon: {
    height: 22,
    marginRight: 10,
    width: 22,
  },
  vehicleTextCol: {
    flex: 1,
  },
  vehicleType: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '700',
  },
  vehiclePlate: {
    color: '#8A929A',
    fontSize: 11.5,
    fontWeight: '500',
    marginTop: 1,
  },
  verticalDivider: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    height: 26,
    marginHorizontal: 10,
    width: 1,
  },
  vehicleButton: {
    alignItems: 'center',
    backgroundColor: '#22252A',
    borderColor: '#33373F',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  vehicleButtonPressed: {
    backgroundColor: '#2C3138',
  },
  vehicleButtonText: {
    color: '#E5E7EB',
    fontSize: 11.5,
    fontWeight: '600',
  },
  vehicleButtonChevron: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 4,
  },
});

export default ProfileCard;
