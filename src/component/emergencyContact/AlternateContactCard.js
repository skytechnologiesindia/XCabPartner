import React from 'react';
import {
  Alert,
  Pressable,
  Text,
  View,
} from 'react-native';
import styles from '../../assets/styles/styles';
import ContactDetails from './ContactDetails';

/**
 * AlternateContactCard
 * Secondary emergency contact card supporting both states with utility styles:
 * 1. Not Added: Dashed card with "+ Add Emergency Contact" CTA
 * 2. Added: Contact card with "Active" badge, edit and remove actions
 */
function AlternateContactCard({
  contact,
  onAdd,
  onEdit,
  onRemove,
}) {
  const isAdded = Boolean(contact && contact.name);

  const handleConfirmRemove = () => {
    Alert.alert(
      'Remove alternate contact?',
      'This contact will no longer be available for emergency notifications.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove Contact',
          style: 'destructive',
          onPress: () => onRemove && onRemove(),
        },
      ],
    );
  };

  // 1. Not Added State (Matches reference image)
  if (!isAdded) {
    return (
      <View
        style={[
          styles.mb16,
          styles.pdh16,
          styles.pdv16,
          {
            backgroundColor: '#FFFFFF',
            borderColor: '#EFECE6',
            borderRadius: 16,
            borderWidth: 1,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.04,
            shadowRadius: 4,
            elevation: 1.5,
          },
        ]}
      >
        <View
          style={[
            styles.mb16,
            {
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
          ]}
        >
          <Text
            style={[
              styles.ts16,
              {
                color: '#17191C',
                fontWeight: '800',
                letterSpacing: -0.3,
              },
            ]}
          >
            Alternate Contact (Optional)
          </Text>
          <View
            style={[
              styles.pdh12,
              styles.pdv4,
              {
                backgroundColor: '#F1EEE5',
                borderRadius: 12,
              },
            ]}
          >
            <Text
              style={[
                styles.ts12,
                {
                  color: '#687078',
                  fontWeight: '700',
                  letterSpacing: -0.1,
                },
              ]}
            >
              Not Added
            </Text>
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.pdh16,
            styles.pdv16,
            {
              alignItems: 'center',
              borderColor: '#DDD9CF',
              borderRadius: 12,
              borderStyle: 'dashed',
              borderWidth: 1.2,
              flexDirection: 'row',
              backgroundColor: pressed ? '#FAF9F5' : 'transparent',
            },
          ]}
          onPress={onAdd}
          accessibilityRole="button"
          accessibilityLabel="Add alternate emergency contact"
        >
          {/* Circular Cream Plus Icon */}
          <View
            style={[
              styles.mr12,
              {
                alignItems: 'center',
                backgroundColor: '#FFF4C7',
                borderRadius: 22,
                height: 44,
                justifyContent: 'center',
                width: 44,
              },
            ]}
          >
            <Text
              style={[
                styles.ts22,
                {
                  color: '#17191C',
                  fontWeight: '700',
                  marginTop: -2,
                },
              ]}
            >
              +
            </Text>
          </View>

          {/* Explanation Text */}
          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.ts14,
                {
                  color: '#17191C',
                  fontWeight: '800',
                  letterSpacing: -0.2,
                },
              ]}
            >
              Add Emergency Contact
            </Text>
            <Text
              style={[
                styles.ts12,
                styles.mt4,
                {
                  color: '#687078',
                  fontWeight: '400',
                },
              ]}
            >
              Add another contact for extra safety
            </Text>
          </View>

          {/* Right Chevron */}
          <Text
            style={[
              styles.ts22,
              styles.ml8,
              {
                color: '#17191C',
                fontWeight: '600',
              },
            ]}
          >
            ›
          </Text>
        </Pressable>
      </View>
    );
  }

  // 2. Added State
  return (
    <View
      style={[
        styles.mb16,
        styles.pdh16,
        styles.pdv16,
        {
          backgroundColor: '#FFFFFF',
          borderColor: '#EFECE6',
          borderRadius: 16,
          borderWidth: 1,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.04,
          shadowRadius: 4,
          elevation: 1.5,
        },
      ]}
    >
      <View
        style={[
          styles.mb16,
          {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
        ]}
      >
        <Text
          style={[
            styles.ts16,
            {
              color: '#17191C',
              fontWeight: '800',
              letterSpacing: -0.3,
            },
          ]}
        >
          Alternate Emergency Contact
        </Text>
        <View
          style={[
            styles.pdh12,
            styles.pdv4,
            {
              backgroundColor: '#DDF5E9',
              borderRadius: 12,
            },
          ]}
        >
          <Text
            style={[
              styles.ts12,
              {
                color: '#18A66A',
                fontWeight: '700',
                letterSpacing: -0.1,
              },
            ]}
          >
            Active
          </Text>
        </View>
      </View>

      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
        {/* User Avatar Circle */}
        <View
          style={[
            styles.mr16,
            {
              alignItems: 'center',
              backgroundColor: '#F4F2EB',
              borderRadius: 26,
              height: 52,
              justifyContent: 'center',
              width: 52,
            },
          ]}
        >
          <View
            style={[
              styles.mb4,
              {
                borderColor: '#17191C',
                borderRadius: 6,
                borderWidth: 1.8,
                height: 11,
                width: 11,
              },
            ]}
          />
          <View
            style={{
              borderBottomWidth: 0,
              borderTopLeftRadius: 7,
              borderTopRightRadius: 7,
              borderWidth: 1.8,
              borderColor: '#17191C',
              height: 8,
              width: 20,
            }}
          />
        </View>

        {/* Contact Details */}
        <View style={{ flex: 1 }}>
          <ContactDetails contact={contact} />
        </View>
      </View>

      {/* Action Buttons: Edit and Remove */}
      <View
        style={[
          styles.mt16,
          styles.pdt12,
          {
            borderTopColor: '#F1EEE5',
            borderTopWidth: 1,
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'flex-end',
          },
        ]}
      >
        <Pressable
          style={({ pressed }) => [
            styles.pdh16,
            styles.pdv8,
            {
              alignItems: 'center',
              backgroundColor: '#F1EEE5',
              borderRadius: 8,
              justifyContent: 'center',
              opacity: pressed ? 0.7 : 1,
            },
          ]}
          onPress={() => onEdit && onEdit(contact)}
          accessibilityRole="button"
          accessibilityLabel="Edit alternate contact"
        >
          <Text
            style={[
              styles.ts12,
              {
                color: '#17191C',
                fontWeight: '700',
              },
            ]}
          >
            ✎ Edit
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.pdh16,
            styles.pdv8,
            {
              alignItems: 'center',
              backgroundColor: '#FDE6E3',
              borderRadius: 8,
              justifyContent: 'center',
              opacity: pressed ? 0.7 : 1,
            },
          ]}
          onPress={handleConfirmRemove}
          accessibilityRole="button"
          accessibilityLabel="Remove alternate contact"
        >
          <Text
            style={[
              styles.ts12,
              {
                color: '#F26B5B',
                fontWeight: '700',
              },
            ]}
          >
            Remove
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default AlternateContactCard;
