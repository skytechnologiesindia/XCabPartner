import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import OnboardingButton from './OnboardingButton';
import OnboardingIllustration from './OnboardingIllustration';
import OnboardingProgress from './OnboardingProgress';
import OnboardingSkip from './OnboardingSkip';

/**
 * OnboardingSlide
 * Reusable slide layout orchestrating optional master brand logo,
 * headline, description, visual illustration, and optional standalone controls.
 */
function OnboardingSlide({
  slide,
  currentIndex = 0,
  totalSlides = 3,
  onNext,
  onSkip,
  showTopBar = false,
  showBottomControls = false,
}) {
  if (!slide) return null;

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      bounces={false}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
    >
      {/* 1. Optional Top Bar: Skip Button (for standalone use) */}
      {showTopBar ? (
        <View style={styles.topBar}>
          <View style={styles.topSpacer} />
          <OnboardingSkip onSkip={onSkip} />
        </View>
      ) : null}

      {/* 2. Optional XCAB Master Logo (Shown on Slide 1) */}
      {slide.showBrandLogo ? (
        <View style={styles.brandBlock}>
          <View style={styles.logoRow}>
            <Text style={styles.logoX}>X</Text>
            <Text style={styles.logoCab}>CAB</Text>
          </View>
          <Text style={styles.driverAppText}>D R I V E R   A P P</Text>
        </View>
      ) : (
        <View style={styles.brandSpacer} />
      )}

      {/* 3. Main Headlines */}
      <View style={[styles.textBlock, !slide.showBrandLogo && styles.textBlockSpaced]}>
        {slide.titlePrefix ? (
          <Text style={styles.titleDark}>
            {slide.titlePrefix}
            <Text style={styles.titleYellow}>{slide.highlightedTitle}</Text>
            {slide.titleSuffix}
          </Text>
        ) : (
          <>
            {slide.title ? (
              <Text style={styles.titleDark}>{slide.title}</Text>
            ) : null}
            {slide.highlightedTitle ? (
              <Text style={styles.titleYellow}>{slide.highlightedTitle}</Text>
            ) : null}
          </>
        )}

        {/* Supporting Description */}
        <Text style={styles.descriptionText}>{slide.description}</Text>
      </View>

      {/* 4. Center Hero Illustration */}
      <OnboardingIllustration slide={slide} />

      {/* 5. Optional Bottom Controls: Progress Dots & Primary CTA (for standalone use) */}
      {showBottomControls ? (
        <View style={styles.bottomControls}>
          <OnboardingProgress total={totalSlides} current={currentIndex} />
          <OnboardingButton
            label={slide.buttonLabel || 'Next'}
            onPress={onNext}
          />
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#F7F5EF',
    flex: 1,
  },
  scrollContent: {
    backgroundColor: '#F7F5EF',
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 24,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  topBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 32,
    width: '100%',
  },
  topSpacer: {
    flex: 1,
  },
  brandBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  brandSpacer: {
    height: 12,
  },
  logoRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  logoX: {
    color: '#FFC928',
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: -1,
  },
  logoCab: {
    color: '#17191C',
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: -1,
  },
  driverAppText: {
    color: '#687078',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 4,
    marginTop: 1,
  },
  textBlock: {
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 8,
  },
  textBlockSpaced: {
    marginTop: 14,
  },
  titleDark: {
    color: '#17191C',
    fontSize: 25,
    fontWeight: '900',
    letterSpacing: -0.5,
    lineHeight: 31,
    textAlign: 'center',
  },
  titleYellow: {
    color: '#FFC928',
    fontSize: 25,
    fontWeight: '900',
    letterSpacing: -0.5,
    lineHeight: 31,
    textAlign: 'center',
  },
  descriptionText: {
    color: '#687078',
    fontSize: 12.5,
    fontWeight: '500',
    letterSpacing: 0.1,
    lineHeight: 17,
    marginTop: 8,
    textAlign: 'center',
  },
  bottomControls: {
    paddingBottom: 6,
    paddingTop: 8,
    width: '100%',
  },
});

export default OnboardingSlide;
