import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { images } from '../../assets/images';

/**
 * PersonalDetailsCard
 * Hero profile identity card matching the reference visual design:
 * - Driver avatar with bottom-right verified checkmark badge
 * - Driver name ("Raj Kumar")
 * - "Verified Driver" green pill badge
 * - "Driver ID: XC784521"
 */
function PersonalDetailsCard({
  data,
  onEditAvatar,
  onPressCard,
}) {
  const avatarSource = data?.avatar || images.driverAvatar;
  const fullName = data?.fullName || 'Raj Kumar';
  const driverId = data?.driverId || 'XC784521';
  const isVerified = data?.isVerified !== false;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        (onEditAvatar || onPressCard) && pressed && styles.cardPressed,
      ]}
      onPress={onEditAvatar || onPressCard}
      accessibilityRole="button"
      accessibilityLabel={`Driver ${fullName}, ID: ${driverId}, Verified Driver`}
    >
      {/* 1. Left: Circular Avatar with Verified Badge */}
      <View style={styles.avatarWrapper}>
        <Image
          source={avatarSource}
          style={styles.avatarImage}
          resizeMode="cover"
        />
        {isVerified ? (
          <View style={styles.verifiedCheckBadge}>
            <Text style={styles.checkMarkSymbol}>✓</Text>
          </View>
        ) : null}
      </View>

      {/* 2. Right: Driver Identity Column */}
      <View style={styles.infoCol}>
        <Text style={styles.nameText} numberOfLines={1}>
          {fullName}
        </Text>

        {isVerified ? (
          <View style={styles.driverStatusBadge}>
            <View style={styles.statusCheckCircle}>
              <Text style={styles.badgeCheckSymbol}>✓</Text>
            </View>
            <Text style={styles.statusBadgeText}>Verified Driver</Text>
          </View>
        ) : null}

        <Text style={styles.driverIdText}>
          Driver ID: <Text style={styles.driverIdValue}>{driverId}</Text>
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#EFECE6',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1.5,
  },
  cardPressed: {
    backgroundColor: '#FAF9F5',
    transform: [{ scale: 0.995 }],
  },
  avatarWrapper: {
    height: 72,
    position: 'relative',
    width: 72,
  },
  avatarImage: {
    borderColor: '#F1EEE5',
    borderRadius: 36,
    borderWidth: 1.5,
    height: 72,
    width: 72,
  },
  verifiedCheckBadge: {
    alignItems: 'center',
    backgroundColor: '#18A66A',
    borderColor: '#FFFFFF',
    borderRadius: 11,
    borderWidth: 2,
    bottom: -1,
    height: 22,
    justifyContent: 'center',
    position: 'absolute',
    right: -1,
    width: 22,
  },
  checkMarkSymbol: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 14,
    marginTop: -1,
  },
  infoCol: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 16,
  },
  nameText: {
    color: '#17191C',
    fontSize: 21,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  driverStatusBadge: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#DDF5E9',
    borderRadius: 12,
    flexDirection: 'row',
    gap: 5,
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 3.5,
  },
  statusCheckCircle: {
    alignItems: 'center',
    backgroundColor: '#18A66A',
    borderRadius: 7,
    height: 14,
    justifyContent: 'center',
    width: 14,
  },
  badgeCheckSymbol: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    marginTop: -1,
  },
  statusBadgeText: {
    color: '#18A66A',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: -0.1,
  },
  driverIdText: {
    color: '#687078',
    fontSize: 13,
    fontWeight: '400',
    marginTop: 6,
  },
  driverIdValue: {
    color: '#17191C',
    fontWeight: '600',
  },
});

export default PersonalDetailsCard;
