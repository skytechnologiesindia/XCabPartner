import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { icons } from '../../assets/icons';
import { images } from '../../assets/images';
import { benefitItems } from './personalDetailsOnboardingData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * PersonalDetailsHelper
 * Secondary assurance helper note + lower automotive visual matching the Mobile + OTP screen:
 * - "Your information helps us keep your driver profile accurate."
 * - Approved white XCAB sedan on curved highway
 * - 3 circular badges: Safe Journeys, Better Earnings, Stronger Communities
 */
function PersonalDetailsHelper() {
  const sceneHeight = Math.min(SCREEN_WIDTH * 0.52, 210);

  return (
    <View style={styles.container}>
      {/* 1. Subtle Assurance Note */}
      <Text style={styles.helperText}>
        Your information helps us keep your driver profile accurate.
      </Text>

      {/* 2. Vehicle & Highway Hero Illustration */}
      <View style={[styles.sceneWrapper, { height: sceneHeight }]}>
        <Image
          source={images.authCarScene}
          style={styles.sceneImage}
          resizeMode="cover"
          accessibilityRole="image"
          accessibilityLabel="White XCAB sedan on highway"
        />
      </View>

      {/* 3. Curved White Card with 3 Benefit Badges */}
      <View style={styles.benefitsCard}>
        {benefitItems.map((benefit, index) => (
          <React.Fragment key={benefit.id}>
            {index > 0 ? <View style={styles.divider} /> : null}
            <View style={styles.benefitCol}>
              <View style={styles.iconCircle}>
                {benefit.icon === 'shield' ? (
                  <Image
                    source={icons.shield}
                    style={styles.icon}
                    tintColor="#17191C"
                    resizeMode="contain"
                  />
                ) : benefit.icon === 'chart' ? (
                  <View style={styles.barChartWrapper}>
                    <View style={[styles.bar, styles.bar1]} />
                    <View style={[styles.bar, styles.bar2]} />
                    <View style={[styles.bar, styles.bar3]} />
                  </View>
                ) : (
                  <View style={styles.communityWrapper}>
                    <View style={styles.personHeadCenter} />
                    <View style={styles.personBodyCenter} />
                    <View style={styles.personHeadLeft} />
                    <View style={styles.personHeadRight} />
                  </View>
                )}
              </View>
              <Text style={styles.benefitLabel}>{benefit.label}</Text>
            </View>
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 14,
    position: 'relative',
    width: '100%',
  },
  helperText: {
    color: '#7A828A',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 14,
    paddingHorizontal: 24,
    textAlign: 'center',
  },
  sceneWrapper: {
    overflow: 'hidden',
    width: '100%',
  },
  sceneImage: {
    height: '100%',
    width: '100%',
  },
  benefitsCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -22,
    paddingBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    width: '100%',
  },
  benefitCol: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  iconCircle: {
    alignItems: 'center',
    backgroundColor: '#FFF3CF',
    borderColor: 'rgba(255, 201, 40, 0.3)',
    borderRadius: 21,
    borderWidth: 1,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  icon: {
    height: 18,
    width: 18,
  },
  barChartWrapper: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 2.5,
    height: 16,
  },
  bar: {
    backgroundColor: '#17191C',
    borderRadius: 1.5,
    width: 3,
  },
  bar1: {
    height: 7,
  },
  bar2: {
    height: 11,
  },
  bar3: {
    height: 16,
  },
  communityWrapper: {
    alignItems: 'center',
    height: 18,
    justifyContent: 'center',
    position: 'relative',
    width: 22,
  },
  personHeadCenter: {
    backgroundColor: '#17191C',
    borderRadius: 3.5,
    height: 7,
    position: 'absolute',
    top: 1,
    width: 7,
  },
  personBodyCenter: {
    backgroundColor: '#17191C',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    bottom: 0,
    height: 7,
    position: 'absolute',
    width: 12,
  },
  personHeadLeft: {
    backgroundColor: '#525B64',
    borderRadius: 2.5,
    height: 5,
    left: 1,
    position: 'absolute',
    top: 4,
    width: 5,
  },
  personHeadRight: {
    backgroundColor: '#525B64',
    borderRadius: 2.5,
    height: 5,
    position: 'absolute',
    right: 1,
    top: 4,
    width: 5,
  },
  divider: {
    backgroundColor: '#ECEAE2',
    height: 36,
    width: 1,
  },
  benefitLabel: {
    color: '#525B64',
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 0.2,
    lineHeight: 14,
    marginTop: 6,
    textAlign: 'center',
  },
});

export default PersonalDetailsHelper;
