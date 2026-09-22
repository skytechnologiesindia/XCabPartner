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
import {
  modelsByMake,
  vehicleColors,
  vehicleMakes,
  vehicleTypes,
  vehicleYears,
} from './vehicleDetailsOnboardingData';

/**
 * VehicleDetailsForm
 * Composes the 6 vehicle configuration fields for Step 4 of 8:
 * 1. Vehicle Type (Sedan, etc.)
 * 2. Make (Toyota, etc.)
 * 3. Model (Etios, etc.)
 * 4. Year (2020, etc.)
 * 5. Color (White, etc.)
 * 6. Registration Number (JH01AB1234)
 */
function VehicleDetailsForm({
  formData = {},
  onChangeField,
  onFocusRegistration,
  onBlurRegistration,
  errors = {},
}) {
  const [activeModal, setActiveModal] = useState(null);

  const availableModels =
    modelsByMake[formData.make] || modelsByMake.Toyota;

  const handleSelectMake = make => {
    onChangeField('make', make);
    const makeModels = modelsByMake[make] || [];
    if (makeModels.length > 0 && !makeModels.includes(formData.model)) {
      onChangeField('model', makeModels[0]);
    }
  };

  const handleRegNumberChange = text => {
    const formatted = text.toUpperCase().replace(/[^A-Z0-9]/g, '');
    onChangeField('registrationNumber', formatted);
  };

  return (
    <View style={styles.container}>
      {/* 1. Vehicle Type */}
      <SelectField
        label="Vehicle Type"
        value={formData.type}
        icon="🚗"
        onPress={() => setActiveModal('type')}
      />

      {/* 2. Make */}
      <SelectField
        label="Brand / Make"
        value={formData.make}
        icon="🏢"
        onPress={() => setActiveModal('make')}
      />

      {/* 3. Model */}
      <SelectField
        label="Model"
        value={formData.model}
        icon="🚘"
        onPress={() => setActiveModal('model')}
      />

      {/* 4. Year */}
      <SelectField
        label="Year"
        value={formData.year}
        icon="📅"
        onPress={() => setActiveModal('year')}
      />

      {/* 5. Color */}
      <SelectField
        label="Color"
        value={formData.color}
        icon="🎨"
        onPress={() => setActiveModal('color')}
      />

      {/* 6. Registration Number */}
      <View style={styles.inputCard}>
        <Text style={styles.inputLabel}>Registration Number</Text>
        <TextInput
          style={styles.textInput}
          value={formData.registrationNumber || ''}
          onChangeText={handleRegNumberChange}
          onFocus={onFocusRegistration}
          onBlur={onBlurRegistration}
          placeholder="JH01AB1234"
          placeholderTextColor="#9CA3AF"
          autoCapitalize="characters"
          maxLength={12}
        />
        {errors.registrationNumber ? (
          <Text style={styles.errorText}>{errors.registrationNumber}</Text>
        ) : null}
      </View>

      {/* Dropdown Selection Modals */}
      <OptionsModal
        visible={activeModal === 'type'}
        title="Select Vehicle Type"
        options={vehicleTypes.map(t => ({ label: `${t.icon}  ${t.label}`, value: t.label }))}
        selectedValue={formData.type}
        onSelect={val => onChangeField('type', val)}
        onClose={() => setActiveModal(null)}
      />

      <OptionsModal
        visible={activeModal === 'make'}
        title="Select Vehicle Make"
        options={vehicleMakes.map(m => ({ label: m, value: m }))}
        selectedValue={formData.make}
        onSelect={handleSelectMake}
        onClose={() => setActiveModal(null)}
      />

      <OptionsModal
        visible={activeModal === 'model'}
        title="Select Vehicle Model"
        options={availableModels.map(m => ({ label: m, value: m }))}
        selectedValue={formData.model}
        onSelect={val => onChangeField('model', val)}
        onClose={() => setActiveModal(null)}
      />

      <OptionsModal
        visible={activeModal === 'year'}
        title="Select Manufacturing Year"
        options={vehicleYears.map(y => ({ label: y, value: y }))}
        selectedValue={formData.year}
        onSelect={val => onChangeField('year', val)}
        onClose={() => setActiveModal(null)}
      />

      <OptionsModal
        visible={activeModal === 'color'}
        title="Select Vehicle Color"
        options={vehicleColors.map(c => ({ label: c.label, value: c.label }))}
        selectedValue={formData.color}
        onSelect={val => onChangeField('color', val)}
        onClose={() => setActiveModal(null)}
      />
    </View>
  );
}

function SelectField({ label, value, icon, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.inputCard, pressed && { opacity: 0.8 }]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Select ${label}`}
    >
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.selectRow}>
        <View style={styles.selectLeft}>
          <Text style={styles.selectIcon}>{icon}</Text>
          <Text style={styles.selectValueText}>{value || `Select ${label}`}</Text>
        </View>
        <Text style={styles.chevronIcon}>⌄</Text>
      </View>
    </Pressable>
  );
}

function OptionsModal({ visible, title, options = [], selectedValue, onSelect, onClose }) {
  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <Pressable onPress={onClose} style={styles.modalCloseBtn}>
              <Text style={styles.modalCloseBtnText}>✕</Text>
            </Pressable>
          </View>

          <ScrollView style={styles.optionsList} showsVerticalScrollIndicator={false}>
            {options.map(opt => {
              const isSelected = selectedValue === opt.value;
              return (
                <Pressable
                  key={opt.value}
                  style={({ pressed }) => [
                    styles.optionItem,
                    isSelected && styles.optionItemSelected,
                    pressed && { opacity: 0.7 },
                  ]}
                  onPress={() => {
                    onSelect(opt.value);
                    onClose();
                  }}
                >
                  <Text style={[styles.optionItemText, isSelected && styles.optionItemTextSelected]}>
                    {opt.label}
                  </Text>
                  {isSelected ? <Text style={styles.optionCheck}>✓</Text> : null}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
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
  selectRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectLeft: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  selectIcon: {
    fontSize: 15,
    marginRight: 8,
  },
  selectValueText: {
    color: '#17191C',
    fontSize: 15,
    fontWeight: '700',
  },
  chevronIcon: {
    color: '#687078',
    fontSize: 18,
    fontWeight: '700',
  },
  textInput: {
    color: '#17191C',
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
    maxHeight: '65%',
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
  modalCloseBtn: {
    padding: 4,
  },
  modalCloseBtnText: {
    color: '#687078',
    fontSize: 16,
    fontWeight: '700',
  },
  optionsList: {
    marginBottom: 10,
  },
  optionItem: {
    alignItems: 'center',
    borderBottomColor: '#F1EEE5',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  optionItemSelected: {
    backgroundColor: '#FFFBEB',
  },
  optionItemText: {
    color: '#17191C',
    fontSize: 15,
    fontWeight: '600',
  },
  optionItemTextSelected: {
    color: '#17191C',
    fontWeight: '800',
  },
  optionCheck: {
    color: '#FFC928',
    fontSize: 16,
    fontWeight: '900',
  },
});

export default VehicleDetailsForm;
