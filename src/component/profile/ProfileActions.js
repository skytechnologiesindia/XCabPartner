import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LogoutButton from './LogoutButton';

/**
 * ProfileActions
 * Action bar containing the primary "Edit Profile" CTA and secondary "Logout" CTA.
 */
function ProfileActions({ onEditProfile, onLogout }) {
  return (
    <View style={styles.container}>
      {/* 1. Primary CTA: Edit Profile */}
      <Pressable
        style={({ pressed }) => [
          styles.editButton,
          pressed && styles.editButtonPressed,
        ]}
        onPress={onEditProfile}
        accessibilityRole="button"
        accessibilityLabel="Edit Profile"
      >
        <Text style={styles.editIcon}>✎</Text>
        <Text style={styles.editText}>Edit Profile</Text>
      </Pressable>

      {/* 2. Secondary CTA: Logout with Confirmation */}
      <LogoutButton onConfirmLogout={onLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
    width: '100%',
  },
  editButton: {
    alignItems: 'center',
    backgroundColor: '#FFC928',
    borderRadius: 14,
    flex: 1,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 1.5,
  },
  editButtonPressed: {
    backgroundColor: '#F5BE18',
    opacity: 0.92,
  },
  editIcon: {
    color: '#17191C',
    fontSize: 15,
    fontWeight: '800',
    marginRight: 6,
  },
  editText: {
    color: '#17191C',
    fontSize: 14.5,
    fontWeight: '700',
    letterSpacing: -0.1,
  },
});

export default ProfileActions;
