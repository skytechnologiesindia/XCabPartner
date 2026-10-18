import React from 'react';
import {
  Pressable,
  Text,
  View,
} from 'react-native';

/**
 * VerificationHeader
 * Top row with the right-aligned "Need Help?" action.
 * - `onBack`: optional left back arrow (omitted on the login screen).
 * - `backgroundColor`: transparent by default; pass a colour for a filled bar.
 * - `topInset`: keeps it below the status bar on iOS.
 */
function VerificationHeader({
  onBack,
  title,
  centerTitle = false,
  onNeedHelp,
  backgroundColor = 'transparent',
  topInset = 0,
}) {
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor,
        flexDirection: 'row',
        justifyContent: onBack ? 'space-between' : 'flex-end',
        paddingBottom: backgroundColor === 'transparent' ? 4 : 14,
        paddingHorizontal: 20,
        paddingTop: topInset + (backgroundColor === 'transparent' ? 8 : 14),
        width: '100%',
      }}>
      {/* Back Action */}
      {onBack ? (
        <Pressable
          style={({ pressed }) => [
            {
              alignItems: 'center',
              height: 36,
              justifyContent: 'center',
              width: 36,
            },
            pressed && { opacity: 0.6 },
          ]}
          onPress={onBack}
          hitSlop={{ top: 12, bottom: 12, left: 14, right: 14 }}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={{ color: '#17191C', fontSize: 24, fontWeight: '600' }}>←</Text>
        </Pressable>
      ) : null}

      {/* Optional title, left-aligned beside the back arrow */}
      {title ? (
        <Text
          numberOfLines={1}
          style={{
            color: '#17191C',
            flex: 1,
            fontSize: 22,
            fontWeight: '700',
            marginHorizontal: 12,
            textAlign: centerTitle ? 'center' : 'left',
          }}>
          {title}
        </Text>
      ) : null}

      {/* Need Help Action */}
      <Pressable
        style={({ pressed }) => [
          {
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingVertical: 4,
          },
          pressed && { opacity: 0.6 },
        ]}
        onPress={onNeedHelp}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        accessibilityRole="button"
        accessibilityLabel="Need help with login"
      >
        <Text
          style={{
            color: '#374151',
            fontSize: 15,
            fontWeight: '600',
          }}>
          Need Help?
        </Text>
      </Pressable>
    </View>
  );
}

export default VerificationHeader;
