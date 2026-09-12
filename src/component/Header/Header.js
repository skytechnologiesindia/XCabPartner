import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../assets/colors/colors';
import {icons} from '../../assets/icons';
import {images} from '../../assets/images';

function Header({
  location = 'Ranchi, Jharkhand',
  onNotificationPress,
  onProfilePress,
  onLocationPress,
}) {
  return (
    <View style={styles.header}>
      <View style={styles.topRow}>
        {/* Left: XCAB Logo */}
        <View style={styles.brandLockup}>
          <Text style={styles.logoX}>X</Text>
          <Text style={styles.logoCab}>CAB</Text>
        </View>

        {/* Right Actions: Notification Bell + Driver Profile Avatar */}
        <View style={styles.rightActions}>
          <Pressable
            style={styles.bellButton}
            onPress={onNotificationPress}
            accessibilityRole="button"
            accessibilityLabel="Notifications">
            <Image
              source={icons.bellOutline}
              style={styles.bellIcon}
              tintColor="#111315"
            />
            <View style={styles.bellBadge} />
          </Pressable>

          <Pressable
            style={styles.avatarWrapper}
            onPress={onProfilePress}
            accessibilityRole="button"
            accessibilityLabel="Driver Profile">
            <Image
              source={images.driverAvatar}
              style={styles.avatarImage}
              resizeMode="cover"
            />
            {/* Green Online Status Dot */}
            <View style={styles.onlineBadge} />
          </Pressable>
        </View>
      </View>

      {/* Location Row: Location Pin + Ranchi, Jharkhand + Dropdown */}
      <Pressable
        style={styles.locationRow}
        onPress={onLocationPress}
        accessibilityRole="button"
        accessibilityLabel="Change Location">
        <Image
          source={icons.pinDark}
          style={styles.pinIcon}
          tintColor="#111315"
        />
        <Text style={styles.locationText}>{location}</Text>
        <Image
          source={icons.chevronDown}
          style={styles.chevronIcon}
          tintColor="#111315"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.ivory50 || '#F7F5EE',
    paddingBottom: 10,
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  brandLockup: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  logoX: {
    color: colors.yellow500 || '#FFD21A',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  logoCab: {
    color: '#111315',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  rightActions: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  bellButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#ECE8DE',
    borderRadius: 21,
    borderWidth: 1,
    height: 42,
    justifyContent: 'center',
    position: 'relative',
    width: 42,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  bellIcon: {
    height: 20,
    resizeMode: 'contain',
    width: 20,
  },
  bellBadge: {
    backgroundColor: colors.yellow500 || '#FFD21A',
    borderColor: '#FFFFFF',
    borderRadius: 5,
    borderWidth: 2,
    height: 10,
    position: 'absolute',
    right: 7,
    top: 6,
    width: 10,
  },
  avatarWrapper: {
    alignItems: 'center',
    borderColor: '#ECE8DE',
    borderRadius: 22,
    borderWidth: 1.5,
    height: 44,
    justifyContent: 'center',
    position: 'relative',
    width: 44,
  },
  avatarImage: {
    borderRadius: 20,
    height: 40,
    width: 40,
  },
  onlineBadge: {
    backgroundColor: '#10B981',
    borderColor: '#FFFFFF',
    borderRadius: 6,
    borderWidth: 2,
    bottom: -1,
    height: 12,
    position: 'absolute',
    right: -1,
    width: 12,
  },
  locationRow: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    marginTop: 2,
    paddingVertical: 2,
  },
  pinIcon: {
    height: 14,
    marginRight: 6,
    resizeMode: 'contain',
    width: 14,
  },
  locationText: {
    color: '#111315',
    fontSize: 13.5,
    fontWeight: '700',
    letterSpacing: -0.1,
  },
  chevronIcon: {
    height: 9,
    marginLeft: 5,
    marginTop: 1,
    resizeMode: 'contain',
    width: 9,
  },
});

export default Header;

