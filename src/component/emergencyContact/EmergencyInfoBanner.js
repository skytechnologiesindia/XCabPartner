import React from 'react';
import { Text, View } from 'react-native';
import styles from '../../assets/styles/styles';

/**
 * EmergencyInfoBanner
 * Warm informational banner explaining the critical purpose of emergency contacts with utility styles.
 */
function EmergencyInfoBanner() {
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
      <View
        style={[
          styles.mr12,
          {
            alignItems: 'center',
            borderColor: '#17191C',
            borderRadius: 12,
            borderWidth: 1.5,
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
              fontWeight: '800',
              marginTop: -1,
            },
          ]}
        >
          ⓘ
        </Text>
      </View>
      <Text
        style={[
          styles.ts12,
          {
            color: '#17191C',
            flex: 1,
            fontWeight: '500',
            lineHeight: 17.5,
          },
        ]}
      >
        Your emergency contact will be used in case of an emergency during a trip.
        Keep this information up to date.
      </Text>
    </View>
  );
}

export default EmergencyInfoBanner;
