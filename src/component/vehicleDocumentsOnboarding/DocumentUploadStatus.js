import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

/**
 * DocumentUploadStatus
 * Renders the state and interactive action for each document upload:
 * - not_uploaded: [ 📤 Upload ] button
 * - uploading: Loading spinner + "Uploading..."
 * - uploaded: "✓ Uploaded" in green
 * - failed: "Upload failed • Try again" in red
 * - reviewing: "Under review" in yellow
 */
function DocumentUploadStatus({
  status = 'not_uploaded',
  onPress,
}) {
  if (status === 'uploading') {
    return (
      <View style={styles.uploadingContainer}>
        <ActivityIndicator size="small" color="#1D68D8" />
        <Text style={styles.uploadingText}>Uploading...</Text>
      </View>
    );
  }

  if (status === 'uploaded') {
    return (
      <Pressable
        style={styles.uploadedBadge}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel="Document uploaded, tap to view or replace"
      >
        <Text style={styles.checkMark}>✓</Text>
        <Text style={styles.uploadedText}>Uploaded</Text>
      </Pressable>
    );
  }

  if (status === 'failed') {
    return (
      <Pressable
        style={styles.failedBadge}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel="Upload failed, tap to retry"
      >
        <Text style={styles.failedText}>Failed • Retry</Text>
      </Pressable>
    );
  }

  if (status === 'reviewing') {
    return (
      <View style={styles.reviewingBadge}>
        <Text style={styles.reviewingText}>Under review</Text>
      </View>
    );
  }

  // Default: 'not_uploaded' -> Clean outline Upload button matching reference image
  return (
    <Pressable
      style={({ pressed }) => [
        styles.uploadButton,
        pressed && styles.uploadButtonPressed,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Upload document"
    >
      <Text style={styles.uploadIcon}>📤</Text>
      <Text style={styles.uploadBtnText}>Upload</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  uploadButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#D4E2F4',
    borderRadius: 10,
    borderWidth: 1.2,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  uploadButtonPressed: {
    backgroundColor: '#F0F6FF',
    borderColor: '#1D68D8',
  },
  uploadIcon: {
    color: '#1D68D8',
    fontSize: 13,
  },
  uploadBtnText: {
    color: '#1D68D8',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: -0.1,
  },
  uploadingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  uploadingText: {
    color: '#1D68D8',
    fontSize: 12,
    fontWeight: '600',
  },
  uploadedBadge: {
    alignItems: 'center',
    backgroundColor: '#EDFAF3',
    borderColor: '#18A66A',
    borderRadius: 10,
    borderWidth: 1.2,
    flexDirection: 'row',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  checkMark: {
    color: '#18A66A',
    fontSize: 12,
    fontWeight: '800',
  },
  uploadedText: {
    color: '#18A66A',
    fontSize: 12.5,
    fontWeight: '700',
  },
  failedBadge: {
    alignItems: 'center',
    backgroundColor: '#FDF2F2',
    borderColor: '#F26B5B',
    borderRadius: 10,
    borderWidth: 1.2,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  failedText: {
    color: '#F26B5B',
    fontSize: 12,
    fontWeight: '700',
  },
  reviewingBadge: {
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    borderColor: '#FFC928',
    borderRadius: 10,
    borderWidth: 1.2,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  reviewingText: {
    color: '#B45309',
    fontSize: 12,
    fontWeight: '700',
  },
});

export default DocumentUploadStatus;
