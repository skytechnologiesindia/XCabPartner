import React from 'react';
import SettingsItem from './SettingsItem';
import SettingsSection from './SettingsSection';
import { otherItems as defaultOtherItems } from './settingsData';

/**
 * OthersSection
 * Others category covering Legal & Policies and About XCab information.
 */
function OthersSection({
  items = defaultOtherItems,
  onItemPress,
}) {
  return (
    <SettingsSection title="Others">
      {items.map((item, index) => (
        <SettingsItem
          key={item.id}
          iconType={item.iconType}
          title={item.title}
          subtitle={item.subtitle}
          onPress={() => onItemPress && onItemPress(item)}
          isLast={index === items.length - 1}
        />
      ))}
    </SettingsSection>
  );
}

export default OthersSection;
