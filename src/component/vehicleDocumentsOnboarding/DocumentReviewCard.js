import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

/**
 * DocumentReviewCard
 * Single reusable card for reviewing an uploaded document:
 * - Left thumbnail preview showing certificate/document
 * - Title and green "Uploaded" status badge
 * - Right action buttons: View (👁) and Delete (🗑)
 */
function DocumentReviewCard({
  document,
  uploadState = {},
  onView,
  onDelete,
}) {
  const isUploaded = uploadState.status === 'uploaded';
  const fileUri = uploadState.uri;

  return (
    <View style={styles.card}>
      {/* 1. Left Thumbnail Preview */}
      <View style={styles.thumbnailWrapper}>
        {fileUri ? (
          <Image
            source={{ uri: fileUri }}
            style={styles.thumbnailImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.certificatePlaceholder}>
            <View style={styles.certHeaderBar} />
            <View style={styles.certLine1} />
            <View style={styles.certLine2} />
            <View style={styles.certLine3} />
            <View style={styles.certSeal} />
          </View>
        )}
      </View>

      {/* 2. Middle Title & Uploaded Status */}
      <View style={styles.infoColumn}>
        <Text style={styles.titleText} numberOfLines={1}>
          {document.title}
        </Text>
        <View style={styles.statusRow}>
          {isUploaded ? (
            <>
              <View style={styles.greenDot}>
                <Text style={styles.whiteCheck}>✓</Text>
              </View>
              <Text style={styles.uploadedText}>Uploaded</Text>
            </>
          ) : (
            <>
              <View style={styles.redDot}>
                <Text style={styles.whiteExclamation}>!</Text>
              </View>
              <Text style={styles.missingText}>
                {document.required ? 'Missing (Required)' : 'Not Uploaded'}
              </Text>
            </>
          )}
        </View>
      </View>

      {/* 3. Right Action Buttons: View (👁) & Delete (🗑) */}
      <View style={styles.actionsColumn}>
        <Pressable
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.iconButtonPressed,
          ]}
          onPress={() => onView && onView(document)}
          accessibilityRole="button"
          accessibilityLabel={`View ${document.title}`}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          <Text style={styles.viewIcon}>👁</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.iconButtonPressed,
          ]}
          onPress={() => onDelete && onDelete(document)}
          accessibilityRole="button"
          accessibilityLabel={`Delete or Replace ${document.title}`}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          <Text style={styles.trashIcon}>🗑</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E2DFD6',
    borderRadius: 14,
    borderWidth: 1.2,
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
    width: '100%',
  },
  thumbnailWrapper: {
    alignItems: 'center',
    backgroundColor: '#FAF8F3',
    borderColor: '#DDD9CF',
    borderRadius: 8,
    borderWidth: 1,
    height: 42,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 54,
  },
  thumbnailImage: {
    height: '100%',
    width: '100%',
  },
  certificatePlaceholder: {
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    height: '100%',
    padding: 3,
    position: 'relative',
    width: '100%',
  },
  certHeaderBar: {
    backgroundColor: '#4A7BB0',
    borderRadius: 1,
    height: 3,
    marginBottom: 3,
    width: '70%',
  },
  certLine1: {
    backgroundColor: '#D1D5DB',
    borderRadius: 1,
    height: 2,
    marginBottom: 2,
    width: '90%',
  },
  certLine2: {
    backgroundColor: '#E5E7EB',
    borderRadius: 1,
    height: 2,
    marginBottom: 2,
    width: '60%',
  },
  certLine3: {
    backgroundColor: '#E5E7EB',
    borderRadius: 1,
    height: 2,
    width: '80%',
  },
  certSeal: {
    backgroundColor: '#FFC928',
    borderColor: '#B45309',
    borderRadius: 4,
    borderWidth: 0.5,
    bottom: 3,
    height: 8,
    position: 'absolute',
    right: 3,
    width: 8,
  },
  infoColumn: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 12,
    marginRight: 8,
  },
  titleText: {
    color: '#17191C',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  statusRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    marginTop: 4,
  },
  greenDot: {
    alignItems: 'center',
    backgroundColor: '#18A66A',
    borderRadius: 7,
    height: 14,
    justifyContent: 'center',
    width: 14,
  },
  whiteCheck: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
  uploadedText: {
    color: '#18A66A',
    fontSize: 12,
    fontWeight: '600',
  },
  redDot: {
    alignItems: 'center',
    backgroundColor: '#F26B5B',
    borderRadius: 7,
    height: 14,
    justifyContent: 'center',
    width: 14,
  },
  whiteExclamation: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
  missingText: {
    color: '#F26B5B',
    fontSize: 12,
    fontWeight: '600',
  },
  actionsColumn: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  iconButton: {
    alignItems: 'center',
    backgroundColor: '#FAFAF8',
    borderColor: '#DDD9CF',
    borderRadius: 8,
    borderWidth: 1,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  iconButtonPressed: {
    backgroundColor: '#EBE7DE',
  },
  viewIcon: {
    fontSize: 15,
  },
  trashIcon: {
    fontSize: 14,
  },
});

export default DocumentReviewCard;
