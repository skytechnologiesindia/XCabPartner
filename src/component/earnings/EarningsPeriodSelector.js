import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const PERIOD_OPTIONS = [
  { key: 'weekly', label: 'This Week' },
  { key: 'monthly', label: 'This Month' },
  { key: 'yearly', label: 'This Year' },
];

/**
 * EarningsPeriodSelector
 * Dropdown selector for earnings reporting periods (This Week, This Month, This Year).
 */
function EarningsPeriodSelector({ activePeriod = 'weekly', onSelectPeriod }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const selectedOption =
    PERIOD_OPTIONS.find(opt => opt.key === activePeriod) || PERIOD_OPTIONS[0];

  const handleSelect = key => {
    if (onSelectPeriod) {
      onSelectPeriod(key);
    }
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Trigger Button */}
      <Pressable
        style={({ pressed }) => [
          styles.selectorButton,
          pressed && styles.selectorButtonPressed,
        ]}
        onPress={() => setDropdownVisible(true)}
        accessibilityRole="button"
        accessibilityLabel={`Selected period: ${selectedOption.label}`}
      >
        <Text style={styles.selectorText}>{selectedOption.label}</Text>
        <Text style={styles.chevronIcon}>⌄</Text>
      </Pressable>

      {/* Dropdown Modal Menu */}
      <Modal
        visible={dropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setDropdownVisible(false)}
        >
          <View style={styles.dropdownCard}>
            <Text style={styles.dropdownTitle}>Select Period</Text>
            {PERIOD_OPTIONS.map(opt => {
              const isCurrent = opt.key === activePeriod;
              return (
                <Pressable
                  key={opt.key}
                  style={({ pressed }) => [
                    styles.optionItem,
                    isCurrent && styles.optionItemActive,
                    pressed && styles.optionItemPressed,
                  ]}
                  onPress={() => handleSelect(opt.key)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isCurrent && styles.optionTextActive,
                    ]}
                  >
                    {opt.label}
                  </Text>
                  {isCurrent && <Text style={styles.checkMark}>✓</Text>}
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  selectorButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#DDD9CF',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  selectorButtonPressed: {
    backgroundColor: '#F5F3ED',
  },
  selectorText: {
    color: '#17191C',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: -0.1,
  },
  chevronIcon: {
    color: '#17191C',
    fontSize: 14,
    fontWeight: '700',
    marginTop: -2,
  },
  modalBackdrop: {
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 110,
  },
  dropdownCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DDD9CF',
    borderRadius: 16,
    borderWidth: 1,
    elevation: 8,
    minWidth: 160,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  dropdownTitle: {
    color: '#8E9398',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    paddingHorizontal: 14,
    paddingVertical: 6,
    textTransform: 'uppercase',
  },
  optionItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  optionItemActive: {
    backgroundColor: '#F7F5EF',
  },
  optionItemPressed: {
    opacity: 0.8,
  },
  optionText: {
    color: '#17191C',
    fontSize: 13,
    fontWeight: '600',
  },
  optionTextActive: {
    color: '#17191C',
    fontWeight: '800',
  },
  checkMark: {
    color: '#FFC928',
    fontSize: 14,
    fontWeight: '900',
  },
});

export default EarningsPeriodSelector;
