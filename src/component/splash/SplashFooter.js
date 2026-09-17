import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * SplashFooter
 * Subtle, elegant bottom brand line:
 * "—— DRIVEN BY A BRIGHTER INDIA ——"
 */
function SplashFooter() {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.brandLineText}>
        DRIVEN BY A BRIGHTER INDIA
      </Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
    paddingHorizontal: 28,
    width: '100%',
  },
  line: {
    backgroundColor: '#DDD9CF',
    flex: 1,
    height: 1,
  },
  brandLineText: {
    color: '#7A828A',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 2.4,
    paddingHorizontal: 12,
    textAlign: 'center',
  },
});

export default SplashFooter;
