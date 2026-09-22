import React from 'react';
import { Text, View } from 'react-native';
import styles from '../../assets/styles/styles';
import EarningsChart from './EarningsChart';

/**
 * EarningsSummaryCard
 * Dark hero card displaying Total Earnings, growth percentage,
 * and the daily bar chart with utility styles.
 */
function EarningsSummaryCard({
  total = '₹4,860',
  growth = '+12% from last week',
  growthPositive = true,
  chartData = [],
}) {
  return (
    <View
      style={[
        styles.mb16,
        styles.pdh20,
        styles.pdv16,
        {
          backgroundColor: '#17191C',
          borderRadius: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 10,
          elevation: 4,
        },
      ]}
    >
      {/* 1. Subtitle Label */}
      <Text
        style={[
          styles.ts11,
          {
            color: '#8E9398',
            fontWeight: '700',
            letterSpacing: 0.6,
            textTransform: 'uppercase',
          },
        ]}
      >
        TOTAL EARNINGS
      </Text>

      {/* 2. Primary Total Amount */}
      <Text
        style={[
          styles.mt4,
          {
            color: '#FFFFFF',
            fontSize: 34,
            fontWeight: '900',
            letterSpacing: -0.6,
          },
        ]}
      >
        {total}
      </Text>

      {/* 3. Growth Indicator Row */}
      <View
        style={[
          styles.mt8,
          {
            alignItems: 'center',
            flexDirection: 'row',
            gap: 6,
          },
        ]}
      >
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#10B981',
            borderRadius: 7.5,
            height: 15,
            justifyContent: 'center',
            width: 15,
          }}
        >
          <Text
            style={[
              styles.ts10,
              {
                color: '#FFFFFF',
                fontWeight: '900',
                lineHeight: 12,
              },
            ]}
          >
            ↑
          </Text>
        </View>
        <Text
          style={[
            styles.ts12,
            {
              color: growthPositive ? '#10B981' : '#EF4444',
              fontWeight: '600',
              letterSpacing: -0.1,
            },
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

export default EarningsSummaryCard;
