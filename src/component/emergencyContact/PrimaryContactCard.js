import React from 'react';
import {
  Pressable,
  Text,
  View,
} from 'react-native';
import styles from '../../assets/styles/styles';
import ContactDetails from './ContactDetails';

/**
 * PrimaryContactCard
 * Primary emergency contact card matching the visual reference with utility styles:
 * - Card header with "Primary Emergency Contact" title and "Active" green badge
 * - Circular user avatar
 * - ContactDetails (Suresh Kumar, Brother, Phone, Location)
 * - Vertical divider with edit pencil and right chevron action
 */
function PrimaryContactCard({ contact, onEdit }) {
  if (!contact) return null;

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
      {/* 1. Card Header: Title & Active Badge */}
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
          Primary Emergency Contact
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

      {/* 2. Main Content Row: Avatar + Details + Edit Action */}
      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
        {/* User Outline Avatar Circle */}
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

        {/* Contact Information Details */}
        <View style={{ flex: 1 }}>
          <ContactDetails contact={contact} />
        </View>

        {/* Vertical Divider */}
        <View
          style={[
            styles.mh12,
            {
              backgroundColor: '#F1EEE5',
              height: 50,
              width: 1,
            },
          ]}
        />

        {/* Edit Action Target */}
        <Pressable
          style={({ pressed }) => [
            styles.pdh8,
            styles.pdv8,
            {
              alignItems: 'center',
              flexDirection: 'row',
              gap: 4,
              justifyContent: 'center',
              opacity: pressed ? 0.6 : 1,
            },
          ]}
          onPress={() => onEdit && onEdit(contact)}
          accessibilityRole="button"
          accessibilityLabel={`Edit ${contact.name}'s emergency contact details`}
          hitSlop={8}
        >
          <Text
            style={[
              styles.ts15,
              {
                color: '#17191C',
                fontWeight: '700',
              },
            ]}
          >
            ✎
          </Text>
          <Text
            style={[
              styles.ts20,
              {
                color: '#17191C',
                fontWeight: '600',
                lineHeight: 22,
                marginTop: -2,
              },
            ]}
          >
            ›
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default PrimaryContactCard;
