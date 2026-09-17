import React, { useMemo, useState } from 'react';
import {
  ScrollView,
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
    <View style={{ flex: 1, backgroundColor: '#F7F5EF' }}>
      {/* Fixed Top Header (Non-scrollable) */}
      <View
        style={{
          backgroundColor: '#F7F5EF',
          borderBottomColor: 'rgba(0, 0, 0, 0.06)',
          borderBottomWidth: 1,
          elevation: 2,
          paddingBottom: 10,
          paddingHorizontal: 16,
          paddingTop: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.04,
          shadowRadius: 3,
          zIndex: 10,
        }}
      >
        {/* 1. Page Title & Unread Count Badge */}
        <View style={{ marginBottom: 12 }}>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Text
              style={{
                color: '#17191C',
                fontSize: 30,
                fontWeight: '800',
                letterSpacing: -0.6,
              }}
            >
              Alerts
            </Text>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: '#FFC928',
                borderRadius: 8,
                justifyContent: 'center',
                marginLeft: 10,
                paddingHorizontal: 8,
                paddingVertical: 3,
              }}
            >
              <Text
                style={{
                  color: '#17191C',
                  fontSize: 13,
                  fontWeight: '800',
                  letterSpacing: 0.2,
                }}
              >
                {unreadCount}
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: '#687078',
              fontSize: 14,
              fontWeight: '400',
              marginTop: 4,
            }}
          >
            Stay updated with important notifications
          </Text>
        </View>

        {/* 2. Filter Tabs: All, Trips, Payouts */}
        <AlertsFilterTabs
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
        />
      </View>

      {/* Scrollable Alerts Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: 110,
          paddingHorizontal: 16,
          paddingTop: 12,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* 3. Alert Cards List */}
        {visibleAlerts.length > 0 ? (
          <View style={{ marginBottom: 8 }}>
            {visibleAlerts.map(alert => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onPress={handleAlertPress}
              />
            ))}
          </View>
        ) : (
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderColor: '#E6E2D8',
              borderRadius: 20,
              borderWidth: 1,
              justifyContent: 'center',
              marginVertical: 12,
              paddingHorizontal: 24,
              paddingVertical: 40,
            }}
          >
            <View
              style={{
                alignItems: 'center',
                backgroundColor: '#F4F2EB',
                borderRadius: 28,
                height: 56,
                justifyContent: 'center',
                marginBottom: 12,
                width: 56,
              }}
            >
              <Text style={{ fontSize: 24 }}>🔔</Text>
            </View>
            <Text
              style={{
                color: '#17191C',
                fontSize: 16,
                fontWeight: '700',
                marginBottom: 4,
              }}
            >
              No alerts yet
            </Text>
            <Text
              style={{
                color: '#687078',
                fontSize: 13,
                textAlign: 'center',
              }}
            >
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

export default AlertsScreen;
