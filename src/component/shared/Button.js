import React from 'react';
import { Pressable, Text } from 'react-native';
import { colors, radius } from '../../assets/colors/colors';

function Button({ icon, label, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          alignItems: 'center',
          backgroundColor: colors.yellow500,
          borderColor: colors.graphite950,
          borderRadius: radius.sm,
          borderWidth: 1,
          flexDirection: 'row',
          gap: 6,
          height: 44,
          justifyContent: 'center',
          paddingHorizontal: 12,
        },
        pressed && {
          backgroundColor: colors.yellow600,
        },
      ]}
      onPress={onPress}
    >
      {icon ? (
        <Text
          style={{
            color: colors.graphite950,
            fontSize: 18,
            fontWeight: '600',
            lineHeight: 20,
          }}
        >
          {icon}
        </Text>
      ) : null}
      <Text
        style={{
          color: colors.graphite950,
          fontSize: 12,
          fontWeight: '800',
          letterSpacing: 0.4,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default Button;
