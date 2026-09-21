import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

/**
 * SubmissionConfirmation
 * Declaration checkbox at the bottom of Review & Submit:
 * "I confirm that all the information provided is true and correct."
 */
function SubmissionConfirmation({ isChecked, onToggle }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && { opacity: 0.8 }]}
      onPress={onToggle}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isChecked }}
    >
      <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
        {isChecked ? <Text style={styles.checkmark}>✓</Text> : null}
      </View>
      <Text style={styles.label}>
        I confirm that all the information provided is true and correct.
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 8,
    paddingHorizontal: 20,
    width: '100%',
  },
  checkbox: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#DDD9CF',
    borderRadius: 6,
    borderWidth: 1.5,
    height: 22,
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 1,
    width: 22,
  },
  checkboxChecked: {
    backgroundColor: '#FFC928',
    borderColor: '#FFC928',
  },
  checkmark: {
    color: '#17191C',
    fontSize: 14,
    fontWeight: '900',
  },
  label: {
    color: '#374151',
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
});

export default SubmissionConfirmation;
