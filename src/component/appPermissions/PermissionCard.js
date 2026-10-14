import React from 'react';
import {
  Pressable,
  Text,
  View,
} from 'react-native';

/**
 * PermissionCard
 * White rounded row: blue icon tile, title + description, then either a green
 * "Granted" check or a blue chevron.
 */
function PermissionCard({
  title,
  description,
  icon,
  granted = false,
  onPress,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: 14,
          elevation: 1,
          flexDirection: 'row',
          marginBottom: 12,
          padding: 14,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
        },
        pressed && { opacity: 0.85 },
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${granted ? 'granted' : 'not granted'}`}
    >
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#E8F1FD',
          borderRadius: 12,
          height: 44,
          justifyContent: 'center',
          width: 44,
        }}>
        <Text style={{ color: '#1560BD', fontSize: 20 }}>{icon}</Text>
      </View>

      <View style={{ flex: 1, marginLeft: 14 }}>
        <Text style={{ color: '#10153F', fontSize: 15, fontWeight: '700' }}>
          {title}
        </Text>
        <Text
          style={{
            color: '#6B7480',
            fontSize: 12.5,
            lineHeight: 17,
            marginTop: 3,
          }}>
          {description}
        </Text>
      </View>

      {granted ? (
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#E3F5EC',
            borderRadius: 14,
            height: 24,
            justifyContent: 'center',
            marginLeft: 8,
            width: 24,
          }}>
          <Text style={{ color: '#16A34A', fontSize: 14, fontWeight: '800' }}>✓</Text>
        </View>
      ) : (
        <Text
          style={{
            color: '#1560BD',
            fontSize: 28,
            fontWeight: '300',
            lineHeight: 30,
            marginLeft: 8,
          }}>
          ›
        </Text>
      )}
    </Pressable>
  );
}

export default PermissionCard;
