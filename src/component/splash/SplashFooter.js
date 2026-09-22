import React from 'react';
import { Text, View } from 'react-native';

/**
 * SplashFooter
 * Subtle, elegant bottom brand line:
 * "—— DRIVEN BY A BRIGHTER INDIA ——"
 */
function SplashFooter() {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 28,
        paddingHorizontal: 28,
        width: '100%',
      }}
    >
      <View
        style={{
          backgroundColor: '#DDD9CF',
          flex: 1,
          height: 1,
        }}
      />
      <Text
        style={{
          color: '#7A828A',
          fontSize: 10,
          fontWeight: '600',
          letterSpacing: 2.4,
          paddingHorizontal: 12,
          textAlign: 'center',
        }}
      >
        DRIVEN BY A BRIGHTER INDIA
      </Text>
      <View
        style={{
          backgroundColor: '#DDD9CF',
          flex: 1,
          height: 1,
        }}
      />
    </View>
  );
}

export default SplashFooter;
