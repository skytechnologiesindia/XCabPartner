import React from 'react';
import {
  ScrollView,
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
      style={{
        backgroundColor: '#F7F5EF',
        flex: 1,
      }}
      contentContainerStyle={{
        backgroundColor: '#F7F5EF',
        flexGrow: 1,
        justifyContent: 'space-between',
        paddingBottom: 24,
        paddingHorizontal: 20,
        paddingTop: 8,
      }}
      bounces={false}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
    >
      {/* 1. Optional Top Bar: Skip Button (for standalone use) */}
      {showTopBar ? (
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            minHeight: 32,
            width: '100%',
          }}>
          <View style={{ flex: 1 }} />
          <OnboardingSkip onSkip={onSkip} />
        </View>
      ) : null}

      {/* 2. Optional XCAB Master Logo (Shown on Slide 1) */}
      {slide.showBrandLogo ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 4,
          }}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                color: '#FFC928',
                fontSize: 38,
                fontWeight: '900',
                letterSpacing: -1,
              }}>
              X
            </Text>
            <Text
              style={{
                color: '#17191C',
                fontSize: 38,
                fontWeight: '900',
                letterSpacing: -1,
              }}>
              CAB
            </Text>
          </View>
          <Text
            style={{
              color: '#687078',
              fontSize: 10,
              fontWeight: '700',
              letterSpacing: 4,
              marginTop: 1,
            }}>
            D R I V E R   A P P
          </Text>
        </View>
      ) : (
        <View style={{ height: 12 }} />
      )}

      {/* 3. Main Headlines */}
      <View
        style={{
          alignItems: 'center',
          marginTop: slide.showBrandLogo ? 10 : 14,
          paddingHorizontal: 8,
        }}>
        {slide.titlePrefix ? (
          <Text
            style={{
              color: '#17191C',
              fontSize: 25,
              fontWeight: '900',
              letterSpacing: -0.5,
              lineHeight: 31,
              textAlign: 'center',
            }}>
            {slide.titlePrefix}
            <Text
              style={{
                color: '#FFC928',
                fontSize: 25,
                fontWeight: '900',
                letterSpacing: -0.5,
                lineHeight: 31,
                textAlign: 'center',
              }}>
              {slide.highlightedTitle}
            </Text>
            {slide.titleSuffix}
          </Text>
        ) : (
          <>
            {slide.title ? (
              <Text
                style={{
                  color: '#17191C',
                  fontSize: 25,
                  fontWeight: '900',
                  letterSpacing: -0.5,
                  lineHeight: 31,
                  textAlign: 'center',
                }}>
                {slide.title}
              </Text>
            ) : null}
            {slide.highlightedTitle ? (
              <Text
                style={{
                  color: '#FFC928',
                  fontSize: 25,
                  fontWeight: '900',
                  letterSpacing: -0.5,
                  lineHeight: 31,
                  textAlign: 'center',
                }}>
                {slide.highlightedTitle}
              </Text>
            ) : null}
          </>
        )}

        {/* Supporting Description */}
        <Text
          style={{
            color: '#687078',
            fontSize: 12.5,
            fontWeight: '500',
            letterSpacing: 0.1,
            lineHeight: 17,
            marginTop: 8,
            textAlign: 'center',
          }}>
          {slide.description}
        </Text>
      </View>

      {/* 4. Center Hero Illustration */}
      <OnboardingIllustration slide={slide} />

      {/* 5. Optional Bottom Controls: Progress Dots & Primary CTA (for standalone use) */}
      {showBottomControls ? (
        <View
          style={{
            paddingBottom: 6,
            paddingTop: 8,
            width: '100%',
          }}>
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

export default OnboardingSlide;
