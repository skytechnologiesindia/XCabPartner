import React from 'react';
import {
  Image,
  Pressable,
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
    <View
      style={{
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
      }}
    >
      {/* Decorative Golden Arcs in Background */}
      <View
        pointerEvents="none"
        style={{
          borderColor: 'rgba(255, 201, 40, 0.14)',
          borderRadius: 150,
          borderWidth: 1.5,
          height: 220,
          position: 'absolute',
          right: -60,
          top: -60,
          width: 220,
        }}
      />
      <View
        pointerEvents="none"
        style={{
          borderColor: 'rgba(255, 201, 40, 0.10)',
          borderRadius: 120,
          borderWidth: 1.5,
          height: 170,
          position: 'absolute',
          right: -35,
          top: -35,
          width: 170,
        }}
      />

      {/* Top Section: Avatar + Driver Info + Chevron */}
      <Pressable
        style={{
          alignItems: 'center',
          flexDirection: 'row',
        }}
        onPress={onPressCard}
        accessibilityRole="button"
        accessibilityLabel={`Driver ${profile.name}, ${profile.phone}`}
      >
        {/* Avatar with Edit Pencil Badge */}
        <View style={{ position: 'relative' }}>
          <Image
            source={profile.avatar}
            style={{
              borderColor: '#FFFFFF',
              borderRadius: 30,
              borderWidth: 2,
              height: 60,
              width: 60,
            }}
            resizeMode="cover"
          />
          {onEditAvatar ? (
            <Pressable
              style={{
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
              }}
              onPress={onEditAvatar}
              accessibilityRole="button"
              accessibilityLabel="Edit profile picture"
            >
              <Text style={{ color: '#17191C', fontSize: 11, fontWeight: '800', marginTop: -1 }}>
                ✎
              </Text>
            </Pressable>
          ) : null}
        </View>

        {/* Info Column */}
        <View style={{ flex: 1, marginLeft: 14 }}>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 19,
              fontWeight: '800',
              letterSpacing: -0.3,
            }}
            numberOfLines={1}
          >
            {profile.name}
          </Text>
          <Text
            style={{
              color: '#9CA3AF',
              fontSize: 13,
              fontWeight: '500',
              marginTop: 2,
            }}
          >
            {profile.phone}
          </Text>

          {profile.verified ? (
            <View
              style={{
                alignItems: 'center',
                alignSelf: 'flex-start',
                backgroundColor: 'rgba(22, 163, 74, 0.2)',
                borderRadius: 12,
                flexDirection: 'row',
                marginTop: 6,
                paddingHorizontal: 8,
                paddingVertical: 3,
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: '#22C55E',
                  borderRadius: 6,
                  height: 12,
                  justifyContent: 'center',
                  marginRight: 5,
                  width: 12,
                }}
              >
                <Text
                  style={{
                    color: '#15171B',
                    fontSize: 8,
                    fontWeight: '900',
                    lineHeight: 9,
                  }}
                >
                  ✓
                </Text>
              </View>
              <Text
                style={{
                  color: '#22C55E',
                  fontSize: 11,
                  fontWeight: '700',
                  letterSpacing: 0.2,
                }}
              >
                Verified Driver
              </Text>
            </View>
          ) : null}
        </View>

        {/* Golden Chevron */}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 8,
          }}
        >
          <Text
            style={{
              color: '#FFC928',
              fontSize: 24,
              fontWeight: '600',
            }}
          >
            ›
          </Text>
        </View>
      </Pressable>

      {/* Horizontal Divider */}
      <View
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          height: 1,
          marginVertical: 14,
        }}
      />

      {/* Bottom Section: Vehicle Info + "View Vehicle Details" CTA */}
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            flexDirection: 'row',
          }}
        >
          <Image
            source={icons.rides}
            style={{
              height: 22,
              marginRight: 10,
              width: 22,
            }}
            tintColor="#FFFFFF"
            resizeMode="contain"
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 13.5,
                fontWeight: '700',
              }}
              numberOfLines={1}
            >
              {profile.vehicle?.type || 'White Sedan'}
            </Text>
            <Text
              style={{
                color: '#8A929A',
                fontSize: 11.5,
                fontWeight: '500',
                marginTop: 1,
              }}
              numberOfLines={1}
            >
              {profile.vehicle?.registration || 'JH01 AB 4821'}
            </Text>
          </View>
        </View>

        {/* Thin Vertical Divider */}
        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            height: 26,
            marginHorizontal: 10,
            width: 1,
          }}
        />

        {/* View Vehicle Details CTA */}
        <Pressable
          style={({ pressed }) => [
            {
              alignItems: 'center',
              backgroundColor: '#22252A',
              borderColor: '#33373F',
              borderRadius: 8,
              borderWidth: 1,
              flexDirection: 'row',
              paddingHorizontal: 10,
              paddingVertical: 6,
            },
            pressed && {
              backgroundColor: '#2C3138',
            },
          ]}
          onPress={onViewVehicle}
          accessibilityRole="button"
          accessibilityLabel="View Vehicle Details"
        >
          <Text
            style={{
              color: '#E5E7EB',
              fontSize: 11.5,
              fontWeight: '600',
            }}
          >
            View Vehicle Details
          </Text>
          <Text
            style={{
              color: '#9CA3AF',
              fontSize: 13,
              fontWeight: '700',
              marginLeft: 4,
            }}
          >
            ›
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default ProfileCard;
