import React, { useState } from 'react';
import {
  Alert,
  Image,
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
  DocumentReviewList,
  VehicleDocumentsContinueButton,
  VehicleDocumentsHeader,
  VehicleDocumentsProgress,
  documentTypes,
} from '../../component/vehicleDocumentsOnboarding';

// Sample fully-uploaded state matching the reference screenshot
const sampleReviewedDocuments = {
  rc: {
    status: 'uploaded',
    fileName: 'registration_certificate_rc.jpg',
    uri: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=80',
    uploadedAt: '2026-09-14T12:00:00Z',
  },
  insurance: {
    status: 'uploaded',
    fileName: 'vehicle_insurance_policy.jpg',
    uri: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    uploadedAt: '2026-09-14T12:01:00Z',
  },
  puc: {
    status: 'uploaded',
    fileName: 'puc_certificate_valid.jpg',
    uri: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&auto=format&fit=crop&q=80',
    uploadedAt: '2026-09-14T12:02:00Z',
  },
  fitness: {
    status: 'uploaded',
    fileName: 'fitness_certificate.jpg',
    uri: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
    uploadedAt: '2026-09-14T12:03:00Z',
  },
  permit: {
    status: 'uploaded',
    fileName: 'commercial_permit_cab.jpg',
    uri: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80',
    uploadedAt: '2026-09-14T12:04:00Z',
  },
};

/**
 * VehicleDocumentsReviewScreen
 * Screen 1 in the review flow:
 * Allows the driver to inspect all uploaded documents with thumbnails,
 * full-screen view (👁), and delete/replace (🗑) options before final submission.
 */
function VehicleDocumentsReviewScreen({
  navigation,
  route,
  documents: initialDocsProp,
  onBack,
  onContinue,
}) {
  const insets = useSafeAreaInsets();

  const initialDocs =
    initialDocsProp || route?.params?.documents || sampleReviewedDocuments;

  const [documentsState, setDocumentsState] = useState(initialDocs);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNeedHelp = () => {
    Alert.alert(
      'XCAB Partner Support',
      'Need help reviewing your vehicle documents?\n\nContact our 24/7 Driver Support at 1800-247-XCAB (9222).',
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  const handleBack = () => {
    if (onBack) {
      onBack(documentsState);
    } else if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  const handleViewDocument = doc => {
    const docData = documentsState[doc.id] || {};
    setPreviewDoc({
      ...doc,
      ...docData,
    });
  };

  const handleDeleteDocument = doc => {
    Alert.alert(
      'Manage Document',
      `Choose an action for ${doc.title}:`,
      [
        {
          text: 'Replace File',
          onPress: () => {
            // Simulate replacing document with fresh upload
            setDocumentsState(prev => ({
              ...prev,
              [doc.id]: {
                status: 'uploaded',
                fileName: `${doc.id}_replaced_${Date.now().toString().slice(-4)}.jpg`,
                uri: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=80',
                uploadedAt: new Date().toISOString(),
              },
            }));
            Alert.alert('Replaced', `${doc.title} has been replaced with a new copy.`);
          },
        },
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
        { text: 'Cancel', style: 'cancel' },
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
        'Required Document Missing',
        'Please upload all required documents (RC, Insurance, and PUC) before continuing.',
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
          navigation.navigate('VehicleDocumentsSubmitted', { documents: documentsState });
        } catch (err) {
          navigation.navigate('EmergencyContact');
        }
      }
    }, 350);
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

      {/* 1. Onboarding Header */}
      <VehicleDocumentsHeader
        onBack={handleBack}
        onNeedHelp={handleNeedHelp}
      />

      {/* 2. Progress Indicator (Step 3 active) */}
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
            Review Your Documents
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
            Make sure everything looks correct before you continue.
          </Text>
        </View>

        {/* 4. Document Review List */}
        <DocumentReviewList
          documentsState={documentsState}
          onViewDocument={handleViewDocument}
          onDeleteDocument={handleDeleteDocument}
        />

        {/* 5. Primary CTA */}
        <VehicleDocumentsContinueButton
          label="Continue"
          onPress={handleContinue}
          isDisabled={!areRequiredUploaded}
          isLoading={isSubmitting}
        />

        {/* 6. Lower Automotive Hero */}
        <PersonalDetailsHelper />
      </ScrollView>

      {/* Document Full Preview Modal */}
      <Modal
        visible={!!previewDoc}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setPreviewDoc(null)}
      >
        <Pressable
          style={{
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}
          onPress={() => setPreviewDoc(null)}
        >
          <Pressable
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 20,
              maxHeight: '80%',
              padding: 18,
              width: '100%',
            }}
            onPress={e => e.stopPropagation()}
          >
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: 12,
              }}
            >
              <Text
                style={{
                  color: '#17191C',
                  fontSize: 16,
                  fontWeight: '800',
                  maxWidth: '80%',
                }}
                numberOfLines={1}
              >
                {previewDoc?.title}
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
                onPress={() => setPreviewDoc(null)}
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

            <View
              style={{
                alignItems: 'center',
                backgroundColor: '#F7F5EF',
                borderRadius: 12,
                height: 240,
                justifyContent: 'center',
                marginVertical: 10,
                overflow: 'hidden',
                width: '100%',
              }}
            >
              {previewDoc?.uri ? (
                <Image
                  source={{ uri: previewDoc.uri }}
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  resizeMode="contain"
                />
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 16,
                  }}
                >
                  <Text style={{ fontSize: 48, marginBottom: 8 }}>📄</Text>
                  <Text
                    style={{
                      color: '#17191C',
                      fontSize: 15,
                      fontWeight: '700',
                    }}
                  >
                    {previewDoc?.title}
                  </Text>
                  <Text
                    style={{
                      color: '#687078',
                      fontSize: 12,
                      marginTop: 4,
                      textAlign: 'center',
                    }}
                  >
                    Official registered document preview.
                  </Text>
                </View>
              )}
            </View>

            <Pressable
              style={{
                alignItems: 'center',
                backgroundColor: '#FFC928',
                borderRadius: 12,
                height: 44,
                justifyContent: 'center',
                marginTop: 6,
              }}
              onPress={() => setPreviewDoc(null)}
            >
              <Text
                style={{
                  color: '#17191C',
                  fontSize: 14,
                  fontWeight: '800',
                }}
              >
                Close Preview
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

export default VehicleDocumentsReviewScreen;
