import React from 'react';
import {
  Image,
  Text,
  View,
} from 'react-native';
import { icons } from '../../assets/icons';

/**
 * ProfileStats
 * Displays driver milestone statistics (Trips, Total Earned, and Avg Online Hours)
 * in a clean 3-column white card with subtle vertical dividers.
 */
function ProfileStats({ stats }) {
  const trips = stats?.trips ?? 142;
  const earned = stats?.earned ?? '₹18,420';
  const avgOnline = stats?.avgOnlineHours ?? '4.8';

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#EFECE6',
        borderRadius: 18,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 14,
        paddingVertical: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 1.5,
      }}
    >
      {/* 1. Trips Column */}
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#F4F2EB',
            borderRadius: 18,
            height: 36,
            justifyContent: 'center',
            marginBottom: 8,
            width: 36,
          }}
        >
          <Image
            source={icons.rides}
            style={{
              height: 18,
              width: 18,
            }}
            tintColor="#17191C"
            resizeMode="contain"
          />
        </View>
        <Text
          style={{
            color: '#17191C',
            fontSize: 17,
            fontWeight: '800',
            letterSpacing: -0.3,
          }}
        >
          {trips}
        </Text>
        <Text
          style={{
            color: '#687078',
            fontSize: 11.5,
            fontWeight: '500',
            marginTop: 2,
          }}
        >
          Trips
        </Text>
      </View>

      {/* Divider */}
      <View
        style={{
          backgroundColor: '#ECE8DE',
          height: 48,
          width: 1,
        }}
      />

      {/* 2. Earned Column */}
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#F4F2EB',
            borderRadius: 18,
            height: 36,
            justifyContent: 'center',
            marginBottom: 8,
            width: 36,
          }}
        >
          <Text
            style={{
              color: '#17191C',
              fontSize: 16,
              fontWeight: '800',
            }}
          >
            ₹
          </Text>
        </View>
        <Text
          style={{
            color: '#17191C',
            fontSize: 17,
            fontWeight: '800',
            letterSpacing: -0.3,
          }}
        >
          {earned}
        </Text>
        <Text
          style={{
            color: '#687078',
            fontSize: 11.5,
            fontWeight: '500',
            marginTop: 2,
          }}
        >
          Earned
        </Text>
      </View>

      {/* Divider */}
      <View
        style={{
          backgroundColor: '#ECE8DE',
          height: 48,
          width: 1,
        }}
      />

      {/* 3. Hrs Avg Online Column */}
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#F4F2EB',
            borderRadius: 18,
            height: 36,
            justifyContent: 'center',
            marginBottom: 8,
            width: 36,
          }}
        >
          <Image
            source={icons.statClock}
            style={{
              height: 18,
              width: 18,
            }}
            tintColor="#17191C"
            resizeMode="contain"
          />
        </View>
        <Text
          style={{
            color: '#17191C',
            fontSize: 17,
            fontWeight: '800',
            letterSpacing: -0.3,
          }}
        >
          {avgOnline}
        </Text>
        <Text
          style={{
            color: '#687078',
            fontSize: 11.5,
            fontWeight: '500',
            marginTop: 2,
          }}
        >
          Hrs Avg. Online
        </Text>
      </View>
    </View>
  );
}

export default ProfileStats;
