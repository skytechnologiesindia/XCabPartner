import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MAX_BAR_HEIGHT = 76;
const MIN_BAR_HEIGHT = 16;

/**
 * EarningsChart
 * Data-driven bar chart receiving dynamic data array.
 * Highlights the highest day in bright XCAB Yellow.
 */
function EarningsChart({ data = [] }) {
  if (!data || data.length === 0) return null;

  // Compute maximum value for relative bar heights
  const maxValue = Math.max(...data.map(item => item.value || 0), 1);

  return (
    <View style={styles.chartContainer}>
      {data.map((item, index) => {
        const itemVal = item.value || 0;
        const barHeight = Math.max(
          Math.round((itemVal / maxValue) * MAX_BAR_HEIGHT),
          MIN_BAR_HEIGHT,
        );
        const isHighest = item.isHighest || itemVal === maxValue;

        return (
          <View key={item.day || index} style={styles.columnContainer}>
            {/* Amount Label Above Bar */}
            <Text
              style={[
                styles.amountLabel,
                isHighest && styles.amountLabelHighlight,
              ]}
              numberOfLines={1}
            >
              {item.amount}
            </Text>

            {/* Bar Slot */}
            <View style={styles.barSlot}>
              <View
                style={[
                  styles.bar,
                  { height: barHeight },
                  isHighest ? styles.barHighest : styles.barNormal,
                ]}
              />
            </View>

            {/* Day Label Below Bar */}
            <Text style={styles.dayLabel}>{item.day}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    height: 128,
    justifyContent: 'space-between',
    marginTop: 18,
    paddingHorizontal: 2,
    width: '100%',
  },
  columnContainer: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
  },
  amountLabel: {
    color: '#D2D6DC',
    fontSize: 9.5,
    fontWeight: '600',
    marginBottom: 6,
    textAlign: 'center',
  },
  amountLabelHighlight: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  barSlot: {
    alignItems: 'center',
    height: MAX_BAR_HEIGHT,
    justifyContent: 'flex-end',
    width: '100%',
  },
  bar: {
    borderRadius: 4,
    maxWidth: 24,
    width: '75%',
  },
  barHighest: {
    backgroundColor: '#FFC928',
  },
  barNormal: {
    backgroundColor: '#4E5259',
  },
  dayLabel: {
    color: '#8E9398',
    fontSize: 10.5,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default EarningsChart;
