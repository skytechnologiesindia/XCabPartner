import React from 'react';
import { StyleSheet, View } from 'react-native';
import LogoutButton from './LogoutButton';

/**
 * ProfileActions
 * Action bar containing the session "Logout" CTA.
 */
function ProfileActions({ onLogout }) {
  return (
    <View style={styles.container}>
      {/* Logout Action CTA */}
      <LogoutButton onConfirmLogout={onLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
});

export default ProfileActions;
