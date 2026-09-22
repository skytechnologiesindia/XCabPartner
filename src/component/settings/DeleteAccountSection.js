import React from 'react';
import SettingsItem from './SettingsItem';
import SettingsSection from './SettingsSection';
import { deleteAccountConfig as defaultConfig } from './settingsData';

/**
 * DeleteAccountSection
 * Account Actions category containing the Delete Account trigger.
 */
function DeleteAccountSection({
  config = defaultConfig,
  onDeletePress,
}) {
  return (
    <SettingsSection title="Account Actions">
      <SettingsItem
        iconType={config.iconType}
        title={config.title}
        subtitle={config.subtitle}
        isDestructive={true}
        isLast={true}
        onPress={onDeletePress}
      />
    </SettingsSection>
  );
}

export default DeleteAccountSection;
