import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

/**
 * AadhaarSection
 * Identity verification inputs matching the exact XCAB reference UI:
 * - Title: "Aadhaar Details"
 * - Aadhaar Number input with Aadhaar emblem on the right
 * - Upload Aadhaar Card (Front Side & Back Side upload cards with tray upload icons)
 */
function AadhaarSection({
  aadhaarData = {},
  onChangeAadhaar,
  errorMessage,
}) {
  const formatAadhaar = text => {
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 12);
    const parts = [];
    for (let i = 0; i < cleaned.length; i += 4) {
      parts.push(cleaned.substring(i, i + 4));
    }
    return parts.join(' ');
  };

  const handleNumberChange = text => {
    const formatted = formatAadhaar(text);
    onChangeAadhaar('aadhaarNumber', formatted);
  };

  const handleUploadDoc = side => {
    onChangeAadhaar(side, {
      name: `aadhaar_${side}.jpg`,
      status: 'uploaded',
      timestamp: new Date().toISOString(),
    });
  };

  const handleRemoveDoc = side => {
    onChangeAadhaar(side, null);
  };

  return (
    <View style={styles.container}>
      {/* 1. Section Header */}
      <Text style={styles.sectionTitle}>Aadhaar Details</Text>

      {/* 2. Aadhaar Number Input */}
      <View style={styles.fieldWrapper}>
        <Text style={styles.inputLabel}>Aadhaar Number</Text>
        <View style={[styles.inputContainer, !!errorMessage && styles.inputError]}>
          <TextInput
            style={styles.textInput}
            value={aadhaarData.aadhaarNumber || ''}
            onChangeText={handleNumberChange}
            placeholder="XXXX XXXX XXXX"
            placeholderTextColor="#9CA3AF"
            keyboardType="number-pad"
            maxLength={14}
            accessibilityRole="text"
            accessibilityLabel="Aadhaar Number"
          />

          {/* Aadhaar Brand Badge */}
          <View style={styles.aadhaarBadge}>
            <View style={styles.sunRaysRow}>
              <View style={[styles.sunRay, { backgroundColor: '#F97316', transform: [{ rotate: '-40deg' }] }]} />
              <View style={[styles.sunRay, { backgroundColor: '#FBBF24', transform: [{ rotate: '-20deg' }] }]} />
              <View style={[styles.sunRay, { backgroundColor: '#F59E0B', height: 10 }]} />
              <View style={[styles.sunRay, { backgroundColor: '#FBBF24', transform: [{ rotate: '20deg' }] }]} />
              <View style={[styles.sunRay, { backgroundColor: '#F97316', transform: [{ rotate: '40deg' }] }]} />
            </View>
            <View style={styles.fingerprintArcContainer}>
              <View style={styles.arcOuter}>
                <View style={styles.arcInner} />
              </View>
            </View>
            <Text style={styles.aadhaarText}>AADHAAR</Text>
          </View>
        </View>

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
      </View>

      {/* 3. Document Uploads (Front & Back) */}
      <View style={styles.uploadSection}>
        <Text style={styles.uploadHeader}>Upload Aadhaar Card</Text>
        <View style={styles.uploadRow}>
          {/* Front Side */}
          <UploadCard
            title="Front Side"
            document={aadhaarData.frontDocument}
            onUpload={() => handleUploadDoc('frontDocument')}
            onRemove={() => handleRemoveDoc('frontDocument')}
          />

          {/* Back Side */}
          <UploadCard
            title="Back Side"
            document={aadhaarData.backDocument}
            onUpload={() => handleUploadDoc('backDocument')}
            onRemove={() => handleRemoveDoc('backDocument')}
          />
        </View>
      </View>
    </View>
  );
}

