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
  AppSettingsSection,
  DeleteAccountModal,
  DeleteAccountSection,
  OthersSection,
  PreferencesSection,
} from '../../../component/settings';

/**
 * SettingsScreen
 * Page composition layer for XCAB Driver App Settings.
 * Manages Preferences, App Settings, Others, and the two-step Delete Account flow.
 */
function SettingsScreen({
  navigation,
  onBack,
  onLogout,
  onDeleteAccount,
}) {
  const [themeValue, setThemeValue] = useState('Light');
  const [languageValue, setLanguageValue] = useState('English');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  const handlePreferencePress = item => {
    switch (item.id) {
      case 'notifications':
        Alert.alert(
          'Notification Preferences',
          'Manage how you receive trip alerts, surge updates, and account notices.',
          [
            { text: 'Trip Alerts Only', onPress: () => {} },
            { text: 'All Notifications', onPress: () => {} },
            { text: 'Close', style: 'cancel' },
          ],
        );
        break;

      case 'location':
        Alert.alert(
          'Location Access',
          'Location is currently set to "Always Allow" to ensure accurate trip matching and driver safety navigation.',
          [{ text: 'System Settings', onPress: () => {} }, { text: 'OK' }],
        );
        break;

      case 'theme':
        Alert.alert(
          'App Theme',
          'Choose your preferred visual theme for day and night driving.',
          [
            { text: 'Light', onPress: () => setThemeValue('Light') },
            { text: 'Dark', onPress: () => setThemeValue('Dark') },
            { text: 'System Default', onPress: () => setThemeValue('System') },
            { text: 'Cancel', style: 'cancel' },
          ],
        );
        break;

      case 'language':
        Alert.alert(
          'Preferred Language',
          'Select your primary app language.',
          [
            { text: 'English', onPress: () => setLanguageValue('English') },
            { text: 'हिंदी (Hindi)', onPress: () => setLanguageValue('हिंदी') },
            { text: 'Cancel', style: 'cancel' },
          ],
        );
        break;

      default:
        break;
    }
  };

  const handleAppSettingPress = item => {
    switch (item.id) {
      case 'app-version':
        Alert.alert(
          'Check for Updates',
          'You are using the latest version of XCab Partner (v1.2.0 Build 45).',
          [{ text: 'OK' }],
        );
        break;

      case 'clear-cache':
        Alert.alert(
          'Clear Storage Cache',
          'This will clear temporary map tiles and offline data (approx 24.5 MB). No account or earnings data will be lost.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Clear Cache',
              style: 'destructive',
              onPress: () => {
                Alert.alert('Success', 'Cache cleared successfully. 24.5 MB freed.');
              },
            },
          ],
        );
        break;

      default:
        break;
    }
  };

  const handleOtherPress = item => {
    switch (item.id) {
      case 'legal-policies':
        Alert.alert(
          'Legal & Policies',
          'Terms of Service, Privacy Policy, Driver Partner Agreement, and Regulatory Disclosures are maintained under compliance with local transportation laws.',
          [{ text: 'Close', style: 'cancel' }],
        );
        break;

      case 'about-xcab':
        Alert.alert(
          'About XCab',
          'XCab Partner App v1.2.0 (Build 45)\n\nDesigned for driver partners to deliver safe, reliable, and premium city mobility.',
          [{ text: 'Close', style: 'cancel' }],
        );
        break;

      default:
        break;
    }
  };

  const handleConfirmDeleteAccount = async () => {
    // Perform account deletion logic / session clearance
    setDeleteModalVisible(false);
    if (onDeleteAccount) {
      onDeleteAccount();
    } else if (onLogout) {
      onLogout();
    } else if (navigation && navigation.navigate) {
      navigation.navigate('Desk');
    }
  };

  const handleContactSupport = () => {
    Alert.alert(
      'XCab Partner Support',
      'For assistance regarding account deletion or disputes:\n• Helpline: 1800-123-XCAB\n• Email: support@xcab.in',
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  return (
    <View style={styles.container}>
      {/* 1. Existing Secondary Back Header: [‹  XCAB] */}
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
          <Text style={styles.titleText}>Settings</Text>
          <Text style={styles.subtitleText}>
            Manage your app preferences and settings
          </Text>
        </View>

        {/* 1. Preferences Section */}
        <PreferencesSection
          themeValue={themeValue}
          languageValue={languageValue}
          onItemPress={handlePreferencePress}
        />

        {/* 2. App Settings Section */}
        <AppSettingsSection onItemPress={handleAppSettingPress} />

        {/* 3. Others Section */}
        <OthersSection onItemPress={handleOtherPress} />

        {/* 4. Account Actions Section (Delete Account) */}
        <DeleteAccountSection
          onDeletePress={() => setDeleteModalVisible(true)}
        />
      </ScrollView>

      {/* Two-Step Delete Account Modal */}
      <DeleteAccountModal
        visible={deleteModalVisible}
        onConfirmDelete={handleConfirmDeleteAccount}
        onCancel={() => setDeleteModalVisible(false)}
        onContactSupport={handleContactSupport}
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
});

export default SettingsScreen;
