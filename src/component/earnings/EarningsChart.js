import React from 'react';
import { Text, View } from 'react-native';
import styles from '../../assets/styles/styles';

const MAX_BAR_HEIGHT = 76;
const MIN_BAR_HEIGHT = 16;

/**
 * EarningsChart
 * Data-driven bar chart receiving dynamic data array with utility styles.
 * Highlights the highest day in bright XCAB Yellow.
 */
function EarningsChart({ data = [] }) {
  if (!data || data.length === 0) return null;

  // Compute maximum value for relative bar heights
  const maxValue = Math.max(...data.map(item => item.value || 0), 1);

  return (
    <View
      style={[
        styles.mt20,
        {
          alignItems: 'flex-end',
          flexDirection: 'row',
          height: 128,
          justifyContent: 'space-between',
          paddingHorizontal: 2,
          width: '100%',
        },
      ]}
    >
      {data.map((item, index) => {
        const itemVal = item.value || 0;
        const barHeight = Math.max(
          Math.round((itemVal / maxValue) * MAX_BAR_HEIGHT),
          MIN_BAR_HEIGHT,
        );
        const isHighest = item.isHighest || itemVal === maxValue;

        return (
          <View
            key={item.day || index}
            style={{
              alignItems: 'center',
              flex: 1,
              height: '100%',
              justifyContent: 'flex-end',
            }}
          >
            {/* Amount Label Above Bar */}
            <Text
              style={[
                styles.mb8,
                styles.ts10,
                {
                  color: isHighest ? '#FFFFFF' : '#D2D6DC',
                  fontWeight: isHighest ? '700' : '600',
                  textAlign: 'center',
                },
              ]}
              numberOfLines={1}
            >
              {item.amount}
            </Text>

            {/* Bar Slot */}
            <View
              style={{
                alignItems: 'center',
                height: MAX_BAR_HEIGHT,
                justifyContent: 'flex-end',
                width: '100%',
              }}
            >
              <View
                style={{
                  backgroundColor: isHighest ? '#FFC928' : '#4E5259',
                  borderRadius: 4,
                  height: barHeight,
                  maxWidth: 24,
                  width: '75%',
                }}
              />
            </View>

            {/* Day Label Below Bar */}
            <Text
              style={[
                styles.ts11,
                styles.mt8,
                {
                  color: '#8E9398',
                  fontWeight: '600',
                  textAlign: 'center',
                },
              ]}
            >
              {item.day}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

export default EarningsChart;
