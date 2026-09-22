import React from 'react';
import { Text, View } from 'react-native';
import styles from '../../assets/styles/styles';

/**
 * SafetyInfoCard
 * Informational card explaining the security reasoning behind emergency contacts with utility styles.
 */
function SafetyInfoCard() {
  return (
    <View
      style={[
        styles.mb16,
        styles.pdh16,
        styles.pdv16,
        {
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderColor: '#EFECE6',
          borderRadius: 16,
          borderWidth: 1,
          flexDirection: 'row',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.04,
          shadowRadius: 4,
          elevation: 1.5,
        },
      ]}
    >
      {/* 1. Shield Outline Icon in Cream Circle */}
      <View
        style={[
          styles.mr12,
          {
            alignItems: 'center',
            backgroundColor: '#FFF4C7',
            borderRadius: 22,
            height: 44,
            justifyContent: 'center',
            width: 44,
          },
        ]}
      >
        <View
          style={{
            alignItems: 'center',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
            borderWidth: 1.8,
            borderColor: '#17191C',
            height: 18,
            justifyContent: 'center',
            width: 17,
          }}
        >
          <Text
            style={[
              styles.ts10,
              {
                color: '#17191C',
                fontWeight: '900',
                marginTop: -1,
              },
            ]}
          >
            ✓
          </Text>
        </View>
      </View>

      {/* 2. Text Content */}
      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.ts14,
            {
              color: '#17191C',
              fontWeight: '800',
              letterSpacing: -0.2,
            },
          ]}
        >
          Why is this important?
        </Text>
        <Text
          style={[
            styles.ts12,
            styles.mt4,
            {
              color: '#687078',
              fontWeight: '400',
              lineHeight: 16.5,
            },
          ]}
        >
          In case of an emergency, we may contact this person to ensure your
          safety.
        </Text>
      </View>
    </View>
  );
}

export default SafetyInfoCard;
