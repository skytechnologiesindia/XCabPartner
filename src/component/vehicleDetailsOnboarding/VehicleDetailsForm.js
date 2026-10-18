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
import LicenceUpload from '../drivingLicenceOnboarding/LicenceUpload';
import {
  documentTypes,
  fuelTypes,
} from './vehicleDetailsOnboardingData';

/**
 * VehicleDetailsForm
 * Vehicle document form (Step 4 of 8):
 * 1. Select Document (Vehicle RC | Road Tax)
 * 2. Fuel Type (dropdown)
 * 3. Upload front/back images for the selected document
 * 4. Document number
 *
 * `documentData` holds the currently selected document only; the screen keeps
 * RC and Road Tax state separately.
 */
function VehicleDetailsForm({
  docType = 'rc',
  onChangeDocType,
  fuelType = '',
  onChangeFuelType,
  documentData = {},
  onChangeDocumentField,
  errors = {},
}) {
  const [fuelModalOpen, setFuelModalOpen] = useState(false);
  const activeDoc =
    documentTypes.find(doc => doc.id === docType) || documentTypes[0];

  const handleNumberChange = text => {
    const formatted = text.toUpperCase().replace(/[^A-Z0-9]/g, '');
    onChangeDocumentField('number', formatted);
  };

  return (
    <View style={styles.container}>
      {/* 1. Select Document */}
      <Text style={styles.label}>Select Document</Text>
      <View style={styles.docRow}>
        {documentTypes.map(doc => {
          const isSelected = doc.id === docType;
          return (
            <Pressable
              key={doc.id}
              style={({ pressed }) => [
                styles.docCard,
                isSelected && styles.docCardSelected,
                pressed && { opacity: 0.85 },
              ]}
              onPress={() => onChangeDocType(doc.id)}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={doc.label}
            >
              <Text style={styles.docCardText}>{doc.label}</Text>
              <View style={[styles.radio, isSelected && styles.radioSelected]}>
                {isSelected ? <View style={styles.radioDot} /> : null}
              </View>
            </Pressable>
          );
        })}
      </View>

      {/* 2. Fuel Type */}
      <Text style={[styles.label, { marginTop: 28 }]}>Fuel Type</Text>
      <Pressable
        style={({ pressed }) => [
          styles.inputBox,
          styles.selectRow,
          !!errors.fuelType && styles.inputError,
          pressed && { opacity: 0.85 },
        ]}
        onPress={() => setFuelModalOpen(true)}
        accessibilityRole="button"
        accessibilityLabel="Select Fuel Type"
      >
        <Text style={[styles.inputText, !fuelType && { color: '#8A929B' }]}>
          {fuelType || 'Select Fuel Type'}
        </Text>
        <Text style={styles.chevron}>⌄</Text>
      </Pressable>
      {errors.fuelType ? <Text style={styles.errorText}>{errors.fuelType}</Text> : null}

      {/* 3. Upload images (separate state per document, keyed to force remount) */}
      <LicenceUpload
        key={docType}
        heading={`Upload ${activeDoc.label === 'Vehicle RC' ? 'RC' : activeDoc.label} Images`}
        docTitle={activeDoc.label}
        panel
        frontDoc={documentData.frontDocument}
        backDoc={documentData.backDocument}
        onUploadDoc={onChangeDocumentField}
        onRemoveDoc={side => onChangeDocumentField(side, null)}
      />
      {errors.documents ? <Text style={styles.errorText}>{errors.documents}</Text> : null}

      {/* 4. Document number */}
      <Text style={[styles.label, { marginTop: 28 }]}>
        Enter {activeDoc.numberLabel} number
      </Text>
      <View
        style={[
          styles.inputBox,
          styles.selectRow,
          !!errors.number && styles.inputError,
        ]}>
        <TextInput
          style={[styles.inputText, { flex: 1, padding: 0 }]}
          value={documentData.number || ''}
          onChangeText={handleNumberChange}
          placeholder={activeDoc.placeholder}
          placeholderTextColor="#8A929B"
          autoCapitalize="characters"
          maxLength={20}
          accessibilityLabel={`${activeDoc.numberLabel} number`}
        />
        <Text style={styles.infoGlyph}>ⓘ</Text>
      </View>
      {errors.number ? (
        <Text style={styles.errorText}>{errors.number}</Text>
      ) : (
        <View style={styles.hintRow}>
          <Text style={styles.hintIcon}>ⓘ</Text>
          <Text style={styles.hintText}>{activeDoc.example}</Text>
        </View>
      )}

      <FuelModal
        visible={fuelModalOpen}
        selectedValue={fuelType}
        onSelect={onChangeFuelType}
        onClose={() => setFuelModalOpen(false)}
      />
    </View>
  );
}

function FuelModal({ visible, selectedValue, onSelect, onClose }) {
  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.modalBackdrop} onPress={onClose}>
        <Pressable style={styles.modalContent} onPress={e => e.stopPropagation()}>
          <Text style={styles.modalTitle}>Select Fuel Type</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {fuelTypes.map(fuel => {
              const isSelected = selectedValue === fuel;
              return (
                <Pressable
                  key={fuel}
                  style={({ pressed }) => [
                    styles.optionItem,
                    isSelected && styles.optionItemSelected,
                    pressed && { opacity: 0.7 },
                  ]}
                  onPress={() => {
                    onSelect(fuel);
                    onClose();
                  }}
                >
                  <Text style={[styles.optionText, isSelected && { fontWeight: '800' }]}>
                    {fuel}
                  </Text>
                  {isSelected ? <Text style={styles.optionCheck}>✓</Text> : null}
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
  container: {
    paddingHorizontal: 20,
    width: '100%',
  },
  label: {
    color: '#17191C',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  docRow: {
    flexDirection: 'row',
    gap: 14,
  },
  docCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#D9DCE0',
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  docCardSelected: {
    backgroundColor: '#F2F9FD',
    borderColor: '#0E8FC7',
  },
  docCardText: {
    color: '#17191C',
    fontSize: 17,
    fontWeight: '500',
  },
  radio: {
    alignItems: 'center',
    borderColor: '#8A929B',
    borderRadius: 14,
    borderWidth: 2,
    height: 28,
    justifyContent: 'center',
    width: 28,
  },
  radioSelected: {
    borderColor: '#0E8FC7',
  },
  radioDot: {
    backgroundColor: '#0E8FC7',
    borderRadius: 8,
    height: 16,
    width: 16,
  },
  inputBox: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D9DCE0',
    borderRadius: 12,
    borderWidth: 1,
    height: 58,
    paddingHorizontal: 18,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  selectRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputText: {
    color: '#17191C',
    fontSize: 18,
    fontWeight: '400',
  },
  chevron: {
    color: '#17191C',
    fontSize: 22,
    fontWeight: '700',
    marginTop: -6,
  },
  infoGlyph: {
    color: '#6B7480',
    fontSize: 22,
  },
  hintRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 12,
  },
  hintIcon: {
    color: '#6B7480',
    fontSize: 20,
    marginRight: 10,
  },
  hintText: {
    color: '#6B7480',
    fontSize: 15,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 6,
  },
  modalBackdrop: {
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
  modalTitle: {
    color: '#17191C',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 8,
  },
  optionItem: {
    alignItems: 'center',
    borderBottomColor: '#F1EEE5',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  optionItemSelected: {
    backgroundColor: '#FFFBEB',
  },
  optionText: {
    color: '#17191C',
    fontSize: 16,
    fontWeight: '500',
  },
  optionCheck: {
    color: '#FFC928',
    fontSize: 16,
    fontWeight: '900',
  },
});

export default VehicleDetailsForm;
