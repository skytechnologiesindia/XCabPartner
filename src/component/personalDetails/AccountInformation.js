import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * AccountInformation
 * Card section displaying driver partnership account status records:
 * - Joined On (e.g. "12 Mar 2023")
 * - Account Status (Active green badge)
 * - KYC Status (Verified green badge)
 */
function AccountInformation({ data }) {
  const joinedOn = data?.accountInfo?.joinedOn || data?.joinedOn || '12 Mar 2023';
  const accountStatus = data?.accountInfo?.accountStatus || data?.accountStatus || 'Active';
  const kycStatus = data?.accountInfo?.kycStatus || data?.kycStatus || 'Verified';

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Account Information</Text>

      {/* 1. Joined On Row */}
      <View style={styles.row}>
        <View style={styles.leftSection}>
          <View style={styles.iconContainer}>
            <View style={styles.calendarOutline}>
              <View style={styles.calendarHangers}>
                <View style={styles.calendarHanger} />
                <View style={styles.calendarHanger} />
              </View>
              <View style={styles.calendarBar} />
            </View>
          </View>
          <Text style={styles.labelText}>Joined On</Text>
        </View>
        <Text style={styles.valueText}>{joinedOn}</Text>
      </View>

      {/* 2. Account Status Row */}
      <View style={styles.row}>
        <View style={styles.leftSection}>
          <View style={styles.iconContainer}>
            <Text style={styles.starGlyph}>☆</Text>
          </View>
          <Text style={styles.labelText}>Account Status</Text>
        </View>
        <View style={styles.pillBadge}>
          <Text style={styles.pillText}>{accountStatus}</Text>
        </View>
      </View>

      {/* 3. KYC Status Row */}
      <View style={[styles.row, styles.noDivider]}>
        <View style={styles.leftSection}>
          <View style={styles.iconContainer}>
            <View style={styles.checkCircleOutline}>
              <Text style={styles.checkMarkSymbol}>✓</Text>
            </View>
          </View>
          <Text style={styles.labelText}>KYC Status</Text>
        </View>
        <View style={styles.pillBadge}>
          <Text style={styles.pillText}>{kycStatus}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#EFECE6',
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1.5,
  },
  sectionTitle: {
    color: '#17191C',
    fontSize: 16.5,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  row: {
    alignItems: 'center',
    borderBottomColor: '#F1EEE5',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 50,
    paddingVertical: 12,
  },
  noDivider: {
    borderBottomWidth: 0,
  },
  leftSection: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
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
  valueText: {
    color: '#17191C',
    fontSize: 13.5,
    fontWeight: '600',
    letterSpacing: -0.15,
  },
  pillBadge: {
    backgroundColor: '#DDF5E9',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 3.5,
  },
  pillText: {
    color: '#18A66A',
    fontSize: 12.5,
    fontWeight: '700',
    letterSpacing: -0.1,
  },

  // Icon geometry
  calendarOutline: {
    borderColor: '#687078',
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
    backgroundColor: '#687078',
    borderRadius: 0.5,
    height: 3,
    width: 2,
  },
  calendarBar: {
    backgroundColor: '#687078',
    height: 2.5,
    marginTop: 2.5,
    width: '100%',
  },
  starGlyph: {
    color: '#687078',
    fontSize: 18,
    lineHeight: 20,
  },
  checkCircleOutline: {
    alignItems: 'center',
    borderColor: '#687078',
    borderRadius: 8,
    borderWidth: 1.5,
    height: 16,
    justifyContent: 'center',
    width: 16,
  },
  checkMarkSymbol: {
    color: '#687078',
    fontSize: 9.5,
    fontWeight: '800',
    marginTop: -1,
  },
});

export default AccountInformation;
