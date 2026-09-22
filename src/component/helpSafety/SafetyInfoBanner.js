import React from 'react';
import { Text, View } from 'react-native';
import styles from '../../assets/styles/styles';

/**
 * SafetyInfoBanner
 * Warm safety banner emphasizing the driver's security and emergency readiness with utility styles.
 */
function SafetyInfoBanner() {
  return (
    <View
      style={[
        styles.mb16,
        styles.pdh16,
        styles.pdv12,
        {
          alignItems: 'flex-start',
          backgroundColor: '#FFF4C7',
          borderColor: '#FDE68A',
          borderRadius: 14,
          borderWidth: 1,
          flexDirection: 'row',
        },
      ]}
    >
      {/* Exclamation Circle Icon */}
      <View
        style={[
          styles.mr12,
          {
            alignItems: 'center',
            borderColor: '#17191C',
            borderRadius: 12,
            borderWidth: 1.6,
            height: 24,
            justifyContent: 'center',
            marginTop: 1,
            width: 24,
          },
        ]}
      >
        <Text
          style={[
            styles.ts14,
            {
              color: '#17191C',
              fontWeight: '900',
              marginTop: -1,
            },
          ]}
        >
          !
        </Text>
      </View>

      {/* Content Column */}
      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.ts13,
            {
              color: '#17191C',
              fontWeight: '800',
              letterSpacing: -0.2,
            },
          ]}
        >
          Your safety matters to us.
        </Text>
        <Text
          style={[
            styles.ts12,
            styles.mt4,
            {
              color: '#687078',
              fontWeight: '400',
              lineHeight: 17,
            },
          ]}
        >
          In case of an emergency, use the options below.
        </Text>
      </View>
    </View>
  );
}

export default SafetyInfoBanner;
