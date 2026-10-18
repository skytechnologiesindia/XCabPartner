import React from 'react';
import {
  Pressable,
  Text,
  View,
} from 'react-native';

/**
 * DocumentCard
 * Rounded white row: tinted icon, title, optional coloured status, chevron.
 */
function DocumentCard({
  title,
  icon,
  tint = '#ECEEF1',
  status,
  onPress,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderColor: '#EEECE5',
          borderRadius: 16,
          borderWidth: 1,
          elevation: 1,
          flexDirection: 'row',
          marginBottom: 12,
          minHeight: 76,
          paddingHorizontal: 16,
          paddingVertical: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
        },
        pressed && { opacity: 0.85 },
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={status ? `${title}, ${status.label}` : title}
    >
      <View
        style={{
          alignItems: 'center',
          backgroundColor: tint,
          borderRadius: 12,
          height: 48,
          justifyContent: 'center',
          width: 48,
        }}>
        <Text style={{ fontSize: 22 }}>{icon}</Text>
      </View>

      <View style={{ flex: 1, marginLeft: 16 }}>
        <Text
          style={{
            color: '#17191C',
            fontSize: 17,
            fontWeight: '600',
          }}>
          {title}
        </Text>
        {status ? (
          <Text
            style={{
              color: status.color,
              fontSize: 14,
              fontWeight: '500',
              marginTop: 3,
            }}>
            {status.label}
          </Text>
        ) : null}
      </View>

      <Text
        style={{
          color: '#7B838B',
          fontSize: 28,
          fontWeight: '300',
          lineHeight: 30,
          marginLeft: 8,
        }}>
        ›
      </Text>
    </Pressable>
  );
}

export default DocumentCard;