function UploadCard({ title, document, onUpload, onRemove }) {
  const isUploaded = !!document;

  return (
    <View style={[styles.card, isUploaded && styles.cardUploaded]}>
      {isUploaded ? (
        <View style={styles.uploadedContent}>
          <View style={styles.checkCircle}>
            <Text style={styles.checkIcon}>✓</Text>
          </View>
          <Text style={styles.cardTitleUploaded}>{title}</Text>
          <Text style={styles.uploadedBadge}>Uploaded</Text>
          <View style={styles.cardActions}>
            <Pressable
              style={({ pressed }) => [styles.actionLink, pressed && { opacity: 0.6 }]}
              onPress={onUpload}
            >
              <Text style={styles.replaceText}>Replace</Text>
            </Pressable>
            <Text style={styles.actionDivider}>•</Text>
            <Pressable
              style={({ pressed }) => [styles.actionLink, pressed && { opacity: 0.6 }]}
              onPress={onRemove}
            >
              <Text style={styles.removeText}>Remove</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <Pressable
          style={({ pressed }) => [styles.uploadButton, pressed && { opacity: 0.7 }]}
          onPress={onUpload}
          accessibilityRole="button"
          accessibilityLabel={`Upload ${title}`}
        >
          {/* Tray Upload Icon with Arrow Up */}
          <View style={styles.trayUploadIconBox}>
            <Text style={styles.trayArrowIcon}>⇧</Text>
            <View style={styles.trayBase} />
          </View>
          <Text style={styles.cardTitle}>{title}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '100%',
  },
  sectionTitle: {
    color: '#17191C',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.4,
    marginBottom: 14,
  },
  fieldWrapper: {
    marginBottom: 16,
    width: '100%',
  },
  inputLabel: {
    color: '#687078',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  inputContainer: {
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
  inputError: {
    borderColor: '#EF4444',
  },
  textInput: {
    color: '#17191C',
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    height: '100%',
    letterSpacing: 1.2,
    padding: 0,
  },
  aadhaarBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 8,
    width: 60,
  },
  sunRaysRow: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 12,
    justifyContent: 'center',
    width: 36,
  },
  sunRay: {
    borderRadius: 1,
    height: 8,
    marginHorizontal: 1,
    width: 2,
  },
  fingerprintArcContainer: {
    alignItems: 'center',
    height: 10,
    justifyContent: 'center',
    marginTop: -2,
    width: 28,
  },
  arcOuter: {
    alignItems: 'center',
    borderColor: '#DC2626',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderWidth: 2,
    borderBottomWidth: 0,
    height: 8,
    width: 22,
  },
  arcInner: {
    borderColor: '#DC2626',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 1.5,
    borderBottomWidth: 0,
    height: 5,
    marginTop: 1,
    width: 12,
  },
  aadhaarText: {
    color: '#DC2626',
    fontSize: 7.5,
    fontWeight: '900',
    letterSpacing: 0.6,
    marginTop: 1,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 11.5,
    fontWeight: '500',
    marginTop: 4,
    paddingHorizontal: 4,
  },
  uploadSection: {
    marginBottom: 8,
    width: '100%',
  },
  uploadHeader: {
    color: '#687078',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  uploadRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#DDD9CF',
    borderRadius: 14,
    borderStyle: 'dashed',
    borderWidth: 1.5,
    flex: 1,
    height: 84,
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 0.5,
  },
  cardUploaded: {
    backgroundColor: '#F7FDF9',
    borderColor: '#18A66A',
    borderStyle: 'solid',
  },
  uploadButton: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  trayUploadIconBox: {
    alignItems: 'center',
    height: 24,
    justifyContent: 'center',
    marginBottom: 4,
    width: 24,
  },
  trayArrowIcon: {
    color: '#17191C',
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 18,
  },
  trayBase: {
    backgroundColor: '#17191C',
    borderRadius: 1,
    height: 2,
    marginTop: -2,
    width: 14,
  },
  cardTitle: {
    color: '#17191C',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  cardTitleUploaded: {
    color: '#17191C',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  uploadedContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircle: {
    alignItems: 'center',
    backgroundColor: '#18A66A',
    borderRadius: 10,
    height: 20,
    justifyContent: 'center',
    width: 20,
  },
  checkIcon: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  uploadedBadge: {
    color: '#18A66A',
    fontSize: 10.5,
    fontWeight: '700',
    marginTop: 2,
  },
  cardActions: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    marginTop: 3,
  },
  actionLink: {
    paddingVertical: 1,
  },
  replaceText: {
    color: '#0284C7',
    fontSize: 10.5,
    fontWeight: '600',
  },
  removeText: {
    color: '#EF4444',
    fontSize: 10.5,
    fontWeight: '600',
  },
  actionDivider: {
    color: '#DDD9CF',
    fontSize: 10,
  },
});

export default AadhaarSection;
