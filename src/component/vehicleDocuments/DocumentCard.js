import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
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
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={() => onPress && onPress(document)}
      accessibilityRole="button"
      accessibilityLabel={`${document.title}, ${document.validity}, Status: ${document.status}`}
    >
      {/* 1. Left Accent Circle with Category Icon */}
      <View
        style={[
          styles.iconCircle,
          isExpired ? styles.iconCircleExpired : styles.iconCircleValid,
        ]}
      >
        <DocIcon type={document.iconType} isExpired={isExpired} />
      </View>

      {/* 2. Middle Content Column */}
      <View style={styles.contentCol}>
        <Text style={styles.titleText} numberOfLines={1}>
          {document.title}
        </Text>
        <Text
          style={[
            styles.validityText,
            isExpired && styles.validityTextExpired,
          ]}
          numberOfLines={1}
        >
          {document.validity}
        </Text>
      </View>

      {/* 3. Right Status Badge & Chevron */}
      <View style={styles.rightCol}>
        <DocumentStatus status={document.status} />
        <Text style={styles.chevronIcon}>›</Text>
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
          style={styles.imgIcon}
          tintColor={iconColor}
          resizeMode="contain"
        />
      );

    case 'leaf':
      return (
        <View style={styles.leafWrapper}>
          <Text style={[styles.leafSymbol, { color: iconColor }]}>🍃</Text>
        </View>
      );

    case 'license':
      return (
        <View style={[styles.licenseOutline, { borderColor: iconColor }]}>
          <View style={[styles.licensePhoto, { borderColor: iconColor }]} />
          <View style={styles.licenseLines}>
            <View style={[styles.licenseLine, { backgroundColor: iconColor }]} />
            <View
              style={[
                styles.licenseLine,
                styles.licenseLineShort,
                { backgroundColor: iconColor },
              ]}
            />
          </View>
        </View>
      );

    case 'document':
      return (
        <View style={[styles.docOutline, { borderColor: iconColor }]}>
          <View style={[styles.docLine, { backgroundColor: iconColor }]} />
          <View
            style={[
              styles.docLine,
              styles.docLineMed,
              { backgroundColor: iconColor },
            ]}
          />
          <View
            style={[
              styles.docLine,
              styles.docLineShort,
              { backgroundColor: iconColor },
            ]}
          />
        </View>
      );

    case 'permit':
    case 'car':
    default:
      return (
        <Image
          source={icons.rides}
          style={styles.imgIcon}
          tintColor={iconColor}
          resizeMode="contain"
        />
      );
  }
}

const styles = StyleSheet.create({
  card: {
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
  cardPressed: {
    backgroundColor: '#FAF9F5',
    transform: [{ scale: 0.995 }],
  },
  iconCircle: {
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  iconCircleValid: {
    backgroundColor: '#E6F8EF',
  },
  iconCircleExpired: {
    backgroundColor: '#FDE6E3',
  },
  imgIcon: {
    height: 19,
    width: 19,
  },
  contentCol: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  titleText: {
    color: '#17191C',
    fontSize: 14.5,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  validityText: {
    color: '#687078',
    fontSize: 12.5,
    fontWeight: '400',
    marginTop: 2.5,
  },
  validityTextExpired: {
    color: '#F26B5B',
    fontWeight: '600',
  },
  rightCol: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  chevronIcon: {
    color: '#17191C',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 2,
  },
  // Vector icons
  leafWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  leafSymbol: {
    fontSize: 16,
  },
  licenseOutline: {
    borderRadius: 3,
    borderWidth: 1.6,
    flexDirection: 'row',
    height: 15,
    padding: 2,
    width: 20,
  },
  licensePhoto: {
    borderRadius: 1,
    borderWidth: 1.2,
    height: 8,
    width: 5,
  },
  licenseLines: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 2.5,
  },
  licenseLine: {
    borderRadius: 0.5,
    height: 1.5,
    marginBottom: 1.5,
    width: 7,
  },
  docOutline: {
    borderRadius: 2.5,
    borderWidth: 1.6,
    height: 18,
    justifyContent: 'center',
    paddingHorizontal: 2.5,
    width: 15,
  },
  docLine: {
    borderRadius: 0.5,
    height: 1.4,
    marginBottom: 2,
    width: 8,
  },
  licenseLineShort: {
    width: 8,
  },
  docLineMed: {
    width: 9,
  },
  docLineShort: {
    width: 6,
  },
});

export default DocumentCard;
