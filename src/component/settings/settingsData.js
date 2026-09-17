/**
 * XCAB Driver Settings Mock Data & Configuration
 * Structured configuration for Preferences, App Settings, Others, and Account Actions.
 */

export const preferenceItems = [
  {
    id: 'notifications',
    title: 'Notifications',
    subtitle: 'Manage your notification preferences',
    iconType: 'bell',
  },
  {
    id: 'location',
    title: 'Location',
    subtitle: 'Manage location access',
    iconType: 'location',
  },
  {
    id: 'theme',
    title: 'App Theme',
    subtitle: 'Choose your preferred theme',
    value: 'Light',
    iconType: 'moon',
  },
  {
    id: 'language',
    title: 'Language',
    subtitle: 'Choose your preferred language',
    value: 'English',
    iconType: 'globe',
  },
];

export const appSettingsItems = [
  {
    id: 'app-version',
    title: 'App Version',
    subtitle: 'v1.2.0 (Build 45)',
    value: 'Check for Updates',
    iconType: 'download',
  },
  {
    id: 'clear-cache',
    title: 'Clear Cache',
    subtitle: 'Free up storage space',
    iconType: 'database',
  },
];

export const otherItems = [
  {
    id: 'legal-policies',
    title: 'Legal & Policies',
    subtitle: 'Terms, privacy policy and more',
    iconType: 'document',
  },
  {
    id: 'about-xcab',
    title: 'About XCab',
    subtitle: 'App information and credits',
    iconType: 'info',
  },
];

export const deleteAccountConfig = {
  id: 'delete-account',
  title: 'Delete Account',
  subtitle: 'Permanently delete your account and data',
  iconType: 'trash',
};

export default {
  preferenceItems,
  appSettingsItems,
  otherItems,
  deleteAccountConfig,
};
