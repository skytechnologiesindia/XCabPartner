import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { icons } from '../../assets/icons';

/**
 * EarningsStats
 * Displays 3 key driver performance metrics (Rides, Online Time, Avg Fare)
 * inside a clean white card. Data-driven through props.
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
    <View style={styles.card}>
      {/* 1. Rides */}
      <View style={styles.statCol}>
        <Image
          source={icons.rides}
          style={styles.icon}
          tintColor="#17191C"
          resizeMode="contain"
        />
        <Text style={styles.valueText}>{rides}</Text>
        <Text style={styles.labelText}>{ridesLabel}</Text>
      </View>

      <View style={styles.divider} />

      {/* 2. Online Time */}
      <View style={styles.statCol}>
        <Image
          source={icons.statClock}
          style={styles.icon}
          tintColor="#17191C"
          resizeMode="contain"
        />
        <Text style={styles.valueText}>{onlineTime}</Text>
        <Text style={styles.labelText}>{onlineTimeLabel}</Text>
      </View>

      <View style={styles.divider} />

      {/* 3. Avg Fare */}
      <View style={styles.statCol}>
        <Image
          source={icons.statWallet}
          style={styles.icon}
          tintColor="#17191C"
          resizeMode="contain"
        />
        <Text style={styles.valueText}>{avgFare}</Text>
        <Text style={styles.labelText}>{avgFareLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#DDD9CF',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 14,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  statCol: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    height: 18,
    marginBottom: 6,
    width: 20,
  },
  valueText: {
    color: '#17191C',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  labelText: {
    color: '#687078',
    fontSize: 11,
    fontWeight: '500',
    marginTop: 3,
  },
  divider: {
    backgroundColor: '#DDD9CF',
    height: 38,
    width: 1,
  },
});

export default EarningsStats;
