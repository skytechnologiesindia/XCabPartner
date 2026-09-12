import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {icons} from '../../assets/icons';

function StatsRow({
  earnings = '₹1,240',
  rides = '07',
  onlineHours = '4.8',
  onEarningsPress,
  onRidesPress,
  onHoursPress,
}) {
  return (
    <View style={styles.container}>
      {/* 1. Today's Earnings */}
      <Pressable
        style={styles.card}
        onPress={onEarningsPress}
        accessibilityRole="button"
        accessibilityLabel="Today's Earnings">
        <View style={[styles.iconWrap, styles.iconWrapEarnings]}>
          <Image source={icons.statWallet} style={styles.iconImage} />
        </View>
        <Text style={styles.label} numberOfLines={1}>
          TODAY&apos;S EARNINGS
        </Text>
        <View style={styles.valueRow}>
          <Text style={styles.value} numberOfLines={1}>
            {earnings}
          </Text>
          <Image source={icons.chevronRight} style={styles.chevron} />
        </View>
      </Pressable>

      {/* 2. Rides Completed */}
      <Pressable
        style={styles.card}
        onPress={onRidesPress}
        accessibilityRole="button"
        accessibilityLabel="Rides Completed">
        <View style={[styles.iconWrap, styles.iconWrapRides]}>
          <Image source={icons.statCar} style={styles.iconImage} />
        </View>
        <Text style={styles.label} numberOfLines={1}>
          RIDES COMPLETED
        </Text>
        <View style={styles.valueRow}>
          <Text style={styles.value} numberOfLines={1}>
            {rides}
          </Text>
          <Image source={icons.chevronRight} style={styles.chevron} />
        </View>
      </Pressable>

      {/* 3. Online Hours */}
      <Pressable
        style={styles.card}
        onPress={onHoursPress}
        accessibilityRole="button"
        accessibilityLabel="Online Hours">
        <View style={[styles.iconWrap, styles.iconWrapHours]}>
          <Image source={icons.statClock} style={styles.iconImage} />
        </View>
        <Text style={styles.label} numberOfLines={1}>
          ONLINE HOURS
        </Text>
        <View style={styles.valueRow}>
          <View style={styles.unitRow}>
            <Text style={styles.value}>{onlineHours}</Text>
            <Text style={styles.unit}> hrs</Text>
          </View>
          <Image source={icons.chevronRight} style={styles.chevron} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#ECE7DB',
    borderRadius: 18,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 11,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  iconWrap: {
    alignItems: 'center',
    borderRadius: 10,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  iconWrapEarnings: {
    backgroundColor: '#FAF5EA',
  },
  iconWrapRides: {
    backgroundColor: '#EDF8F2',
  },
  iconWrapHours: {
    backgroundColor: '#EEF4FA',
  },
  iconImage: {
    height: 16,
    resizeMode: 'contain',
    width: 16,
  },
  label: {
    color: '#6B7280',
    fontSize: 8.5,
    fontWeight: '700',
    letterSpacing: 0.2,
    marginTop: 8,
  },
  valueRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  value: {
    color: '#111315',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  unitRow: {
    alignItems: 'baseline',
    flexDirection: 'row',
  },
  unit: {
    color: '#111315',
    fontSize: 11.5,
    fontWeight: '700',
  },
  chevron: {
    height: 10,
    resizeMode: 'contain',
    width: 10,
  },
});

export default StatsRow;

