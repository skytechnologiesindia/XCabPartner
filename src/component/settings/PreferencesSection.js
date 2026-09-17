import React from 'react';
import SettingsItem from './SettingsItem';
import SettingsSection from './SettingsSection';
import { preferenceItems as defaultPreferenceItems } from './settingsData';

/**
 * PreferencesSection
 * Preferences category covering notifications, location, app theme, and language.
 */
function PreferencesSection({
  items = defaultPreferenceItems,
  themeValue = 'Light',
  languageValue = 'English',
  onItemPress,
}) {
  return (
    <SettingsSection title="Preferences">
      {items.map((item, index) => {
        let displayValue = item.value;
        if (item.id === 'theme') displayValue = themeValue;
        if (item.id === 'language') displayValue = languageValue;

        return (
          <SettingsItem
            key={item.id}
            iconType={item.iconType}
            title={item.title}
            subtitle={item.subtitle}
            value={displayValue}
            onPress={() => onItemPress && onItemPress(item)}
            isLast={index === items.length - 1}
          />
        );
      })}
    </SettingsSection>
  );
}

export default PreferencesSection;
