import React from 'react';
import {
  Image,
  Pressable,
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
        {
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
        pressed && {
          backgroundColor: '#FAF9F5',
          transform: [{ scale: 0.995 }],
        },
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${subtitle || ''}`}
    >
      {/* 1. Left Accent Circle with Icon */}
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#F4F2EB',
          borderRadius: 20,
          height: 40,
          justifyContent: 'center',
          width: 40,
        }}
      >
        <MenuIcon type={iconType} />
      </View>

      {/* 2. Middle Content Column */}
      <View
        style={{
          flex: 1,
          marginLeft: 14,
          marginRight: 8,
        }}
      >
        <Text
          style={{
            color: '#17191C',
            fontSize: 15,
            fontWeight: '700',
            letterSpacing: -0.2,
          }}
          numberOfLines={1}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            style={{
              color: '#687078',
              fontSize: 12.5,
              fontWeight: '400',
              marginTop: 2.5,
            }}
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>

      {/* 3. Right Chevron Arrow */}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: 4,
        }}
      >
        <Text
          style={{
            color: '#17191C',
            fontSize: 19,
            fontWeight: '600',
          }}
        >
          ›
        </Text>
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
        <View
          style={{
            alignItems: 'center',
            height: 20,
            justifyContent: 'center',
            width: 20,
          }}
        >
          <View
            style={{
              borderColor: '#17191C',
              borderRadius: 5,
              borderWidth: 1.8,
              height: 9,
              marginBottom: 1.5,
              width: 9,
            }}
          />
          <View
            style={{
              borderColor: '#17191C',
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
              borderWidth: 1.8,
              borderBottomWidth: 0,
              height: 7,
              width: 16,
            }}
          />
        </View>
      );

    case 'car':
      return (
        <Image
          source={icons.rides}
          style={{
            height: 19,
            width: 19,
          }}
          tintColor="#17191C"
          resizeMode="contain"
        />
      );

    case 'card':
      return (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              borderColor: '#17191C',
              borderRadius: 3,
              borderWidth: 1.8,
              height: 14,
              justifyContent: 'center',
              paddingLeft: 2,
              width: 19,
            }}
          >
            <View
              style={{
                backgroundColor: '#17191C',
                borderRadius: 1,
                height: 4,
                width: 5,
              }}
            />
          </View>
        </View>
      );

    case 'shield':
      return (
        <Image
          source={icons.shield}
          style={{
            height: 19,
            width: 19,
          }}
          tintColor="#17191C"
          resizeMode="contain"
        />
      );

    case 'help':
      return (
        <View
          style={{
            alignItems: 'center',
            borderColor: '#17191C',
            borderRadius: 10,
            borderWidth: 1.8,
            height: 19,
            justifyContent: 'center',
            width: 19,
          }}
        >
          <Text
            style={{
              color: '#17191C',
              fontSize: 12,
              fontWeight: '800',
              marginTop: -1,
            }}
          >
            ?
          </Text>
        </View>
      );

    case 'settings':
    default:
      return (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              color: '#17191C',
              fontSize: 19,
              lineHeight: 21,
            }}
          >
            ⚙
          </Text>
        </View>
      );
  }
}

export default ProfileMenuItem;
