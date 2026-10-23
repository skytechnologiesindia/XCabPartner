import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LicenceUpload from '../drivingLicenceOnboarding/LicenceUpload';
import { identityDocuments } from './aadhaarPanData';

/**
 * AadhaarPanForm
 * One form for both identity documents:
 * 1. Select Document (Aadhaar Card | PAN Card)
 * 2. Upload front/back images
 * 3. Document number
 *
 * `documentData` holds only the selected document; the screen keeps Aadhaar
 * and PAN state separately so switching tabs never mixes them.
 */
function AadhaarPanForm({
  docType = 'aadhaar',
  onChangeDocType,
  documentData = {},
  onChangeDocumentField,
  errors = {},
}) {
  const activeDoc =
    identityDocuments.find(doc => doc.id === docType) || identityDocuments[0];

  const handleNumberChange = text => {
    onChangeDocumentField('number', activeDoc.formatNumber(text));
  };

  return (
    <View style={styles.container}>
      {/* 1. Select Document */}
      <Text style={styles.label}>Select Document</Text>
      <View style={styles.docRow}>
        {identityDocuments.map(doc => {
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

      {/* 2. Upload images (remounted per document so previews never leak) */}
      <LicenceUpload
        key={docType}
        heading={`Upload ${activeDoc.uploadName} Images`}
        docTitle={activeDoc.label}
        panel
        // [API] PERSONAL_IDENTITY has one photo slot: PERSONAL_IDENTITY_FRONT.
        showBack={false}
        frontDoc={documentData.frontDocument}
        backDoc={documentData.backDocument}
        onUploadDoc={onChangeDocumentField}
        onRemoveDoc={side => onChangeDocumentField(side, null)}
      />
      {errors.documents ? <Text style={styles.errorText}>{errors.documents}</Text> : null}

      {/* 3. Document number */}
      <Text style={[styles.label, { marginTop: 28 }]}>
        Enter {activeDoc.numberLabel} number
      </Text>
      <View style={[styles.inputBox, !!errors.number && styles.inputError]}>
        <TextInput
          style={styles.inputText}
          value={documentData.number || ''}
          onChangeText={handleNumberChange}
          placeholder={activeDoc.placeholder}
          placeholderTextColor="#8A929B"
          autoCapitalize={docType === 'pan' ? 'characters' : 'none'}
          keyboardType={docType === 'pan' ? 'default' : 'number-pad'}
          maxLength={activeDoc.maxLength}
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
    </View>
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
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#D9DCE0',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    height: 58,
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
});

export default AadhaarPanForm;
