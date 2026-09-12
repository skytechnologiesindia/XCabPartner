import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {colors, radius} from '../../assets/colors/colors';

function Button({icon, label, onPress}) {
  return (
    <Pressable
      style={({pressed}) => [styles.button, pressed && styles.buttonPressed]}
      onPress={onPress}>
      {icon ? <Text style={styles.icon}>{icon}</Text> : null}
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
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
  buttonPressed: {
    backgroundColor: colors.yellow600,
  },
  icon: {
    color: colors.graphite950,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 20,
  },
  label: {
    color: colors.graphite950,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
});

export default Button;
