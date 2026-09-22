import React from 'react';
import {
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
    <View
      style={{
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%',
      }}
    >
      {/* 1. Large Circular Success Icon with Confetti Accents */}
      <View
        style={{
          alignItems: 'center',
          height: 110,
          justifyContent: 'center',
          marginBottom: 16,
          marginTop: 8,
          position: 'relative',
          width: 110,
        }}
      >
        {/* Confetti rays */}
        <View
          style={{
            borderRadius: 2,
            height: 7,
            position: 'absolute',
            width: 3.5,
            backgroundColor: '#FFC928',
            left: 20,
            top: 14,
            transform: [{ rotate: '-35deg' }],
          }}
        />
        <View
          style={{
            borderRadius: 2,
            height: 7,
            position: 'absolute',
            width: 3.5,
            backgroundColor: '#FFC928',
            right: 20,
            top: 14,
            transform: [{ rotate: '35deg' }],
          }}
        />
        <View
          style={{
            borderRadius: 2,
            height: 7,
            position: 'absolute',
            width: 3.5,
            backgroundColor: '#18A66A',
            left: 8,
            top: 52,
            transform: [{ rotate: '-80deg' }],
          }}
        />
        <View
          style={{
            borderRadius: 2,
            height: 7,
            position: 'absolute',
            width: 3.5,
            backgroundColor: '#FFC928',
            right: 8,
            top: 52,
            transform: [{ rotate: '80deg' }],
          }}
        />
        <View
          style={{
            borderRadius: 2,
            height: 7,
            position: 'absolute',
            width: 3.5,
            backgroundColor: '#18A66A',
            bottom: 14,
            left: 20,
            transform: [{ rotate: '35deg' }],
          }}
        />
        <View
          style={{
            borderRadius: 2,
            height: 7,
            position: 'absolute',
            width: 3.5,
            backgroundColor: '#18A66A',
            bottom: 14,
            right: 20,
            transform: [{ rotate: '-35deg' }],
          }}
        />

        {/* Outer Halo Circle */}
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#DDF5E9',
            borderRadius: 44,
            height: 88,
            justifyContent: 'center',
            width: 88,
          }}
        >
          {/* Inner Solid Green Circle */}
          <View
            style={{
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
            }}
          >
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 28,
                fontWeight: '900',
                includeFontPadding: false,
              }}
            >
              ✓
            </Text>
          </View>
        </View>
      </View>

      {/* 2. Main Success Title & Subtitle */}
      <Text
        style={{
          color: '#17191C',
          fontSize: 26,
          fontWeight: '900',
          letterSpacing: -0.6,
          lineHeight: 32,
          textAlign: 'center',
        }}
      >
        Vehicle Details{'\n'}Submitted!
      </Text>
      <Text
        style={{
          color: '#687078',
          fontSize: 13.5,
          fontWeight: '400',
          lineHeight: 20,
          marginTop: 8,
          marginBottom: 24,
          textAlign: 'center',
        }}
      >
        Your vehicle information and documents{'\n'}have been saved.
      </Text>

      {/* 3. Status Information Card */}
      <View
        style={{
          backgroundColor: '#FAF6ED',
          borderColor: '#ECE6D7',
          borderRadius: 18,
          borderWidth: 1.2,
          marginBottom: 20,
          paddingHorizontal: 16,
          paddingVertical: 14,
          width: '100%',
        }}
      >
        {/* Row 1: Document review */}
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            paddingVertical: 8,
          }}
        >
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderColor: '#E8E2D2',
              borderRadius: 10,
              borderWidth: 1,
              height: 36,
              justifyContent: 'center',
              marginRight: 14,
              width: 36,
            }}
          >
            <Text style={{ fontSize: 16 }}>📄</Text>
          </View>
          <Text
            style={{
              color: '#2A3037',
              flex: 1,
              fontSize: 13.5,
              fontWeight: '600',
              lineHeight: 18,
            }}
          >
            Documents are under review
          </Text>
        </View>

        <View
          style={{
            backgroundColor: '#EDE8DA',
            height: 1,
            marginVertical: 2,
            width: '100%',
          }}
        />

        {/* Row 2: Notification */}
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            paddingVertical: 8,
          }}
        >
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderColor: '#E8E2D2',
              borderRadius: 10,
              borderWidth: 1,
              height: 36,
              justifyContent: 'center',
              marginRight: 14,
              width: 36,
            }}
          >
            <Text style={{ fontSize: 16 }}>🕒</Text>
          </View>
          <Text
            style={{
              color: '#2A3037',
              flex: 1,
              fontSize: 13.5,
              fontWeight: '600',
              lineHeight: 18,
            }}
          >
            We’ll notify you once verified
          </Text>
        </View>

        <View
          style={{
            backgroundColor: '#EDE8DA',
            height: 1,
            marginVertical: 2,
            width: '100%',
          }}
        />

        {/* Row 3: Next step */}
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            paddingVertical: 8,
          }}
        >
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderColor: '#E8E2D2',
              borderRadius: 10,
              borderWidth: 1,
              height: 36,
              justifyContent: 'center',
              marginRight: 14,
              width: 36,
            }}
          >
            <Text style={{ fontSize: 16 }}>🔔</Text>
          </View>
          <Text
            style={{
              color: '#2A3037',
              flex: 1,
              fontSize: 13.5,
              fontWeight: '600',
              lineHeight: 18,
            }}
          >
            You can continue with the next step
          </Text>
        </View>
      </View>
    </View>
  );
}

export default DocumentSubmissionSuccess;
