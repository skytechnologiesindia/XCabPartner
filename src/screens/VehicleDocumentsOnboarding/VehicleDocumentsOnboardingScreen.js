import React, { useState } from 'react';
import {
  Alert,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PersonalDetailsHelper } from '../../component/personalDetailsOnboarding';
import {
  DocumentUploadHelper,
  DocumentUploadList,
  VehicleDocumentsContinueButton,
  VehicleDocumentsHeader,
  VehicleDocumentsProgress,
  documentTypes,
  initialDocumentsState,
} from '../../component/vehicleDocumentsOnboarding';

/**
 * VehicleDocumentsOnboardingScreen
 * Initial driver registration screen for uploading vehicle documents:
 * 1. Registration Certificate (RC) - Required
 * 2. Insurance - Required
 * 3. PUC Certificate - Required
 * 4. Fitness Certificate - If applicable
 * 5. Commercial Permit - If applicable
 *
 * Visually matches the previous onboarding screens and navigates to Emergency Contact.
 */
function VehicleDocumentsOnboardingScreen({
  navigation,
  onBack,
  onContinue,
}) {
  const insets = useSafeAreaInsets();

  const [documentsState, setDocumentsState] = useState(initialDocumentsState);
  const [selectedDocForUpload, setSelectedDocForUpload] = useState(null);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNeedHelp = () => {
    Alert.alert(
      'XCAB Partner Support',
      'Need help with your document uploads?\n\nContact our 24/7 Driver Support at 1800-247-XCAB (9222).',
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  const handleOpenUploadPicker = doc => {
    setSelectedDocForUpload(doc);
    setIsPickerVisible(true);
  };

  const handleSelectUploadSource = source => {
    if (!selectedDocForUpload) return;
    const docId = selectedDocForUpload.id;
    setIsPickerVisible(false);

    // 1. Set uploading status with spinner
    setDocumentsState(prev => ({
      ...prev,
      [docId]: {
        ...prev[docId],
        status: 'uploading',
      },
    }));

    // 2. Simulate upload process with realistic outcome
    setTimeout(() => {
      const mockFileName = `${docId}_doc_${source}_${Date.now().toString().slice(-4)}.jpg`;
      const mockUri = `https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=80`;

      setDocumentsState(prev => ({
        ...prev,
        [docId]: {
          status: 'uploaded',
          uri: mockUri,
          fileName: mockFileName,
          uploadedAt: new Date().toISOString(),
        },
      }));
    }, 600);
  };

  const handleRemoveDocument = doc => {
    Alert.alert(
      'Remove Document',
      `Are you sure you want to remove ${doc.title}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setDocumentsState(prev => ({
              ...prev,
              [doc.id]: {
                status: 'not_uploaded',
                uri: null,
                fileName: null,
                uploadedAt: null,
              },
            }));
          },
        },
      ],
    );
  };

  // Required documents validation
  const requiredDocs = documentTypes.filter(d => d.required);
  const areRequiredUploaded = requiredDocs.every(
    d => documentsState[d.id]?.status === 'uploaded',
  );

  const handleContinue = () => {
    if (!areRequiredUploaded) {
      Alert.alert(
        'Required Documents Missing',
        'Please upload all required documents (RC, Insurance, and PUC) to continue.',
        [{ text: 'OK' }],
      );
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      if (onContinue) {
        onContinue(documentsState);
      } else if (navigation && navigation.navigate) {
        try {
          navigation.navigate('VehicleDocumentsReview', { documents: documentsState });
        } catch (err) {
          navigation.navigate('EmergencyContact');
        }
      }
    }, 400);
  };

  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight || 28 : 0;
  const safeTopPadding = Math.max(insets.top, statusBarHeight) + 8;

  return (
    <View style={[styles.container, { paddingTop: safeTopPadding }]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F7F5EF"
        translucent={true}
      />

      {/* 1. Header with Back Arrow & Need Help? */}
      <VehicleDocumentsHeader
        onBack={handleBack}
        onNeedHelp={handleNeedHelp}
      />

      {/* 2. Segmented Progress Bar (Step 3) */}
      <VehicleDocumentsProgress step={3} totalSteps={4} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* 3. Title & Subtitle */}
        <View style={styles.titleSection}>
          <Text style={styles.titleText}>Vehicle Documents</Text>
          <Text style={styles.subtitleText}>
            Upload clear photos of the following documents.
          </Text>
        </View>

        {/* 4. Document Cards List */}
        <DocumentUploadList
          documentsState={documentsState}
          onPressUpload={handleOpenUploadPicker}
          onReplace={handleOpenUploadPicker}
          onRemove={handleRemoveDocument}
        />

        {/* 5. Document Quality Helper Warning Banner */}
        <DocumentUploadHelper />

        {/* 6. Primary CTA */}
        <VehicleDocumentsContinueButton
          label="Continue"
          onPress={handleContinue}
          isDisabled={!areRequiredUploaded}
          isLoading={isSubmitting}
        />

        {/* 7. Lower Automotive Hero & 3 Benefit Badges */}
        <PersonalDetailsHelper />
      </ScrollView>

      {/* Upload Source Selection Modal */}
      <Modal
        visible={isPickerVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsPickerVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsPickerVisible(false)}
        >
          <Pressable style={styles.modalCard} onPress={e => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Upload {selectedDocForUpload?.title}
              </Text>
              <Pressable
                style={styles.modalCloseBtn}
                onPress={() => setIsPickerVisible(false)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </Pressable>
            </View>

            <Text style={styles.modalSubtitle}>
              Ensure document is flat, readable and has no glare.
            </Text>

            {/* Source Options */}
            <View style={styles.sourceList}>
              <Pressable
                style={({ pressed }) => [
                  styles.sourceOption,
                  pressed && styles.sourceOptionPressed,
                ]}
                onPress={() => handleSelectUploadSource('camera')}
              >
                <View style={styles.sourceIconBox}>
                  <Text style={styles.sourceIcon}>📷</Text>
                </View>
                <View style={styles.sourceTextCol}>
                  <Text style={styles.sourceTitle}>Take Photo</Text>
                  <Text style={styles.sourceDesc}>Use your phone camera</Text>
                </View>
                <Text style={styles.sourceChevron}>›</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.sourceOption,
                  pressed && styles.sourceOptionPressed,
                ]}
                onPress={() => handleSelectUploadSource('gallery')}
              >
                <View style={styles.sourceIconBox}>
                  <Text style={styles.sourceIcon}>🖼️</Text>
                </View>
                <View style={styles.sourceTextCol}>
                  <Text style={styles.sourceTitle}>Choose from Photos</Text>
                  <Text style={styles.sourceDesc}>Select from gallery or files</Text>
                </View>
                <Text style={styles.sourceChevron}>›</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.sourceOption,
                  styles.demoOption,
                  pressed && styles.sourceOptionPressed,
                ]}
                onPress={() => handleSelectUploadSource('sample')}
              >
                <View style={[styles.sourceIconBox, styles.demoIconBox]}>
                  <Text style={styles.sourceIcon}>⚡</Text>
                </View>
                <View style={styles.sourceTextCol}>
                  <Text style={styles.sourceTitle}>Instant Demo Upload</Text>
                  <Text style={styles.sourceDesc}>Simulate verified document for testing</Text>
                </View>
                <Text style={styles.sourceChevron}>›</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F5EF',
    flex: 1,
  },
  scroll: {
    backgroundColor: '#F7F5EF',
    flex: 1,
  },
  scrollContent: {
    backgroundColor: '#F7F5EF',
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  titleSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  titleText: {
    color: '#17191C',
    fontSize: 27,
    fontWeight: '900',
    letterSpacing: -0.6,
    lineHeight: 33,
  },
  subtitleText: {
    color: '#687078',
    fontSize: 13.5,
    fontWeight: '400',
    lineHeight: 19,
    marginTop: 6,
  },
  modalOverlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 32,
    paddingHorizontal: 20,
    paddingTop: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    width: '100%',
  },
  modalHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 4,
    width: '100%',
  },
  modalTitle: {
    color: '#17191C',
    fontSize: 17,
    fontWeight: '800',
    maxWidth: '85%',
  },
  modalCloseBtn: {
    alignItems: 'center',
    backgroundColor: '#F1EEE5',
    borderRadius: 14,
    height: 28,
    justifyContent: 'center',
    width: 28,
  },
  modalCloseText: {
    color: '#687078',
    fontSize: 13,
    fontWeight: '700',
  },
  modalSubtitle: {
    color: '#687078',
    fontSize: 12.5,
    marginBottom: 16,
    marginTop: 4,
  },
  sourceList: {
    gap: 10,
  },
  sourceOption: {
    alignItems: 'center',
    backgroundColor: '#FAFAF8',
    borderColor: '#E8E5DB',
    borderRadius: 14,
    borderWidth: 1.2,
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  demoOption: {
    backgroundColor: '#FFFDF5',
    borderColor: '#FFD966',
  },
  sourceOptionPressed: {
    backgroundColor: '#F0ECE1',
  },
  sourceIconBox: {
    alignItems: 'center',
    backgroundColor: '#F1EEE5',
    borderRadius: 10,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  demoIconBox: {
    backgroundColor: '#FFF4C7',
  },
  sourceIcon: {
    fontSize: 18,
  },
  sourceTextCol: {
    flex: 1,
    marginLeft: 12,
  },
  sourceTitle: {
    color: '#17191C',
    fontSize: 14.5,
    fontWeight: '700',
  },
  sourceDesc: {
    color: '#687078',
    fontSize: 11.5,
    marginTop: 2,
  },
  sourceChevron: {
    color: '#9CA3AF',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default VehicleDocumentsOnboardingScreen;
