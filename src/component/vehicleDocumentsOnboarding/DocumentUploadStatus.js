import React from 'react';
import {
  ActivityIndicator,
  Pressable,
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
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          gap: 6,
          paddingHorizontal: 10,
          paddingVertical: 6,
        }}
      >
        <ActivityIndicator size="small" color="#1D68D8" />
        <Text
          style={{
            color: '#1D68D8',
            fontSize: 12,
            fontWeight: '600',
          }}
        >
          Uploading...
        </Text>
      </View>
    );
  }

  if (status === 'uploaded') {
    return (
      <Pressable
        style={{
          alignItems: 'center',
          backgroundColor: '#EDFAF3',
          borderColor: '#18A66A',
          borderRadius: 10,
          borderWidth: 1.2,
          flexDirection: 'row',
          gap: 5,
          paddingHorizontal: 10,
          paddingVertical: 6,
        }}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel="Document uploaded, tap to view or replace"
      >
        <Text
          style={{
            color: '#18A66A',
            fontSize: 12,
            fontWeight: '800',
          }}
        >
          ✓
        </Text>
        <Text
          style={{
            color: '#18A66A',
            fontSize: 12.5,
            fontWeight: '700',
          }}
        >
          Uploaded
        </Text>
      </Pressable>
    );
  }

  if (status === 'failed') {
    return (
      <Pressable
        style={{
          alignItems: 'center',
          backgroundColor: '#FDF2F2',
          borderColor: '#F26B5B',
          borderRadius: 10,
          borderWidth: 1.2,
          flexDirection: 'row',
          paddingHorizontal: 10,
          paddingVertical: 6,
        }}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel="Upload failed, tap to retry"
      >
        <Text
          style={{
            color: '#F26B5B',
            fontSize: 12,
            fontWeight: '700',
          }}
        >
          Failed • Retry
        </Text>
      </Pressable>
    );
  }

  if (status === 'reviewing') {
    return (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#FFF8E1',
          borderColor: '#FFC928',
          borderRadius: 10,
          borderWidth: 1.2,
          paddingHorizontal: 10,
          paddingVertical: 6,
        }}
      >
        <Text
          style={{
            color: '#B45309',
            fontSize: 12,
            fontWeight: '700',
          }}
        >
          Under review
        </Text>
      </View>
    );
  }

  // Default: 'not_uploaded' -> Clean outline Upload button matching reference image
  return (
    <Pressable
      style={({ pressed }) => [
        {
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
        pressed && {
          backgroundColor: '#F0F6FF',
          borderColor: '#1D68D8',
        },
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Upload document"
    >
      <Text style={{ color: '#1D68D8', fontSize: 13 }}>📤</Text>
      <Text
        style={{
          color: '#1D68D8',
          fontSize: 13,
          fontWeight: '700',
          letterSpacing: -0.1,
        }}
      >
        Upload
      </Text>
    </Pressable>
  );
}

export default DocumentUploadStatus;
