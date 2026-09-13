import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

/**
 * ContactSupport
 * Assistance banner explaining renewal guidance and providing a direct Support CTA.
 */
function ContactSupport({ onContactPress }) {
  return (
    <View style={styles.card}>
      {/* 1. Left Information Icon */}
      <View style={styles.infoCircle}>
        <Text style={styles.infoSymbol}>ⓘ</Text>
      </View>

      {/* 2. Middle Explanation Text */}
      <View style={styles.textCol}>
        <Text style={styles.titleText}>Need to update or renew a document?</Text>
        <Text style={styles.subtitleText}>
          Visit your nearest RTO or contact our support team for assistance.
        </Text>
      </View>

      {/* 3. Right Yellow CTA Button */}
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={onContactPress}
        accessibilityRole="button"
        accessibilityLabel="Contact Support"
      >
        <Text style={styles.buttonText}>Contact Support</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#FFFDF5',
    borderColor: '#FDE68A',
    borderRadius: 16,
    borderWidth: 1.2,
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 6,
    paddingHorizontal: 14,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  infoCircle: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#EFECE6',
    borderRadius: 16,
    borderWidth: 1,
    height: 32,
    justifyContent: 'center',
    marginRight: 10,
    width: 32,
  },
  infoSymbol: {
    color: '#17191C',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 20,
  },
  textCol: {
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
    marginTop: 3,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#FFC928',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1.5,
  },
  buttonPressed: {
    backgroundColor: '#F5BE18',
    opacity: 0.9,
  },
  buttonText: {
    color: '#17191C',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: -0.1,
  },
});

export default ContactSupport;
