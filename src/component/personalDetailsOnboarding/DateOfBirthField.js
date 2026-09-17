import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { personalDetailsConfig } from './personalDetailsOnboardingData';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/**
 * DateOfBirthField
 * Interactive date of birth selector with calendar icons and eligibility validation (18+ years).
 */
function DateOfBirthField({
  value = '12 Jan 1998',
  onChangeDate,
  errorMessage,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  // Parse current value
  const parts = (value || '12 Jan 1998').split(' ');
  const [selectedDay, setSelectedDay] = useState(parseInt(parts[0], 10) || 12);
  const [selectedMonth, setSelectedMonth] = useState(parts[1] || 'Jan');
  const [selectedYear, setSelectedYear] = useState(parseInt(parts[2], 10) || 1998);

  const currentYear = new Date().getFullYear();
  const maxYear = currentYear - personalDetailsConfig.minDriverAge; // 2008
  const minYear = currentYear - personalDetailsConfig.maxDriverAge; // 1951

  const years = [];
  for (let y = maxYear; y >= minYear; y--) {
    years.push(y);
  }

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleOpenPicker = () => {
    const p = (value || '12 Jan 1998').split(' ');
    setSelectedDay(parseInt(p[0], 10) || 12);
    setSelectedMonth(p[1] || 'Jan');
    setSelectedYear(parseInt(p[2], 10) || 1998);
    setModalVisible(true);
  };

  const handleConfirm = () => {
    const formatted = `${selectedDay < 10 ? `0${selectedDay}` : selectedDay} ${selectedMonth} ${selectedYear}`;
    if (onChangeDate) {
      onChangeDate(formatted);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Date of Birth</Text>

      {/* Trigger Card */}
      <Pressable
        style={({ pressed }) => [
          styles.inputCard,
          pressed && styles.inputCardPressed,
          !!errorMessage && styles.inputCardError,
        ]}
        onPress={handleOpenPicker}
        accessibilityRole="button"
        accessibilityLabel={`Date of birth ${value}`}
      >
        <View style={styles.iconWrapper}>
          <Text style={styles.calendarIcon}>📅</Text>
        </View>

        <Text style={styles.valueText}>{value || 'Select Date of Birth'}</Text>

        <View style={styles.iconWrapperRight}>
          <Text style={styles.calendarIconRight}>📅</Text>
        </View>
      </Pressable>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      {/* Date Picker Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <Pressable style={styles.modalCard} onPress={e => e.stopPropagation()}>
            <Text style={styles.modalTitle}>Select Date of Birth</Text>
            <Text style={styles.modalSubtitle}>
              Driver must be at least {personalDetailsConfig.minDriverAge} years old
            </Text>

            {/* Selection Wheels */}
            <View style={styles.pickerRow}>
              {/* Day Column */}
              <View style={styles.column}>
                <Text style={styles.colHeader}>Day</Text>
                <ScrollView style={styles.colScroll} showsVerticalScrollIndicator={false}>
                  {days.map(d => (
                    <Pressable
                      key={`day-${d}`}
                      style={[styles.colItem, selectedDay === d && styles.colItemSelected]}
                      onPress={() => setSelectedDay(d)}
                    >
                      <Text style={[styles.colItemText, selectedDay === d && styles.colItemTextSelected]}>
                        {d}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>

              {/* Month Column */}
              <View style={styles.column}>
                <Text style={styles.colHeader}>Month</Text>
                <ScrollView style={styles.colScroll} showsVerticalScrollIndicator={false}>
                  {MONTHS.map(m => (
                    <Pressable
                      key={`month-${m}`}
                      style={[styles.colItem, selectedMonth === m && styles.colItemSelected]}
                      onPress={() => setSelectedMonth(m)}
                    >
                      <Text style={[styles.colItemText, selectedMonth === m && styles.colItemTextSelected]}>
                        {m}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>

              {/* Year Column */}
              <View style={styles.column}>
                <Text style={styles.colHeader}>Year</Text>
                <ScrollView style={styles.colScroll} showsVerticalScrollIndicator={false}>
                  {years.map(y => (
                    <Pressable
                      key={`year-${y}`}
                      style={[styles.colItem, selectedYear === y && styles.colItemSelected]}
                      onPress={() => setSelectedYear(y)}
                    >
                      <Text style={[styles.colItemText, selectedYear === y && styles.colItemTextSelected]}>
                        {y}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            </View>

            {/* Modal Actions */}
            <View style={styles.modalButtons}>
              <Pressable
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={styles.confirmBtn}
                onPress={handleConfirm}
              >
                <Text style={styles.confirmBtnText}>Confirm Date</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    color: '#687078',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  inputCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#DDD9CF',
    borderRadius: 14,
    borderWidth: 1.5,
    flexDirection: 'row',
    height: 52,
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  inputCardPressed: {
    backgroundColor: '#FAF8F1',
  },
  inputCardError: {
    borderColor: '#EF4444',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    width: 22,
  },
  calendarIcon: {
    fontSize: 16,
  },
  valueText: {
    color: '#17191C',
    flex: 1,
    fontSize: 15.5,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  iconWrapperRight: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 22,
  },
  calendarIconRight: {
    color: '#687078',
    fontSize: 15,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 11.5,
    fontWeight: '500',
    marginTop: 4,
    paddingHorizontal: 4,
  },
  modalOverlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  modalTitle: {
    color: '#17191C',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  modalSubtitle: {
    color: '#687078',
    fontSize: 12.5,
    fontWeight: '400',
    marginTop: 4,
    marginBottom: 16,
    textAlign: 'center',
  },
  pickerRow: {
    flexDirection: 'row',
    gap: 8,
    height: 180,
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  column: {
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
  colScroll: {
    flex: 1,
  },
  colItem: {
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 6,
    paddingVertical: 8,
  },
  colItemSelected: {
    backgroundColor: '#FFC928',
  },
  colItemText: {
    color: '#17191C',
    fontSize: 14,
    fontWeight: '600',
  },
  colItemTextSelected: {
    fontWeight: '800',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  cancelBtn: {
    alignItems: 'center',
    backgroundColor: '#F1EEE5',
    borderRadius: 12,
    flex: 1,
    height: 44,
    justifyContent: 'center',
  },
  cancelBtnText: {
    color: '#687078',
    fontSize: 14,
    fontWeight: '700',
  },
  confirmBtn: {
    alignItems: 'center',
    backgroundColor: '#FFC928',
    borderRadius: 12,
    flex: 1,
    height: 44,
    justifyContent: 'center',
  },
  confirmBtnText: {
    color: '#17191C',
    fontSize: 14,
    fontWeight: '800',
  },
});

export default DateOfBirthField;
