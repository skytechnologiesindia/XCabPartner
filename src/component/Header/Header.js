import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { colors } from '../../assets/colors/colors';
import { icons } from '../../assets/icons';
import { images } from '../../assets/images';
import styles from '../../assets/styles/styles';

function Header({
  location = 'Ranchi, Jharkhand',
  onNotificationPress,
  onProfilePress,
  onLocationPress,
}) {
  return (
    <View
      style={[
        styles.pdh16,
        styles.pdb12,
        styles.pdt8,
        {
          backgroundColor: colors.ivory50 || '#F7F5EE',
        },
      ]}
    >
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {/* Left: XCAB Logo */}
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <Text
            style={[
              styles.ts28,
              {
                color: colors.yellow500 || '#FFD21A',
                fontWeight: '900',
                letterSpacing: -0.5,
              },
            ]}
          >
            X
          </Text>
          <Text
            style={[
              styles.ts28,
              {
                color: '#111315',
                fontWeight: '900',
                letterSpacing: -0.5,
              },
            ]}
          >
            CAB
          </Text>
        </View>

        {/* Right Actions: Notification Bell + Driver Profile Avatar */}
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            gap: 12,
          }}
        >
          <Pressable
            style={({ pressed }) => [
              {
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
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 1,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
            onPress={onNotificationPress}
            accessibilityRole="button"
            accessibilityLabel="Notifications"
          >
            <Image
              source={icons.bellOutline}
              style={{
                height: 20,
                width: 20,
              }}
              resizeMode="contain"
              tintColor="#111315"
            />
            <View
              style={{
                backgroundColor: colors.yellow500 || '#FFD21A',
                borderColor: '#FFFFFF',
                borderRadius: 5,
                borderWidth: 2,
                height: 10,
                position: 'absolute',
                right: 7,
                top: 6,
                width: 10,
              }}
            />
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              {
                alignItems: 'center',
                borderColor: '#ECE8DE',
                borderRadius: 22,
                borderWidth: 1.5,
                height: 44,
                justifyContent: 'center',
                position: 'relative',
                width: 44,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
            onPress={onProfilePress}
            accessibilityRole="button"
            accessibilityLabel="Driver Profile"
          >
            <Image
              source={images.driverAvatar}
              style={{
                borderRadius: 20,
                height: 40,
                width: 40,
              }}
              resizeMode="cover"
            />
            {/* Green Online Status Dot */}
            <View
              style={{
                backgroundColor: '#10B981',
                borderColor: '#FFFFFF',
                borderRadius: 6,
                borderWidth: 2,
                bottom: -1,
                height: 12,
                position: 'absolute',
                right: -1,
                width: 12,
              }}
            />
          </Pressable>
        </View>
      </View>

      {/* Location Row: Location Pin + Ranchi, Jharkhand + Dropdown */}
      <Pressable
        style={({ pressed }) => [
          styles.mt4,
          styles.pdv4,
          {
            alignItems: 'center',
            alignSelf: 'flex-start',
            flexDirection: 'row',
            opacity: pressed ? 0.7 : 1,
          },
        ]}
        onPress={onLocationPress}
        accessibilityRole="button"
        accessibilityLabel="Change Location"
      >
        <Image
          source={icons.pinDark}
          style={[
            styles.mr8,
            {
              height: 14,
              width: 14,
            },
          ]}
          resizeMode="contain"
          tintColor="#111315"
        />
        <Text
          style={[
            styles.ts13,
            {
              color: '#111315',
              fontWeight: '700',
              letterSpacing: -0.1,
            },
          ]}
        >
          {location}
        </Text>
        <Image
          source={icons.chevronDown}
          style={[
            styles.ml4,
            {
              height: 9,
              marginTop: 1,
              width: 9,
            },
          ]}
          resizeMode="contain"
          tintColor="#111315"
        />
      </Pressable>
    </View>
  );
}

export default Header;

