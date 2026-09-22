import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

/**
 * EditDetailModal
 * Reusable bottom-sheet modal for editing allowed fields (Email, Address).
 * Performs inline validation and prevents saving invalid entries.
 */
function EditDetailModal({
  visible,
  field,
  currentValue,
  onSave,
  onClose,
}) {
  // State for email
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  // State for address
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [addressError, setAddressError] = useState('');

  // Initialize or reset values when modal opens or field changes
  useEffect(() => {
    if (field === 'email') {
      setEmail(typeof currentValue === 'string' ? currentValue : '');
      setEmailError('');
    } else if (field === 'address') {
      if (typeof currentValue === 'object' && currentValue !== null) {
        setAddressLine1(currentValue.line1 || '');
        setAddressLine2(currentValue.line2 || '');
      } else if (typeof currentValue === 'string') {
        const parts = currentValue.split('\n');
        setAddressLine1(parts[0] || '');
        setAddressLine2(parts[1] || '');
      }
      setAddressError('');
    }
  }, [field, currentValue, visible]);

  // Validation functions
  const validateEmail = text => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!text || text.trim() === '') {
      return 'Email address is required.';
    }
    if (!emailRegex.test(text.trim())) {
      return 'Please enter a valid email address.';
    }
    return '';
  };

  const validateAddress = (line1, line2) => {
    if (!line1 || line1.trim().length < 4) {
      return 'Address Line 1 must be at least 4 characters.';
    }
    if (!line2 || line2.trim().length < 3) {
      return 'Address Line 2 (State & Pincode) is required.';
    }
    return '';
  };

  const handleEmailChange = text => {
    setEmail(text);
    if (emailError) {
      setEmailError(validateEmail(text));
    }
  };

  const handleAddressLine1Change = text => {
    setAddressLine1(text);
    if (addressError) {
      setAddressError(validateAddress(text, addressLine2));
    }
  };

  const handleAddressLine2Change = text => {
    setAddressLine2(text);
    if (addressError) {
      setAddressError(validateAddress(addressLine1, text));
    }
  };

  const handleSave = () => {
    if (field === 'email') {
      const err = validateEmail(email);
      if (err) {
        setEmailError(err);
        return;
      }
      onSave && onSave('email', email.trim());
    } else if (field === 'address') {
      const err = validateAddress(addressLine1, addressLine2);
      if (err) {
        setAddressError(err);
        return;
      }
      onSave &&
        onSave('address', {
          line1: addressLine1.trim(),
          line2: addressLine2.trim(),
        });
    }
    onClose && onClose();
  };

  const isEmail = field === 'email';
  const isAddress = field === 'address';

  const modalTitle = isEmail
    ? 'Edit Email Address'
    : isAddress
    ? 'Edit Address'
    : 'Edit Detail';

  const isSaveDisabled =
    (isEmail && (!email || email.trim() === '')) ||
    (isAddress && (!addressLine1 || !addressLine2));

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{
          backgroundColor: 'rgba(17, 19, 21, 0.45)',
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        {/* Backdrop tap to dismiss */}
        <Pressable style={{ flex: 1 }} onPress={onClose} />

        {/* Bottom Sheet Modal Container */}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            maxHeight: '85%',
            paddingBottom: Platform.OS === 'ios' ? 34 : 24,
            paddingHorizontal: 20,
            paddingTop: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 8,
          }}>
          {/* Top Drag Indicator */}
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

          <ScrollView
            bounces={false}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Modal Title & Instructions */}
            <Text
              style={{
                color: '#17191C',
                fontSize: 20,
                fontWeight: '800',
                letterSpacing: -0.4,
              }}>
              {modalTitle}
            </Text>
            <Text
              style={{
                color: '#687078',
                fontSize: 13,
                fontWeight: '400',
                lineHeight: 18,
                marginTop: 4,
              }}>
              {isEmail
                ? 'Update your registered email address for receipts and notices.'
                : 'Enter your updated residential or operational address.'}
            </Text>

            {/* Email Field Editing */}
            {isEmail ? (
              <View style={{ marginTop: 20 }}>
                <Text
                  style={{
                    color: '#687078',
                    fontSize: 11,
                    fontWeight: '700',
                    letterSpacing: 0.4,
                    marginBottom: 6,
                  }}>
                  EMAIL ADDRESS
                </Text>
                <TextInput
                  style={[
                    {
                      backgroundColor: '#FAF9F5',
                      borderColor: '#DDD9CF',
                      borderRadius: 10,
                      borderWidth: 1.2,
                      color: '#17191C',
                      fontSize: 14.5,
                      fontWeight: '600',
                      minHeight: 48,
                      paddingHorizontal: 14,
                      paddingVertical: 10,
                    },
                    emailError && { borderColor: '#EF4444' },
                  ]}
                  value={email}
                  onChangeText={handleEmailChange}
                  placeholder="rajkumar@gmail.com"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {emailError ? (
                  <Text
                    style={{
                      color: '#EF4444',
                      fontSize: 11.5,
                      fontWeight: '500',
                      marginTop: 6,
                    }}>
                    {emailError}
                  </Text>
                ) : null}
              </View>
            ) : null}

            {/* Address Field Editing */}
            {isAddress ? (
              <View style={{ marginTop: 20 }}>
                <Text
                  style={{
                    color: '#687078',
                    fontSize: 11,
                    fontWeight: '700',
                    letterSpacing: 0.4,
                    marginBottom: 6,
                  }}>
                  STREET / AREA / LANDMARK
                </Text>
                <TextInput
                  style={[
                    {
                      backgroundColor: '#FAF9F5',
                      borderColor: '#DDD9CF',
                      borderRadius: 10,
                      borderWidth: 1.2,
                      color: '#17191C',
                      fontSize: 14.5,
                      fontWeight: '600',
                      minHeight: 48,
                      paddingHorizontal: 14,
                      paddingVertical: 10,
                    },
                    addressError && { borderColor: '#EF4444' },
                  ]}
                  value={addressLine1}
                  onChangeText={handleAddressLine1Change}
                  placeholder="e.g. Main Road, Ranchi"
                  placeholderTextColor="#9CA3AF"
                  autoCapitalize="words"
                />

                <Text
                  style={{
                    color: '#687078',
                    fontSize: 11,
                    fontWeight: '700',
                    letterSpacing: 0.4,
                    marginBottom: 6,
                    marginTop: 14,
                  }}>
                  CITY, STATE & PINCODE
                </Text>
                <TextInput
                  style={[
                    {
                      backgroundColor: '#FAF9F5',
                      borderColor: '#DDD9CF',
                      borderRadius: 10,
                      borderWidth: 1.2,
                      color: '#17191C',
                      fontSize: 14.5,
                      fontWeight: '600',
                      minHeight: 48,
                      paddingHorizontal: 14,
                      paddingVertical: 10,
                    },
                    addressError && { borderColor: '#EF4444' },
                  ]}
                  value={addressLine2}
                  onChangeText={handleAddressLine2Change}
                  placeholder="e.g. Jharkhand - 834001"
                  placeholderTextColor="#9CA3AF"
                  autoCapitalize="words"
                />
                {addressError ? (
                  <Text
                    style={{
                      color: '#EF4444',
                      fontSize: 11.5,
                      fontWeight: '500',
                      marginTop: 6,
                    }}>
                    {addressError}
                  </Text>
                ) : null}
              </View>
            ) : null}

            {/* Action Buttons */}
            <View style={{ marginTop: 24 }}>
              <Pressable
                style={({ pressed }) => [
                  {
                    alignItems: 'center',
                    backgroundColor: '#FFC928',
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
                  isSaveDisabled && { opacity: 0.45 },
                  pressed && !isSaveDisabled && { backgroundColor: '#F5BE18' },
                ]}
                onPress={handleSave}
                disabled={isSaveDisabled}
                accessibilityRole="button"
                accessibilityLabel="Save Changes"
              >
                <Text
                  style={{
                    color: '#17191C',
                    fontSize: 14.5,
                    fontWeight: '800',
                    letterSpacing: -0.1,
                  }}>
                  Save Changes
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
                  pressed && { backgroundColor: '#F7F5EF' },
                ]}
                onPress={onClose}
                accessibilityRole="button"
                accessibilityLabel="Cancel"
              >
                <Text
                  style={{
                    color: '#687078',
                    fontSize: 14,
                    fontWeight: '700',
                  }}>
                  Cancel
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export default EditDetailModal;
