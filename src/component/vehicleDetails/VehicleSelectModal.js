import React from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

/**
 * VehicleSelectModal
 * Reusable selection modal for choosing vehicle parameters:
 * (Vehicle Type, Make, Model, Year, Color)
 */
function VehicleSelectModal({
  visible,
  title,
  options = [],
  selectedValue,
  onSelect,
  onClose,
}) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        style={{
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          flex: 1,
          justifyContent: 'flex-end',
        }}
        onPress={onClose}
      >
        <Pressable
          style={{
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            maxHeight: '65%',
            paddingBottom: 24,
            paddingHorizontal: 20,
            paddingTop: 18,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 8,
            width: '100%',
          }}
          onPress={e => e.stopPropagation()}
        >
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 14,
              borderBottomWidth: 1,
              borderBottomColor: '#F0ECE1',
              width: '100%',
            }}
          >
            <Text
              style={{
                color: '#17191C',
                fontSize: 17,
                fontWeight: '800',
              }}
            >
              {title}
            </Text>
            <Pressable
              style={{
                alignItems: 'center',
                backgroundColor: '#F1EEE5',
                borderRadius: 14,
                height: 28,
                justifyContent: 'center',
                width: 28,
              }}
              onPress={onClose}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text
                style={{
                  color: '#687078',
                  fontSize: 13,
                  fontWeight: '700',
                }}
              >
                ✕
              </Text>
            </Pressable>
          </View>

          <ScrollView
            style={{ marginTop: 10 }}
            contentContainerStyle={{ paddingBottom: 16 }}
            showsVerticalScrollIndicator={false}
          >
            {options.map(option => {
              const label = typeof option === 'string' ? option : option.label;
              const value = typeof option === 'string' ? option : option.label;
              const isSelected = selectedValue === value;

              return (
                <Pressable
                  key={value}
                  style={({ pressed }) => [
                    {
                      alignItems: 'center',
                      backgroundColor: '#FAFAF8',
                      borderRadius: 12,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 8,
                      paddingHorizontal: 16,
                      paddingVertical: 13,
                    },
                    isSelected && {
                      backgroundColor: '#FFF4C7',
                      borderColor: '#FFC928',
                      borderWidth: 1,
                    },
                    pressed && {
                      backgroundColor: '#F4F0E6',
                    },
                  ]}
                  onPress={() => {
                    onSelect(value);
                    onClose();
                  }}
                >
                  <Text
                    style={[
                      {
                        color: '#17191C',
                        fontSize: 15,
                        fontWeight: '600',
                      },
                      isSelected && {
                        color: '#17191C',
                        fontWeight: '800',
                      },
                    ]}
                  >
                    {label}
                  </Text>
                  {isSelected ? (
                    <Text
                      style={{
                        color: '#18A66A',
                        fontSize: 16,
                        fontWeight: '800',
                      }}
                    >
                      ✓
                    </Text>
                  ) : null}
                </Pressable>
              );
            })}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default VehicleSelectModal;
