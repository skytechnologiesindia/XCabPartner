import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { relationshipOptions } from './emergencyContactOnboardingData';

/**
 * EmergencyContactForm
 * Step 6 of 8 input fields:
 * - Contact Name (e.g. Arif Khan)
 * - Relationship (e.g. Brother)
 * - Mobile Number (e.g. +91 98765 43210)
 */
function EmergencyContactForm({
  formData = {},
  onChangeField,
  onFocusPhone,
  onBlurPhone,
  errors = {},
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePhoneChange = text => {
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 10);
    onChangeField('phone', cleaned);
  };

  return (
    <View style={styles.container}>
      {/* 1. Contact Name */}
      <View style={styles.inputCard}>
        <Text style={styles.inputLabel}>Contact Name</Text>
        <TextInput
          style={styles.textInput}
          value={formData.name || ''}
          onChangeText={val => onChangeField('name', val)}
          placeholder="Enter contact name (e.g. Arif Khan)"
          placeholderTextColor="#9CA3AF"
          autoCapitalize="words"
        />
        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
      </View>

      {/* 2. Relationship */}
      <Pressable
        style={({ pressed }) => [styles.inputCard, pressed && { opacity: 0.8 }]}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.inputLabel}>Relationship</Text>
        <View style={styles.selectRow}>
          <Text style={styles.selectText}>
            {formData.relationship || 'Select relationship'}
          </Text>
          <Text style={styles.chevronIcon}>⌄</Text>
        </View>
        {errors.relationship ? (
          <Text style={styles.errorText}>{errors.relationship}</Text>
        ) : null}
      </Pressable>

      {/* 3. Mobile Number */}
      <View style={styles.inputCard}>
        <Text style={styles.inputLabel}>Mobile Number</Text>
        <View style={styles.phoneInputRow}>
          <View style={styles.countryBadge}>
            <Text style={styles.countryFlag}>🇮🇳</Text>
            <Text style={styles.countryCode}>+91</Text>
          </View>
          <TextInput
            style={styles.phoneTextInput}
            value={formData.phone || ''}
            onChangeText={handlePhoneChange}
            onFocus={onFocusPhone}
            onBlur={onBlurPhone}
            placeholder="98765 43210"
            placeholderTextColor="#9CA3AF"
            keyboardType="number-pad"
            maxLength={10}
          />
        </View>
        {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
      </View>

      {/* Safety info card */}
      <View style={styles.safetyInfo}>
        <Text style={styles.safetyIcon}>🛡️</Text>
        <Text style={styles.safetyText}>
          Your emergency contact will be notified automatically in case of SOS or critical incidents during trips.
        </Text>
      </View>

      {/* Relationship Selector Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Relationship</Text>
              <Pressable
                onPress={() => setIsModalVisible(false)}
                style={styles.closeBtn}
              >
                <Text style={styles.closeBtnText}>✕</Text>
              </Pressable>
            </View>

            <ScrollView style={styles.modalList} showsVerticalScrollIndicator={false}>
              {relationshipOptions.map(rel => {
                const isSelected = formData.relationship === rel;
                return (
                  <Pressable
                    key={rel}
                    style={({ pressed }) => [
                      styles.modalOption,
                      isSelected && styles.modalOptionSelected,
                      pressed && { opacity: 0.7 },
                    ]}
                    onPress={() => {
                      onChangeField('relationship', rel);
                      setIsModalVisible(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.modalOptionText,
                        isSelected && styles.modalOptionTextSelected,
                      ]}
                    >
                      {rel}
                    </Text>
                    {isSelected ? (
                      <Text style={styles.modalCheck}>✓</Text>
                    ) : null}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    width: '100%',
  },
  inputCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DDD9CF',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  inputLabel: {
    color: '#687078',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 4,
  },
  textInput: {
    color: '#17191C',
    fontSize: 15,
    fontWeight: '700',
    padding: 0,
  },
  selectRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectText: {
    color: '#17191C',
    fontSize: 15,
    fontWeight: '700',
  },
  chevronIcon: {
    color: '#687078',
    fontSize: 18,
    fontWeight: '700',
  },
  phoneInputRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  countryBadge: {
    alignItems: 'center',
    backgroundColor: '#F1EEE5',
    borderRadius: 6,
    flexDirection: 'row',
    marginRight: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  countryFlag: {
    fontSize: 14,
    marginRight: 4,
  },
  countryCode: {
    color: '#17191C',
    fontSize: 13,
    fontWeight: '700',
  },
  phoneTextInput: {
    color: '#17191C',
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1,
    padding: 0,
  },
  errorText: {
    color: '#E87861',
    fontSize: 11.5,
    marginTop: 4,
  },
  safetyInfo: {
    alignItems: 'center',
    backgroundColor: '#F7FDF9',
    borderColor: '#DDF5E9',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  safetyIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  safetyText: {
    color: '#166534',
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
  modalBackdrop: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '60%',
    padding: 20,
    width: '100%',
  },
  modalHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalTitle: {
    color: '#17191C',
    fontSize: 17,
    fontWeight: '800',
  },
  closeBtn: {
    padding: 4,
  },
  closeBtnText: {
    color: '#687078',
    fontSize: 16,
    fontWeight: '700',
  },
  modalList: {
    marginBottom: 10,
  },
  modalOption: {
    alignItems: 'center',
    borderBottomColor: '#F1EEE5',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  modalOptionSelected: {
    backgroundColor: '#FFFBEB',
  },
  modalOptionText: {
    color: '#17191C',
    fontSize: 15,
    fontWeight: '600',
  },
  modalOptionTextSelected: {
    color: '#17191C',
    fontWeight: '800',
  },
  modalCheck: {
    color: '#FFC928',
    fontSize: 16,
    fontWeight: '900',
  },
});

export default EmergencyContactForm;
