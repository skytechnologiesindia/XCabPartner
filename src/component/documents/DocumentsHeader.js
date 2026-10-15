import React from 'react';
import {
  Pressable,
  Text,
  View,
} from 'react-native';

/**
 * DocumentsHeader
 * Light grey bar: back arrow, "Documents" title, Help pill.
 * `topInset` extends the bar below the status bar on iOS.
 */
function DocumentsHeader({
  onBack,
  onHelp,
  topInset = 0,
}) {
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: '#EEF0F2',
        borderBottomColor: '#E3E5E8',
        borderBottomWidth: 1,
        flexDirection: 'row',
        paddingBottom: 10,
        paddingHorizontal: 16,
        paddingTop: topInset + 10,
      }}>
      <Pressable
        style={({ pressed }) => [
          {
            alignItems: 'center',
            height: 40,
            justifyContent: 'center',
            width: 40,
          },
          pressed && { opacity: 0.6 },
        ]}
        onPress={onBack}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Text style={{ color: '#17191C', fontSize: 24, fontWeight: '600' }}>←</Text>
      </Pressable>

      <Text
        style={{
          color: '#17191C',
          flex: 1,
          fontSize: 22,
          fontWeight: '700',
          marginLeft: 14,
        }}>
        Documents
      </Text>

      <Pressable
        style={({ pressed }) => [
          {
            alignItems: 'center',
            borderColor: '#9AA1A8',
            borderRadius: 20,
            borderWidth: 1,
            flexDirection: 'row',
            height: 40,
            paddingHorizontal: 14,
          },
          pressed && { opacity: 0.6 },
        ]}
        onPress={onHelp}
        accessibilityRole="button"
        accessibilityLabel="Help"
      >
        <Text style={{ fontSize: 15, marginRight: 6 }}>🎧</Text>
        <Text style={{ color: '#17191C', fontSize: 16, fontWeight: '600' }}>Help</Text>
      </Pressable>

    </View>
  );
}

export default DocumentsHeader;
