import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * DocumentStatus
 * Reusable status indicator badge supporting: valid, expiring, expired, pending.
 */
function DocumentStatus({ status = 'valid' }) {
  const config = getStatusConfig(status);

  return (
    <View style={[styles.pill, { backgroundColor: config.bgColor }]}>
      <View style={[styles.iconCircle, { backgroundColor: config.textColor }]}>
        <Text style={styles.iconText}>{config.icon}</Text>
      </View>
      <Text style={[styles.labelText, { color: config.textColor }]}>
        {config.label}
      </Text>
    </View>
  );
}

function getStatusConfig(status) {
  switch (status?.toLowerCase()) {
    case 'expired':
      return {
        label: 'Expired',
        icon: '!',
        bgColor: '#FDE6E3',
        textColor: '#F26B5B',
      };

    case 'expiring':
    case 'expiring_soon':
      return {
        label: 'Expiring Soon',
        icon: '▲',
        bgColor: '#FEF3C7',
        textColor: '#D97706',
      };

    case 'pending':
    case 'pending_review':
      return {
        label: 'Pending',
        icon: '⏱',
        bgColor: '#F3F4F6',
        textColor: '#6B7280',
      };

    case 'valid':
    default:
      return {
        label: 'Valid',
        icon: '✓',
        bgColor: '#E6F8EF',
        textColor: '#18A66A',
      };
  }
}

const styles = StyleSheet.create({
  pill: {
    alignItems: 'center',
    borderRadius: 14,
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
  },
  iconCircle: {
    alignItems: 'center',
    borderRadius: 7,
    height: 14,
    justifyContent: 'center',
    marginRight: 4.5,
    width: 14,
  },
  iconText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    lineHeight: 10,
  },
  labelText: {
    fontSize: 11.5,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
});

export default DocumentStatus;
