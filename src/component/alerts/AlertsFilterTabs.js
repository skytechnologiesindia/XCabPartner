import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'trips', label: 'Trips' },
  { key: 'payouts', label: 'Payouts' },
];

/**
 * AlertsFilterTabs
 * Segmented pill filter bar for All, Trips, and Payouts categories.
 */
function AlertsFilterTabs({ activeFilter = 'all', onSelectFilter }) {
  return (
    <View style={styles.container}>
      {TABS.map(tab => {
        const isActive = activeFilter === tab.key;

        return (
          <Pressable
            key={tab.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={tab.label}
            style={({ pressed }) => [
              styles.tabItem,
              isActive && styles.tabItemActive,
              pressed && styles.tabItemPressed,
            ]}
            onPress={() => onSelectFilter && onSelectFilter(tab.key)}
          >
            <Text
              style={[
                styles.tabLabel,
                isActive ? styles.tabLabelActive : styles.tabLabelInactive,
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EBE7DC',
    borderRadius: 24,
    flexDirection: 'row',
    marginBottom: 16,
    padding: 4,
    width: '100%',
  },
  tabItem: {
    alignItems: 'center',
    borderRadius: 20,
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 9,
  },
  tabItemActive: {
    backgroundColor: '#FFC928', // XCAB Yellow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  tabItemPressed: {
    opacity: 0.85,
  },
  tabLabel: {
    fontSize: 13,
    letterSpacing: -0.1,
  },
  tabLabelActive: {
    color: '#17191C',
    fontWeight: '700',
  },
  tabLabelInactive: {
    color: '#555C63',
    fontWeight: '600',
  },
});

export default AlertsFilterTabs;
