import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

/**
 * DocumentsHeader
 * Section header displaying section title, advisory subtitle,
 * and the "+ Upload Document" CTA button.
 */
function DocumentsHeader({ onUploadPress }) {
  return (
    <View style={styles.container}>
      {/* Title & Subtitle */}
      <View style={styles.textCol}>
        <Text style={styles.titleText}>Documents</Text>
        <Text style={styles.subtitleText}>
          Keep your documents valid to avoid interruptions.
        </Text>
      </View>

      {/* "+ Upload Document" Action Button */}
      <Pressable
        style={({ pressed }) => [
          styles.uploadButton,
          pressed && styles.uploadButtonPressed,
        ]}
        onPress={onUploadPress}
        accessibilityRole="button"
        accessibilityLabel="Upload Document"
      >
        <Text style={styles.uploadButtonText}>+ Upload Document</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 6,
  },
  textCol: {
    flex: 1,
    marginRight: 10,
  },
  titleText: {
    color: '#17191C',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  subtitleText: {
    color: '#687078',
    fontSize: 12.5,
    fontWeight: '400',
    marginTop: 3,
    lineHeight: 16,
  },
  uploadButton: {
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
    borderRadius: 10,
    borderWidth: 1.2,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  uploadButtonPressed: {
    backgroundColor: '#FEF3C7',
    opacity: 0.9,
  },
  uploadButtonText: {
    color: '#17191C',
    fontSize: 12.5,
    fontWeight: '700',
    letterSpacing: -0.1,
  },
});

export default DocumentsHeader;
