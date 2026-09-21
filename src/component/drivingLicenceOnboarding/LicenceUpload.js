import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

/**
 * LicenceUpload
 * Upload cards for Driving Licence (Front Side & Back Side) with View/Replace/Remove modal preview.
 */
function LicenceUpload({
  frontDoc,
  backDoc,
  onUploadDoc,
  onRemoveDoc,
}) {
  const [previewSide, setPreviewSide] = useState(null);

  const handleSimulateUpload = side => {
    onUploadDoc(side, {
      name: `licence_${side}.jpg`,
      status: 'uploaded',
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>Upload Driving Licence</Text>

      <View style={styles.uploadRow}>
        {/* Front Side */}
        <DocCard
          title="Front Side"
          doc={frontDoc}
          onUpload={() => handleSimulateUpload('frontDocument')}
          onView={() => setPreviewSide({ title: 'Licence Front Side', side: 'frontDocument' })}
          onReplace={() => handleSimulateUpload('frontDocument')}
          onRemove={() => onRemoveDoc('frontDocument')}
        />

        {/* Back Side */}
        <DocCard
          title="Back Side"
          doc={backDoc}
          onUpload={() => handleSimulateUpload('backDocument')}
          onView={() => setPreviewSide({ title: 'Licence Back Side', side: 'backDocument' })}
          onReplace={() => handleSimulateUpload('backDocument')}
          onRemove={() => onRemoveDoc('backDocument')}
        />
      </View>

      <View style={styles.infoNote}>
        <Text style={styles.infoIcon}>ⓘ</Text>
        <Text style={styles.infoText}>
          Make sure the details on your licence are clear and readable.
        </Text>
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

              <View style={styles.mockLicenceCard}>
                <View style={styles.licenceEmblemRow}>
                  <Text style={styles.emblemIcon}>🏛️</Text>
                  <View>
                    <Text style={styles.licenceStateText}>UNION OF INDIA / STATE TRANSPORT</Text>
                    <Text style={styles.licenceBadgeText}>DRIVING LICENCE</Text>
                  </View>
                </View>
                <View style={styles.licenceDetailsRow}>
                  <View style={styles.licenceAvatarBox}>
                    <Text style={styles.licenceAvatarIcon}>👤</Text>
                  </View>
                  <View style={styles.licenceInfoCol}>
                    <Text style={styles.mockInfoLine}>DOC: {previewSide.side}</Text>
                    <Text style={styles.mockInfoLine}>STATUS: VERIFIED DOCUMENT</Text>
                    <Text style={styles.mockInfoLine}>TYPE: LMV-NT / COMMERCIAL</Text>
                  </View>
                </View>
              </View>

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
          <Text style={styles.checkBadge}>✓ Licence uploaded</Text>
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
    marginTop: 18,
    width: '100%',
  },
  sectionHeader: {
    color: '#17191C',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  uploadRow: {
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#DDD9CF',
    borderRadius: 8,
    borderStyle: 'dashed',
    borderWidth: 1.5,
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 14,
  },
  cardUploaded: {
    backgroundColor: '#F7FDF9',
    borderColor: '#18A66A',
    borderStyle: 'solid',
  },
  cardTitle: {
    color: '#687078',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },
  uploadBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  uploadIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  uploadLabel: {
    color: '#0284C7',
    fontSize: 12,
    fontWeight: '700',
  },
  uploadedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
