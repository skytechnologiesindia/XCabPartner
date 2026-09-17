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
  AccountInformation,
  BasicInformation,
  EditDetailModal,
  KycDetails,
  PersonalDetailsCard,
  SupportCard,
  personalDetailsData as initialPersonalDetailsData,
} from '../../../component/personalDetails';

/**
 * PersonalDetailsScreen
 * Main page and composition layer for XCAB Driver App "Personal Details".
 * Coordinates secondary header, verified identity records, inline editability,
 * and support actions.
 */
function PersonalDetailsScreen({
  navigation,
  onBack,
}) {
  const [details, setDetails] = useState(initialPersonalDetailsData);
  const [editingField, setEditingField] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  const handleEditField = field => {
    setEditingField(field);
    setModalVisible(true);
  };

  const handleSaveField = (field, newValue) => {
    setDetails(prev => ({
      ...prev,
      [field]: newValue,
    }));
    setModalVisible(false);
    setEditingField(null);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setEditingField(null);
  };

  const handleContactSupport = () => {
    Alert.alert(
      'XCab Driver Support',
      'Need to update your verified documents or identity information?\n\nReach our driver operations team at:\n• Helpline: 1800-123-XCAB\n• Email: support@xcab.in',
      [
        { text: 'Call Support', onPress: () => {} },
        { text: 'Dismiss', style: 'cancel' },
      ],
    );
  };

  return (
    <View style={styles.container}>
      {/* 1. Existing Secondary Back Header pattern: [‹  XCAB] */}
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
        {/* Page Title & Subtitle */}
        <View style={styles.titleSection}>
          <Text style={styles.titleText}>Personal Details</Text>
          <Text style={styles.subtitleText}>Your registered information</Text>
        </View>

        {/* Yellow Information Notice Banner */}
        <View style={styles.infoBanner}>
          <View style={styles.infoIconCircle}>
            <Text style={styles.infoIconSymbol}>ⓘ</Text>
          </View>
          <Text style={styles.infoBannerText}>
            Some personal details are verified and cannot be changed from the
            app. Editable details can be updated here.
          </Text>
        </View>

        {/* 1. Driver Profile Hero Card */}
        <PersonalDetailsCard
          data={details}
        />

        {/* 2. Basic Information (with editable Email & Address) */}
        <BasicInformation
          data={details}
          onEditField={handleEditField}
        />

        {/* 3. KYC & Government Details (Aadhaar, PAN, Driver ID - Read-only) */}
        <KycDetails data={details} />

        {/* 4. Account Information (Joined On, Active, Verified) */}
        <AccountInformation data={details} />

        {/* 5. Support CTA Card */}
        <SupportCard onContactSupport={handleContactSupport} />
      </ScrollView>

      {/* Reusable Bottom Sheet Edit Modal */}
      <EditDetailModal
        visible={modalVisible}
        field={editingField}
        currentValue={editingField ? details[editingField] : null}
        onSave={handleSaveField}
        onClose={handleCloseModal}
      />
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
    paddingTop: 6,
  },
  titleSection: {
    marginBottom: 14,
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
  },
  infoBanner: {
    alignItems: 'flex-start',
    backgroundColor: '#FFF4C7',
    borderColor: '#FDE68A',
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  infoIconCircle: {
    alignItems: 'center',
    borderColor: '#17191C',
    borderRadius: 12,
    borderWidth: 1.5,
    height: 24,
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 1,
    width: 24,
  },
  infoIconSymbol: {
    color: '#17191C',
    fontSize: 14,
    fontWeight: '800',
    marginTop: -1,
  },
  infoBannerText: {
    color: '#17191C',
    flex: 1,
    fontSize: 12.5,
    fontWeight: '500',
    lineHeight: 17.5,
  },
});

export default PersonalDetailsScreen;
