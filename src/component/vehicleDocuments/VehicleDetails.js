import React from 'react';
import {
  Image,
  Text,
  View,
} from 'react-native';
import { icons } from '../../assets/icons';

/**
 * VehicleDetails
 * 4-column grid displaying key vehicle technical specifications
 * (Vehicle Type, Make & Model, Year, Color).
 */
function VehicleDetails({ vehicle }) {
  const type = vehicle?.type || 'Sedan';
  const makeModel = vehicle?.makeModel || 'Maruti Dzire';
  const year = vehicle?.year || '2022';
  const color = vehicle?.color || 'White';

  return (
    <View
      style={{
        borderTopColor: '#EFECE6',
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12,
      }}
    >
      {/* 1. Vehicle Type */}
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          paddingHorizontal: 2,
        }}
      >
        <Image
          source={icons.rides}
          style={{
            height: 18,
            marginBottom: 4,
            width: 18,
          }}
          tintColor="#17191C"
          resizeMode="contain"
        />
        <Text
          style={{
            color: '#687078',
            fontSize: 10.5,
            fontWeight: '500',
            marginBottom: 2,
            textAlign: 'center',
          }}
        >
          Vehicle Type
        </Text>
        <Text
          style={{
            color: '#17191C',
            fontSize: 13,
            fontWeight: '700',
            letterSpacing: -0.2,
            textAlign: 'center',
          }}
          numberOfLines={1}
        >
          {type}
        </Text>
      </View>

      {/* Vertical Divider */}
      <View
        style={{
          backgroundColor: '#EFECE6',
          height: 38,
          width: 1,
        }}
      />

      {/* 2. Make & Model */}
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          paddingHorizontal: 2,
        }}
      >
        <Text
          style={{
            color: '#17191C',
            fontSize: 15,
            lineHeight: 18,
            marginBottom: 4,
          }}
        >
          ⚙
        </Text>
        <Text
          style={{
            color: '#687078',
            fontSize: 10.5,
            fontWeight: '500',
            marginBottom: 2,
            textAlign: 'center',
          }}
        >
          Make & Model
        </Text>
        <Text
          style={{
            color: '#17191C',
            fontSize: 13,
            fontWeight: '700',
            letterSpacing: -0.2,
            textAlign: 'center',
          }}
          numberOfLines={1}
        >
          {makeModel}
        </Text>
      </View>

      {/* Vertical Divider */}
      <View
        style={{
          backgroundColor: '#EFECE6',
          height: 38,
          width: 1,
        }}
      />

      {/* 3. Year */}
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          paddingHorizontal: 2,
        }}
      >
        <View
          style={{
            borderColor: '#17191C',
            borderRadius: 2.5,
            borderWidth: 1.5,
            height: 15,
            justifyContent: 'center',
            marginBottom: 4,
            position: 'relative',
            width: 15,
          }}
        >
          <View
            style={{
              backgroundColor: '#17191C',
              height: 3,
              left: 0,
              position: 'absolute',
              right: 0,
              top: 0,
            }}
          />
          <View
            style={{
              alignSelf: 'center',
              backgroundColor: '#17191C',
              borderRadius: 1,
              height: 2,
              marginTop: 2,
              width: 2,
            }}
          />
        </View>
        <Text
          style={{
            color: '#687078',
            fontSize: 10.5,
            fontWeight: '500',
            marginBottom: 2,
            textAlign: 'center',
          }}
        >
          Year
        </Text>
        <Text
          style={{
            color: '#17191C',
            fontSize: 13,
            fontWeight: '700',
            letterSpacing: -0.2,
            textAlign: 'center',
          }}
          numberOfLines={1}
        >
          {year}
        </Text>
      </View>

      {/* Vertical Divider */}
      <View
        style={{
          backgroundColor: '#EFECE6',
          height: 38,
          width: 1,
        }}
      />

      {/* 4. Color */}
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          paddingHorizontal: 2,
        }}
      >
        <View
          style={{
            borderColor: '#17191C',
            borderRadius: 8,
            borderWidth: 1.5,
            height: 16,
            justifyContent: 'center',
            marginBottom: 4,
            paddingLeft: 3,
            width: 16,
          }}
        >
          <View
            style={{
              backgroundColor: '#17191C',
              borderRadius: 1.5,
              height: 3,
              width: 3,
            }}
          />
        </View>
        <Text
          style={{
            color: '#687078',
            fontSize: 10.5,
            fontWeight: '500',
            marginBottom: 2,
            textAlign: 'center',
          }}
        >
          Color
        </Text>
        <Text
          style={{
            color: '#17191C',
            fontSize: 13,
            fontWeight: '700',
            letterSpacing: -0.2,
            textAlign: 'center',
          }}
          numberOfLines={1}
        >
          {color}
        </Text>
      </View>
    </View>
  );
}

export default VehicleDetails;
