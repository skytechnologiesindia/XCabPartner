import React, { useState } from 'react';
import {
  Alert,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
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
    <View style={{ backgroundColor: '#F7F5EF', flex: 1, paddingTop: safeTopPadding }}>
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
        style={{ backgroundColor: '#F7F5EF', flex: 1 }}
        contentContainerStyle={{
          backgroundColor: '#F7F5EF',
          flexGrow: 1,
          justifyContent: 'space-between',
          paddingTop: 10,
        }}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* 3. Title & Subtitle */}
        <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
          <Text
            style={{
              color: '#17191C',
              fontSize: 27,
              fontWeight: '900',
              letterSpacing: -0.6,
              lineHeight: 33,
            }}
          >
            Vehicle Documents
          </Text>
          <Text
            style={{
              color: '#687078',
              fontSize: 13.5,
              fontWeight: '400',
              lineHeight: 19,
              marginTop: 6,
            }}
          >
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
          style={{
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            flex: 1,
            justifyContent: 'flex-end',
          }}
          onPress={() => setIsPickerVisible(false)}
        >
          <Pressable
            style={{
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
            }}
            onPress={e => e.stopPropagation()}
          >
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: 4,
                width: '100%',
              }}
            >
              <Text
                style={{
                  color: '#17191C',
                  fontSize: 17,
                  fontWeight: '800',
                  maxWidth: '85%',
                }}
              >
                Upload {selectedDocForUpload?.title}
              </Text>
              <Pressable
                style={{
                  alignItems: 'center',
                  backgroundColor: '#F1EEE5',
                  borderRadius: 14,
                  height: 28,
                  justifyContent: 'center',
                  width: 28,
                }}
                onPress={() => setIsPickerVisible(false)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text
                  style={{
                    color: '#687078',
                    fontSize: 13,
                    fontWeight: '700',
                  }}
                >
                  ✕
                </Text>
              </Pressable>
            </View>

            <Text
              style={{
                color: '#687078',
                fontSize: 12.5,
                marginBottom: 16,
                marginTop: 4,
              }}
            >
              Ensure document is flat, readable and has no glare.
            </Text>

            {/* Source Options */}
            <View style={{ gap: 10 }}>
              <Pressable
                style={({ pressed }) => [
                  {
                    alignItems: 'center',
                    backgroundColor: '#FAFAF8',
                    borderColor: '#E8E5DB',
                    borderRadius: 14,
                    borderWidth: 1.2,
                    flexDirection: 'row',
                    paddingHorizontal: 14,
                    paddingVertical: 12,
                  },
                  pressed && { backgroundColor: '#F0ECE1' },
                ]}
                onPress={() => handleSelectUploadSource('camera')}
              >
                <View
                  style={{
                    alignItems: 'center',
                    backgroundColor: '#F1EEE5',
                    borderRadius: 10,
                    height: 38,
                    justifyContent: 'center',
                    width: 38,
                  }}
                >
                  <Text style={{ fontSize: 18 }}>📷</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text
                    style={{
                      color: '#17191C',
                      fontSize: 14.5,
                      fontWeight: '700',
                    }}
                  >
                    Take Photo
                  </Text>
                  <Text
                    style={{
                      color: '#687078',
                      fontSize: 11.5,
                      marginTop: 2,
                    }}
                  >
                    Use your phone camera
                  </Text>
                </View>
                <Text
                  style={{
                    color: '#9CA3AF',
                    fontSize: 20,
                    fontWeight: '600',
                  }}
                >
                  ›
                </Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  {
                    alignItems: 'center',
                    backgroundColor: '#FAFAF8',
                    borderColor: '#E8E5DB',
                    borderRadius: 14,
                    borderWidth: 1.2,
                    flexDirection: 'row',
                    paddingHorizontal: 14,
                    paddingVertical: 12,
                  },
                  pressed && { backgroundColor: '#F0ECE1' },
                ]}
                onPress={() => handleSelectUploadSource('gallery')}
              >
                <View
                  style={{
                    alignItems: 'center',
                    backgroundColor: '#F1EEE5',
                    borderRadius: 10,
                    height: 38,
                    justifyContent: 'center',
                    width: 38,
                  }}
                >
                  <Text style={{ fontSize: 18 }}>🖼️</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text
                    style={{
                      color: '#17191C',
                      fontSize: 14.5,
                      fontWeight: '700',
                    }}
                  >
                    Choose from Photos
                  </Text>
                  <Text
                    style={{
                      color: '#687078',
                      fontSize: 11.5,
                      marginTop: 2,
                    }}
                  >
                    Select from gallery or files
                  </Text>
                </View>
                <Text
                  style={{
                    color: '#9CA3AF',
                    fontSize: 20,
                    fontWeight: '600',
                  }}
                >
                  ›
                </Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  {
                    alignItems: 'center',
                    backgroundColor: '#FFFDF5',
                    borderColor: '#FFD966',
                    borderRadius: 14,
                    borderWidth: 1.2,
                    flexDirection: 'row',
                    paddingHorizontal: 14,
                    paddingVertical: 12,
                  },
                  pressed && { backgroundColor: '#F0ECE1' },
                ]}
                onPress={() => handleSelectUploadSource('sample')}
              >
                <View
                  style={{
                    alignItems: 'center',
                    backgroundColor: '#FFF4C7',
                    borderRadius: 10,
                    height: 38,
                    justifyContent: 'center',
                    width: 38,
                  }}
                >
                  <Text style={{ fontSize: 18 }}>⚡</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text
                    style={{
                      color: '#17191C',
                      fontSize: 14.5,
                      fontWeight: '700',
                    }}
                  >
                    Instant Demo Upload
                  </Text>
                  <Text
                    style={{
                      color: '#687078',
                      fontSize: 11.5,
                      marginTop: 2,
                    }}
                  >
                    Simulate verified document for testing
                  </Text>
                </View>
                <Text
                  style={{
                    color: '#9CA3AF',
                    fontSize: 20,
                    fontWeight: '600',
                  }}
                >
                  ›
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

export default VehicleDocumentsOnboardingScreen;
