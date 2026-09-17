import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { genderOptions } from './personalDetailsOnboardingData';

/**
 * GenderSelector
 * 3-way segmented pill selection (Male, Female, Other) with icons.
 */
function GenderSelector({
  selectedGender = 'male',
  onSelectGender,
  errorMessage,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Gender</Text>

      <View style={styles.optionsRow}>
        {genderOptions.map(option => {
          const isSelected = selectedGender === option.id;
          return (
            <Pressable
              key={option.id}
              style={({ pressed }) => [
                styles.optionButton,
                isSelected ? styles.optionButtonSelected : styles.optionButtonUnselected,
                pressed && styles.pressed,
              ]}
              onPress={() => onSelectGender && onSelectGender(option.id)}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={option.label}
            >
              <Text style={[styles.symbolText, isSelected && styles.symbolTextSelected]}>
                {option.symbol}
              </Text>
              <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    color: '#687078',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
  optionButton: {
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1.5,
    flex: 1,
    flexDirection: 'row',
    height: 48,
    justifyContent: 'center',
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  optionButtonSelected: {
    backgroundColor: '#FFF4C7',
    borderColor: '#FFC928',
  },
  optionButtonUnselected: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DDD9CF',
  },
  pressed: {
    opacity: 0.85,
  },
  symbolText: {
    color: '#687078',
    fontSize: 15,
    fontWeight: '700',
    marginRight: 6,
  },
  symbolTextSelected: {
    color: '#17191C',
  },
  optionText: {
    color: '#687078',
    fontSize: 14,
    fontWeight: '600',
  },
  optionTextSelected: {
    color: '#17191C',
    fontWeight: '800',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 11.5,
    fontWeight: '500',
    marginTop: 4,
    paddingHorizontal: 4,
  },
});

export default GenderSelector;
