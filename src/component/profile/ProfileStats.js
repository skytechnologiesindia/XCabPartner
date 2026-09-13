import React from 'react';
import {
  Image,
  StyleSheet,
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
    <View style={styles.card}>
      {/* 1. Trips Column */}
      <View style={styles.statCol}>
        <View style={styles.iconCircle}>
          <Image
            source={icons.rides}
            style={styles.statIcon}
            tintColor="#17191C"
            resizeMode="contain"
          />
        </View>
        <Text style={styles.statValue}>{trips}</Text>
        <Text style={styles.statLabel}>Trips</Text>
      </View>

      {/* Divider */}
      <View style={styles.verticalDivider} />

      {/* 2. Earned Column */}
      <View style={styles.statCol}>
        <View style={styles.iconCircle}>
          <Text style={styles.rupeeIcon}>₹</Text>
        </View>
        <Text style={styles.statValue}>{earned}</Text>
        <Text style={styles.statLabel}>Earned</Text>
      </View>

      {/* Divider */}
      <View style={styles.verticalDivider} />

      {/* 3. Hrs Avg Online Column */}
      <View style={styles.statCol}>
        <View style={styles.iconCircle}>
          <Image
            source={icons.statClock}
            style={styles.statIcon}
            tintColor="#17191C"
            resizeMode="contain"
          />
        </View>
        <Text style={styles.statValue}>{avgOnline}</Text>
        <Text style={styles.statLabel}>Hrs Avg. Online</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
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
  },
  statCol: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  iconCircle: {
    alignItems: 'center',
    backgroundColor: '#F4F2EB',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    marginBottom: 8,
    width: 36,
  },
  statIcon: {
    height: 18,
    width: 18,
  },
  rupeeIcon: {
    color: '#17191C',
    fontSize: 16,
    fontWeight: '800',
  },
  statValue: {
    color: '#17191C',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  statLabel: {
    color: '#687078',
    fontSize: 11.5,
    fontWeight: '500',
    marginTop: 2,
  },
  verticalDivider: {
    backgroundColor: '#ECE8DE',
    height: 48,
    width: 1,
  },
});

export default ProfileStats;
