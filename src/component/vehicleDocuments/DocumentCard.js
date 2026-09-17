import React from 'react';
import {
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';
import { icons } from '../../assets/icons';
import DocumentStatus from './DocumentStatus';

/**
 * DocumentCard
 * Reusable row card for each vehicle/driver document record.
 */
function DocumentCard({ document, onPress }) {
  if (!document) return null;

  const isExpired = document.status === 'expired';

  return (
    <Pressable
      style={({ pressed }) => [
        {
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderColor: '#EFECE6',
          borderRadius: 16,
          borderWidth: 1,
          flexDirection: 'row',
          marginBottom: 10,
          paddingHorizontal: 14,
          paddingVertical: 13,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.03,
          shadowRadius: 4,
          elevation: 1,
        },
        pressed && {
          backgroundColor: '#FAF9F5',
          transform: [{ scale: 0.995 }],
        },
      ]}
      onPress={() => onPress && onPress(document)}
      accessibilityRole="button"
      accessibilityLabel={`${document.title}, ${document.validity}, Status: ${document.status}`}
    >
      {/* 1. Left Accent Circle with Category Icon */}
      <View
        style={[
          {
            alignItems: 'center',
            borderRadius: 20,
            height: 40,
            justifyContent: 'center',
            width: 40,
          },
          isExpired ? { backgroundColor: '#FDE6E3' } : { backgroundColor: '#E6F8EF' },
        ]}
      >
        <DocIcon type={document.iconType} isExpired={isExpired} />
      </View>

      {/* 2. Middle Content Column */}
      <View
        style={{
          flex: 1,
          marginLeft: 12,
          marginRight: 8,
        }}
      >
        <Text
          style={{
            color: '#17191C',
            fontSize: 14.5,
            fontWeight: '700',
            letterSpacing: -0.2,
          }}
          numberOfLines={1}
        >
          {document.title}
        </Text>
        <Text
          style={[
            {
              color: '#687078',
              fontSize: 12.5,
              fontWeight: '400',
              marginTop: 2.5,
            },
            isExpired && {
              color: '#F26B5B',
              fontWeight: '600',
            },
          ]}
          numberOfLines={1}
        >
          {document.validity}
        </Text>
      </View>

      {/* 3. Right Status Badge & Chevron */}
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          gap: 8,
        }}
      >
        <DocumentStatus status={document.status} />
        <Text
          style={{
            color: '#17191C',
            fontSize: 18,
            fontWeight: '600',
            marginLeft: 2,
          }}
        >
          ›
        </Text>
      </View>
    </Pressable>
  );
}

/**
 * Clean category vector icons
 */
function DocIcon({ type, isExpired }) {
  const iconColor = isExpired ? '#F26B5B' : '#18A66A';

  switch (type) {
    case 'shield':
      return (
        <Image
          source={icons.shield}
          style={{
            height: 19,
            width: 19,
          }}
          tintColor={iconColor}
          resizeMode="contain"
        />
      );

    case 'leaf':
      return (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 16, color: iconColor }}>🍃</Text>
        </View>
      );

    case 'license':
      return (
        <View
          style={{
            borderRadius: 3,
            borderWidth: 1.6,
            borderColor: iconColor,
            flexDirection: 'row',
            height: 15,
            padding: 2,
            width: 20,
          }}
        >
          <View
            style={{
              borderRadius: 1,
              borderWidth: 1.2,
              borderColor: iconColor,
              height: 8,
              width: 5,
            }}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              marginLeft: 2.5,
            }}
          >
            <View
              style={{
                borderRadius: 0.5,
                height: 1.5,
                marginBottom: 1.5,
                width: 7,
                backgroundColor: iconColor,
              }}
            />
            <View
              style={{
                borderRadius: 0.5,
                height: 1.5,
                marginBottom: 1.5,
                width: 8,
                backgroundColor: iconColor,
              }}
            />
          </View>
        </View>
      );

    case 'document':
      return (
        <View
          style={{
            borderRadius: 2.5,
            borderWidth: 1.6,
            borderColor: iconColor,
            height: 18,
            justifyContent: 'center',
            paddingHorizontal: 2.5,
            width: 15,
          }}
        >
          <View
            style={{
              borderRadius: 0.5,
              height: 1.4,
              marginBottom: 2,
              width: 8,
              backgroundColor: iconColor,
            }}
          />
          <View
            style={{
              borderRadius: 0.5,
              height: 1.4,
              marginBottom: 2,
              width: 9,
              backgroundColor: iconColor,
            }}
          />
          <View
            style={{
              borderRadius: 0.5,
              height: 1.4,
              marginBottom: 2,
              width: 6,
              backgroundColor: iconColor,
            }}
          />
        </View>
      );

    case 'permit':
    case 'car':
    default:
      return (
        <Image
          source={icons.rides}
          style={{
            height: 19,
            width: 19,
          }}
          tintColor={iconColor}
          resizeMode="contain"
        />
      );
  }
}

export default DocumentCard;
