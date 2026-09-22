import React from 'react';
import {
  Pressable,
  Text,
  View,
} from 'react-native';

/**
 * ContactSupport
 * Assistance banner explaining renewal guidance and providing a direct Support CTA.
 */
function ContactSupport({ onContactPress }) {
  return (
    <View
      style={{
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
      }}
    >
      {/* 1. Left Information Icon */}
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderColor: '#EFECE6',
          borderRadius: 16,
          borderWidth: 1,
          height: 32,
          justifyContent: 'center',
          marginRight: 10,
          width: 32,
        }}
      >
        <Text
          style={{
            color: '#17191C',
            fontSize: 18,
            fontWeight: '700',
            lineHeight: 20,
          }}
        >
          ⓘ
        </Text>
      </View>

      {/* 2. Middle Explanation Text */}
      <View
        style={{
          flex: 1,
          marginRight: 10,
        }}
      >
        <Text
          style={{
            color: '#17191C',
            fontSize: 13.5,
            fontWeight: '800',
            letterSpacing: -0.2,
          }}
        >
          Need to update or renew a document?
        </Text>
        <Text
          style={{
            color: '#687078',
            fontSize: 11.5,
            fontWeight: '400',
            lineHeight: 15,
            marginTop: 3,
          }}
        >
          Visit your nearest RTO or contact our support team for assistance.
        </Text>
      </View>

      {/* 3. Right Yellow CTA Button */}
      <Pressable
        style={({ pressed }) => [
          {
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
          pressed && {
            backgroundColor: '#F5BE18',
            opacity: 0.9,
          },
        ]}
        onPress={onContactPress}
        accessibilityRole="button"
        accessibilityLabel="Contact Support"
      >
        <Text
          style={{
            color: '#17191C',
            fontSize: 12,
            fontWeight: '800',
            letterSpacing: -0.1,
          }}
        >
          Contact Support
        </Text>
      </Pressable>
    </View>
  );
}

export default ContactSupport;
