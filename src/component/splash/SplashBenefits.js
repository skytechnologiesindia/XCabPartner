import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { icons } from '../../assets/icons';

/**
 * SplashBenefits
 * Three subtle horizontally aligned benefits:
 * 1. Safer Journeys (shield icon badge)
 * 2. Better Earnings (bar chart badge)
 * 3. Stronger Communities / More Rides (people/rides badge)
 */
function SplashBenefits({ thirdLabel = 'STRONGER\nCOMMUNITIES' }) {
  return (
    <View style={styles.container}>
      {/* 1. Benefit: Safer Journeys */}
      <View style={styles.itemCol}>
        <View style={styles.iconCircle}>
          <View style={styles.shieldWrapper}>
            <Image
              source={icons.shield}
              style={styles.shieldIcon}
              tintColor="#17191C"
              resizeMode="contain"
            />
          </View>
        </View>
        <Text style={styles.itemLabel}>
          {'SAFER\nJOURNEYS'}
        </Text>
      </View>

      {/* Thin Vertical Divider */}
      <View style={styles.divider} />

      {/* 2. Benefit: Better Earnings */}
      <View style={styles.itemCol}>
        <View style={styles.iconCircle}>
          <View style={styles.barChartWrapper}>
            <View style={[styles.bar, styles.bar1]} />
            <View style={[styles.bar, styles.bar2]} />
            <View style={[styles.bar, styles.bar3]} />
          </View>
        </View>
        <Text style={styles.itemLabel}>
          {'BETTER\nEARNINGS'}
        </Text>
      </View>

      {/* Thin Vertical Divider */}
      <View style={styles.divider} />

      {/* 3. Benefit: More Rides / Stronger Communities */}
      <View style={styles.itemCol}>
        <View style={styles.iconCircle}>
          <View style={styles.communityWrapper}>
            <View style={styles.personHeadCenter} />
            <View style={styles.personBodyCenter} />
            <View style={styles.personHeadLeft} />
            <View style={styles.personHeadRight} />
          </View>
        </View>
        <Text style={styles.itemLabel}>
          {thirdLabel}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
    paddingHorizontal: 16,
    width: '100%',
  },
  itemCol: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  iconCircle: {
    alignItems: 'center',
    backgroundColor: '#FFF3CF',
    borderColor: 'rgba(255, 201, 40, 0.28)',
    borderRadius: 22,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  shieldWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  shieldIcon: {
    height: 19,
    width: 19,
  },
  barChartWrapper: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 3,
    height: 18,
  },
  bar: {
    backgroundColor: '#17191C',
    borderRadius: 1.5,
    width: 3.5,
  },
  bar1: {
    height: 8,
  },
  bar2: {
    height: 13,
  },
  bar3: {
    height: 18,
  },
  communityWrapper: {
    alignItems: 'center',
    height: 20,
    justifyContent: 'center',
    position: 'relative',
    width: 24,
  },
  personHeadCenter: {
    backgroundColor: '#17191C',
    borderRadius: 4,
    height: 8,
    position: 'absolute',
    top: 1,
    width: 8,
  },
  personBodyCenter: {
    backgroundColor: '#17191C',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    bottom: 0,
    height: 8,
    position: 'absolute',
    width: 14,
  },
  personHeadLeft: {
    backgroundColor: '#525B64',
    borderRadius: 3,
    height: 6,
    left: 1,
    position: 'absolute',
    top: 4,
    width: 6,
  },
  personHeadRight: {
    backgroundColor: '#525B64',
    borderRadius: 3,
    height: 6,
    position: 'absolute',
    right: 1,
    top: 4,
    width: 6,
  },
  divider: {
    backgroundColor: '#ECEAE2',
    height: 38,
    width: 1,
  },
  itemLabel: {
    color: '#525B64',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    lineHeight: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default SplashBenefits;
