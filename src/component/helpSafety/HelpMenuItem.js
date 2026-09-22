import React from 'react';
import {
  Pressable,
  Text,
  View,
} from 'react-native';
import styles from '../../assets/styles/styles';

/**
 * HelpMenuItem
 * Unified list row component for Get Help, Safety Features, and Guidelines sections with utility styles.
 */
function HelpMenuItem({
  iconType,
  title,
  subtitle,
  onPress,
  isLast = false,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.pdh16,
        styles.pdv12,
        {
          alignItems: 'center',
          flexDirection: 'row',
          borderBottomColor: '#F1EEE5',
          borderBottomWidth: isLast ? 0 : 1,
          backgroundColor: pressed ? '#FAF9F5' : 'transparent',
        },
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${subtitle || ''}`}
    >
      {/* 1. Category Icon in Circular Ivory Container */}
      <View
        style={[
          styles.mr16,
          {
            alignItems: 'center',
            backgroundColor: '#F4F2EB',
            borderRadius: 22,
            height: 44,
            justifyContent: 'center',
            width: 44,
          },
        ]}
      >
        <ItemIcon type={iconType} />
      </View>

      {/* 2. Text Column */}
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
          numberOfLines={1}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            style={[
              styles.ts12,
              styles.mt4,
              {
                color: '#687078',
                fontWeight: '400',
              },
            ]}
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>

      {/* 3. Right Chevron */}
      <Text
        style={[
          styles.ts20,
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
  );
}

/**
 * Clean vector outline icons matching the visual reference
 */
function ItemIcon({ type }) {
  const iconColor = '#17191C';

  switch (type) {
    case 'chat':
      return (
        <View
          style={{
            alignItems: 'center',
            borderColor: iconColor,
            borderRadius: 8,
            borderWidth: 1.6,
            flexDirection: 'row',
            gap: 2,
            height: 16,
            justifyContent: 'center',
            width: 20,
          }}
        >
          <View style={{ backgroundColor: iconColor, borderRadius: 1, height: 2, width: 2 }} />
          <View style={{ backgroundColor: iconColor, borderRadius: 1, height: 2, width: 2 }} />
          <View style={{ backgroundColor: iconColor, borderRadius: 1, height: 2, width: 2 }} />
        </View>
      );

    case 'faq':
    case 'document':
      return (
        <View
          style={{
            borderColor: iconColor,
            borderRadius: 2,
            borderWidth: 1.6,
            height: 18,
            justifyContent: 'center',
            paddingHorizontal: 2.5,
            width: 15,
          }}
        >
          <View
            style={{
              backgroundColor: iconColor,
              borderRadius: 0.5,
              height: 1.5,
              marginBottom: 2,
              width: '100%',
            }}
          />
          <View
            style={{
              backgroundColor: iconColor,
              borderRadius: 0.5,
              height: 1.5,
              marginBottom: 2,
              width: '75%',
            }}
          />
          <View
            style={{
              backgroundColor: iconColor,
              borderRadius: 0.5,
              height: 1.5,
              width: '50%',
            }}
          />
        </View>
      );

    case 'mail':
      return (
        <View
          style={{
            borderColor: iconColor,
            borderRadius: 2.5,
            borderWidth: 1.6,
            height: 15,
            justifyContent: 'flex-start',
            overflow: 'hidden',
            width: 19,
          }}
        >
          <View
            style={{
              borderBottomWidth: 1.6,
              borderColor: iconColor,
              borderRightWidth: 1.6,
              height: 10,
              marginHorizontal: 'auto',
              marginTop: -5.5,
              transform: [{ rotate: '45deg' }],
              width: 10,
            }}
          />
        </View>
      );

    case 'shield':
      return (
        <View
          style={{
            alignItems: 'center',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            borderColor: iconColor,
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
            borderWidth: 1.6,
            height: 17,
            justifyContent: 'center',
            width: 16,
          }}
        >
          <Text
            style={[
              styles.ts10,
              {
                color: iconColor,
                fontWeight: '900',
                marginTop: -1,
              },
            ]}
          >
            ✓
          </Text>
        </View>
      );

    case 'location':
      return (
        <View
          style={{
            alignItems: 'center',
            height: 18,
            justifyContent: 'center',
            width: 16,
          }}
        >
          <View
            style={{
              alignItems: 'center',
              borderColor: iconColor,
              borderRadius: 6.5,
              borderWidth: 1.6,
              height: 13,
              justifyContent: 'center',
              width: 13,
            }}
          >
            <View
              style={{
                backgroundColor: iconColor,
                borderRadius: 1.5,
                height: 3,
                width: 3,
              }}
            />
          </View>
          <View
            style={{
              borderLeftColor: 'transparent',
              borderLeftWidth: 3,
              borderRightColor: 'transparent',
              borderRightWidth: 3,
              borderTopColor: iconColor,
              borderTopWidth: 4,
              height: 0,
              marginTop: -1.5,
              width: 0,
            }}
          />
        </View>
      );

    case 'phoneShield':
      return (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={[
              styles.ts15,
              {
                color: iconColor,
                transform: [{ rotate: '15deg' }],
              },
            ]}
          >
            📞
          </Text>
        </View>
      );

    case 'book':
      return (
        <View
          style={{
            flexDirection: 'row',
            height: 16,
            width: 20,
          }}
        >
          <View
            style={{
              borderBottomLeftRadius: 3,
              borderColor: iconColor,
              borderRightWidth: 0.8,
              borderTopLeftRadius: 3,
              borderWidth: 1.6,
              flex: 1,
              height: '100%',
            }}
          />
          <View
            style={{
              borderBottomRightRadius: 3,
              borderColor: iconColor,
              borderLeftWidth: 0.8,
              borderTopRightRadius: 3,
              borderWidth: 1.6,
              flex: 1,
              height: '100%',
            }}
          />
        </View>
      );

    default:
      return (
        <Text
          style={[
            styles.ts16,
            {
              color: '#17191C',
            },
          ]}
        >
          •
        </Text>
      );
  }
}

export default HelpMenuItem;
