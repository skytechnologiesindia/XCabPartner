import React from 'react';
import { Image, Text, View } from 'react-native';
import { icons } from '../../assets/icons';
import styles from '../../assets/styles/styles';

/**
 * EarningsStats
 * Displays 3 key driver performance metrics (Rides, Online Time, Avg Fare)
 * inside a clean white card with utility styles. Data-driven through props.
 */
function EarningsStats({
  rides = 26,
  ridesLabel = 'Rides',
  onlineTime = '9h 32m',
  onlineTimeLabel = 'Online Time',
  avgFare = '₹186',
  avgFareLabel = 'Avg. Fare',
}) {
  return (
    <View
      style={[
        styles.mb16,
        styles.pdv16,
        {
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderColor: '#DDD9CF',
          borderRadius: 16,
          borderWidth: 1,
          flexDirection: 'row',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.03,
          shadowRadius: 6,
          elevation: 2,
        },
      ]}
    >
      {/* 1. Rides */}
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <Image
          source={icons.rides}
          style={[
            styles.mb8,
            {
              height: 18,
              width: 20,
            },
          ]}
          tintColor="#17191C"
          resizeMode="contain"
        />
        <Text
          style={[
            styles.ts17,
            {
              color: '#17191C',
              fontWeight: '800',
              letterSpacing: -0.2,
            },
          ]}
        >
          {rides}
        </Text>
        <Text
          style={[
            styles.ts11,
            styles.mt4,
            {
              color: '#687078',
              fontWeight: '500',
            },
          ]}
        >
          {ridesLabel}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: '#DDD9CF',
          height: 38,
          width: 1,
        }}
      />

      {/* 2. Online Time */}
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <Image
          source={icons.statClock}
          style={[
            styles.mb8,
            {
              height: 18,
              width: 20,
            },
          ]}
          tintColor="#17191C"
          resizeMode="contain"
        />
        <Text
          style={[
            styles.ts17,
            {
              color: '#17191C',
              fontWeight: '800',
              letterSpacing: -0.2,
            },
          ]}
        >
          {onlineTime}
        </Text>
        <Text
          style={[
            styles.ts11,
            styles.mt4,
            {
              color: '#687078',
              fontWeight: '500',
            },
          ]}
        >
          {onlineTimeLabel}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: '#DDD9CF',
          height: 38,
          width: 1,
        }}
      />

      {/* 3. Avg Fare */}
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <Image
          source={icons.statWallet}
          style={[
            styles.mb8,
            {
              height: 18,
              width: 20,
            },
          ]}
          tintColor="#17191C"
          resizeMode="contain"
        />
        <Text
          style={[
            styles.ts17,
            {
              color: '#17191C',
              fontWeight: '800',
              letterSpacing: -0.2,
            },
          ]}
        >
          {avgFare}
        </Text>
        <Text
          style={[
            styles.ts11,
            styles.mt4,
            {
              color: '#687078',
              fontWeight: '500',
            },
          ]}
        >
          {avgFareLabel}
        </Text>
      </View>
    </View>
  );
}

export default EarningsStats;
