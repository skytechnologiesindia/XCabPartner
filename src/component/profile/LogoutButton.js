import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  Text,
  View,
} from 'react-native';

/**
 * LogoutButton
 * Secondary danger-oriented action button that prompts for confirmation
 * before logging out of the application.
 */
function LogoutButton({ onConfirmLogout }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleConfirm = () => {
    setModalVisible(false);
    if (onConfirmLogout) {
      onConfirmLogout();
    }
  };

  return (
    <>
      {/* 1. The Trigger Button */}
      <Pressable
        style={({ pressed }) => [
          {
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderColor: '#FCA5A5',
            borderRadius: 14,
            borderWidth: 1.5,
            flexDirection: 'row',
            height: 50,
            justifyContent: 'center',
            width: '100%',
          },
          pressed && {
            backgroundColor: '#FEF2F2',
            opacity: 0.9,
          },
        ]}
        onPress={handleOpenModal}
        accessibilityRole="button"
        accessibilityLabel="Logout from account"
      >
        {/* Logout Exit Icon */}
        <View style={{ marginRight: 6, transform: [{ rotate: '-45deg' }] }}>
          <Text style={{ color: '#EF4444', fontSize: 16, fontWeight: '800' }}>⮞</Text>
        </View>

        <Text
          style={{
            color: '#EF4444',
            fontSize: 14.5,
            fontWeight: '700',
            letterSpacing: -0.1,
          }}
        >
          Logout
        </Text>
      </Pressable>

      {/* 2. Confirmation Modal Dialog */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <Pressable
          style={{
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.55)',
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 24,
          }}
          onPress={handleCloseModal}
          accessibilityRole="none"
        >
          <Pressable
            style={{
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderColor: '#ECE8DE',
              borderRadius: 22,
              borderWidth: 1,
              paddingHorizontal: 20,
              paddingVertical: 24,
              width: '100%',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
              elevation: 6,
            }}
            onPress={e => e.stopPropagation()}
          >
            {/* Warning / Logout Icon Circle */}
            <View
              style={{
                alignItems: 'center',
                backgroundColor: '#FEE2E2',
                borderRadius: 26,
                height: 52,
                justifyContent: 'center',
                marginBottom: 14,
                width: 52,
              }}
            >
              <Text style={{ color: '#DC2626', fontSize: 22, fontWeight: '800' }}>⏻</Text>
            </View>

            {/* Modal Title & Body */}
            <Text
              style={{
                color: '#17191C',
                fontSize: 20,
                fontWeight: '800',
                letterSpacing: -0.3,
                marginBottom: 8,
              }}
            >
              Log out?
            </Text>
            <Text
              style={{
                color: '#687078',
                fontSize: 13.5,
                lineHeight: 19,
                textAlign: 'center',
                marginBottom: 22,
              }}
            >
              Are you sure you want to log out of your XCAB Driver account?
            </Text>

            {/* Modal Action Buttons */}
            <View style={{ flexDirection: 'row', gap: 12, width: '100%' }}>
              <Pressable
                style={({ pressed }) => [
                  {
                    alignItems: 'center',
                    backgroundColor: '#F4F2EB',
                    borderRadius: 12,
                    flex: 1,
                    height: 46,
                    justifyContent: 'center',
                  },
                  pressed && {
                    backgroundColor: '#EBE7DC',
                  },
                ]}
                onPress={handleCloseModal}
                accessibilityRole="button"
                accessibilityLabel="Cancel logout"
              >
                <Text style={{ color: '#17191C', fontSize: 14, fontWeight: '700' }}>Cancel</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  {
                    alignItems: 'center',
                    backgroundColor: '#EF4444',
                    borderRadius: 12,
                    flex: 1,
                    height: 46,
                    justifyContent: 'center',
                  },
                  pressed && {
                    backgroundColor: '#DC2626',
                  },
                ]}
                onPress={handleConfirm}
                accessibilityRole="button"
                accessibilityLabel="Confirm logout"
              >
                <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '700' }}>Log out</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

export default LogoutButton;
