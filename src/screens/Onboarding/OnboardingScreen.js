import React, { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  OnboardingButton,
  OnboardingProgress,
  OnboardingSkip,
  OnboardingSlide,
  onboardingSlides,
  setOnboardingCompleted,
} from '../../component/onboarding';

/**
 * OnboardingScreen
 * Single unified screen featuring a smooth horizontal swipeable carousel for
 * the 2-step driver onboarding sequence:
 * - Slide 0: Drive Your Way to a Brighter Tomorrow
 * - Slide 1: Be Your Own Boss
 *
 * Features:
 * - Horizontal swipe/paging with finger gestures
 * - Synchronized 2-dot indicator with direct-tap navigation
 * - Dynamic primary CTA button ("Next →" / "Get Started →")
 * - Top "Skip" shortcut
 */
function OnboardingScreen({
  navigation,
  onComplete,
  onNavigateToLanguage,
}) {
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const flatListRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleFinish = () => {
    setOnboardingCompleted(true);

    if (onNavigateToLanguage) {
      onNavigateToLanguage();
    } else if (onComplete) {
      onComplete();
    } else if (navigation && navigation.navigate) {
      try {
        navigation.navigate('LanguageSelection');
      } catch (err) {
        navigation.navigate('Desk');
      }
    }
  };

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      const nextIndex = currentSlide + 1;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setCurrentSlide(nextIndex);
    } else {
      handleFinish();
    }
  };

  const handleSkip = () => {
    handleFinish();
  };

  const handleDotPress = index => {
    if (index >= 0 && index < onboardingSlides.length) {
      flatListRef.current?.scrollToIndex({
        index,
        animated: true,
      });
      setCurrentSlide(index);
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (
      viewableItems &&
      viewableItems.length > 0 &&
      typeof viewableItems[0].index === 'number'
    ) {
      setCurrentSlide(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleMomentumScrollEnd = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / screenWidth);
    if (newIndex >= 0 && newIndex < onboardingSlides.length) {
      setCurrentSlide(newIndex);
    }
  };

  const getItemLayout = useCallback(
    (_, index) => ({
      length: screenWidth,
      offset: screenWidth * index,
      index,
    }),
    [screenWidth]
  );

  const renderSlideItem = useCallback(
    ({ item }) => (
      <View style={[styles.slideWrapper, { width: screenWidth }]}>
        <OnboardingSlide slide={item} />
      </View>
    ),
    [screenWidth]
  );

  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight || 28 : 0;
  const safeTopPadding = Math.max(insets.top, statusBarHeight) + 8;
  const safeBottomPadding = Math.max(insets.bottom, 16);

  const isLastSlide = currentSlide === onboardingSlides.length - 1;
  const buttonLabel = isLastSlide ? 'Get Started' : 'Next';

  return (
    <View style={[styles.container, { paddingTop: safeTopPadding }]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F7F5EF"
        translucent={true}
      />

      {/* 1. Top Bar: Skip button at top right */}
      <View style={styles.topBar}>
        <View style={styles.topSpacer} />
        {!isLastSlide ? (
          <OnboardingSkip onSkip={handleSkip} />
        ) : (
          <View style={styles.skipPlaceholder} />
        )}
      </View>

      {/* 2. Horizontal Scrollable Carousel */}
      <FlatList
        ref={flatListRef}
        data={onboardingSlides}
        renderItem={renderSlideItem}
        keyExtractor={item => item.id}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={getItemLayout}
        onScrollToIndexFailed={info => {
          flatListRef.current?.scrollToOffset({
            offset: info.index * screenWidth,
            animated: true,
          });
        }}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
        style={styles.carouselList}
      />

      {/* 3. Bottom Controls: Progress dots & CTA button */}
      <View
        style={[styles.bottomControls, { paddingBottom: safeBottomPadding }]}
      >
        <OnboardingProgress
          total={onboardingSlides.length}
          current={currentSlide}
          onSelectDot={handleDotPress}
        />
        <OnboardingButton label={buttonLabel} onPress={handleNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F5EF',
    flex: 1,
  },
  topBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 32,
    paddingHorizontal: 20,
    width: '100%',
  },
  topSpacer: {
    flex: 1,
  },
  skipPlaceholder: {
    height: 32,
    width: 48,
  },
  carouselList: {
    flex: 1,
  },
  slideWrapper: {
    flex: 1,
  },
  bottomControls: {
    backgroundColor: '#F7F5EF',
    paddingHorizontal: 20,
    paddingTop: 4,
    width: '100%',
  },
});

export default OnboardingScreen;
