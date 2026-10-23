import React, { useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { pickDocumentImage } from '../../utils/imagePicker';

/**
 * LicenceUpload
 * Shared front/back image upload cards (licence, RC, Road Tax, Aadhaar, PAN,
 * Permit, Insurance, Fitness). Picks a real photo from camera/gallery, shows a
 * thumbnail, and supports View / Replace / Remove.
 */
function LicenceUpload({
  frontDoc,
  backDoc,
  onUploadDoc,
  onRemoveDoc,
  heading = 'Upload Driving Licence',
  docTitle = 'Driving Licence',
  panel = false,
  // [API] The API has ONE photo slot for identity, insurance and fitness
  // (front only) and two for licence, registration and permit.
  showBack = true,
}) {
  const [previewSide, setPreviewSide] = useState(null);

  // Opens camera/gallery (shared picker) and stores the real picked image.
  const handlePickImage = async (side, label) => {
    const doc = await pickDocumentImage(`${docTitle} - ${label}`);
    if (doc) {
      onUploadDoc(side, doc);
    }
  };

  const previewDoc =
    previewSide && (previewSide.side === 'frontDocument' ? frontDoc : backDoc);

  return (
    <View style={[styles.container, panel && styles.panel]}>
      <Text style={styles.sectionHeader}>{heading}</Text>

      <View style={styles.uploadRow}>
        {/* Front Side */}
        <DocCard
          title="Front Side"
          doc={frontDoc}
          onUpload={() => handlePickImage('frontDocument', 'Front Side')}
          onView={() => setPreviewSide({ title: `${docTitle} Front Side`, side: 'frontDocument' })}
          onReplace={() => handlePickImage('frontDocument', 'Front Side')}
          onRemove={() => onRemoveDoc('frontDocument')}
        />

        {/* Back Side */}
        {showBack ? (
          <DocCard
            title="Back Side"
            doc={backDoc}
            onUpload={() => handlePickImage('backDocument', 'Back Side')}
            onView={() => setPreviewSide({ title: `${docTitle} Back Side`, side: 'backDocument' })}
            onReplace={() => handlePickImage('backDocument', 'Back Side')}
            onRemove={() => onRemoveDoc('backDocument')}
          />
        ) : null}
      </View>

      {/* Document Preview Modal */}
      {previewSide ? (
        <Modal
          visible={!!previewSide}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setPreviewSide(null)}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{previewSide.title}</Text>
                <Pressable
                  onPress={() => setPreviewSide(null)}
                  style={styles.closeBtn}
                >
                  <Text style={styles.closeBtnText}>✕</Text>
                </Pressable>
              </View>

              {previewDoc && previewDoc.uri ? (
                <Image
                  source={{ uri: previewDoc.uri }}
                  style={styles.previewImage}
                  resizeMode="contain"
                  accessibilityLabel={previewSide.title}
                />
              ) : null}

              <Pressable
                style={styles.modalCloseButton}
                onPress={() => setPreviewSide(null)}
              >
                <Text style={styles.modalCloseButtonText}>Done</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
}

function DocCard({ title, doc, onUpload, onView, onReplace, onRemove }) {
  const isUploaded = !!doc;

  return (
    <View style={[styles.card, isUploaded && styles.cardUploaded]}>
      <Text style={styles.cardTitle}>{title}</Text>
      {isUploaded ? (
        <View style={styles.uploadedContainer}>
          {doc.uri ? (
            <Image
              source={{ uri: doc.uri }}
              style={styles.thumbnail}
              resizeMode="cover"
            />
          ) : null}
          <Text style={styles.checkBadge}>✓ Uploaded</Text>
          <View style={styles.actionsRow}>
            <Pressable
              style={({ pressed }) => [styles.actionBtn, pressed && { opacity: 0.6 }]}
              onPress={onView}
            >
              <Text style={styles.viewText}>View</Text>
            </Pressable>
            <Text style={styles.actionDot}>•</Text>
            <Pressable
              style={({ pressed }) => [styles.actionBtn, pressed && { opacity: 0.6 }]}
              onPress={onReplace}
            >
              <Text style={styles.replaceText}>Replace</Text>
            </Pressable>
            <Text style={styles.actionDot}>•</Text>
            <Pressable
              style={({ pressed }) => [styles.actionBtn, pressed && { opacity: 0.6 }]}
              onPress={onRemove}
            >
              <Text style={styles.removeText}>Remove</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <Pressable
          style={({ pressed }) => [styles.uploadBtn, pressed && { opacity: 0.7 }]}
          onPress={onUpload}
          accessibilityRole="button"
          accessibilityLabel={`Upload ${title}`}
        >
          <Text style={styles.uploadIcon}>📤</Text>
          <Text style={styles.uploadLabel}>Upload</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    width: '100%',
  },
  panel: {
    backgroundColor: '#F1F3F6',
    borderRadius: 16,
    marginTop: 28,
    padding: 16,
  },
  sectionHeader: {
    color: '#17191C',
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 12,
  },
  uploadRow: {
    flexDirection: 'row',
    gap: 14,
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#CDD1D6',
    borderRadius: 16,
    borderStyle: 'dashed',
    borderWidth: 1.5,
    flex: 1,
    justifyContent: 'center',
    minHeight: 150,
    paddingVertical: 16,
  },
  cardUploaded: {
    backgroundColor: '#F7FDF9',
    borderColor: '#18A66A',
    borderStyle: 'solid',
  },
  cardTitle: {
    color: '#687078',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  uploadBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  uploadIcon: {
    fontSize: 34,
    marginBottom: 8,
  },
  uploadLabel: {
    color: '#0E8FA3',
    fontSize: 17,
    fontWeight: '700',
  },
  uploadedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    backgroundColor: '#ECEEF1',
    borderRadius: 8,
    height: 64,
    marginBottom: 8,
    width: 96,
  },
  previewImage: {
    backgroundColor: '#F1F3F6',
    borderRadius: 8,
    height: 320,
    width: '100%',
  },
  checkBadge: {
    color: '#18A66A',
    fontSize: 11.5,
    fontWeight: '700',
  },
  actionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    marginTop: 6,
  },
  actionBtn: {
    paddingVertical: 2,
  },
  viewText: {
    color: '#0284C7',
    fontSize: 11,
    fontWeight: '700',
  },
  replaceText: {
    color: '#687078',
    fontSize: 11,
    fontWeight: '600',
  },
  removeText: {
    color: '#E87861',
    fontSize: 11,
    fontWeight: '600',
  },
  actionDot: {
    color: '#DDD9CF',
    fontSize: 10,
  },
  infoNote: {
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  infoIcon: {
    color: '#B45309',
    fontSize: 14,
    fontWeight: '800',
    marginRight: 8,
  },
  infoText: {
    color: '#92400E',
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
  modalBackdrop: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: '100%',
  },
  modalHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalTitle: {
    color: '#17191C',
    fontSize: 16,
    fontWeight: '800',
  },
  closeBtn: {
    padding: 4,
  },
  closeBtnText: {
    color: '#687078',
    fontSize: 16,
    fontWeight: '700',
  },
  mockLicenceCard: {
    backgroundColor: '#F8FAFC',
    borderColor: '#CBD5E1',
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  licenceEmblemRow: {
    alignItems: 'center',
    borderBottomColor: '#E2E8F0',
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 10,
    paddingBottom: 10,
  },
  emblemIcon: {
    fontSize: 24,
  },
  licenceStateText: {
    color: '#64748B',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  licenceBadgeText: {
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '800',
  },
  licenceDetailsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  licenceAvatarBox: {
    alignItems: 'center',
    backgroundColor: '#E2E8F0',
    borderRadius: 6,
    height: 60,
    justifyContent: 'center',
    width: 50,
  },
  licenceAvatarIcon: {
    fontSize: 24,
  },
  licenceInfoCol: {
    flex: 1,
    justifyContent: 'center',
  },
  mockInfoLine: {
    color: '#334155',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 3,
  },
  modalCloseButton: {
    alignItems: 'center',
    backgroundColor: '#FFC928',
    borderRadius: 8,
    marginTop: 18,
    paddingVertical: 12,
    width: '100%',
  },
  modalCloseButtonText: {
    color: '#17191C',
    fontSize: 14,
    fontWeight: '800',
  },
});

export default LicenceUpload;
