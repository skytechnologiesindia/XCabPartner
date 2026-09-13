import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { icons } from '../../assets/icons';

/**
 * TransactionCard
 * Displays a single transaction (Completed ride, Cancelled trip, UPI/Cash payout).
 * Dynamically styles icons and text based on transaction type.
 */
function TransactionCard({ transaction, onPress }) {
  if (!transaction) return null;

  const isCancelled =
    transaction.type === 'cancelled' ||
    transaction.title?.toLowerCase().includes('cancelled');

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={() => onPress && onPress(transaction)}
      accessibilityRole="button"
      accessibilityLabel={`${transaction.title}, amount ${transaction.amount}`}
    >
      {/* 1. Left Avatar (Car for completed, red cross for cancelled) */}
      <View
        style={[
          styles.avatarCircle,
          isCancelled && styles.avatarCircleCancelled,
        ]}
      >
        {isCancelled ? (
          <View style={styles.crossCircle}>
            <Text style={styles.crossText}>✕</Text>
          </View>
        ) : (
          <Image
            source={icons.rides}
            style={styles.carIcon}
            tintColor="#17191C"
            resizeMode="contain"
          />
        )}
      </View>

      {/* 2. Middle Content (Title, Route, Timestamp) */}
      <View style={styles.contentCol}>
        <Text style={styles.titleText}>{transaction.title}</Text>
        <Text style={styles.routeText} numberOfLines={1}>
          {transaction.route}
        </Text>
        <Text style={styles.timestampText}>{transaction.timestamp}</Text>
      </View>

      {/* 3. Right Content (Amount, Payment Method, Chevron) */}
      <View style={styles.rightSection}>
        <View style={styles.amountCol}>
          <Text style={styles.amountText}>{transaction.amount}</Text>
          {transaction.method && transaction.method !== '-' ? (
            <Text style={styles.methodText}>{transaction.method}</Text>
          ) : null}
        </View>
        <Text style={styles.chevron}>›</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E6E2D8',
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  cardPressed: {
    opacity: 0.9,
  },
  avatarCircle: {
    alignItems: 'center',
    backgroundColor: '#F4F2EB',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    marginRight: 12,
    width: 40,
  },
  avatarCircleCancelled: {
    backgroundColor: '#FDE6E3',
  },
  carIcon: {
    height: 18,
    width: 20,
  },
  crossCircle: {
    alignItems: 'center',
    backgroundColor: '#F26B5B',
    borderRadius: 10,
    height: 20,
    justifyContent: 'center',
    width: 20,
  },
  crossText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    lineHeight: 13,
  },
  contentCol: {
    flex: 1,
  },
  titleText: {
    color: '#17191C',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  routeText: {
    color: '#687078',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  timestampText: {
    color: '#8E9398',
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
  rightSection: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
  },
  amountCol: {
    alignItems: 'flex-end',
  },
  amountText: {
    color: '#17191C',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  methodText: {
    color: '#687078',
    fontSize: 11.5,
    fontWeight: '500',
    marginTop: 1,
  },
  chevron: {
    color: '#8E9398',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 6,
  },
});

export default TransactionCard;
