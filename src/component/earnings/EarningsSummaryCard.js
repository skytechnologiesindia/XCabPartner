import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EarningsChart from './EarningsChart';

/**
 * EarningsSummaryCard
 * Dark hero card displaying Total Earnings, growth percentage,
 * and the daily bar chart.
 */
function EarningsSummaryCard({
  total = '₹4,860',
  growth = '+12% from last week',
  growthPositive = true,
  chartData = [],
}) {
  return (
    <View style={styles.card}>
      {/* 1. Subtitle Label */}
      <Text style={styles.subheading}>TOTAL EARNINGS</Text>

      {/* 2. Primary Total Amount */}
      <Text style={styles.totalAmount}>{total}</Text>

      {/* 3. Growth Indicator Row */}
      <View style={styles.growthRow}>
        <View style={styles.growthBadge}>
          <Text style={styles.growthArrow}>↑</Text>
        </View>
        <Text
          style={[
            styles.growthText,
            growthPositive
              ? styles.growthTextPositive
              : styles.growthTextNegative,
          ]}
        >
          {growth}
        </Text>
      </View>

      {/* 4. Embedded Earnings Chart */}
      <EarningsChart data={chartData} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#17191C',
    borderRadius: 20,
    marginBottom: 14,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  subheading: {
    color: '#8E9398',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  totalAmount: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -0.6,
    marginTop: 4,
  },
  growthRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
  },
  growthBadge: {
    alignItems: 'center',
    backgroundColor: '#10B981',
    borderRadius: 7.5,
    height: 15,
    justifyContent: 'center',
    width: 15,
  },
  growthArrow: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    lineHeight: 12,
  },
  growthText: {
    fontSize: 12.5,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  growthTextPositive: {
    color: '#10B981',
  },
  growthTextNegative: {
    color: '#F26B5B',
  },
});

export default EarningsSummaryCard;
