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
import styles from '../../assets/styles/styles';

const RELATIONSHIP_OPTIONS = [
  'Brother',
  'Sister',
  'Spouse',
  'Father',
  'Mother',
  'Friend',
];

/**
 * EditEmergencyContactModal
 * Reusable bottom-sheet modal for both Adding and Editing emergency contacts with utility styles.
 * Validates Name, Relationship, and Indian Mobile format.
 */
function EditEmergencyContactModal({
  visible,
  mode = 'edit',
  contact,
  onSave,
  onClose,
}) {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');

  // Validation errors
  const [nameError, setNameError] = useState('');
  const [relationshipError, setRelationshipError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Populate or reset form whenever modal opens or contact changes
  useEffect(() => {
    if (contact) {
      setName(contact.name || '');
      setRelationship(contact.relationship || '');
      setPhone(contact.phone || '');
      setLocation(contact.location || '');
    } else {
      setName('');
      setRelationship('');
      setPhone('');
      setLocation('');
    }
    setNameError('');
    setRelationshipError('');
    setPhoneError('');
  }, [contact, visible, mode]);

  // Validators
  const validateName = text => {
    if (!text || text.trim().length < 2) {
      return 'Please enter a valid full name.';
    }
    return '';
  };

  const validateRelationship = text => {
    if (!text || text.trim().length < 2) {
      return 'Please specify the relationship.';
    }
    return '';
  };

  const validatePhone = text => {
    if (!text || text.trim() === '') {
      return 'Mobile number is required.';
    }
    // Clean spaces and dashes
    const digitsOnly = text.replace(/[\s-+]/g, '');
    if (digitsOnly.length < 10) {
      return 'Please enter a valid 10-digit mobile number.';
    }
    // Validate Indian mobile starting with 6-9
    const mobilePattern = /^(?:91)?[6-9]\d{9}$/;
    if (!mobilePattern.test(digitsOnly)) {
      return 'Enter a valid Indian mobile number starting with 6, 7, 8, or 9.';
    }
    return '';
  };

  const handleNameChange = text => {
    setName(text);
    if (nameError) {
      setNameError(validateName(text));
    }
  };

  const handleRelationshipChange = text => {
    setRelationship(text);
    if (relationshipError) {
      setRelationshipError(validateRelationship(text));
    }
  };

  const handlePhoneChange = text => {
    setPhone(text);
    if (phoneError) {
      setPhoneError(validatePhone(text));
    }
  };

  const handleSelectRelationship = option => {
    setRelationship(option);
    setRelationshipError('');
  };

  const handleSave = () => {
    const nErr = validateName(name);
    const rErr = validateRelationship(relationship);
    const pErr = validatePhone(phone);

    if (nErr || rErr || pErr) {
      setNameError(nErr);
      setRelationshipError(rErr);
      setPhoneError(pErr);
      return;
    }

    // Format phone nicely if raw 10 digits
    let formattedPhone = phone.trim();
    const digitsOnly = formattedPhone.replace(/[\s-+]/g, '');
    if (digitsOnly.length === 10 && !formattedPhone.startsWith('+91')) {
      formattedPhone = `+91 ${digitsOnly.slice(0, 5)} ${digitsOnly.slice(5)}`;
    }

    const updatedContact = {
      ...(contact || {}),
      id: contact?.id || (mode === 'add' ? 'alternate' : 'primary'),
      name: name.trim(),
      relationship: relationship.trim(),
      phone: formattedPhone,
      location: location.trim() || 'Ranchi, Jharkhand',
      status: 'active',
    };

    onSave && onSave(updatedContact);
    onClose && onClose();
  };

  const isAddMode = mode === 'add';
  const isSaveDisabled =
    !name.trim() || !relationship.trim() || !phone.trim();

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
        }}
      >
        {/* Backdrop tap to dismiss */}
        <Pressable style={{ flex: 1 }} onPress={onClose} />

        {/* Bottom Sheet Modal */}
        <View
          style={[
            styles.pdh20,
            styles.pdt12,
            {
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              maxHeight: '90%',
              paddingBottom: Platform.OS === 'ios' ? 34 : 24,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -3 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 8,
            },
          ]}
        >
          {/* Top Handle Bar */}
          <View
            style={[
              styles.mb16,
              {
                alignSelf: 'center',
                backgroundColor: '#DDD9CF',
                borderRadius: 2.5,
                height: 4,
                width: 38,
              },
            ]}
          />

          <ScrollView
            bounces={false}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Title & Subtitle */}
            <Text
              style={[
                styles.ts20,
                {
                  color: '#17191C',
                  fontWeight: '800',
                  letterSpacing: -0.4,
                },
              ]}
            >
              {isAddMode ? 'Add Emergency Contact' : 'Edit Emergency Contact'}
            </Text>
            <Text
              style={[
                styles.ts13,
                styles.mt4,
                {
                  color: '#687078',
                  fontWeight: '400',
                  lineHeight: 18,
                },
              ]}
            >
              {isAddMode
                ? 'Add an alternate contact to be reached during emergencies.'
                : 'Update contact details for emergency notifications.'}
            </Text>

            {/* 1. Name Input */}
            <View style={styles.mt16}>
              <Text
                style={[
                  styles.ts11,
                  styles.mb8,
                  {
                    color: '#687078',
                    fontWeight: '700',
                    letterSpacing: 0.4,
                  },
                ]}
              >
                FULL NAME *
              </Text>
              <TextInput
                style={[
                  styles.pdh16,
                  styles.pdv12,
                  styles.ts14,
                  {
                    backgroundColor: '#FAF9F5',
                    borderColor: nameError ? '#EF4444' : '#DDD9CF',
                    borderRadius: 10,
                    borderWidth: 1.2,
                    color: '#17191C',
                    fontWeight: '600',
                    minHeight: 46,
                  },
                ]}
                value={name}
                onChangeText={handleNameChange}
                placeholder="e.g. Suresh Kumar"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="words"
              />
              {nameError ? (
                <Text
                  style={[
                    styles.ts11,
                    styles.mt4,
                    {
                      color: '#EF4444',
                      fontWeight: '500',
                    },
                  ]}
                >
                  {nameError}
                </Text>
              ) : null}
            </View>

            {/* 2. Relationship Input & Quick Chips */}
            <View style={styles.mt16}>
              <Text
                style={[
                  styles.ts11,
                  styles.mb8,
                  {
                    color: '#687078',
                    fontWeight: '700',
                    letterSpacing: 0.4,
                  },
                ]}
              >
                RELATIONSHIP *
              </Text>
              <TextInput
                style={[
                  styles.pdh16,
                  styles.pdv12,
                  styles.ts14,
                  {
                    backgroundColor: '#FAF9F5',
                    borderColor: relationshipError ? '#EF4444' : '#DDD9CF',
                    borderRadius: 10,
                    borderWidth: 1.2,
                    color: '#17191C',
                    fontWeight: '600',
                    minHeight: 46,
                  },
                ]}
                value={relationship}
                onChangeText={handleRelationshipChange}
                placeholder="e.g. Brother, Spouse, Friend"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="words"
              />
              {relationshipError ? (
                <Text
                  style={[
                    styles.ts11,
                    styles.mt4,
                    {
                      color: '#EF4444',
                      fontWeight: '500',
                    },
                  ]}
                >
                  {relationshipError}
                </Text>
              ) : null}

              {/* Quick Select Relationship Chips */}
              <View
                style={[
                  styles.mt8,
                  {
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 6,
                  },
                ]}
              >
                {RELATIONSHIP_OPTIONS.map(opt => {
                  const isSelected =
                    relationship.toLowerCase() === opt.toLowerCase();
                  return (
                    <Pressable
                      key={opt}
                      style={[
                        styles.pdh12,
                        styles.pdv4,
                        {
                          backgroundColor: isSelected ? '#FFC928' : '#F1EEE5',
                          borderRadius: 14,
                        },
                      ]}
                      onPress={() => handleSelectRelationship(opt)}
                    >
                      <Text
                        style={[
                          styles.ts11,
                          {
                            color: '#17191C',
                            fontWeight: isSelected ? '800' : '600',
                          },
                        ]}
                      >
                        {opt}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* 3. Mobile Number Input */}
            <View style={styles.mt16}>
              <Text
                style={[
                  styles.ts11,
                  styles.mb8,
                  {
                    color: '#687078',
                    fontWeight: '700',
                    letterSpacing: 0.4,
                  },
                ]}
              >
                MOBILE NUMBER *
              </Text>
              <TextInput
                style={[
                  styles.pdh16,
                  styles.pdv12,
                  styles.ts14,
                  {
                    backgroundColor: '#FAF9F5',
                    borderColor: phoneError ? '#EF4444' : '#DDD9CF',
                    borderRadius: 10,
                    borderWidth: 1.2,
                    color: '#17191C',
                    fontWeight: '600',
                    minHeight: 46,
                  },
                ]}
                value={phone}
                onChangeText={handlePhoneChange}
                placeholder="+91 98765 43210"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
              />
              {phoneError ? (
                <Text
                  style={[
                    styles.ts11,
                    styles.mt4,
                    {
                      color: '#EF4444',
                      fontWeight: '500',
                    },
                  ]}
                >
                  {phoneError}
                </Text>
              ) : null}
            </View>

            {/* 4. Location Input (Optional) */}
            <View style={styles.mt16}>
              <Text
                style={[
                  styles.ts11,
                  styles.mb8,
                  {
                    color: '#687078',
                    fontWeight: '700',
                    letterSpacing: 0.4,
                  },
                ]}
              >
                CITY / LOCATION (OPTIONAL)
              </Text>
              <TextInput
                style={[
                  styles.pdh16,
                  styles.pdv12,
                  styles.ts14,
                  {
                    backgroundColor: '#FAF9F5',
                    borderColor: '#DDD9CF',
                    borderRadius: 10,
                    borderWidth: 1.2,
                    color: '#17191C',
                    fontWeight: '600',
                    minHeight: 46,
                  },
                ]}
                value={location}
                onChangeText={setLocation}
                placeholder="e.g. Ranchi, Jharkhand"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="words"
              />
            </View>

            {/* Action Buttons */}
            <View style={styles.mt24}>
              <Pressable
                style={({ pressed }) => [
                  styles.mb12,
                  {
                    alignItems: 'center',
                    backgroundColor: pressed && !isSaveDisabled ? '#F5BE18' : '#FFC928',
                    borderRadius: 10,
                    height: 48,
                    justifyContent: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.08,
                    shadowRadius: 2,
                    elevation: 2,
                    opacity: isSaveDisabled ? 0.45 : 1,
                  },
                ]}
                onPress={handleSave}
                disabled={isSaveDisabled}
                accessibilityRole="button"
                accessibilityLabel={isAddMode ? 'Add Contact' : 'Save Changes'}
              >
                <Text
                  style={[
                    styles.ts14,
                    {
                      color: '#17191C',
                      fontWeight: '800',
                      letterSpacing: -0.1,
                    },
                  ]}
                >
                  {isAddMode ? 'Add Contact' : 'Save Changes'}
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
                    backgroundColor: pressed ? '#F7F5EF' : 'transparent',
                  },
                ]}
                onPress={onClose}
                accessibilityRole="button"
                accessibilityLabel="Cancel"
              >
                <Text
                  style={[
                    styles.ts14,
                    {
                      color: '#687078',
                      fontWeight: '700',
                    },
                  ]}
                >
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

export default EditEmergencyContactModal;
