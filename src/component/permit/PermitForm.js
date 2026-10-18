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
  MONTHS,
  getValidityYears,
  isValidityInFuture,
  permitConfig,
} from './permitData';

/**
 * PermitForm
 * Shared "images + number + validity" document form (Permit, Cab Insurance):
 * 1. Upload <docTitle> Images (front / back)
 * 2. Enter <docTitle> number (+ example hint)
 * 3. `extraFields` (optional, e.g. Insurance Company)
 * 4. Valid Till (date picker)
 */
function PermitForm({
  formData = {},
  onChangeField,
  errors = {},
  docTitle = 'Permit',
  placeholder = 'TN123456789',
  example = 'Eg: TN 12 3456789',
  extraFields = null,
}) {
  const [pickerOpen, setPickerOpen] = useState(false);

  // Shown as soon as an already-expired date is picked, so a disabled
  // Continue button always has a visible reason.
  const validTillError =
    errors.validTill ||
    (formData.validTill && !isValidityInFuture(formData.validTill)
      ? 'This date has already passed. Please select a future date.'
      : null);

  const handleNumberChange = text => {
    onChangeField('number', text.toUpperCase().replace(/[^A-Z0-9]/g, ''));
  };

  return (
    <View style={styles.container}>
      {/* 1. Upload images */}
      <LicenceUpload
        heading={`Upload ${docTitle.replace('Cab ', '')} Images`}
        docTitle={docTitle}
        panel
        frontDoc={formData.frontDocument}
        backDoc={formData.backDocument}
        onUploadDoc={onChangeField}
        onRemoveDoc={side => onChangeField(side, null)}
      />
      {errors.documents ? <Text style={styles.errorText}>{errors.documents}</Text> : null}

      {/* 2. Permit number */}
      <Text style={[styles.label, { marginTop: 32 }]}>
        Enter {docTitle.replace('Cab ', '')} number
      </Text>
      <View style={[styles.inputBox, !!errors.number && styles.inputError]}>
        <TextInput
          style={styles.inputText}
          value={formData.number || ''}
          onChangeText={handleNumberChange}
          placeholder={placeholder}
          placeholderTextColor="#8A929B"
          autoCapitalize="characters"
          maxLength={permitConfig.maxNumberLength}
          accessibilityLabel={`${docTitle} number`}
        />
        <Text style={styles.infoGlyph}>ⓘ</Text>
      </View>
      {errors.number ? (
        <Text style={styles.errorText}>{errors.number}</Text>
      ) : (
        <View style={styles.hintRow}>
          <Text style={styles.hintIcon}>ⓘ</Text>
          <Text style={styles.hintText}>{example}</Text>
        </View>
      )}

      {extraFields}

      {/* 4. Valid Till */}
      <Text style={[styles.label, { marginTop: 32 }]}>Valid Till</Text>
      <Pressable
        style={({ pressed }) => [
          styles.inputBox,
          !!validTillError && styles.inputError,
          pressed && { opacity: 0.85 },
        ]}
        onPress={() => setPickerOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={`Select ${docTitle} validity date`}
      >
        <Text
          style={[
            styles.inputText,
            { paddingVertical: 0 },
            !formData.validTill && { color: '#8A929B' },
          ]}>
          {formData.validTill || 'Select date'}
        </Text>
        <Text style={styles.calendarGlyph}>📅</Text>
      </Pressable>
      {validTillError ? <Text style={styles.errorText}>{validTillError}</Text> : null}

      {pickerOpen ? (
        <DatePickerModal
          currentValue={formData.validTill}
          onSelect={value => {
            onChangeField('validTill', value);
            setPickerOpen(false);
          }}
          onClose={() => setPickerOpen(false)}
        />
      ) : null}
    </View>
  );
}

function DatePickerModal({ currentValue, onSelect, onClose }) {
  const today = new Date();
  const years = getValidityYears();

  const parts = (currentValue || '').split(' ');
  const [day, setDay] = useState(parseInt(parts[0], 10) || today.getDate());
  const [month, setMonth] = useState(
    MONTHS.includes(parts[1]) ? parts[1] : MONTHS[today.getMonth()],
  );
  const [year, setYear] = useState(
    years.includes(parseInt(parts[2], 10)) ? parseInt(parts[2], 10) : years[0],
  );

  const renderColumn = (title, items, selected, onPick) => (
    <View style={styles.pickerCol}>
      <Text style={styles.colHeader}>{title}</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {items.map(item => (
          <Pressable
            key={`${title}-${item}`}
            style={[styles.pickerItem, selected === item && styles.pickerItemSelected]}
            onPress={() => onPick(item)}
          >
            <Text style={[styles.pickerItemText, selected === item && { fontWeight: '800' }]}>
              {item}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.modalBackdrop} onPress={onClose}>
        <Pressable style={styles.modalContent} onPress={e => e.stopPropagation()}>
          <Text style={styles.modalTitle}>Select Valid Till date</Text>
          <View style={styles.pickerRow}>
            {renderColumn('Day', Array.from({ length: 31 }, (_, i) => i + 1), day, setDay)}
            {renderColumn('Month', MONTHS, month, setMonth)}
            {renderColumn('Year', years, year, setYear)}
          </View>
          <View style={styles.modalBtnRow}>
            <Pressable style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={styles.confirmBtn}
              onPress={() => onSelect(`${day < 10 ? `0${day}` : day} ${month} ${year}`)}
            >
              <Text style={styles.confirmBtnText}>Confirm</Text>
            </Pressable>
          </View>
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
  inputBox: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#D9DCE0',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    height: 58,
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  inputText: {
    color: '#17191C',
    flex: 1,
    fontSize: 18,
    fontWeight: '400',
    padding: 0,
  },
  infoGlyph: {
    color: '#6B7480',
    fontSize: 22,
  },
  calendarGlyph: {
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
    padding: 20,
    width: '100%',
  },
  modalTitle: {
    color: '#17191C',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 16,
    textAlign: 'center',
  },
  pickerRow: {
    flexDirection: 'row',
    gap: 8,
    height: 190,
  },
  pickerCol: {
    backgroundColor: '#F7F5EF',
    borderRadius: 12,
    flex: 1,
    paddingVertical: 8,
  },
  colHeader: {
    color: '#687078',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  pickerItem: {
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 6,
    paddingVertical: 8,
  },
  pickerItemSelected: {
    backgroundColor: '#FFC928',
  },
  pickerItemText: {
    color: '#17191C',
    fontSize: 14,
    fontWeight: '600',
  },
  modalBtnRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },
  cancelBtn: {
    alignItems: 'center',
    backgroundColor: '#F1EEE5',
    borderRadius: 10,
    flex: 1,
    paddingVertical: 12,
  },
  cancelBtnText: {
    color: '#17191C',
    fontSize: 14,
    fontWeight: '700',
  },
  confirmBtn: {
    alignItems: 'center',
    backgroundColor: '#FFC928',
    borderRadius: 10,
    flex: 1,
    paddingVertical: 12,
  },
  confirmBtnText: {
    color: '#17191C',
    fontSize: 14,
    fontWeight: '800',
  },
});

export default PermitForm;
