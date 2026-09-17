import React, { useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

/**
 * DocumentPreview
 * Displays small thumbnail preview and actions (View, Replace, Remove) for an uploaded document.
 */
function DocumentPreview({
  documentTitle,
  fileUri,
  fileName,
  onReplace,
  onRemove,
}) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  return (
    <View style={styles.container}>
      {/* Thumbnail + File Info */}
      <View style={styles.previewInfoRow}>
        <Pressable
          style={styles.thumbnailContainer}
          onPress={() => setIsViewerOpen(true)}
        >
          {fileUri ? (
            <Image
              source={{ uri: fileUri }}
              style={styles.thumbnailImage}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.thumbnailPlaceholder}>📄</Text>
          )}
        </Pressable>

        <View style={styles.fileDetails}>
          <Text style={styles.fileName} numberOfLines={1}>
            {fileName || `${documentTitle.replace(/\s/g, '_').toLowerCase()}.jpg`}
          </Text>
          <Text style={styles.fileStatus}>✓ Ready for verification</Text>
        </View>
      </View>

      {/* Action Buttons: View, Replace, Remove */}
      <View style={styles.actionRow}>
        <Pressable
          style={styles.actionBtn}
          onPress={() => setIsViewerOpen(true)}
          accessibilityRole="button"
          accessibilityLabel={`View ${documentTitle}`}
        >
          <Text style={styles.actionBtnText}>View</Text>
        </Pressable>

        <View style={styles.actionDivider} />

        <Pressable
          style={styles.actionBtn}
          onPress={onReplace}
          accessibilityRole="button"
          accessibilityLabel={`Replace ${documentTitle}`}
        >
          <Text style={styles.actionBtnText}>Replace</Text>
        </Pressable>

        <View style={styles.actionDivider} />

        <Pressable
          style={styles.actionBtn}
          onPress={onRemove}
          accessibilityRole="button"
          accessibilityLabel={`Remove ${documentTitle}`}
        >
          <Text style={[styles.actionBtnText, styles.removeBtnText]}>Remove</Text>
        </Pressable>
      </View>

      {/* Full-screen Document Viewer Modal */}
      <Modal
        visible={isViewerOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsViewerOpen(false)}
      >
        <Pressable
          style={styles.viewerOverlay}
          onPress={() => setIsViewerOpen(false)}
        >
          <Pressable style={styles.viewerCard} onPress={e => e.stopPropagation()}>
            <View style={styles.viewerHeader}>
              <Text style={styles.viewerTitle} numberOfLines={1}>
                {documentTitle}
              </Text>
              <Pressable
                style={styles.viewerCloseBtn}
                onPress={() => setIsViewerOpen(false)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={styles.viewerCloseText}>✕</Text>
              </Pressable>
            </View>

            <View style={styles.viewerBody}>
              {fileUri ? (
                <Image
                  source={{ uri: fileUri }}
                  style={styles.fullImage}
                  resizeMode="contain"
                />
              ) : (
                <View style={styles.emptyView}>
                  <Text style={styles.emptyIcon}>📄</Text>
                  <Text style={styles.emptyText}>Sample Document Preview</Text>
                  <Text style={styles.emptySubtext}>
                    {documentTitle} uploaded successfully.
                  </Text>
                </View>
              )}
            </View>

            <Pressable
              style={styles.doneBtn}
              onPress={() => setIsViewerOpen(false)}
            >
              <Text style={styles.doneBtnText}>Close Preview</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAF9F5',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderColor: '#E8E5DC',
    borderTopWidth: 1,
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  previewInfoRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  thumbnailContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#DDD9CF',
    borderRadius: 8,
    borderWidth: 1,
    height: 38,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 38,
  },
  thumbnailImage: {
    height: '100%',
    width: '100%',
  },
  thumbnailPlaceholder: {
    fontSize: 20,
  },
  fileDetails: {
    flex: 1,
    marginLeft: 10,
  },
  fileName: {
    color: '#17191C',
    fontSize: 12.5,
    fontWeight: '700',
  },
  fileStatus: {
    color: '#18A66A',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 1,
  },
  actionRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    paddingTop: 6,
  },
  actionBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  actionBtnText: {
    color: '#1D68D8',
    fontSize: 12,
    fontWeight: '700',
  },
  removeBtnText: {
    color: '#F26B5B',
  },
  actionDivider: {
    backgroundColor: '#DDD9CF',
    height: 12,
    width: 1,
  },
  viewerOverlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  viewerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    maxHeight: '80%',
    padding: 16,
    width: '100%',
  },
  viewerHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
  viewerTitle: {
    color: '#17191C',
    fontSize: 16,
    fontWeight: '800',
    maxWidth: '80%',
  },
  viewerCloseBtn: {
    alignItems: 'center',
    backgroundColor: '#F1EEE5',
    borderRadius: 14,
    height: 28,
    justifyContent: 'center',
    width: 28,
  },
  viewerCloseText: {
    color: '#687078',
    fontSize: 13,
    fontWeight: '700',
  },
  viewerBody: {
    alignItems: 'center',
    backgroundColor: '#F7F5EF',
    borderRadius: 12,
    height: 240,
    justifyContent: 'center',
    marginVertical: 10,
    overflow: 'hidden',
    width: '100%',
  },
  fullImage: {
    height: '100%',
    width: '100%',
  },
  emptyView: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  emptyText: {
    color: '#17191C',
    fontSize: 15,
    fontWeight: '700',
  },
  emptySubtext: {
    color: '#687078',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  doneBtn: {
    alignItems: 'center',
    backgroundColor: '#FFC928',
    borderRadius: 12,
    height: 44,
    justifyContent: 'center',
    marginTop: 6,
  },
  doneBtnText: {
    color: '#17191C',
    fontSize: 14,
    fontWeight: '800',
  },
});

export default DocumentPreview;
