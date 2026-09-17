import React from 'react';
import { View } from 'react-native';
import ProfileMenuItem from './ProfileMenuItem';
import { menuItemsData } from './profileData';

/**
 * ProfileMenuList
 * Composes the structured list of profile and account settings menu items.
 */
function ProfileMenuList({ items = menuItemsData, onItemPress }) {
  return (
    <View style={{ marginBottom: 14 }}>
      {items.map(item => (
        <ProfileMenuItem
          key={item.id}
          title={item.title}
          subtitle={item.subtitle}
          iconType={item.iconType}
          onPress={() => onItemPress && onItemPress(item)}
        />
      ))}
    </View>
  );
}

export default ProfileMenuList;
