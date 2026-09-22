import React from 'react';
import {
  Pressable,
  Text,
  View,
} from 'react-native';
import styles from '../../assets/styles/styles';

/**
 * ContactSupport
 * Assistance banner with headphone icon and yellow "Contact Support ›" CTA button with utility styles.
 */
function ContactSupport({ onContactSupport }) {
  return (
    <View
      style={[
        styles.mb24,
        styles.pdh16,
        styles.pdv16,
        {
          alignItems: 'center',
          backgroundColor: '#FFFDF5',
          borderColor: '#FDE68A',
          borderRadius: 16,
          borderWidth: 1.2,
          flexDirection: 'row',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.04,
          shadowRadius: 4,
          elevation: 1.5,
        },
      ]}
    >
      {/* 1. Headset Icon in Cream Container */}
      <View
        style={[
          styles.mr12,
          {
            alignItems: 'center',
            backgroundColor: '#FFF4C7',
            borderRadius: 24,
            height: 48,
            justifyContent: 'center',
            width: 48,
          },
        ]}
      >
        <View
          style={{
            borderColor: '#17191C',
            borderRadius: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 2,
            borderBottomWidth: 0,
            height: 16,
            position: 'relative',
            width: 20,
          }}
        >
          <View
            style={{
              backgroundColor: '#17191C',
              borderRadius: 2.5,
              bottom: -6,
              height: 8,
              left: -2,
              position: 'absolute',
              width: 4,
            }}
          />
          <View
            style={{
              backgroundColor: '#17191C',
              borderRadius: 2.5,
              bottom: -6,
              height: 8,
              position: 'absolute',
              right: -2,
              width: 4,
            }}
          />
        </View>
      </View>

      {/* 2. Middle Explanation Text */}
      <View style={[styles.mr12, { flex: 1 }]}>
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
          Need help?
        </Text>
        <Text
          style={[
            styles.ts12,
            styles.mt4,
            {
              color: '#687078',
              fontWeight: '400',
              lineHeight: 15,
            },
          ]}
        >
          Contact our support team for assistance.
        </Text>
      </View>

      {/* 3. Right Yellow CTA Button */}
      <Pressable
        style={({ pressed }) => [
          styles.pdh12,
          styles.pdv8,
          {
            alignItems: 'center',
            backgroundColor: pressed ? '#F5BE18' : '#FFC928',
            borderRadius: 10,
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.06,
            shadowRadius: 2,
            elevation: 1.5,
            opacity: pressed ? 0.9 : 1,
          },
        ]}
        onPress={onContactSupport}
        accessibilityRole="button"
        accessibilityLabel="Contact Support"
      >
        <Text
          style={[
            styles.ts12,
            {
              color: '#17191C',
              fontWeight: '800',
              letterSpacing: -0.1,
            },
          ]}
        >
          Contact Support ›
        </Text>
      </Pressable>
    </View>
  );
}

export default ContactSupport;
