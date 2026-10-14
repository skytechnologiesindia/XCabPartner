import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { insuranceCompanies } from './insuranceData';

/**
 * InsuranceCompanyField
 * Labelled dropdown that opens a bottom-sheet option list. Defaults to the
 * "Insurance Company" field; pass `label`, `placeholder` and `options` to
 * reuse it (e.g. Issuing Authority).
 */
function InsuranceCompanyField({
  value = '',
  onChange,
  errorMessage,
  label = 'Insurance Company',
  placeholder = 'Select Insurance Company',
  options = insuranceCompanies,
}) {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        style={({ pressed }) => [
          styles.box,
          !!errorMessage && styles.boxError,
          pressed && { opacity: 0.85 },
        ]}
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={placeholder}
      >
        <Text
          numberOfLines={1}
          style={[styles.valueText, !value && { color: '#17191C' }]}>
          {value || placeholder}
        </Text>
        <Text style={styles.chevron}>⌄</Text>
      </Pressable>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable style={styles.sheet} onPress={e => e.stopPropagation()}>
            <Text style={styles.sheetTitle}>{placeholder}</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {options.map(company => {
                const isSelected = company === value;
                return (
                  <Pressable
                    key={company}
                    style={({ pressed }) => [
                      styles.option,
                      isSelected && { backgroundColor: '#FFFBEB' },
                      pressed && { opacity: 0.7 },
                    ]}
                    onPress={() => {
                      onChange(company);
                      setOpen(false);
                    }}
                  >
                    <Text style={[styles.optionText, isSelected && { fontWeight: '800' }]}>
                      {company}
                    </Text>
                    {isSelected ? <Text style={styles.check}>✓</Text> : null}
                  </Pressable>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: '#17191C',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 32,
  },
  box: {
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
  boxError: {
    borderColor: '#EF4444',
  },
  valueText: {
    color: '#17191C',
    flex: 1,
    fontSize: 18,
  },
  chevron: {
    color: '#17191C',
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 8,
    marginTop: -6,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 6,
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '65%',
    padding: 20,
    width: '100%',
  },
  sheetTitle: {
    color: '#17191C',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 8,
  },
  option: {
    alignItems: 'center',
    borderBottomColor: '#F1EEE5',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  optionText: {
    color: '#17191C',
    fontSize: 16,
    fontWeight: '500',
  },
  check: {
    color: '#FFC928',
    fontSize: 16,
    fontWeight: '900',
  },
});

export default InsuranceCompanyField;
