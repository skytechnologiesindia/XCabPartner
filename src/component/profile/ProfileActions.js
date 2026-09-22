import React from 'react';
import { View } from 'react-native';
import LogoutButton from './LogoutButton';

/**
 * ProfileActions
 * Action bar containing the session "Logout" CTA.
 */
function ProfileActions({ onLogout }) {
  return (
    <View style={{ marginBottom: 16, width: '100%' }}>
      {/* Logout Action CTA */}
      <LogoutButton onConfirmLogout={onLogout} />
    </View>
  );
}

export default ProfileActions;
