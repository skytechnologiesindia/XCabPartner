import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { icons } from '../../assets/icons';

/**
 * CantFindRiderOption
 * Single reusable row option component for the "Can't find the rider?" sheet.
 * Matches XCAB design with pure inline CSS styles.
 */
function CantFindRiderOption({
  id,
  title,
  subtitle,
  icon,
  onPress,
}) {
  const getIconSource = () => {
    switch (icon) {
      case 'location':
        return icons.pinDark;
      case 'phone':
        return icons.phone;
      case 'chat':
        return icons.chat;
      case 'clock':
        return icons.statClock;
      default:
        return icons.pinDark;
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        {
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderColor: '#ECE7DB',
          borderRadius: 16,
          borderWidth: 1,
          flexDirection: 'row',
          marginBottom: 10,
          paddingHorizontal: 16,
          paddingVertical: 14,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.03,
          shadowRadius: 3,
          elevation: 1,
        },
        pressed && {
          backgroundColor: '#F7F5EF',
          borderColor: '#DDD9CF',
          transform: [{ scale: 0.995 }],
        },
      ]}
      onPress={() => onPress && onPress(id)}
      accessibilityRole="button"
      accessibilityLabel={`${title}: ${subtitle}`}
    >
      {/* 1. Left Icon Container */}
      <View
        style={{
          alignItems: 'center',
          height: 36,
          justifyContent: 'center',
          marginRight: 12,
          width: 36,
        }}
      >
        <Image
          source={getIconSource()}
          style={{
            height: 20,
            resizeMode: 'contain',
            tintColor: '#17191C',
            width: 20,
          }}
        />
      </View>

      {/* 2. Middle Content Column */}
      <View style={{ flex: 1, paddingRight: 6 }}>
        <Text
          style={{
            color: '#17191C',
            fontSize: 14.5,
            fontWeight: '700',
            letterSpacing: -0.2,
          }}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text
          style={{
            color: '#687078',
            fontSize: 12,
            fontWeight: '400',
            marginTop: 3,
          }}
          numberOfLines={2}
        >
          {subtitle}
        </Text>
      </View>

      {/* 3. Right Chevron Indicator */}
      <Text
        style={{
          color: '#17191C',
          fontSize: 18,
          fontWeight: '600',
          marginLeft: 8,
        }}
      >
        ›
      </Text>
    </Pressable>
  );
}

export default CantFindRiderOption;
