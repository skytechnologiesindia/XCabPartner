import React from 'react';
import {
  Image,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import { colors } from '../../assets/colors/colors';
import { icons } from '../../assets/icons';

const fontSans = Platform.select({
  ios: 'System',
  android: 'sans-serif',
});

/**
 * ReportIssueConfirmation
 * Step 3 confirmation screen shown after successful submission of the issue report.
 */
function ReportIssueConfirmation({ onClose, onDone }) {
  const handleComplete = () => {
    if (onDone) {
      onDone();
    } else if (onClose) {
      onClose();
    }
  };

  return (
    <View
      style={{
        alignItems: 'center',
        paddingBottom: 20,
        paddingHorizontal: 16,
        paddingTop: 8,
        width: '100%',
      }}
    >
      {/* 1. Top Close Button */}
      <View
        style={{
          alignSelf: 'flex-end',
          marginBottom: 16,
        }}
      >
        <Pressable
          onPress={handleComplete}
          hitSlop={12}
          style={{
            alignItems: 'center',
            backgroundColor: '#F3EFE6',
            borderRadius: 16,
            height: 32,
            justifyContent: 'center',
            width: 32,
          }}
          accessibilityLabel="Close"
        >
          <Text
            style={{
              color: '#17191C',
              fontSize: 14,
              fontWeight: '700',
            }}
          >
            ✕
          </Text>
        </Pressable>
      </View>

      {/* 2. Success Checkmark Badge */}
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#D1FAE5',
          borderRadius: 44,
          height: 88,
          justifyContent: 'center',
          marginBottom: 20,
          marginTop: 10,
          width: 88,
        }}
      >
        <Image
          source={icons.checkCircle}
          style={{
            height: 46,
            resizeMode: 'contain',
            tintColor: '#10B981',
            width: 46,
          }}
        />
      </View>

      {/* 3. Heading & Subtitle */}
      <Text
        style={{
          color: '#111315',
          fontFamily: fontSans,
          fontSize: 22,
          fontWeight: '800',
          letterSpacing: -0.4,
          marginBottom: 8,
          textAlign: 'center',
        }}
      >
        Report submitted
      </Text>

      <Text
        style={{
          color: '#687078',
          fontFamily: fontSans,
          fontSize: 13.5,
          lineHeight: 20,
          marginBottom: 28,
          paddingHorizontal: 12,
          textAlign: 'center',
        }}
      >
        Thanks for letting us know. Our team will review this issue and contact
        you if more information is needed.
      </Text>

      {/* 4. Primary CTA: "Got it" */}
      <Pressable
        style={({ pressed }) => [
          {
            alignItems: 'center',
            backgroundColor: colors.yellow500 || '#FFC928',
            borderRadius: 14,
            height: 50,
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 3,
            elevation: 2,
            width: '100%',
          },
          pressed && {
            opacity: 0.92,
          },
        ]}
        onPress={handleComplete}
        accessibilityRole="button"
        accessibilityLabel="Got it"
      >
        <Text
          style={{
            color: '#111315',
            fontFamily: fontSans,
            fontSize: 16,
            fontWeight: '800',
            letterSpacing: 0.2,
          }}
        >
          Got it
        </Text>
      </Pressable>
    </View>
  );
}

export default ReportIssueConfirmation;
