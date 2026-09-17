import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { icons } from '../../assets/icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * OnboardingIllustration
 * Visual illustration section for each onboarding step:
 * - Slide 1: XCAB white sedan + 3 benefit badges (Safe Journeys, Better Earnings, Stronger Communities)
 * - Slide 2: Location/navigation route device + "You're in Control" checklist card
 * - Slide 3: Front-three-quarter XCAB sedan + 3 feature badges (Safer Roads, Happier Communities, Cleaner Cities)
 */
function OnboardingIllustration({ slide }) {
  if (!slide) return null;

  const { image, benefits, id } = slide;
  const isSlide1 = id === 'drive-your-way';

  return (
    <View style={styles.container}>
      {/* 1. Main Visual Asset */}
      <View style={[styles.imageWrapper, isSlide1 && styles.imageWrapperSlide1]}>
        <Image
          source={image}
          style={styles.illustrationImage}
          resizeMode="contain"
          accessibilityRole="image"
          accessibilityLabel={slide.title || 'Onboarding illustration'}
        />
      </View>

      {/* 2. Slide 1 specific inline benefits */}
      {benefits && benefits.length > 0 ? (
        <View style={styles.benefitsCard}>
          {benefits.map((benefit, index) => (
            <React.Fragment key={benefit.id}>
              {index > 0 ? <View style={styles.benefitDivider} /> : null}
              <View style={styles.benefitCol}>
                <View style={styles.benefitIconCircle}>
                  {benefit.icon === 'shield' ? (
                    <Image
                      source={icons.shield}
                      style={styles.benefitIcon}
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
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
    width: '100%',
  },
  imageWrapper: {
    alignItems: 'center',
    height: Math.min(SCREEN_WIDTH * 0.76, 310),
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
  imageWrapperSlide1: {
    height: Math.min(SCREEN_WIDTH * 0.54, 220),
  },
  illustrationImage: {
    height: '100%',
    width: '100%',
  },
  benefitsCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#ECEAE2',
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    width: '94%',
  },
  benefitCol: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  benefitIconCircle: {
    alignItems: 'center',
    backgroundColor: '#FFF3CF',
    borderColor: 'rgba(255, 201, 40, 0.3)',
    borderRadius: 20,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  benefitIcon: {
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
  benefitDivider: {
    backgroundColor: '#ECEAE2',
    height: 32,
    width: 1,
  },
  benefitLabel: {
    color: '#525B64',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
    lineHeight: 13,
    marginTop: 6,
    textAlign: 'center',
  },
});

export default OnboardingIllustration;
