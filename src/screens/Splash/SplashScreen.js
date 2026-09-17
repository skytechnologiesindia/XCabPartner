import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  SplashBottomCard,
  SplashHeader,
  SplashHeroScene,
} from '../../component/splash';

/**
 * SplashScreen
 * Clean, premium, automotive-inspired starting screen for the XCAB Driver App.
 * Matches the reference image layout:
 * - Top XCAB Driver App identity with golden arc and taglines
 * - Central white XCAB sedan driving toward sunrise city skyline
 * - Curved bottom card with animated progress, key benefits, and patriotic mobility slogan
 */
function SplashScreen({ onFinish }) {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleSkipOrFinish = () => {
    if (onFinish) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }).start(() => {
        onFinish();
      });
    }
  };

  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight || 28 : 0;
  const safeTopPadding = Math.max(insets.top, statusBarHeight) + 12;

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F7F5EF"
        translucent={true}
      />

      <Animated.View style={[styles.animContainer, { opacity: fadeAnim }]}>
        <Pressable
          style={styles.pressableArea}
          onPress={handleSkipOrFinish}
          accessibilityRole="button"
          accessibilityLabel="XCAB Driver App Starting Screen"
        >
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingTop: safeTopPadding },
            ]}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            {/* Top Branding & Main Message */}
            <SplashHeader />

            {/* Center Vehicle & Road Hero Visual */}
            <SplashHeroScene />

            {/* Bottom Curved Sheet with Loading Bar, Benefits & Brand Line */}
            <SplashBottomCard
              duration={2600}
              onComplete={handleSkipOrFinish}
            />
          </ScrollView>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F5EF',
    flex: 1,
  },
  animContainer: {
    flex: 1,
  },
  pressableArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    backgroundColor: '#F7F5EF',
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
});

export default SplashScreen;
