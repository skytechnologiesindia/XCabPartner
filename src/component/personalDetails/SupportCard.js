import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

/**
 * SupportCard
 * Bottom assistance card matching the reference visual design:
 * - Circular headphone icon container
 * - "Need to update your details?" headline
 * - "Contact our support team for assistance." subtitle
 * - "Contact Support" XCAB yellow CTA button
 */
function SupportCard({ onContactSupport }) {
  return (
    <View style={styles.card}>
      {/* 1. Left: Headset Icon in Cream Container */}
      <View style={styles.headsetCircle}>
        <View style={styles.headphoneArch}>
          <View style={styles.earCupLeft} />
          <View style={styles.earCupRight} />
        </View>
      </View>

      {/* 2. Middle: Explanation Text */}
      <View style={styles.textColumn}>
        <Text style={styles.titleText}>Need to update your details?</Text>
        <Text style={styles.subtitleText}>
          Contact our support team for assistance.
        </Text>
      </View>

      {/* 3. Right: Yellow CTA Button */}
      <Pressable
        style={({ pressed }) => [
          styles.supportButton,
          pressed && styles.supportButtonPressed,
        ]}
        onPress={onContactSupport}
        accessibilityRole="button"
        accessibilityLabel="Contact Support"
      >
        <Text style={styles.supportButtonText}>Contact Support</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#EFECE6',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 24,
    paddingHorizontal: 14,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1.5,
  },
  headsetCircle: {
    alignItems: 'center',
    backgroundColor: '#FFF4C7',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    marginRight: 12,
    width: 48,
  },
  headphoneArch: {
    borderColor: '#17191C',
    borderRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 2,
    borderBottomWidth: 0,
    height: 16,
    position: 'relative',
    width: 20,
  },
  earCupLeft: {
    backgroundColor: '#17191C',
    borderRadius: 2.5,
    bottom: -6,
    height: 8,
    left: -2,
    position: 'absolute',
    width: 4,
  },
  earCupRight: {
    backgroundColor: '#17191C',
    borderRadius: 2.5,
    bottom: -6,
    height: 8,
    position: 'absolute',
    right: -2,
    width: 4,
  },
  textColumn: {
    flex: 1,
    marginRight: 10,
  },
  titleText: {
    color: '#17191C',
    fontSize: 13.5,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  subtitleText: {
    color: '#687078',
    fontSize: 11.5,
    fontWeight: '400',
    lineHeight: 15,
    marginTop: 2.5,
  },
  supportButton: {
    alignItems: 'center',
    backgroundColor: '#FFC928',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1.5,
  },
  supportButtonPressed: {
    backgroundColor: '#F5BE18',
    opacity: 0.9,
  },
  supportButtonText: {
    color: '#17191C',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: -0.1,
  },
});

export default SupportCard;
