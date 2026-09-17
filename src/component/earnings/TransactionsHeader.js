import React from 'react';
import { Pressable, Text, View } from 'react-native';
import styles from '../../assets/styles/styles';

/**
 * TransactionsHeader
 * Displays the "RECENT TRANSACTIONS" section header with a "View All →" interactive link.
 */
function TransactionsHeader({ title = 'RECENT TRANSACTIONS', onPressViewAll }) {
  return (
    <View
      style={[
        styles.mb12,
        styles.mt8,
        {
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
      ]}
    >
      <Text
        style={[
          styles.ts12,
          {
            color: '#687078',
            fontWeight: '700',
            letterSpacing: 0.5,
            textTransform: 'uppercase',
          },
        ]}
      >
        {title}
      </Text>
      <Pressable
        onPress={onPressViewAll}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="View all transactions"
      >
        <Text
          style={[
            styles.ts12,
            {
              color: '#17191C',
              fontWeight: '700',
            },
          ]}
        >
          View All →
        </Text>
      </Pressable>
    </View>
  );
}

export default TransactionsHeader;
