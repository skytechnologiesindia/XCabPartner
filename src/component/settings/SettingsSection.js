import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * SettingsSection
 * Common card container and section header for Settings categories.
 */
function SettingsSection({ title, children, style }) {
  return (
    <View style={[styles.container, style]}>
      {title ? <Text style={styles.sectionTitle}>{title}</Text> : null}
      <View style={styles.card}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#17191C',
    fontSize: 16.5,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#EFECE6',
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1.5,
  },
});

export default SettingsSection;
