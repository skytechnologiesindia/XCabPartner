import React from 'react';
import {
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';
import VehicleDetails from './VehicleDetails';

/**
 * VehicleCard
 * Primary card showcasing the active vehicle identity, thumbnail photo,
 * license plate, operational status badge, and specifications grid.
 */
function VehicleCard({ vehicle, onUpdatePress }) {
  if (!vehicle) return null;

  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#EFECE6',
        borderRadius: 18,
        borderWidth: 1,
        marginBottom: 14,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      {/* Top Row: Thumbnail + Identity + Update CTA */}
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          marginBottom: 14,
        }}
      >
        {/* Vehicle Image Thumbnail */}
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#F7F5EF',
            borderRadius: 12,
            height: 68,
            justifyContent: 'center',
            overflow: 'hidden',
            width: 90,
          }}
        >
          <Image
            source={vehicle.image}
            style={{
              height: 64,
              width: 86,
            }}
            resizeMode="contain"
          />
        </View>

        {/* Identity & Status */}
        <View
          style={{
            flex: 1,
            marginLeft: 12,
            marginRight: 6,
          }}
        >
          <Text
            style={{
              color: '#17191C',
              fontSize: 17,
              fontWeight: '800',
              letterSpacing: -0.3,
            }}
            numberOfLines={1}
          >
            {vehicle.name}
          </Text>
          <Text
            style={{
              color: '#687078',
              fontSize: 12.5,
              fontWeight: '500',
              marginTop: 2,
            }}
            numberOfLines={1}
          >
            {vehicle.registration}
          </Text>

          {/* Active on XCab Badge */}
          <View
            style={{
              alignItems: 'center',
              alignSelf: 'flex-start',
              backgroundColor: '#E6F8EF',
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
                backgroundColor: '#18A66A',
                borderRadius: 6,
                height: 12,
                justifyContent: 'center',
                marginRight: 4.5,
                width: 12,
              }}
            >
              <Text
                style={{
                  color: '#FFFFFF',
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
                color: '#18A66A',
                fontSize: 11,
                fontWeight: '700',
                letterSpacing: 0.1,
              }}
            >
              {vehicle.statusText || 'Active on XCab'}
            </Text>
          </View>
        </View>

        {/* Update Button */}
        <Pressable
          style={({ pressed }) => [
            {
              alignItems: 'center',
              backgroundColor: '#FFFBEB',
              borderColor: '#FDE68A',
              borderRadius: 10,
              borderWidth: 1.2,
              flexDirection: 'row',
              paddingHorizontal: 12,
              paddingVertical: 7,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.04,
              shadowRadius: 2,
              elevation: 1,
            },
            pressed && {
              backgroundColor: '#FEF3C7',
              opacity: 0.9,
            },
          ]}
          onPress={onUpdatePress}
          accessibilityRole="button"
          accessibilityLabel="Update vehicle details"
        >
          <Text
            style={{
              color: '#17191C',
              fontSize: 12,
              fontWeight: '800',
              marginRight: 4,
            }}
          >
            ✎
          </Text>
          <Text
            style={{
              color: '#17191C',
              fontSize: 12.5,
              fontWeight: '700',
              letterSpacing: -0.1,
            }}
          >
            Update
          </Text>
        </Pressable>
      </View>

      {/* Bottom Section: 4-Column Technical Specifications */}
      <VehicleDetails vehicle={vehicle} />
    </View>
  );
}

export default VehicleCard;
