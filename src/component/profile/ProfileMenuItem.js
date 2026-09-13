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
 * ProfileMenuItem
 * Reusable row card for each setting / profile category.
 */
function ProfileMenuItem({
  title,
  subtitle,
  iconType,
  onPress,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${subtitle || ''}`}
    >
      {/* 1. Left Accent Circle with Icon */}
      <View style={styles.iconCircle}>
        <MenuIcon type={iconType} />
      </View>

      {/* 2. Middle Content Column */}
      <View style={styles.contentCol}>
        <Text style={styles.titleText} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.subtitleText} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      {/* 3. Right Chevron Arrow */}
      <View style={styles.chevronWrapper}>
        <Text style={styles.chevronIcon}>›</Text>
      </View>
    </Pressable>
  );
}

/**
 * Renders the category icon for each profile menu item
 */
function MenuIcon({ type }) {
  switch (type) {
    case 'user':
      return (
        <View style={styles.userIconWrapper}>
          <View style={styles.userHead} />
          <View style={styles.userBody} />
        </View>
      );

    case 'car':
      return (
        <Image
          source={icons.rides}
          style={styles.imgIcon}
          tintColor="#17191C"
          resizeMode="contain"
        />
      );

    case 'card':
      return (
        <View style={styles.cardIconWrapper}>
          <View style={styles.cardOutline}>
            <View style={styles.cardChip} />
          </View>
        </View>
      );

    case 'shield':
      return (
        <Image
          source={icons.shield}
          style={styles.imgIcon}
          tintColor="#17191C"
          resizeMode="contain"
        />
      );

    case 'help':
      return (
        <View style={styles.helpCircle}>
          <Text style={styles.helpQuestion}>?</Text>
        </View>
      );

    case 'settings':
    default:
      return (
        <View style={styles.gearIconWrapper}>
          <Text style={styles.gearText}>⚙</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#EFECE6',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  cardPressed: {
    backgroundColor: '#FAF9F5',
    transform: [{ scale: 0.995 }],
  },
  iconCircle: {
    alignItems: 'center',
    backgroundColor: '#F4F2EB',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  imgIcon: {
    height: 19,
    width: 19,
  },
  contentCol: {
    flex: 1,
    marginLeft: 14,
    marginRight: 8,
  },
  titleText: {
    color: '#17191C',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  subtitleText: {
    color: '#687078',
    fontSize: 12.5,
    fontWeight: '400',
    marginTop: 2.5,
  },
  chevronWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 4,
  },
  chevronIcon: {
    color: '#17191C',
    fontSize: 19,
    fontWeight: '600',
  },
  // Vector icons
  userIconWrapper: {
    alignItems: 'center',
    height: 20,
    justifyContent: 'center',
    width: 20,
  },
  userHead: {
    borderColor: '#17191C',
    borderRadius: 5,
    borderWidth: 1.8,
    height: 9,
    marginBottom: 1.5,
    width: 9,
  },
  userBody: {
    borderColor: '#17191C',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderWidth: 1.8,
    borderBottomWidth: 0,
    height: 7,
    width: 16,
  },
  cardIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardOutline: {
    borderColor: '#17191C',
    borderRadius: 3,
    borderWidth: 1.8,
    height: 14,
    justifyContent: 'center',
    paddingLeft: 2,
    width: 19,
  },
  cardChip: {
    backgroundColor: '#17191C',
    borderRadius: 1,
    height: 4,
    width: 5,
  },
  helpCircle: {
    alignItems: 'center',
    borderColor: '#17191C',
    borderRadius: 10,
    borderWidth: 1.8,
    height: 19,
    justifyContent: 'center',
    width: 19,
  },
  helpQuestion: {
    color: '#17191C',
    fontSize: 12,
    fontWeight: '800',
    marginTop: -1,
  },
  gearIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gearText: {
    color: '#17191C',
    fontSize: 19,
    lineHeight: 21,
  },
});

export default ProfileMenuItem;
