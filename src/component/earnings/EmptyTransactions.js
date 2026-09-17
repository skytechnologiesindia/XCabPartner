import React from 'react';
import { Text, View } from 'react-native';
import styles from '../../assets/styles/styles';

/**
 * EmptyTransactions
 * Displayed when there are no recent transactions for the selected period.
 */
function EmptyTransactions({
  title = 'No transactions yet',
  subtitle = 'Your completed ride earnings will appear here.',
}) {
  return (
    <View
      style={[
        styles.mt4,
        styles.pdh20,
        styles.pdv32,
        {
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderColor: '#E6E2D8',
          borderRadius: 16,
          borderWidth: 1,
          justifyContent: 'center',
        },
      ]}
    >
      <View
        style={[
          styles.mb12,
          {
            alignItems: 'center',
            backgroundColor: '#F4F2EB',
            borderRadius: 28,
            height: 56,
            justifyContent: 'center',
            width: 56,
          },
        ]}
      >
        <Text style={styles.ts24}>💳</Text>
      </View>
      <Text
        style={[
          styles.ts15,
          styles.mb4,
          {
            color: '#17191C',
            fontWeight: '700',
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.ts12,
          {
            color: '#687078',
            textAlign: 'center',
          },
        ]}
      >
        {subtitle}
      </Text>
    </View>
  );
}

export default EmptyTransactions;
