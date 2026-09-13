import React from 'react';
import { StyleSheet, View } from 'react-native';
import ProfileMenuItem from './ProfileMenuItem';
import { menuItemsData } from './profileData';

/**
 * ProfileMenuList
 * Composes the structured list of profile and account settings menu items.
 */
function ProfileMenuList({ items = menuItemsData, onItemPress }) {
  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
});

export default ProfileMenuList;
