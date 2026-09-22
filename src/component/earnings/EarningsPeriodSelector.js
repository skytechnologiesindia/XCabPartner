import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  Text,
  View,
} from 'react-native';
import styles from '../../assets/styles/styles';

const PERIOD_OPTIONS = [
  { key: 'weekly', label: 'This Week' },
  { key: 'monthly', label: 'This Month' },
  { key: 'yearly', label: 'This Year' },
];

/**
 * EarningsPeriodSelector
 * Dropdown selector for earnings reporting periods with utility styles.
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
    <View style={{ position: 'relative' }}>
      {/* Trigger Button */}
      <Pressable
        style={({ pressed }) => [
          styles.pdh16,
          styles.pdv8,
          {
            alignItems: 'center',
            backgroundColor: pressed ? '#F5F3ED' : '#FFFFFF',
            borderColor: '#DDD9CF',
            borderRadius: 12,
            borderWidth: 1,
            flexDirection: 'row',
            gap: 6,
          },
        ]}
        onPress={() => setDropdownVisible(true)}
        accessibilityRole="button"
        accessibilityLabel={`Selected period: ${selectedOption.label}`}
      >
        <Text
          style={[
            styles.ts13,
            {
              color: '#17191C',
              fontWeight: '700',
              letterSpacing: -0.1,
            },
          ]}
        >
          {selectedOption.label}
        </Text>
        <Text
          style={[
            styles.ts14,
            {
              color: '#17191C',
              fontWeight: '700',
              marginTop: -2,
            },
          ]}
        >
          ⌄
        </Text>
      </Pressable>

      {/* Dropdown Modal Menu */}
      <Modal
        visible={dropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <Pressable
          style={[
            styles.pdh16,
            {
              alignItems: 'flex-end',
              backgroundColor: 'rgba(0,0,0,0.3)',
              flex: 1,
              justifyContent: 'flex-start',
              paddingTop: 110,
            },
          ]}
          onPress={() => setDropdownVisible(false)}
        >
          <View
            style={[
              styles.pdv8,
              {
                backgroundColor: '#FFFFFF',
                borderColor: '#DDD9CF',
                borderRadius: 16,
                borderWidth: 1,
                elevation: 8,
                minWidth: 160,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
              },
            ]}
          >
            <Text
              style={[
                styles.ts10,
                styles.pdh16,
                styles.pdv8,
                {
                  color: '#8E9398',
                  fontWeight: '700',
                  letterSpacing: 0.5,
                  textTransform: 'uppercase',
                },
              ]}
            >
              Select Period
            </Text>
            {PERIOD_OPTIONS.map(opt => {
              const isCurrent = opt.key === activePeriod;
              return (
                <Pressable
                  key={opt.key}
                  style={({ pressed }) => [
                    styles.pdh16,
                    styles.pdv12,
                    {
                      alignItems: 'center',
                      backgroundColor: isCurrent ? '#F7F5EF' : 'transparent',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                  onPress={() => handleSelect(opt.key)}
                >
                  <Text
                    style={[
                      styles.ts13,
                      {
                        color: '#17191C',
                        fontWeight: isCurrent ? '800' : '600',
                      },
                    ]}
                  >
                    {opt.label}
                  </Text>
                  {isCurrent && (
                    <Text
                      style={[
                        styles.ts14,
                        {
                          color: '#FFC928',
                          fontWeight: '900',
                        },
                      ]}
                    >
                      ✓
                    </Text>
                  )}
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

export default EarningsPeriodSelector;
