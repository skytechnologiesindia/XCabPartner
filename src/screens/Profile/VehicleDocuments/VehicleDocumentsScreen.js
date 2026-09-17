import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {
  ContactSupport,
  DocumentCard,
  DocumentsHeader,
  VehicleCard,
  documentsData as initialDocumentsData,
  vehicleData as initialVehicleData,
} from '../../../component/vehicleDocuments';

/**
 * VehicleDocumentsScreen
 * Main composition container for vehicle specifications and compliance documents.
 * Opened from Profile screen as a secondary navigation route.
 */
function VehicleDocumentsScreen({
  navigation,
  onBack,
  onUpdateVehicle,
}) {
  const [vehicle] = useState(initialVehicleData);
  const [documents] = useState(initialDocumentsData);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  const handleUpdate = () => {
    if (onUpdateVehicle) {
      onUpdateVehicle();
    } else {
      Alert.alert(
        'Update Vehicle',
        'To modify registered vehicle details or license plate, please submit your RC copy for review.',
        [{ text: 'OK' }],
      );
    }
  };

  const handleUploadDocument = () => {
    Alert.alert(
      'Upload Document',
      'Select document type to upload (RC, Insurance, PUC, License, Fitness, Permit).',
      [
        { text: 'Take Photo', onPress: () => {} },
        { text: 'Choose from Gallery', onPress: () => {} },
        { text: 'Cancel', style: 'cancel' },
      ],
    );
  };

  const handleDocumentPress = doc => {
    Alert.alert(
      doc.title,
      `Status: ${doc.status.toUpperCase()}\nValidity: ${doc.validity}\n\nWould you like to upload an updated copy?`,
      [
        { text: 'Upload New Copy', onPress: handleUploadDocument },
        { text: 'Close', style: 'cancel' },
      ],
    );
  };

  const handleContactSupport = () => {
    Alert.alert(
      'XCab Partner Support',
      'Contact our driver operations team at support@xcab.in or call toll-free 1800-123-XCAB.',
      [{ text: 'Call Support' }, { text: 'Cancel', style: 'cancel' }],
    );
  };

  return (
    <View style={{ backgroundColor: '#F7F5EF', flex: 1 }}>
      {/* 1. Secondary Back Header: [<  XCAB] */}
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#F7F5EF',
          flexDirection: 'row',
          paddingBottom: 6,
          paddingHorizontal: 16,
          paddingTop: 8,
        }}
      >
        <Pressable
          style={({ pressed }) => [
            {
              alignItems: 'center',
              height: 38,
              justifyContent: 'center',
              marginRight: 6,
              width: 32,
            },
            pressed && { opacity: 0.6 },
          ]}
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={12}
        >
          <Text
            style={{
              color: '#17191C',
              fontSize: 34,
              fontWeight: '300',
              lineHeight: 36,
              marginTop: -2,
            }}
          >
            ‹
          </Text>
        </Pressable>

        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <Text
            style={{
              color: '#FFC928',
              fontSize: 26,
              fontWeight: '900',
              letterSpacing: -0.5,
            }}
          >
            X
          </Text>
          <Text
            style={{
              color: '#17191C',
              fontSize: 26,
              fontWeight: '900',
              letterSpacing: -0.5,
            }}
          >
            CAB
          </Text>
        </View>
      </View>

      {/* 2. Main Scroll Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: 40,
          paddingHorizontal: 16,
          paddingTop: 8,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Title & Advisory Subtitle */}
        <View style={{ marginBottom: 16 }}>
          <Text
            style={{
              color: '#17191C',
              fontSize: 30,
              fontWeight: '800',
              letterSpacing: -0.6,
            }}
          >
            Vehicle & Documents
          </Text>
          <Text
            style={{
              color: '#687078',
              fontSize: 14,
              fontWeight: '400',
              marginTop: 4,
              lineHeight: 19,
            }}
          >
            Manage your vehicle details and keep your documents up to date
          </Text>
        </View>

        {/* Primary Vehicle Card (Details + Specs Grid) */}
        <VehicleCard
          vehicle={vehicle}
          onUpdatePress={handleUpdate}
        />

        {/* Documents Section Header */}
        <DocumentsHeader onUploadPress={handleUploadDocument} />

        {/* List of Documents */}
        <View style={{ marginBottom: 8 }}>
          {documents.map(doc => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onPress={handleDocumentPress}
            />
          ))}
        </View>

        {/* Contact Support Assistance Banner */}
        <ContactSupport onContactPress={handleContactSupport} />
      </ScrollView>
    </View>
  );
}

export default VehicleDocumentsScreen;
