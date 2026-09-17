import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { icons } from '../../assets/icons';
import styles from '../../assets/styles/styles';

/**
 * TransactionCard
 * Displays a single transaction (Completed ride, Cancelled trip, UPI/Cash payout) with utility styles.
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
        styles.pdh16,
        styles.pdv12,
        styles.mb12,
        {
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderColor: '#E6E2D8',
          borderRadius: 14,
          borderWidth: 1,
          flexDirection: 'row',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.03,
          shadowRadius: 4,
          elevation: 1,
          opacity: pressed ? 0.9 : 1,
        },
      ]}
      onPress={() => onPress && onPress(transaction)}
      accessibilityRole="button"
      accessibilityLabel={`${transaction.title}, amount ${transaction.amount}`}
    >
      {/* 1. Left Avatar (Car for completed, red cross for cancelled) */}
      <View
        style={[
          styles.mr12,
          {
            alignItems: 'center',
            backgroundColor: isCancelled ? '#FDE6E3' : '#F4F2EB',
            borderRadius: 20,
            height: 40,
            justifyContent: 'center',
            width: 40,
          },
        ]}
      >
        {isCancelled ? (
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#F26B5B',
              borderRadius: 10,
              height: 20,
              justifyContent: 'center',
              width: 20,
            }}
          >
            <Text
              style={[
                styles.ts11,
                {
                  color: '#FFFFFF',
                  fontWeight: '800',
                  lineHeight: 13,
                },
              ]}
            >
              ✕
            </Text>
          </View>
        ) : (
          <Image
            source={icons.rides}
            style={{
              height: 18,
              width: 20,
            }}
            tintColor="#17191C"
            resizeMode="contain"
          />
        )}
      </View>

      {/* 2. Middle Content (Title, Route, Timestamp) */}
      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.ts14,
            {
              color: '#17191C',
              fontWeight: '700',
              letterSpacing: -0.2,
            },
          ]}
        >
          {transaction.title}
        </Text>
        <Text
          style={[
            styles.ts12,
            styles.mt4,
            {
              color: '#687078',
              fontWeight: '500',
            },
          ]}
          numberOfLines={1}
        >
          {transaction.route}
        </Text>
        <Text
          style={[
            styles.ts11,
            styles.mt4,
            {
              color: '#8E9398',
              fontWeight: '500',
            },
          ]}
        >
          {transaction.timestamp}
        </Text>
      </View>

      {/* 3. Right Content (Amount, Payment Method, Chevron) */}
      <View
        style={[
          styles.ml12,
          {
            alignItems: 'center',
            flexDirection: 'row',
          },
        ]}
      >
        <View style={{ alignItems: 'flex-end' }}>
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
            {transaction.amount}
          </Text>
          {transaction.method && transaction.method !== '-' ? (
            <Text
              style={[
                styles.ts12,
                {
                  color: '#687078',
                  fontWeight: '500',
                  marginTop: 1,
                },
              ]}
            >
              {transaction.method}
            </Text>
          ) : null}
        </View>
        <Text
          style={[
            styles.ts18,
            styles.ml8,
            {
              color: '#8E9398',
              fontWeight: '600',
            },
          ]}
        >
          ›
        </Text>
      </View>
    </Pressable>
  );
}

export default TransactionCard;
