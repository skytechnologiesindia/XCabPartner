import React from 'react';
import SettingsItem from './SettingsItem';
import SettingsSection from './SettingsSection';
import { appSettingsItems as defaultAppSettingsItems } from './settingsData';

/**
 * AppSettingsSection
 * App Settings category covering version check and cache clearing.
 */
function AppSettingsSection({
  items = defaultAppSettingsItems,
  onItemPress,
}) {
  return (
    <SettingsSection title="App Settings">
      {items.map((item, index) => (
        <SettingsItem
          key={item.id}
          iconType={item.iconType}
          title={item.title}
          subtitle={item.subtitle}
          value={item.value}
          onPress={() => onItemPress && onItemPress(item)}
          isLast={index === items.length - 1}
        />
      ))}
    </SettingsSection>
  );
}

export default AppSettingsSection;
