import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

/**
 * TransactionsHeader
 * Displays the "RECENT TRANSACTIONS" section header with a "View All →" interactive link.
 */
function TransactionsHeader({ title = 'RECENT TRANSACTIONS', onPressViewAll }) {
  return (
    <View style={styles.headerRow}>
      <Text style={styles.titleText}>{title}</Text>
      <Pressable
        onPress={onPressViewAll}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="View all transactions"
      >
        <Text style={styles.viewAllText}>View All →</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 6,
  },
  titleText: {
    color: '#687078',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  viewAllText: {
    color: '#17191C',
    fontSize: 12,
    fontWeight: '700',
  },
});

export default TransactionsHeader;
