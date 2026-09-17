import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import { images } from '../../assets/images';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * SplashHeroScene
 * Showcases the hero visual:
 * - Premium white XCAB-branded sedan
 * - Clean curved modern road with signature yellow lane line
 * - Soft city skyline under a warm golden sunrise circle
 * - Subtle script accent: "A Smoother Brighter Tomorrow"
 */
function SplashHeroScene() {
  const sceneHeight = Math.min(SCREEN_WIDTH * 0.72, 310);

  return (
    <View style={[styles.container, { height: sceneHeight }]}>
      <Image
        source={images.splashCarScene}
        style={styles.sceneImage}
        resizeMode="cover"
        accessibilityRole="image"
        accessibilityLabel="White XCAB sedan driving on a modern highway toward sunrise skyline"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 6,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
  sceneImage: {
    height: '100%',
    width: '100%',
  },
});

export default SplashHeroScene;
