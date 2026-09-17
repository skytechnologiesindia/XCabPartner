import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import styles from '../../../assets/styles/styles';
import {
  AlternateContactCard,
  ContactSupport,
  EditEmergencyContactModal,
  EmergencyInfoBanner,
  PrimaryContactCard,
  alternateEmergencyContact as initialAlternateEmergencyContact,
  primaryEmergencyContact as initialPrimaryEmergencyContact,
  SafetyInfoCard,
} from '../../../component/emergencyContact';
import { PersonalDetailsHelper } from '../../../component/personalDetailsOnboarding';

/**
 * EmergencyContactScreen
 * Main screen for XCAB Driver Emergency Contact management during onboarding & profile.
 * - Displays brand header with back action and logo
 * - Prominent "Save Changes →" CTA
 * with utility styles.
 */
function EmergencyContactScreen({
  navigation,
  onBack,
  onContinue,
  onSave,
  onSkip,
  showBack = true,
  showSkip = false,
}) {
  const [primaryContact, setPrimaryContact] = useState(
    initialPrimaryEmergencyContact,
  );
  const [alternateContact, setAlternateContact] = useState(
    initialAlternateEmergencyContact,
  );

  // Modal control state
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState('edit'); // 'add' | 'edit'
  const [activeTarget, setActiveTarget] = useState('primary'); // 'primary' | 'alternate'

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    } else if (onContinue) {
      onContinue();
    } else if (onSave) {
      onSave();
    } else if (navigation && navigation.navigate) {
      try {
        navigation.navigate('Desk');
      } catch (err) {
        navigation.navigate('Home');
      }
    }
  };

  const handleContinue = () => {
    const contactData = { primaryContact, alternateContact };
    if (onSave) {
      onSave(contactData);
    } else if (onContinue) {
      onContinue(contactData);
    } else if (onBack) {
      onBack();
    } else if (navigation && navigation.goBack) {
      navigation.goBack();
    } else if (navigation && navigation.navigate) {
      try {
        navigation.navigate('Desk');
      } catch (err) {
        navigation.navigate('Home');
      }
    }
  };

  const handleEditPrimary = contact => {
    setActiveTarget('primary');
    setModalMode('edit');
    setModalVisible(true);
  };

  const handleAddAlternate = () => {
    setActiveTarget('alternate');
    setModalMode('add');
    setModalVisible(true);
  };

  const handleEditAlternate = contact => {
    setActiveTarget('alternate');
    setModalMode('edit');
    setModalVisible(true);
  };

  const handleRemoveAlternate = () => {
    setAlternateContact(null);
  };

  const handleSaveContact = savedContact => {
    if (activeTarget === 'primary') {
      setPrimaryContact(savedContact);
    } else {
      setAlternateContact(savedContact);
    }
    setModalVisible(false);
  };

  const handleContactSupport = () => {
    Alert.alert(
      'XCab Driver Support',
      'Need assistance with emergency contact information or safety protocols?\n\nContact driver operations:\n• Toll-Free: 1800-123-XCAB\n• Email: support@xcab.in',
      [
        { text: 'Call Support', onPress: () => {} },
        { text: 'Close', style: 'cancel' },
      ],
    );
  };

  const currentModalContact =
    activeTarget === 'primary' ? primaryContact : alternateContact;

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F5EF' }}>
      {/* 1. Header: Back button + brand logo */}
      <View
        style={[
          styles.pdb8,
          styles.pdh20,
          styles.pdt4,
          {
            alignItems: 'center',
            backgroundColor: '#F7F5EF',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          },
        ]}
      >
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          {showBack ? (
            <Pressable
              style={({ pressed }) => [
                styles.mr8,
                {
                  alignItems: 'center',
                  height: 38,
                  justifyContent: 'center',
                  width: 32,
                  opacity: pressed ? 0.6 : 1,
                },
              ]}
              onPress={handleBack}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              hitSlop={12}
            >
              <Text
                style={{
                  color: '#17191C',
                  fontSize: 32,
                  fontWeight: '300',
                  lineHeight: 34,
                  marginTop: -2,
                }}
              >
                ‹
              </Text>
            </Pressable>
          ) : null}

          <View style={{ justifyContent: 'center' }}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Text
                style={[
                  styles.ts25,
                  {
                    color: '#FFC928',
                    fontWeight: '900',
                    letterSpacing: -0.6,
                  },
                ]}
              >
                X
              </Text>
              <Text
                style={[
                  styles.ts25,
                  {
                    color: '#17191C',
                    fontWeight: '900',
                    letterSpacing: -0.6,
                  },
                ]}
              >
                CAB
              </Text>
            </View>
            <Text
              style={{
                color: '#687078',
                fontSize: 7.5,
                fontWeight: '700',
                letterSpacing: 2.2,
                marginTop: -2,
              }}
            >
              DRIVER APP
            </Text>
          </View>
        </View>

        {/* Skip Button (only if showSkip is true) */}
        {showSkip ? (
          <Pressable
            style={({ pressed }) => [
              styles.pdh16,
              styles.pdv8,
              {
                alignItems: 'center',
                backgroundColor: pressed ? '#E5E1D5' : '#F1EEE5',
                borderRadius: 12,
                justifyContent: 'center',
              },
            ]}
            onPress={handleSkip}
            accessibilityRole="button"
            accessibilityLabel="Skip to Home page"
            hitSlop={{ top: 10, bottom: 10, left: 14, right: 14 }}
          >
            <Text
              style={[
                styles.ts13,
                {
                  color: '#17191C',
                  fontWeight: '700',
                },
              ]}
            >
              Skip
            </Text>
          </Pressable>
        ) : (
          <View style={{ width: 32 }} />
        )}
      </View>

      {/* 2. Main Scrollable Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: 30,
          paddingHorizontal: 16,
          paddingTop: 10,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Title & Subtitle */}
        <View style={[styles.mb16, styles.pdh4]}>
          <Text
            style={[
              styles.ts25,
              {
                color: '#17191C',
                fontWeight: '900',
                letterSpacing: -0.6,
              },
            ]}
          >
            Emergency Contact
          </Text>
          <Text
            style={[
              styles.ts13,
              styles.mt4,
              {
                color: '#687078',
                fontWeight: '400',
              },
            ]}
          >
            Add or update your emergency contact
          </Text>
        </View>

        {/* Informational Yellow Banner */}
        <EmergencyInfoBanner />

        {/* Primary Emergency Contact Card */}
        <PrimaryContactCard
          contact={primaryContact}
          onEdit={handleEditPrimary}
        />

        {/* Alternate Emergency Contact Card (Add or Manage) */}
        <AlternateContactCard
          contact={alternateContact}
          onAdd={handleAddAlternate}
          onEdit={handleEditAlternate}
          onRemove={handleRemoveAlternate}
        />

        {/* Safety Importance Notice Card */}
        <SafetyInfoCard />

        {/* Contact Support Assistance Banner */}
        <ContactSupport onContactSupport={handleContactSupport} />

        {/* 3. Primary Continue Action Section */}
        <View style={[styles.mt20, { alignItems: 'center', width: '100%' }]}>
          <Pressable
            style={({ pressed }) => [
              styles.pdh16,
              {
                alignItems: 'center',
                backgroundColor: pressed ? '#F5BE18' : '#FFC928',
                borderRadius: 16,
                elevation: 2,
                height: 52,
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 4,
                width: '100%',
                transform: [{ scale: pressed ? 0.99 : 1 }],
              },
            ]}
            onPress={handleContinue}
            accessibilityRole="button"
            accessibilityLabel={showSkip ? 'Continue' : 'Save Changes'}
          >
            <Text
              style={[
                styles.ts16,
                {
                  color: '#17191C',
                  fontWeight: '800',
                  letterSpacing: -0.2,
                },
              ]}
            >
              {showSkip ? 'Continue →' : 'Save Changes →'}
            </Text>
          </Pressable>

          {showSkip ? (
            <Pressable
              style={({ pressed }) => [
                styles.mt12,
                styles.pdv8,
                {
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: pressed ? 0.6 : 1,
                },
              ]}
              onPress={handleSkip}
              accessibilityRole="button"
              accessibilityLabel="Skip to Home page"
            >
              <Text
                style={[
                  styles.ts14,
                  {
                    color: '#687078',
                    fontWeight: '600',
                    textDecorationLine: 'underline',
                  },
                ]}
              >
                Skip for now
              </Text>
            </Pressable>
          ) : null}
        </View>

        {/* 4. Lower Automotive Hero & Badges */}
        <PersonalDetailsHelper />
      </ScrollView>

      {/* Reusable Add/Edit Modal */}
      <EditEmergencyContactModal
        visible={modalVisible}
        mode={modalMode}
        contact={currentModalContact}
        onSave={handleSaveContact}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

export default EmergencyContactScreen;
