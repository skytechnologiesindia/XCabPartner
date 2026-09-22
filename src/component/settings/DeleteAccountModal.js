import React, { useEffect, useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';

/**
 * DeleteAccountModal
 * Two-step confirmation bottom-sheet modal preventing accidental driver account deletion.
 *
 * Step 1: Initial warning with explanation
 * Step 2: Final confirmation ("Delete permanently")
 * Error State: In case deletion operation fails with retry & support options
 */
function DeleteAccountModal({
  visible,
  onConfirmDelete,
  onCancel,
  onContactSupport,
}) {
  const [step, setStep] = useState(1); // 1 = initial warning, 2 = final confirmation, 3 = error state
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (visible) {
      setStep(1);
      setIsDeleting(false);
    }
  }, [visible]);

  const handleInitialDelete = () => {
    setStep(2);
  };

  const handleFinalDelete = async () => {
    setIsDeleting(true);
    try {
      if (onConfirmDelete) {
        await onConfirmDelete();
      }
    } catch (error) {
      setIsDeleting(false);
      setStep(3); // Error state
    }
  };

  const handleClose = () => {
    setStep(1);
    setIsDeleting(false);
    onCancel && onCancel();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View
        style={{
          backgroundColor: 'rgba(17, 19, 21, 0.45)',
          flex: 1,
          justifyContent: 'flex-end',
        }}
      >
        <Pressable style={{ flex: 1 }} onPress={handleClose} />

        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingBottom: Platform.OS === 'ios' ? 34 : 24,
            paddingHorizontal: 20,
            paddingTop: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          {/* Top Handle Bar */}
          <View
            style={{
              alignSelf: 'center',
              backgroundColor: '#DDD9CF',
              borderRadius: 2.5,
              height: 4,
              marginBottom: 16,
              width: 38,
            }}
          />

          {/* Warning / Hazard Icon in Soft Red Circle */}
          <View
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              backgroundColor: '#FDECEB',
              borderRadius: 28,
              height: 56,
              justifyContent: 'center',
              marginBottom: 16,
              width: 56,
            }}
          >
            <Text
              style={{
                color: '#E11D48',
                fontSize: 26,
                fontWeight: '900',
              }}
            >
              ⚠
            </Text>
          </View>

          {/* STEP 1: Initial Warning */}
          {step === 1 && (
            <View style={{ alignItems: 'center', width: '100%' }}>
              <Text
                style={{
                  color: '#17191C',
                  fontSize: 20,
                  fontWeight: '800',
                  letterSpacing: -0.4,
                  textAlign: 'center',
                }}
              >
                Delete your account?
              </Text>
              <Text
                style={{
                  color: '#687078',
                  fontSize: 13.5,
                  fontWeight: '400',
                  lineHeight: 19,
                  marginTop: 8,
                  paddingHorizontal: 10,
                  textAlign: 'center',
                }}
              >
                This action will permanently delete your XCAB account and
                associated data. You may not be able to recover your account
                after deletion.
              </Text>

              <View style={{ marginTop: 24, width: '100%' }}>
                <Pressable
                  style={({ pressed }) => [
                    {
                      alignItems: 'center',
                      backgroundColor: '#F26B5B',
                      borderRadius: 10,
                      height: 48,
                      justifyContent: 'center',
                      marginBottom: 10,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.08,
                      shadowRadius: 2,
                      elevation: 2,
                    },
                    pressed && { opacity: 0.75 },
                  ]}
                  onPress={handleInitialDelete}
                  accessibilityRole="button"
                  accessibilityLabel="Delete Account"
                >
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 14.5,
                      fontWeight: '800',
                      letterSpacing: -0.1,
                    }}
                  >
                    Delete Account
                  </Text>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [
                    {
                      alignItems: 'center',
                      borderColor: '#DDD9CF',
                      borderRadius: 10,
                      borderWidth: 1,
                      height: 44,
                      justifyContent: 'center',
                    },
                    pressed && { opacity: 0.75 },
                  ]}
                  onPress={handleClose}
                  accessibilityRole="button"
                  accessibilityLabel="Cancel"
                >
                  <Text
                    style={{
                      color: '#17191C',
                      fontSize: 14,
                      fontWeight: '700',
                    }}
                  >
                    Cancel
                  </Text>
                </Pressable>
              </View>
            </View>
          )}

          {/* STEP 2: Final Confirmation */}
          {step === 2 && (
            <View style={{ alignItems: 'center', width: '100%' }}>
              <Text
                style={{
                  color: '#17191C',
                  fontSize: 20,
                  fontWeight: '800',
                  letterSpacing: -0.4,
                  textAlign: 'center',
                }}
              >
                Are you sure?
              </Text>
              <Text
                style={{
                  color: '#687078',
                  fontSize: 13.5,
                  fontWeight: '400',
                  lineHeight: 19,
                  marginTop: 8,
                  paddingHorizontal: 10,
                  textAlign: 'center',
                }}
              >
                Your account and personal data will be permanently deleted. This
                action is irreversible.
              </Text>

              <View style={{ marginTop: 24, width: '100%' }}>
                <Pressable
                  style={({ pressed }) => [
                    {
                      alignItems: 'center',
                      backgroundColor: '#F26B5B',
                      borderRadius: 10,
                      height: 48,
                      justifyContent: 'center',
                      marginBottom: 10,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.08,
                      shadowRadius: 2,
                      elevation: 2,
                    },
                    isDeleting && { opacity: 0.5 },
                    pressed && !isDeleting && { opacity: 0.75 },
                  ]}
                  onPress={handleFinalDelete}
                  disabled={isDeleting}
                  accessibilityRole="button"
                  accessibilityLabel="Delete permanently"
                >
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 14.5,
                      fontWeight: '800',
                      letterSpacing: -0.1,
                    }}
                  >
                    {isDeleting ? 'Deleting account...' : 'Delete permanently'}
                  </Text>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [
                    {
                      alignItems: 'center',
                      borderColor: '#DDD9CF',
                      borderRadius: 10,
                      borderWidth: 1,
                      height: 44,
                      justifyContent: 'center',
                    },
                    pressed && { opacity: 0.75 },
                  ]}
                  onPress={handleClose}
                  accessibilityRole="button"
                  accessibilityLabel="Keep my account"
                >
                  <Text
                    style={{
                      color: '#17191C',
                      fontSize: 14,
                      fontWeight: '700',
                    }}
                  >
                    Keep my account
                  </Text>
                </Pressable>
              </View>
            </View>
          )}

          {/* STEP 3: Deletion Error State */}
          {step === 3 && (
            <View style={{ alignItems: 'center', width: '100%' }}>
              <Text
                style={{
                  color: '#17191C',
                  fontSize: 20,
                  fontWeight: '800',
                  letterSpacing: -0.4,
                  textAlign: 'center',
                }}
              >
                Unable to delete account
              </Text>
              <Text
                style={{
                  color: '#687078',
                  fontSize: 13.5,
                  fontWeight: '400',
                  lineHeight: 19,
                  marginTop: 8,
                  paddingHorizontal: 10,
                  textAlign: 'center',
                }}
              >
                We encountered an error processing your account deletion. Please
                try again or contact support for assistance.
              </Text>

              <View style={{ marginTop: 24, width: '100%' }}>
                <Pressable
                  style={({ pressed }) => [
                    {
                      alignItems: 'center',
                      backgroundColor: '#FFC928',
                      borderRadius: 10,
                      height: 48,
                      justifyContent: 'center',
                      marginBottom: 10,
                    },
                    pressed && { opacity: 0.75 },
                  ]}
                  onPress={() => setStep(2)}
                  accessibilityRole="button"
                  accessibilityLabel="Try Again"
                >
                  <Text
                    style={{
                      color: '#17191C',
                      fontSize: 14.5,
                      fontWeight: '800',
                    }}
                  >
                    Try Again
                  </Text>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [
                    {
                      alignItems: 'center',
                      borderColor: '#DDD9CF',
                      borderRadius: 10,
                      borderWidth: 1,
                      height: 44,
                      justifyContent: 'center',
                    },
                    pressed && { opacity: 0.75 },
                  ]}
                  onPress={() => {
                    handleClose();
                    onContactSupport && onContactSupport();
                  }}
                  accessibilityRole="button"
                  accessibilityLabel="Contact Support"
                >
                  <Text
                    style={{
                      color: '#17191C',
                      fontSize: 14,
                      fontWeight: '700',
                    }}
                  >
                    Contact Support
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

export default DeleteAccountModal;
