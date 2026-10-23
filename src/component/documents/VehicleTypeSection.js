import React from 'react';
import {
  Pressable,
  Text,
  View,
} from 'react-native';

// [API] `apiValue` is the option value the backend uses (CAR / BIKE / AUTO).
// The server sends no labels, so the label and icon stay in the app.
export const vehicleTypes = [
  { id: 'car', apiValue: 'CAR', label: 'Cab', icon: '🚘', value: 'Car' },
  { id: 'auto', apiValue: 'AUTO', label: 'Auto', icon: '🛺', value: 'Auto Rickshaw' },
  { id: 'bike', apiValue: 'BIKE', label: 'Bike', icon: '🏍️', value: 'Bike' },
];

/**
 * [API] `options` is the VEHICLE step's options from /requirements:
 * [{ value: 'CAR', status: 'AVAILABLE' }, { value: 'BIKE', status: 'COMING_SOON' }]
 * Cards follow that order; COMING_SOON is greyed out and cannot be tapped;
 * a value the app does not know is skipped. Without options (not loaded yet)
 * only Cab is available, as before.
 */
function buildCards(options) {
  if (!options || options.length === 0) {
    return vehicleTypes.map(type => ({ ...type, isComingSoon: type.id !== 'car' }));
  }
  return options
    .map(option => {
      const type = vehicleTypes.find(t => t.apiValue === option.value);
      return type ? { ...type, isComingSoon: option.status !== 'AVAILABLE' } : null;
    })
    .filter(Boolean);
}

function VehicleTypeSection({ selectedType, onSelect, options }) {
  const cards = buildCards(options);
  return (
    <View>
      <Text
        style={{
          color: '#17191C',
          fontSize: 17,
          fontWeight: '700',
          marginBottom: 10,
        }}>
        Vehicle Type
      </Text>
      <View>
        {cards.map(type => {
          const isSelected = type.id === selectedType;
          // [API] from the option's status instead of "everything but car"
          const isComingSoon = type.isComingSoon;

          return (
            <Pressable
              key={type.id}
              disabled={isComingSoon}
              style={({ pressed }) => [
                {
                  alignItems: 'center',
                  backgroundColor: isComingSoon
                    ? '#FFFFFF'
                    : isSelected
                      ? '#F2F9FD'
                      : '#FFFFFF',
                  borderColor: isSelected ? '#0E8FC7' : '#EEECE5',
                  borderRadius: 12,
                  borderWidth: 1,
                  marginBottom: 12,
                  minHeight: 50,
                  justifyContent: 'center',
                  paddingVertical: 12,
                },
                pressed && !isComingSoon && { opacity: 0.8 },
              ]}
              onPress={() => onSelect(type)}
              accessibilityRole="radio"
              accessibilityState={{ disabled: isComingSoon, selected: isSelected }}
              accessibilityLabel={
                isComingSoon
                  ? `${type.id === 'auto' ? 'Auto rickshaw' : type.label}, coming soon`
                  : type.label
              }
            >
              <Text
                style={{
                  color: isComingSoon ? '#9299A1' : undefined,
                  fontSize: 23,
                  marginBottom: 3,
                  opacity: isComingSoon ? 0.65 : 1,
                }}>
                {type.icon}
              </Text>
              <Text
                style={{
                  color: isComingSoon ? '#8A929B' : '#17191C',
                  fontSize: 13,
                  fontWeight: isSelected ? '700' : '500',
                }}>
                {type.label}
              </Text>
              {isComingSoon ? (
                <Text
                  style={{
                    color: '#8A929B',
                    fontSize: 12,
                    marginTop: 6,
                  }}>
                  Coming soon
                </Text>
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default VehicleTypeSection;
