import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

/**
 * FullNameField
 * Rounded input card with user outline icon for capturing driver's full legal name.
 */
function FullNameField({
  value = '',
  onChangeName,
  errorMessage,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Full Name</Text>

      <View style={[styles.inputCard, !!errorMessage && styles.inputCardError]}>
        {/* User Outline Icon */}
        <View style={styles.iconWrapper}>
          <Text style={styles.userIcon}>👤</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Mohammed Shamir"
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeName}
          autoCapitalize="words"
          accessibilityRole="text"
          accessibilityLabel="Full Name"
        />
      </View>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    color: '#687078',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  inputCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#DDD9CF',
    borderRadius: 14,
    borderWidth: 1.5,
    flexDirection: 'row',
    height: 52,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  inputCardError: {
    borderColor: '#EF4444',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    width: 22,
  },
  userIcon: {
    color: '#687078',
    fontSize: 16,
  },
  input: {
    color: '#17191C',
    flex: 1,
    fontSize: 15.5,
    fontWeight: '600',
    height: '100%',
    letterSpacing: -0.1,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 11.5,
    fontWeight: '500',
    marginTop: 4,
    paddingHorizontal: 4,
  },
});

export default FullNameField;
