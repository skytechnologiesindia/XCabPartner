import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  AlertCard,
  AlertsFilterTabs,
  MarkAllReadButton,
  alertsData as initialAlertsData,
  getFilteredAlerts,
  getUnreadCount,
} from '../../component/alerts';

/**
 * AlertsScreen
 * Main alerts screen composing filter tabs, notification cards,
 * unread badges, and "Mark all as read" functionality.
 */
function AlertsScreen({ navigation }) {
  const [alerts, setAlerts] = useState(initialAlertsData);
  const [activeFilter, setActiveFilter] = useState('all');

  // Filtered alerts based on selected category tab
  const visibleAlerts = useMemo(() => {
    return getFilteredAlerts(alerts, activeFilter);
  }, [alerts, activeFilter]);

  // Dynamic unread count formatted with leading zero (e.g. "02")
  const unreadCount = useMemo(() => {
    return getUnreadCount(alerts);
  }, [alerts]);

  // Mark all alerts as read
  const handleMarkAllRead = () => {
    setAlerts(prevAlerts =>
      prevAlerts.map(item => ({
        ...item,
        unread: false,
      })),
    );
  };

  // Handle tap on single alert card
  const handleAlertPress = alert => {
    // Mark this alert as read
    setAlerts(prevAlerts =>
      prevAlerts.map(item =>
        item.id === alert.id ? { ...item, unread: false } : item,
      ),
    );

    // Navigate to corresponding destination if available
    if (alert.targetScreen && navigation && navigation.navigate) {
      navigation.navigate(alert.targetScreen);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Page Title & Unread Count Badge */}
        <View style={styles.titleSection}>
          <View style={styles.titleRow}>
            <Text style={styles.titleText}>Alerts</Text>
            <View style={styles.badgePill}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          </View>
          <Text style={styles.subtitleText}>
            Stay updated with important notifications
          </Text>
        </View>

        {/* 2. Filter Tabs: All, Trips, Payouts */}
        <AlertsFilterTabs
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
        />

        {/* 3. Alert Cards List */}
        {visibleAlerts.length > 0 ? (
          <View style={styles.listContainer}>
            {visibleAlerts.map(alert => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onPress={handleAlertPress}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Text style={styles.emptyIcon}>🔔</Text>
            </View>
            <Text style={styles.emptyTitle}>No alerts yet</Text>
            <Text style={styles.emptySubtitle}>
              You&apos;re all caught up.
            </Text>
          </View>
        )}

        {/* 4. Mark All As Read Button */}
        {visibleAlerts.length > 0 ? (
          <MarkAllReadButton onPress={handleMarkAllRead} />
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F5EF',
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 110,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  titleSection: {
    marginBottom: 16,
  },
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleText: {
    color: '#17191C',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  badgePill: {
    alignItems: 'center',
    backgroundColor: '#FFC928',
    borderRadius: 8,
    justifyContent: 'center',
    marginLeft: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    color: '#17191C',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  subtitleText: {
    color: '#687078',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 4,
  },
  listContainer: {
    marginBottom: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E6E2D8',
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    marginVertical: 12,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  emptyIconCircle: {
    alignItems: 'center',
    backgroundColor: '#F4F2EB',
    borderRadius: 28,
    height: 56,
    justifyContent: 'center',
    marginBottom: 12,
    width: 56,
  },
  emptyIcon: {
    fontSize: 24,
  },
  emptyTitle: {
    color: '#17191C',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  emptySubtitle: {
    color: '#687078',
    fontSize: 13,
    textAlign: 'center',
  },
});

export default AlertsScreen;
