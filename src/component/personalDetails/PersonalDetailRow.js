import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

/**
 * PersonalDetailRow
 * Reusable row component for both read-only (verified) and editable profile fields.
 *
 * Props:
 * - icon: string ('user' | 'phone' | 'mail' | 'calendar' | 'gender' | 'location' | 'shield' | 'document' | 'idCard' | 'star' | 'checkCircle')
 * - label: string (e.g. "Full Name")
 * - value: string (e.g. "Raj Kumar")
 * - subValue: string (optional, e.g. "Jharkhand - 834001")
 * - editable: boolean (shows subtle pencil ✎ and chevron ›)
 * - verified: boolean (shows verified green tick badge)
 * - isLast: boolean (omits bottom divider line)
 * - onPress: callback for edit action
 */
function PersonalDetailRow({
  icon,
  label,
  value,
  subValue,
  editable = false,
  verified = false,
  isLast = false,
  onPress,
}) {
  const ContainerComponent = editable ? Pressable : View;

  return (
    <ContainerComponent
      style={({ pressed }) => [
        styles.row,
        !isLast && styles.divider,
        editable && pressed && styles.rowPressed,
      ]}
      onPress={editable ? onPress : undefined}
      accessibilityRole={editable ? 'button' : 'text'}
      accessibilityLabel={`${label}: ${value}${subValue ? ', ' + subValue : ''}${
        verified ? ', Verified' : editable ? ', Editable' : ''
      }`}
    >
      {/* 1. Left Section: Outline Category Icon + Label */}
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>
          <FieldIcon type={icon} />
        </View>
        <Text style={styles.labelText} numberOfLines={1}>
          {label}
        </Text>
      </View>

      {/* 2. Right Section: Field Value + Edit/Verified Indicator */}
      <View style={styles.rightSection}>
        <View style={styles.valueColumn}>
          <Text style={styles.valueText} numberOfLines={2}>
            {value}
          </Text>
          {subValue ? (
            <Text style={styles.subValueText} numberOfLines={1}>
              {subValue}
            </Text>
          ) : null}
        </View>

        {editable ? (
          <View style={styles.editAction}>
            <Text style={styles.pencilIcon}>✎</Text>
            <Text style={styles.chevronIcon}>›</Text>
          </View>
        ) : verified ? (
          <View style={styles.greenTickCircle}>
            <Text style={styles.greenTickMark}>✓</Text>
          </View>
        ) : null}
      </View>
    </ContainerComponent>
  );
}

/**
 * Outline vector icons matching the XCAB design language
 */
