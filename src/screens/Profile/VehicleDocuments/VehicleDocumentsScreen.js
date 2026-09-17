import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
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
    <View style={styles.container}>
      {/* 1. Secondary Back Header: [<  XCAB] */}
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed,
          ]}
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={12}
        >
          <Text style={styles.backArrow}>‹</Text>
        </Pressable>

        <View style={styles.brandLockup}>
          <Text style={styles.logoX}>X</Text>
          <Text style={styles.logoCab}>CAB</Text>
        </View>
      </View>

      {/* 2. Main Scroll Content */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Title & Advisory Subtitle */}
        <View style={styles.titleSection}>
          <Text style={styles.titleText}>Vehicle & Documents</Text>
          <Text style={styles.subtitleText}>
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
        <View style={styles.documentsList}>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F5EF',
    flex: 1,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#F7F5EF',
    flexDirection: 'row',
    paddingBottom: 6,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  backButton: {
    alignItems: 'center',
    height: 38,
    justifyContent: 'center',
    marginRight: 6,
    width: 32,
  },
  backButtonPressed: {
    opacity: 0.6,
  },
  backArrow: {
    color: '#17191C',
    fontSize: 34,
    fontWeight: '300',
    lineHeight: 36,
    marginTop: -2,
  },
  brandLockup: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  logoX: {
    color: '#FFC928',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  logoCab: {
    color: '#17191C',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  titleSection: {
    marginBottom: 16,
  },
  titleText: {
    color: '#17191C',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  subtitleText: {
    color: '#687078',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 4,
    lineHeight: 19,
  },
  documentsList: {
    marginBottom: 8,
  },
});

export default VehicleDocumentsScreen;
