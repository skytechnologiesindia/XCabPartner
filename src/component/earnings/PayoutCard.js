import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { icons } from '../../assets/icons';

/**
 * PayoutCard
 * Displays Next Payout projection, processing badge, and payout schedule.
 */
function PayoutCard({
  date = 'Tuesday, 23 Sep',
  amount = '₹4,200',
  status = 'Processing',
  onPress,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Next payout on ${date} of ${amount}, status ${status}`}
    >
      {/* 1. Left Icon Container */}
      <View style={styles.iconContainer}>
        <Image
          source={icons.statWallet}
          style={styles.walletIcon}
          tintColor="#17191C"
          resizeMode="contain"
        />
      </View>

      {/* 2. Center Text Column */}
      <View style={styles.contentCol}>
        <View style={styles.topRow}>
          <Text style={styles.label}>Next Payout</Text>
          <View style={styles.statusPill}>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        </View>

        <Text style={styles.payoutText}>
          {date} • {amount}
        </Text>
      </View>

      {/* 3. Right Chevron */}
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 14,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  cardPressed: {
    opacity: 0.9,
  },
  iconContainer: {
    alignItems: 'center',
    backgroundColor: '#FFD21A',
    borderRadius: 12,
    height: 44,
    justifyContent: 'center',
    marginRight: 12,
    width: 44,
  },
  walletIcon: {
    height: 22,
    width: 22,
  },
  contentCol: {
    flex: 1,
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  label: {
    color: '#687078',
    fontSize: 12,
    fontWeight: '600',
  },
  statusPill: {
    backgroundColor: '#E6F9F0',
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  statusText: {
    color: '#10B981',
    fontSize: 10.5,
    fontWeight: '700',
  },
  payoutText: {
    color: '#17191C',
    fontSize: 14.5,
    fontWeight: '700',
    letterSpacing: -0.2,
    marginTop: 3,
  },
  chevron: {
    color: '#17191C',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default PayoutCard;
