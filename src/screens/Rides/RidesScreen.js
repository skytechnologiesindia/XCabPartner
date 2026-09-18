import React, { useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
} from 'react-native';
import {
  MOCK_RIDES,
  RideCard,
  RideCardSkeleton,
  RideDetailsModal,
  RideFilterTabs,
  getFilterCounts,
  getFilteredRides,
  groupRidesByDate,
} from '../../component/rides';

/**
 * RidesScreen
 * Displays driver ride history grouped by date with filtering capabilities (All, Completed, Cancelled).
 * Reuses the global bottom navigation below.
 */
function RidesScreen() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedRide, setSelectedRide] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 2-second simulation delay for skeleton loading presentation
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [activeFilter]);

  // Filter counts
  const counts = useMemo(() => getFilterCounts(MOCK_RIDES), []);

  // Filtered and grouped rides
  const groupedRides = useMemo(() => {
    const filtered = getFilteredRides(MOCK_RIDES, activeFilter);
    return groupRidesByDate(filtered);
  }, [activeFilter]);

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
        {/* 1. Page Title & Subtitle */}
        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              color: '#17191C',
              fontSize: 30,
              fontWeight: '800',
              letterSpacing: -0.6,
            }}
          >
            Rides
          </Text>
          <Text
            style={{
              color: '#687078',
              fontSize: 14,
              fontWeight: '400',
              marginTop: 4,
            }}
          >
            View and manage all your rides
          </Text>
        </View>

        {/* 2. Filter Tabs: All (12), Completed (9), Cancelled (3) */}
        <RideFilterTabs
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
          counts={counts}
        />
      </View>

      {/* Scrollable Rides Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: 110,
          paddingHorizontal: 16,
          paddingTop: 12,
        }}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <View>
            {/* Date Group Header Skeleton */}
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 12,
                marginTop: 4,
              }}
            >
              <View
                style={{
                  backgroundColor: '#DCD7CB',
                  borderRadius: 4,
                  height: 16,
                  width: 80,
                }}
              />
              <View
                style={{
                  backgroundColor: '#EBE7DC',
                  borderRadius: 4,
                  height: 13,
                  width: 90,
                }}
              />
            </View>

            {/* 3 Ride Card Skeletons */}
            <RideCardSkeleton />
            <RideCardSkeleton />
            <RideCardSkeleton />
          </View>
        ) : groupedRides.length === 0 ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 24,
              paddingVertical: 48,
            }}
          >
            <View
              style={{
                alignItems: 'center',
                backgroundColor: '#EBE7DC',
                borderRadius: 32,
                height: 64,
                justifyContent: 'center',
                marginBottom: 14,
                width: 64,
              }}
            >
              <Text style={{ fontSize: 28 }}>🚗</Text>
            </View>
            <Text
              style={{
                color: '#17191C',
                fontSize: 17,
                fontWeight: '700',
                marginBottom: 6,
              }}
            >
              No rides found
            </Text>
            <Text
              style={{
                color: '#687078',
                fontSize: 13,
                textAlign: 'center',
              }}
            >
              You don&apos;t have any rides under the &quot;{activeFilter}&quot; filter.
            </Text>
          </View>
        ) : (
          groupedRides.map(group => (
            <View key={group.dateGroup} style={{ marginBottom: 10 }}>
              {/* Date Header: e.g. "Today" | "18 Sep 2025" */}
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 12,
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    color: '#17191C',
                    fontSize: 16,
                    fontWeight: '700',
                    letterSpacing: -0.2,
                  }}
                >
                  {group.dateGroup}
                </Text>
                <Text
                  style={{
                    color: '#687078',
                    fontSize: 13,
                    fontWeight: '500',
                  }}
                >
                  {group.date}
                </Text>
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

export default RidesScreen;
