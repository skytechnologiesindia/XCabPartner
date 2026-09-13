import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  MOCK_RIDES,
  RideCard,
  RideDetailsModal,
  RideFilterTabs,
  getFilterCounts,
  getFilteredRides,
  groupRidesByDate,
} from '../../component/rides';

/**
 * RidesScreen
 * Displays driver ride history grouped by date with filtering capabilities (All, Completed, Cancelled).
 * Reuses the global header above and global bottom navigation below.
 */
function RidesScreen() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedRide, setSelectedRide] = useState(null);

  // Filter counts
  const counts = useMemo(() => getFilterCounts(MOCK_RIDES), []);

  // Filtered and grouped rides
  const groupedRides = useMemo(() => {
    const filtered = getFilteredRides(MOCK_RIDES, activeFilter);
    return groupRidesByDate(filtered);
  }, [activeFilter]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Page Title & Subtitle */}
        <View style={styles.titleSection}>
          <Text style={styles.titleText}>Rides</Text>
          <Text style={styles.subtitleText}>
            View and manage all your rides
          </Text>
        </View>

        {/* 2. Filter Tabs: All (12), Completed (9), Cancelled (3) */}
        <RideFilterTabs
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
          counts={counts}
        />

        {/* 3. Grouped Ride List */}
        {groupedRides.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <View style={styles.emptyIconCircle}>
              <Text style={styles.emptyIcon}>🚗</Text>
            </View>
            <Text style={styles.emptyTitle}>No rides found</Text>
            <Text style={styles.emptySubtitle}>
              You don&apos;t have any rides under the &quot;{activeFilter}&quot; filter.
            </Text>
          </View>
        ) : (
          groupedRides.map(group => (
            <View key={group.dateGroup} style={styles.dateGroupContainer}>
              {/* Date Header: e.g. "Today" | "18 Sep 2025" */}
              <View style={styles.dateHeaderRow}>
                <Text style={styles.dateGroupTitle}>{group.dateGroup}</Text>
                <Text style={styles.dateText}>{group.date}</Text>
              </View>

              {/* Ride Cards in this group */}
              {group.rides.map(ride => (
                <RideCard
                  key={ride.id}
                  ride={ride}
                  onPressDetails={setSelectedRide}
                />
              ))}
            </View>
          ))
        )}
      </ScrollView>

      {/* 4. Full Trip Details Modal */}
      <RideDetailsModal
        visible={!!selectedRide}
        ride={selectedRide}
        onClose={() => setSelectedRide(null)}
      />
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
  titleText: {
    color: '#17191C',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  subtitleText: {
    color: '#687078',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 4,
  },
  dateGroupContainer: {
    marginBottom: 10,
  },
  dateHeaderRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 4,
  },
  dateGroupTitle: {
    color: '#17191C',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  dateText: {
    color: '#687078',
    fontSize: 13,
    fontWeight: '500',
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  emptyIconCircle: {
    alignItems: 'center',
    backgroundColor: '#EBE7DC',
    borderRadius: 32,
    height: 64,
    justifyContent: 'center',
    marginBottom: 14,
    width: 64,
  },
  emptyIcon: {
    fontSize: 28,
  },
  emptyTitle: {
    color: '#17191C',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
  },
  emptySubtitle: {
    color: '#687078',
    fontSize: 13,
    textAlign: 'center',
  },
});

export default RidesScreen;
