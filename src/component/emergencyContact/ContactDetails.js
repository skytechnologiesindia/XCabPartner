import React from 'react';
import { Text, View } from 'react-native';
import styles from '../../assets/styles/styles';

/**
 * ContactDetails
 * Presentational component rendering the emergency contact's identity:
 * - Name
 * - Relationship
 * - Phone with icon
 * - Location with icon
 * using utility and inline styles.
 */
function ContactDetails({ contact }) {
  if (!contact) return null;

  const { name, relationship, phone, location } = contact;

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      {/* 1. Name & Relationship */}
      <Text
        style={[
          styles.ts16,
          {
            color: '#17191C',
            fontWeight: '800',
            letterSpacing: -0.3,
          },
        ]}
        numberOfLines={1}
      >
        {name}
      </Text>
      {relationship ? (
        <Text
          style={[
            styles.ts13,
            styles.mt4,
            {
              color: '#687078',
              fontWeight: '400',
            },
          ]}
          numberOfLines={1}
        >
          {relationship}
        </Text>
      ) : null}

      {/* 2. Phone Row */}
      {phone ? (
        <View
          style={[
            styles.mt8,
            {
              alignItems: 'center',
              flexDirection: 'row',
            },
          ]}
        >
          <View
            style={[
              styles.mr8,
              {
                alignItems: 'center',
                height: 18,
                justifyContent: 'center',
                width: 16,
              },
            ]}
          >
            <Text
              style={[
                styles.ts12,
                {
                  color: '#17191C',
                  transform: [{ rotate: '15deg' }],
                },
              ]}
            >
              📞
            </Text>
          </View>
          <Text
            style={[
              styles.ts13,
              {
                color: '#17191C',
                fontWeight: '600',
                letterSpacing: -0.15,
              },
            ]}
            numberOfLines={1}
          >
            {phone}
          </Text>
        </View>
      ) : null}

      {/* 3. Location Row */}
      {location ? (
        <View
          style={[
            styles.mt8,
            {
              alignItems: 'center',
              flexDirection: 'row',
            },
          ]}
        >
          <View
            style={[
              styles.mr8,
              {
                alignItems: 'center',
                height: 16,
                justifyContent: 'center',
                width: 14,
              },
            ]}
          >
            <View
              style={{
                alignItems: 'center',
                borderColor: '#17191C',
                borderRadius: 5.5,
                borderWidth: 1.4,
                height: 11,
                justifyContent: 'center',
                width: 11,
              }}
            >
              <View
                style={{
                  backgroundColor: '#17191C',
                  borderRadius: 1.5,
                  height: 3,
                  width: 3,
                }}
              />
            </View>
            <View
              style={{
                borderLeftColor: 'transparent',
                borderLeftWidth: 2.5,
                borderRightColor: 'transparent',
                borderRightWidth: 2.5,
                borderTopColor: '#17191C',
                borderTopWidth: 3.5,
                height: 0,
                marginTop: -1,
                width: 0,
              }}
            />
          </View>
          <Text
            style={[
              styles.ts13,
              {
                color: '#17191C',
                fontWeight: '600',
                letterSpacing: -0.15,
              },
            ]}
            numberOfLines={1}
          >
            {location}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

export default ContactDetails;
