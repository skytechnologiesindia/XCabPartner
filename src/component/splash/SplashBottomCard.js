import React from 'react';
import { View } from 'react-native';
import SplashBenefits from './SplashBenefits';
import SplashFooter from './SplashFooter';
import SplashLoadingBar from './SplashLoadingBar';

/**
 * SplashBottomCard
 * Elegant curved bottom container holding:
 * - Animated loading progress bar & status
 * - Three key driver benefits
 * - "DRIVEN BY A BRIGHTER INDIA" footer line
 */
function SplashBottomCard({
  duration = 2400,
  onComplete,
  thirdBenefitLabel,
}) {
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 36,
        borderTopRightRadius: 36,
        elevation: 4,
        marginTop: -26,
        paddingBottom: 24,
        paddingTop: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        width: '100%',
      }}
    >
      {/* 1. Loading Progress Bar */}
      <SplashLoadingBar duration={duration} onComplete={onComplete} />

      {/* 2. Key Benefits */}
      <SplashBenefits thirdLabel={thirdBenefitLabel} />

      {/* 3. Bottom Brand Line */}
      <SplashFooter />
    </View>
  );
}

export default SplashBottomCard;
