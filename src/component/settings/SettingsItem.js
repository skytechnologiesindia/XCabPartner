import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

/**
 * SettingsItem
 * Reusable row component for all Settings sections.
 * Supports standard navigation rows, right-side display values, and destructive actions.
 */
function SettingsItem({
  iconType,
  title,
  subtitle,
  value,
  isDestructive = false,
  isLast = false,
  onPress,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.row,
        !isLast && styles.divider,
        pressed && styles.rowPressed,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${subtitle || ''}${value ? ', ' + value : ''}`}
    >
      {/* 1. Category Icon in Circular Container */}
      <View
        style={[
          styles.iconCircle,
          isDestructive && styles.destructiveIconCircle,
        ]}
      >
        <SettingIcon type={iconType} isDestructive={isDestructive} />
      </View>

      {/* 2. Text Column */}
      <View style={styles.textColumn}>
        <Text
          style={[styles.titleText, isDestructive && styles.destructiveTitleText]}
          numberOfLines={1}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.subtitleText} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      {/* 3. Right Value & Chevron */}
      <View style={styles.rightColumn}>
        {value ? <Text style={styles.valueText}>{value}</Text> : null}
        <Text style={styles.chevronIcon}>›</Text>
      </View>
    </Pressable>
  );
}

/**
 * Vector icons matching the reference visual style
 */
function SettingIcon({ type, isDestructive }) {
  const iconColor = isDestructive ? '#E11D48' : '#17191C';

  switch (type) {
    case 'bell':
      return (
        <View style={styles.bellWrapper}>
          <View style={[styles.bellBody, { borderColor: iconColor }]}>
            <View style={[styles.bellTopDot, { backgroundColor: iconColor }]} />
          </View>
          <View style={[styles.bellRinger, { backgroundColor: iconColor }]} />
        </View>
      );

    case 'location':
      return (
        <View style={styles.locationWrapper}>
          <Text style={[styles.locationSymbol, { color: iconColor }]}>✈</Text>
        </View>
      );

    case 'moon':
      return (
        <View style={styles.moonWrapper}>
          <Text style={[styles.moonSymbol, { color: iconColor }]}>☽</Text>
        </View>
      );

    case 'globe':
      return (
        <View style={[styles.globeCircle, { borderColor: iconColor }]}>
          <View style={[styles.globeHoriz, { borderColor: iconColor }]} />
          <View style={[styles.globeVert, { borderColor: iconColor }]} />
        </View>
      );

    case 'download':
      return (
        <View style={styles.downloadWrapper}>
          <Text style={[styles.downloadArrow, { color: iconColor }]}>↓</Text>
          <View style={[styles.downloadTray, { borderColor: iconColor }]} />
        </View>
      );

    case 'database':
      return (
        <View style={styles.dbWrapper}>
          <View style={[styles.dbDisk, { borderColor: iconColor }]} />
          <View
            style={[
              styles.dbDisk,
              styles.dbDiskLower,
              { borderColor: iconColor },
            ]}
          />
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

    case 'info':
      return (
        <View style={[styles.infoCircle, { borderColor: iconColor }]}>
          <Text style={[styles.infoSymbol, { color: iconColor }]}>i</Text>
        </View>
      );

    case 'trash':
      return (
        <View style={styles.trashWrapper}>
          <View style={[styles.trashLid, { backgroundColor: iconColor }]} />
          <View style={[styles.trashCan, { borderColor: iconColor }]}>
            <View style={[styles.trashLine, { backgroundColor: iconColor }]} />
            <View style={[styles.trashLine, { backgroundColor: iconColor }]} />
          </View>
        </View>
      );

    default:
      return <Text style={styles.defaultBullet}>•</Text>;
  }
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  rowPressed: {
    backgroundColor: '#FAF9F5',
  },
  divider: {
    borderBottomColor: '#F1EEE5',
    borderBottomWidth: 1,
  },
  iconCircle: {
    alignItems: 'center',
    backgroundColor: '#F4F2EB',
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    marginRight: 14,
    width: 44,
  },
  destructiveIconCircle: {
    backgroundColor: '#FDECEB',
  },
  textColumn: {
    flex: 1,
  },
  titleText: {
    color: '#17191C',
    fontSize: 14.5,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  destructiveTitleText: {
    color: '#E11D48',
  },
  subtitleText: {
    color: '#687078',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 2.5,
  },
  rightColumn: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginLeft: 10,
  },
  valueText: {
    color: '#687078',
    fontSize: 13.5,
    fontWeight: '500',
  },
  chevronIcon: {
    color: '#17191C',
    fontSize: 20,
    fontWeight: '600',
    marginTop: -1,
  },

  // Icon geometry
  bellWrapper: {
    alignItems: 'center',
    height: 18,
    justifyContent: 'center',
    width: 18,
  },
  bellBody: {
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 1.6,
    height: 14,
    position: 'relative',
    width: 14,
  },
  bellTopDot: {
    borderRadius: 1,
    height: 2,
    left: 4.5,
    position: 'absolute',
    top: -3,
    width: 2,
  },
  bellRinger: {
    borderRadius: 1,
    height: 2,
    marginTop: 1,
    width: 4,
  },
  locationWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationSymbol: {
    fontSize: 18,
    transform: [{ rotate: '-45deg' }],
  },
  moonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  moonSymbol: {
    fontSize: 20,
    lineHeight: 22,
    transform: [{ rotate: '-20deg' }],
  },
  globeCircle: {
    alignItems: 'center',
    borderRadius: 9,
    borderWidth: 1.6,
    height: 18,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    width: 18,
  },
  globeHoriz: {
    borderTopWidth: 1.2,
    height: 0,
    position: 'absolute',
    width: '100%',
  },
  globeVert: {
    borderRadius: 5,
    borderWidth: 1.2,
    height: '100%',
    width: 9,
  },
  downloadWrapper: {
    alignItems: 'center',
    height: 18,
    justifyContent: 'center',
    width: 18,
  },
  downloadArrow: {
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 14,
    marginTop: -2,
  },
  downloadTray: {
    borderBottomWidth: 1.6,
    borderLeftWidth: 1.6,
    borderRightWidth: 1.6,
    height: 5,
    marginTop: 1,
    width: 14,
  },
  dbWrapper: {
    alignItems: 'center',
    height: 18,
    justifyContent: 'center',
    width: 18,
  },
  dbDisk: {
    borderRadius: 3.5,
    borderWidth: 1.6,
    height: 6,
    width: 15,
  },
  dbDiskLower: {
    marginTop: 2,
  },
  docOutline: {
    borderRadius: 2,
    borderWidth: 1.6,
    height: 18,
    justifyContent: 'center',
    paddingHorizontal: 2.5,
    width: 15,
  },
  docLine: {
    borderRadius: 0.5,
    height: 1.5,
    marginBottom: 2,
    width: '100%',
  },
  docLineMed: {
    width: '75%',
  },
  docLineShort: {
    width: '50%',
  },
  infoCircle: {
    alignItems: 'center',
    borderRadius: 9,
    borderWidth: 1.6,
    height: 18,
    justifyContent: 'center',
    width: 18,
  },
  infoSymbol: {
    fontSize: 12,
    fontWeight: '800',
    marginTop: -1,
  },
  trashWrapper: {
    alignItems: 'center',
    height: 18,
    justifyContent: 'center',
    width: 16,
  },
  trashLid: {
    borderRadius: 1,
    height: 2,
    marginBottom: 1.5,
    width: 14,
  },
  trashCan: {
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    borderWidth: 1.6,
    borderTopWidth: 0,
    flexDirection: 'row',
    gap: 2.5,
    height: 12,
    justifyContent: 'center',
    paddingTop: 1.5,
    width: 12,
  },
  trashLine: {
    height: 6,
    width: 1.2,
  },
  defaultBullet: {
    color: '#17191C',
    fontSize: 16,
  },
});

export default SettingsItem;
