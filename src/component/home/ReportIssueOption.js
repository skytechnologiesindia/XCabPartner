import React from 'react';
import {
  Image,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import { icons } from '../../assets/icons';

const fontSans = Platform.select({
  ios: 'System',
  android: 'sans-serif',
});

/**
 * ReportIssueOption
 * Single reusable row option component for the "Report an issue" sheet.
 * Supports standard categories and highlighted safety concern styling.
 */
function ReportIssueOption({
  id,
  title,
  subtitle,
  icon,
  isSafety = false,
  onPress,
}) {
  const getIcon = () => {
    switch (icon) {
      case 'wallet':
        return icons.statWallet || icons.payment;
      case 'rider':
        return icons.profile || icons.profileActive;
      case 'lost_item':
        return icons.promoTag || icons.desk;
      case 'document':
        return icons.mapList || icons.road;
      case 'vehicle':
        return icons.mapCar || icons.rides;
      case 'safety':
        return icons.shield;
      case 'dots':
        return icons.chat || icons.desk;
      default:
        return icons.flag;
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        {
          alignItems: 'center',
          backgroundColor: isSafety ? '#FFF5F5' : '#FFFFFF',
          borderColor: isSafety ? '#FED7D7' : '#ECE7DB',
          borderRadius: 16,
          borderWidth: 1,
          flexDirection: 'row',
          marginBottom: 10,
          paddingHorizontal: 14,
          paddingVertical: 13,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.04,
          shadowRadius: 3,
          elevation: 1,
        },
        pressed && {
          backgroundColor: isSafety ? '#FEE2E2' : '#F7F5EF',
          borderColor: isSafety ? '#FCA5A5' : '#DDD9CF',
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
          backgroundColor: isSafety ? '#EF4444' : '#FFF4C7',
          borderRadius: 12,
          height: 38,
          justifyContent: 'center',
          marginRight: 12,
          width: 38,
        }}
      >
        <Image
          source={getIcon()}
          style={{
            height: 20,
            resizeMode: 'contain',
            tintColor: isSafety ? '#FFFFFF' : '#17191C',
            width: 20,
          }}
        />
      </View>

      {/* 2. Middle Content Column */}
      <View style={{ flex: 1, paddingRight: 6 }}>
        <Text
          style={{
            color: isSafety ? '#DC2626' : '#17191C',
            fontFamily: fontSans,
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
            color: isSafety ? '#E53E3E' : '#687078',
            fontFamily: fontSans,
            fontSize: 12,
            fontWeight: '400',
            marginTop: 2,
          }}
          numberOfLines={2}
        >
          {subtitle}
        </Text>
      </View>

      {/* 3. Right Chevron Indicator */}
      <Text
        style={{
          color: isSafety ? '#EF4444' : '#9CA3AF',
          fontFamily: fontSans,
          fontSize: 18,
          fontWeight: '700',
          marginLeft: 6,
        }}
      >
        ›
      </Text>
    </Pressable>
  );
}

export default ReportIssueOption;
