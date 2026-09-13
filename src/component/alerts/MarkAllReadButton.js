import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

/**
 * MarkAllReadButton
 * Styled CTA button at the bottom of the alerts list to mark all notifications as read.
 */
function MarkAllReadButton({ onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Mark all alerts as read"
    >
      {/* Megaphone Outline Icon */}
      <MegaphoneIcon />

      {/* Button Text */}
      <Text style={styles.buttonText}>Mark all as read</Text>
    </Pressable>
  );
}

/**
 * Clean outline megaphone / announcement horn icon
 */
function MegaphoneIcon() {
  return (
    <View style={styles.iconContainer}>
      {/* Bell / Horn front */}
      <View style={styles.hornCone} />
      {/* Horn back */}
      <View style={styles.hornBack} />
      {/* Handle */}
      <View style={styles.hornHandle} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
    borderRadius: 14,
    borderWidth: 1.5,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    marginTop: 6,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
    width: '100%',
  },
  buttonPressed: {
    backgroundColor: '#FEF3C7',
    opacity: 0.9,
  },
  buttonText: {
    color: '#17191C',
    fontSize: 14.5,
    fontWeight: '700',
    letterSpacing: -0.1,
    marginLeft: 8,
  },
  iconContainer: {
    height: 18,
    position: 'relative',
    width: 20,
  },
  hornCone: {
    borderColor: '#17191C',
    borderLeftWidth: 8,
    borderTopColor: 'transparent',
    borderTopWidth: 5,
    borderBottomColor: 'transparent',
    borderBottomWidth: 5,
    height: 0,
    left: 4,
    position: 'absolute',
    top: 3,
    width: 0,
  },
  hornBack: {
    borderColor: '#17191C',
    borderRadius: 2,
    borderWidth: 1.8,
    height: 10,
    left: 10,
    position: 'absolute',
    top: 3,
    width: 5,
  },
  hornHandle: {
    backgroundColor: '#17191C',
    borderRadius: 1,
    height: 5,
    left: 8,
    position: 'absolute',
    top: 11,
    transform: [{ rotate: '25deg' }],
    width: 2,
  },
});

export default MarkAllReadButton;
