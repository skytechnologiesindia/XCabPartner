import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

/**
 * DocumentSubmissionSuccess
 * Success confirmation section for vehicle details and documents submission:
 * - Large green circular checkmark with celebration confetti accents
 * - "Vehicle Details\nSubmitted!" title & subtitle
 * - Status information card with 3 key reassurance points (review, notification, next step)
 */
function DocumentSubmissionSuccess() {
  return (
    <View style={styles.container}>
      {/* 1. Large Circular Success Icon with Confetti Accents */}
      <View style={styles.iconContainer}>
        {/* Confetti rays */}
        <View style={[styles.confetti, styles.confettiTopLeft]} />
        <View style={[styles.confetti, styles.confettiTopRight]} />
        <View style={[styles.confetti, styles.confettiLeft]} />
        <View style={[styles.confetti, styles.confettiRight]} />
        <View style={[styles.confetti, styles.confettiBottomLeft]} />
        <View style={[styles.confetti, styles.confettiBottomRight]} />

        {/* Outer Halo Circle */}
        <View style={styles.outerHalo}>
          {/* Inner Solid Green Circle */}
          <View style={styles.innerCircle}>
            <Text style={styles.checkmarkIcon}>✓</Text>
          </View>
        </View>
      </View>

      {/* 2. Main Success Title & Subtitle */}
      <Text style={styles.titleText}>
        Vehicle Details{'\n'}Submitted!
      </Text>
      <Text style={styles.subtitleText}>
        Your vehicle information and documents{'\n'}have been saved.
      </Text>

      {/* 3. Status Information Card */}
      <View style={styles.infoCard}>
        {/* Row 1: Document review */}
        <View style={styles.infoRow}>
          <View style={styles.infoIconBox}>
            <Text style={styles.infoIcon}>📄</Text>
          </View>
          <Text style={styles.infoRowText}>Documents are under review</Text>
        </View>

        <View style={styles.rowDivider} />

        {/* Row 2: Notification */}
        <View style={styles.infoRow}>
          <View style={styles.infoIconBox}>
            <Text style={styles.infoIcon}>🕒</Text>
          </View>
          <Text style={styles.infoRowText}>We’ll notify you once verified</Text>
        </View>

        <View style={styles.rowDivider} />

        {/* Row 3: Next step */}
        <View style={styles.infoRow}>
          <View style={styles.infoIconBox}>
            <Text style={styles.infoIcon}>🔔</Text>
          </View>
          <Text style={styles.infoRowText}>You can continue with the next step</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  iconContainer: {
    alignItems: 'center',
    height: 110,
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: 8,
    position: 'relative',
    width: 110,
  },
  outerHalo: {
    alignItems: 'center',
    backgroundColor: '#DDF5E9',
    borderRadius: 44,
    height: 88,
    justifyContent: 'center',
    width: 88,
  },
  innerCircle: {
    alignItems: 'center',
    backgroundColor: '#10B981',
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
    width: 60,
  },
  checkmarkIcon: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    includeFontPadding: false,
  },
  // Confetti dashes around halo
  confetti: {
    borderRadius: 2,
    height: 7,
    position: 'absolute',
    width: 3.5,
  },
  confettiTopLeft: {
    backgroundColor: '#FFC928',
    left: 20,
    top: 14,
    transform: [{ rotate: '-35deg' }],
  },
  confettiTopRight: {
    backgroundColor: '#FFC928',
    right: 20,
    top: 14,
    transform: [{ rotate: '35deg' }],
  },
  confettiLeft: {
    backgroundColor: '#18A66A',
    left: 8,
    top: 52,
    transform: [{ rotate: '-80deg' }],
  },
  confettiRight: {
    backgroundColor: '#FFC928',
    right: 8,
    top: 52,
    transform: [{ rotate: '80deg' }],
  },
  confettiBottomLeft: {
    backgroundColor: '#18A66A',
    bottom: 14,
    left: 20,
    transform: [{ rotate: '35deg' }],
  },
  confettiBottomRight: {
    backgroundColor: '#18A66A',
    bottom: 14,
    right: 20,
    transform: [{ rotate: '-35deg' }],
  },
  titleText: {
    color: '#17191C',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.6,
    lineHeight: 32,
    textAlign: 'center',
  },
  subtitleText: {
    color: '#687078',
    fontSize: 13.5,
    fontWeight: '400',
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 24,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#FAF6ED',
    borderColor: '#ECE6D7',
    borderRadius: 18,
    borderWidth: 1.2,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    width: '100%',
  },
  infoRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
  },
  infoIconBox: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E8E2D2',
    borderRadius: 10,
    borderWidth: 1,
    height: 36,
    justifyContent: 'center',
    marginRight: 14,
    width: 36,
  },
  infoIcon: {
    fontSize: 16,
  },
  infoRowText: {
    color: '#2A3037',
    flex: 1,
    fontSize: 13.5,
    fontWeight: '600',
    lineHeight: 18,
  },
  rowDivider: {
    backgroundColor: '#EDE8DA',
    height: 1,
    marginVertical: 2,
    width: '100%',
  },
});

export default DocumentSubmissionSuccess;
