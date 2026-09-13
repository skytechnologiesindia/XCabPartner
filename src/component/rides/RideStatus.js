import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * RideStatus badge
 * Completed: Light green background (#DDF5E9), green icon/text (#18A66A)
 * Cancelled: Light red background (#FDE6E3), red icon/text (#F26B5B)
 */
function RideStatus({ status = 'completed' }) {
  const isCancelled = status === 'cancelled';

  const bgColor = isCancelled ? '#FDE6E3' : '#DDF5E9';
  const textColor = isCancelled ? '#F26B5B' : '#18A66A';
  const iconSymbol = isCancelled ? '✕' : '✓';
  const label = isCancelled ? 'Cancelled' : 'Completed';

  return (
    <View style={[styles.badgeContainer, { backgroundColor: bgColor }]}>
      {/* Icon Circle */}
      <View style={[styles.iconCircle, { backgroundColor: textColor }]}>
        <Text style={styles.iconText}>{iconSymbol}</Text>
      </View>

      {/* Status Label */}
      <Text style={[styles.statusText, { color: textColor }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  iconCircle: {
    alignItems: 'center',
    borderRadius: 7,
    height: 14,
    justifyContent: 'center',
    width: 14,
  },
  iconText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    includeFontPadding: false,
    lineHeight: 11,
    textAlign: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: -0.1,
  },
});

export default RideStatus;
