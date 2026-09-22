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
import LicenceUpload from './LicenceUpload';

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/**
 * DrivingLicenceForm
 * Form inputs for Driving Licence:
 * 1. Licence Number (JH01 2019 0012345)
 * 2. Date of Birth (as per licence)
 * 3. Licence Valid Until
 * 4. Upload Driving Licence (Front & Back)
 */
function DrivingLicenceForm({
  formData = {},
  onChangeField,
  errors = {},
}) {
  const [activeDatePicker, setActiveDatePicker] = useState(null); // 'dob' | 'validUntil' | null

  const handleLicenceNumberChange = text => {
    // Keep uppercase and alphanumeric
    const formatted = text.toUpperCase();
    onChangeField('licenceNumber', formatted);
  };

  const handleDocUpload = (side, doc) => {
    onChangeField(side, doc);
  };

  const handleDocRemove = side => {
    onChangeField(side, null);
  };

  return (
    <View style={styles.container}>
      {/* 1. Licence Number */}
      <View style={styles.inputCard}>
        <Text style={styles.inputLabel}>Licence Number</Text>
        <TextInput
          style={styles.textInput}
          value={formData.licenceNumber || ''}
          onChangeText={handleLicenceNumberChange}
          placeholder="JH01 2019 0012345"
          placeholderTextColor="#9CA3AF"
          autoCapitalize="characters"
        />
        {errors.licenceNumber ? (
          <Text style={styles.errorText}>{errors.licenceNumber}</Text>
        ) : null}
      </View>

      {/* 2. Date of Birth (as per licence) */}
      <Pressable
        style={styles.inputCard}
        onPress={() => setActiveDatePicker('dob')}
      >
        <Text style={styles.inputLabel}>Date of Birth (as per licence)</Text>
        <View style={styles.datePickerRow}>
          <Text style={styles.datePickerIcon}>📅</Text>
          <Text style={styles.dateValueText}>
            {formData.dateOfBirth || 'Select Date of Birth'}
          </Text>
        </View>
        {errors.dateOfBirth ? (
          <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
        ) : null}
      </Pressable>

      {/* 3. Licence Valid Until */}
      <Pressable
        style={styles.inputCard}
        onPress={() => setActiveDatePicker('validUntil')}
      >
        <Text style={styles.inputLabel}>Licence Valid Until</Text>
        <View style={styles.datePickerRow}>
          <Text style={styles.datePickerIcon}>📅</Text>
          <Text style={styles.dateValueText}>
            {formData.validUntil || 'Select Validity Date'}
          </Text>
        </View>
        {errors.validUntil ? (
          <Text style={styles.errorText}>{errors.validUntil}</Text>
        ) : null}
      </Pressable>

      {/* 4. Upload Driving Licence */}
      <LicenceUpload
        frontDoc={formData.frontDocument}
        backDoc={formData.backDocument}
        onUploadDoc={handleDocUpload}
        onRemoveDoc={handleDocRemove}
      />

      {/* Simple Date Picker Modal */}
      {activeDatePicker ? (
        <DatePickerModal
          visible={!!activeDatePicker}
          title={activeDatePicker === 'dob' ? 'Select Date of Birth' : 'Select Licence Validity Date'}
          currentDate={activeDatePicker === 'dob' ? formData.dateOfBirth : formData.validUntil}
          onSelect={dateStr => {
            onChangeField(activeDatePicker === 'dob' ? 'dateOfBirth' : 'validUntil', dateStr);
            setActiveDatePicker(null);
          }}
          onClose={() => setActiveDatePicker(null)}
          isFuture={activeDatePicker === 'validUntil'}
        />
      ) : null}
    </View>
  );
}

function DatePickerModal({ visible, title, currentDate, onSelect, onClose, isFuture }) {
  const currentYear = new Date().getFullYear();
  const years = isFuture
    ? Array.from({ length: 25 }, (_, i) => currentYear + i)
    : Array.from({ length: 60 }, (_, i) => currentYear - 18 - i);

  const [selectedDay, setSelectedDay] = useState(12);
  const [selectedMonth, setSelectedMonth] = useState('Jan');
  const [selectedYear, setSelectedYear] = useState(isFuture ? 2035 : 1998);

  const handleConfirm = () => {
    onSelect(`${selectedDay} ${selectedMonth} ${selectedYear}`);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={styles.pickerModalContent}>
          <Text style={styles.modalTitle}>{title}</Text>

          <View style={styles.pickerColsRow}>
            {/* Day */}
            <View style={styles.pickerCol}>
              <Text style={styles.colHeader}>Day</Text>
              <ScrollView style={styles.colScroll} showsVerticalScrollIndicator={false}>
                {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                  <Pressable
                    key={d}
                    style={[styles.pickerItem, selectedDay === d && styles.pickerItemSelected]}
                    onPress={() => setSelectedDay(d)}
                  >
                    <Text style={[styles.pickerItemText, selectedDay === d && styles.pickerItemTextSelected]}>
                      {d}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            {/* Month */}
            <View style={styles.pickerCol}>
              <Text style={styles.colHeader}>Month</Text>
              <ScrollView style={styles.colScroll} showsVerticalScrollIndicator={false}>
                {months.map(m => (
                  <Pressable
                    key={m}
                    style={[styles.pickerItem, selectedMonth === m && styles.pickerItemSelected]}
                    onPress={() => setSelectedMonth(m)}
                  >
                    <Text style={[styles.pickerItemText, selectedMonth === m && styles.pickerItemTextSelected]}>
                      {m}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            {/* Year */}
            <View style={styles.pickerCol}>
              <Text style={styles.colHeader}>Year</Text>
              <ScrollView style={styles.colScroll} showsVerticalScrollIndicator={false}>
                {years.map(y => (
                  <Pressable
                    key={y}
                    style={[styles.pickerItem, selectedYear === y && styles.pickerItemSelected]}
                    onPress={() => setSelectedYear(y)}
                  >
                    <Text style={[styles.pickerItemText, selectedYear === y && styles.pickerItemTextSelected]}>
                      {y}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </View>

          <View style={styles.modalBtnRow}>
            <Pressable style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.confirmBtn} onPress={handleConfirm}>
              <Text style={styles.confirmBtnText}>Confirm</Text>
            </Pressable>
          </View>
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
  textInput: {
    color: '#17191C',
    fontSize: 15,
    fontWeight: '700',
    padding: 0,
  },
  datePickerRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  datePickerIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  dateValueText: {
    color: '#17191C',
    fontSize: 15,
    fontWeight: '700',
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
  pickerModalContent: {
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
    marginBottom: 16,
    textAlign: 'center',
  },
  pickerColsRow: {
    flexDirection: 'row',
    height: 180,
    justifyContent: 'space-between',
  },
  pickerCol: {
    flex: 1,
    marginHorizontal: 4,
  },
  colHeader: {
    color: '#687078',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
  },
  colScroll: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  pickerItem: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  pickerItemSelected: {
    backgroundColor: '#FFC928',
    borderRadius: 6,
  },
  pickerItemText: {
    color: '#17191C',
    fontSize: 14,
    fontWeight: '600',
  },
  pickerItemTextSelected: {
    color: '#17191C',
    fontWeight: '900',
  },
  modalBtnRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },
  cancelBtn: {
    alignItems: 'center',
    backgroundColor: '#F1EEE5',
    borderRadius: 8,
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
    borderRadius: 8,
    flex: 1,
    paddingVertical: 12,
  },
  confirmBtnText: {
    color: '#17191C',
    fontSize: 14,
    fontWeight: '800',
  },
});

export default DrivingLicenceForm;
