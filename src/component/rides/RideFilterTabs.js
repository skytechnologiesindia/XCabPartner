import React from 'react';
import { Pressable, Text, View } from 'react-native';

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
];

/**
 * Filter tabs: All (12), Completed (9), Cancelled (3)
 * Segmented pill bar matching the reference image.
 */
function RideFilterTabs({ activeFilter = 'all', onSelectFilter, counts = {} }) {
  return (
    <View
      style={{
        backgroundColor: '#EBE7DC',
        borderRadius: 24,
        flexDirection: 'row',
        marginBottom: 4,
        padding: 4,
        width: '100%',
      }}
    >
      {TABS.map(tab => {
        const isActive = activeFilter === tab.key;
        const count = counts[tab.key] ?? 0;

        return (
          <Pressable
            key={tab.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={`${tab.label} (${count})`}
            style={({ pressed }) => [
              {
                alignItems: 'center',
                borderRadius: 20,
                flex: 1,
                justifyContent: 'center',
                paddingVertical: 9,
              },
              isActive && {
                backgroundColor: '#FFC928', // XCAB Yellow
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.08,
                shadowRadius: 2,
                elevation: 1,
              },
              pressed && {
                opacity: 0.85,
              },
            ]}
            onPress={() => onSelectFilter && onSelectFilter(tab.key)}
          >
            <Text
              style={[
                {
                  fontSize: 13,
                  letterSpacing: -0.1,
                },
                isActive
                  ? { color: '#17191C', fontWeight: '700' }
                  : { color: '#555C63', fontWeight: '600' },
              ]}
            >
              {tab.label} ({count})
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default RideFilterTabs;