function FieldIcon({ type }) {
  const iconColor = '#687078';

  switch (type) {
    case 'user':
    case 'gender':
      return (
        <View style={styles.userIconWrapper}>
          <View style={[styles.userHead, { borderColor: iconColor }]} />
          <View style={[styles.userBody, { borderColor: iconColor }]} />
        </View>
      );

    case 'phone':
      return (
        <View style={styles.phoneIconWrapper}>
          <Text style={[styles.phoneSymbol, { color: iconColor }]}>📞</Text>
        </View>
      );

    case 'mail':
    case 'email':
      return (
        <View style={[styles.mailOutline, { borderColor: iconColor }]}>
          <View style={[styles.mailFlap, { borderColor: iconColor }]} />
        </View>
      );

    case 'calendar':
    case 'dob':
      return (
        <View style={[styles.calendarOutline, { borderColor: iconColor }]}>
          <View style={styles.calendarHangers}>
            <View style={[styles.calendarHanger, { backgroundColor: iconColor }]} />
            <View style={[styles.calendarHanger, { backgroundColor: iconColor }]} />
          </View>
          <View style={[styles.calendarBar, { backgroundColor: iconColor }]} />
        </View>
      );

    case 'location':
    case 'address':
      return (
        <View style={styles.pinWrapper}>
          <View style={[styles.pinCircle, { borderColor: iconColor }]}>
            <View style={[styles.pinDot, { backgroundColor: iconColor }]} />
          </View>
          <View style={[styles.pinPoint, { borderTopColor: iconColor }]} />
        </View>
      );

    case 'shield':
    case 'aadhaar':
      return (
        <View style={[styles.shieldOutline, { borderColor: iconColor }]}>
          <Text style={[styles.shieldCheckMark, { color: iconColor }]}>✓</Text>
        </View>
      );

    case 'document':
    case 'pan':
      return (
        <View style={[styles.docOutline, { borderColor: iconColor }]}>
          <View style={[styles.docLine, { backgroundColor: iconColor }]} />
          <View style={[styles.docLine, styles.docLineMed, { backgroundColor: iconColor }]} />
          <View style={[styles.docLine, styles.docLineShort, { backgroundColor: iconColor }]} />
        </View>
      );

    case 'idCard':
    case 'driverId':
      return (
        <View style={[styles.idOutline, { borderColor: iconColor }]}>
          <View style={[styles.idPic, { borderColor: iconColor }]} />
          <View style={styles.idLines}>
            <View style={[styles.docLine, { backgroundColor: iconColor }]} />
            <View style={[styles.docLine, styles.docLineShort, { backgroundColor: iconColor }]} />
          </View>
        </View>
      );

    case 'star':
      return <Text style={[styles.glyphIcon, { color: iconColor }]}>☆</Text>;

    case 'checkCircle':
      return (
        <View style={[styles.checkCircleOutline, { borderColor: iconColor }]}>
          <Text style={[styles.checkCircleMark, { color: iconColor }]}>✓</Text>
        </View>
      );

    default:
      return <Text style={[styles.glyphIcon, { color: iconColor }]}>•</Text>;
  }
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 52,
    paddingVertical: 12,
  },
  rowPressed: {
    backgroundColor: '#FAF9F5',
    marginHorizontal: -8,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  divider: {
    borderBottomColor: '#F1EEE5',
    borderBottomWidth: 1,
  },
  leftSection: {
    alignItems: 'center',
    flex: 1.1,
    flexDirection: 'row',
    marginRight: 8,
  },
  iconContainer: {
    alignItems: 'center',
    height: 24,
    justifyContent: 'center',
    marginRight: 10,
    width: 22,
  },
  labelText: {
    color: '#687078',
    fontSize: 13.5,
    fontWeight: '400',
    letterSpacing: -0.1,
  },
  rightSection: {
    alignItems: 'center',
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  valueColumn: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  valueText: {
    color: '#17191C',
    fontSize: 13.5,
    fontWeight: '600',
    letterSpacing: -0.15,
    textAlign: 'right',
  },
  subValueText: {
    color: '#17191C',
    fontSize: 13.5,
    fontWeight: '600',
    letterSpacing: -0.15,
    marginTop: 2,
    textAlign: 'right',
  },
  editAction: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 3,
    marginLeft: 8,
    paddingLeft: 2,
  },
  pencilIcon: {
    color: '#687078',
    fontSize: 12.5,
    fontWeight: '700',
  },
  chevronIcon: {
    color: '#687078',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 18,
    marginTop: -1,
  },
  greenTickCircle: {
    alignItems: 'center',
    backgroundColor: '#18A66A',
    borderRadius: 9,
    height: 18,
    justifyContent: 'center',
    marginLeft: 8,
    width: 18,
  },
  greenTickMark: {
    color: '#FFFFFF',
    fontSize: 10.5,
    fontWeight: '900',
    lineHeight: 12,
    marginTop: -1,
  },

  // Icon geometry
  glyphIcon: {
    fontSize: 17,
  },
  userIconWrapper: {
    alignItems: 'center',
    height: 18,
    justifyContent: 'center',
    width: 18,
  },
  userHead: {
    borderRadius: 4.5,
    borderWidth: 1.5,
    height: 8,
    marginBottom: 1.5,
    width: 8,
  },
  userBody: {
    borderBottomWidth: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderWidth: 1.5,
    height: 6,
    width: 14,
  },
  phoneIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneSymbol: {
    fontSize: 13,
    transform: [{ rotate: '15deg' }],
  },
  mailOutline: {
    borderRadius: 2.5,
    borderWidth: 1.5,
    height: 14,
    justifyContent: 'flex-start',
    overflow: 'hidden',
    width: 18,
  },
  mailFlap: {
    borderBottomWidth: 1.5,
    borderRightWidth: 1.5,
    height: 9,
    marginHorizontal: 'auto',
    marginTop: -5,
    transform: [{ rotate: '45deg' }],
    width: 9,
  },
  calendarOutline: {
    borderRadius: 2.5,
    borderWidth: 1.5,
    height: 16,
    position: 'relative',
    width: 17,
  },
  calendarHangers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 2,
    position: 'absolute',
    right: 2,
    top: -3,
  },
  calendarHanger: {
    borderRadius: 0.5,
    height: 3,
    width: 2,
  },
  calendarBar: {
    height: 2.5,
    marginTop: 2.5,
    width: '100%',
  },
  pinWrapper: {
    alignItems: 'center',
    height: 18,
    justifyContent: 'center',
    width: 16,
  },
  pinCircle: {
    alignItems: 'center',
    borderRadius: 6.5,
    borderWidth: 1.5,
    height: 13,
    justifyContent: 'center',
    width: 13,
  },
  pinDot: {
    borderRadius: 2,
    height: 4,
    width: 4,
  },
  pinPoint: {
    borderLeftColor: 'transparent',
    borderLeftWidth: 3,
    borderRightColor: 'transparent',
    borderRightWidth: 3,
    borderTopWidth: 4,
    height: 0,
    marginTop: -1.5,
    width: 0,
  },
  shieldOutline: {
    alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderWidth: 1.5,
    height: 16,
    justifyContent: 'center',
    width: 15,
  },
  shieldCheckMark: {
    fontSize: 9,
    fontWeight: '800',
    marginTop: -1,
  },
  docOutline: {
    borderRadius: 2,
    borderWidth: 1.5,
    height: 16,
    justifyContent: 'center',
    paddingHorizontal: 2,
    width: 14,
  },
  docLine: {
    borderRadius: 0.5,
    height: 1.5,
    marginBottom: 1.5,
    width: '100%',
  },
  docLineMed: {
    width: '75%',
  },
  docLineShort: {
    width: '50%',
  },
  idOutline: {
    alignItems: 'center',
    borderRadius: 2.5,
    borderWidth: 1.5,
    flexDirection: 'row',
    height: 14,
    paddingHorizontal: 2,
    width: 18,
  },
  idPic: {
    borderRadius: 1,
    borderWidth: 1,
    height: 8,
    marginRight: 2,
    width: 5,
  },
  idLines: {
    flex: 1,
    justifyContent: 'center',
  },
  checkCircleOutline: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1.5,
    height: 16,
    justifyContent: 'center',
    width: 16,
  },
  checkCircleMark: {
    fontSize: 9.5,
    fontWeight: '800',
    marginTop: -1,
  },
});

export default PersonalDetailRow;
