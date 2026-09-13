import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * EmptyTransactions
 * Displayed when there are no recent transactions for the selected period.
 */
function EmptyTransactions({
  title = 'No transactions yet',
  subtitle = 'Your completed ride earnings will appear here.',
}) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>💳</Text>
      </View>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.subtitleText}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E6E2D8',
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    marginTop: 4,
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  iconCircle: {
    alignItems: 'center',
    backgroundColor: '#F4F2EB',
    borderRadius: 28,
    height: 56,
    justifyContent: 'center',
    marginBottom: 12,
    width: 56,
  },
  icon: {
    fontSize: 24,
  },
  titleText: {
    color: '#17191C',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitleText: {
    color: '#687078',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default EmptyTransactions;
