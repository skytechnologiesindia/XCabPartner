import React from 'react';
import {
  Dimensions,
  Image,
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
    <View
      style={{
        marginTop: 6,
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        height: sceneHeight,
      }}
    >
      <Image
        source={images.splashCarScene}
        style={{
          height: '100%',
          width: '100%',
        }}
        resizeMode="cover"
        accessibilityRole="image"
        accessibilityLabel="White XCAB sedan driving on a modern highway toward sunrise skyline"
      />
    </View>
  );
}

export default SplashHeroScene;
