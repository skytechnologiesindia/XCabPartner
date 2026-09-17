import React from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
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
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalCard} onPress={e => e.stopPropagation()}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <Pressable
              style={styles.closeBtn}
              onPress={onClose}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.closeBtnText}>✕</Text>
            </Pressable>
          </View>

          <ScrollView
            style={styles.scrollList}
            contentContainerStyle={styles.scrollContent}
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
                    styles.optionItem,
                    isSelected && styles.optionItemSelected,
                    pressed && styles.optionItemPressed,
                  ]}
                  onPress={() => {
                    onSelect(value);
                    onClose();
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.optionTextSelected,
                    ]}
                  >
                    {label}
                  </Text>
                  {isSelected ? (
                    <Text style={styles.checkIcon}>✓</Text>
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

const styles = StyleSheet.create({
  modalOverlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalCard: {
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
  },
  modalHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0ECE1',
    width: '100%',
  },
  modalTitle: {
    color: '#17191C',
    fontSize: 17,
    fontWeight: '800',
  },
  closeBtn: {
    alignItems: 'center',
    backgroundColor: '#F1EEE5',
    borderRadius: 14,
    height: 28,
    justifyContent: 'center',
    width: 28,
  },
  closeBtnText: {
    color: '#687078',
    fontSize: 13,
    fontWeight: '700',
  },
  scrollList: {
    marginTop: 10,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  optionItem: {
    alignItems: 'center',
    backgroundColor: '#FAFAF8',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  optionItemSelected: {
    backgroundColor: '#FFF4C7',
    borderColor: '#FFC928',
    borderWidth: 1,
  },
  optionItemPressed: {
    backgroundColor: '#F4F0E6',
  },
  optionText: {
    color: '#17191C',
    fontSize: 15,
    fontWeight: '600',
  },
  optionTextSelected: {
    color: '#17191C',
    fontWeight: '800',
  },
  checkIcon: {
    color: '#18A66A',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default VehicleSelectModal;
