import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { verificationChecklistItems } from './verificationData';

/**
 * VerificationChecklist
 * Displays the list of submitted verification items with review badges.
 */
function VerificationChecklist() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Verification Status</Text>

      <View style={styles.card}>
        {verificationChecklistItems.map((item, index) => {
          const isReviewing = item.status === 'reviewing';
          const isLast = index === verificationChecklistItems.length - 1;

          return (
            <View
              key={item.id}
              style={[styles.row, isLast && styles.rowLast]}
            >
              <View style={styles.rowLeft}>
                <View
                  style={[
                    styles.iconCircle,
                    isReviewing ? styles.iconCircleReviewing : styles.iconCircleVerified,
                  ]}
                >
                  <Text
                    style={[
                      styles.iconText,
                      isReviewing ? styles.iconTextReviewing : styles.iconTextVerified,
                    ]}
                  >
                    {item.icon}
                  </Text>
                </View>
                <Text style={styles.itemLabel}>{item.label}</Text>
              </View>

              <View
                style={[
                  styles.badge,
                  isReviewing ? styles.badgeReviewing : styles.badgeVerified,
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    isReviewing ? styles.badgeTextReviewing : styles.badgeTextVerified,
                  ]}
                >
                  {isReviewing ? 'Under Review' : 'Verified'}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    width: '100%',
  },
  headerTitle: {
    color: '#17191C',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DDD9CF',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  row: {
    alignItems: 'center',
    borderBottomColor: '#F1EEE5',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  rowLeft: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconCircle: {
    alignItems: 'center',
    borderRadius: 12,
    height: 24,
    justifyContent: 'center',
    marginRight: 10,
    width: 24,
  },
  iconCircleVerified: {
    backgroundColor: '#DDF5E9',
  },
  iconCircleReviewing: {
    backgroundColor: '#FFF4C7',
  },
  iconText: {
    fontSize: 12,
    fontWeight: '900',
  },
  iconTextVerified: {
    color: '#18A66A',
  },
  iconTextReviewing: {
    color: '#B45309',
  },
  itemLabel: {
    color: '#17191C',
    fontSize: 14,
    fontWeight: '700',
  },
  badge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeVerified: {
    backgroundColor: '#F0FDF4',
  },
  badgeReviewing: {
    backgroundColor: '#FFFBEB',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  badgeTextVerified: {
    color: '#166534',
  },
  badgeTextReviewing: {
    color: '#B45309',
  },
});

export default VerificationChecklist;
