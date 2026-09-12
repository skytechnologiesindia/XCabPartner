import React, {useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {colors, radius} from '../../assets/colors/colors';

const filters = ['All', 'Completed', 'Cancelled'];

const rides = [
  {
    id: '9F3A7B21',
    pickup: 'Main Road',
    drop: 'Lalpur Market',
    when: 'TODAY',
    duration: '18 MIN',
    fare: '180',
    status: 'Completed',
  },
  {
    id: '7C9E2D11',
    pickup: 'Airport Road',
    drop: 'Kanke',
    when: 'YESTERDAY',
    duration: '26 MIN',
    fare: '245',
    status: 'Completed',
  },
  {
    id: '3B6D4E90',
    pickup: 'Station Road',
    drop: 'Morabadi',
    when: '27 AUG',
    duration: null,
    fare: null,
    status: 'Cancelled',
  },
];

function RidesScreen() {
  const [activeFilter, setActiveFilter] = useState('All');

  const visibleRides =
    activeFilter === 'All'
      ? rides
      : rides.filter(ride => ride.status === activeFilter);

  return (
    <ScrollView
      style={{
        backgroundColor: colors.ivory50,
        flex: 1,
      }}
      contentContainerStyle={{
        paddingBottom: 110,
        paddingHorizontal: 16,
        paddingTop: 16,
      }}
      showsVerticalScrollIndicator={false}>
      <Text
        style={{
          color: colors.graphite950,
          fontSize: 32,
          fontWeight: '900',
          letterSpacing: -0.6,
          marginBottom: 16,
        }}>
        Rides
      </Text>

      <View
        style={{
          backgroundColor: colors.sage100,
          borderRadius: radius.md,
          flexDirection: 'row',
          gap: 4,
          marginBottom: 16,
          padding: 4,
        }}>
        {filters.map(filter => {
          const isActive = filter === activeFilter;
          return (
            <Pressable
              key={filter}
              style={[
                {
                  alignItems: 'center',
                  borderRadius: radius.sm,
                  flex: 1,
                  paddingVertical: 9,
                },
                isActive && {
                  backgroundColor: colors.yellow500,
                },
              ]}
              onPress={() => setActiveFilter(filter)}>
              <Text
                style={[
                  {
                    color: colors.graphite600,
                    fontSize: 12,
                    fontWeight: '700',
                  },
                  isActive && {
                    color: colors.graphite950,
                  },
                ]}>
                {filter}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={{gap: 12}}>
        {visibleRides.map(ride => (
          <RideCard key={ride.id} ride={ride} />
        ))}
      </View>

      <View
        style={{
          alignItems: 'center',
          backgroundColor: colors.sage100,
          borderColor: colors.line,
          borderRadius: radius.md,
          borderWidth: 1,
          flexDirection: 'row',
          gap: 10,
          marginTop: 16,
          paddingHorizontal: 14,
          paddingVertical: 12,
        }}>
        <Text
          style={{
            color: colors.graphite950,
            fontSize: 16,
          }}>
          ▤
        </Text>
        <Text
          style={{
            color: colors.graphite950,
            flex: 1,
            fontSize: 12,
            fontWeight: '800',
          }}>
          07 RIDES · ₹1,240 TODAY
        </Text>
        <Text
          style={{
            color: colors.graphite950,
            fontSize: 18,
            fontWeight: '700',
          }}>
          ›
        </Text>
      </View>
    </ScrollView>
  );
}

function RideCard({ride}) {
  const isCancelled = ride.status === 'Cancelled';
  const dotColor = isCancelled ? colors.coral500 : colors.yellow500;

  return (
    <View
      style={{
        backgroundColor: colors.graphite950,
        borderRadius: radius.md,
        overflow: 'hidden',
        padding: 14,
      }}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            alignItems: 'center',
            marginRight: 12,
            width: 12,
          }}>
          <View
            style={{
              borderRadius: 6,
              borderWidth: 3,
              height: 12,
              width: 12,
              borderColor: dotColor,
            }}
          />
          <View
            style={{
              borderLeftColor: colors.graphite600,
              borderLeftWidth: 1,
              borderStyle: 'dashed',
              flex: 1,
              marginVertical: 4,
            }}
          />
          <View
            style={{
              borderColor: colors.ivory100,
              borderRadius: 6,
              borderWidth: 2,
              height: 12,
              width: 12,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: colors.white,
              fontSize: 16,
              fontWeight: '800',
            }}>
            {ride.pickup}
          </Text>
          <Text
            style={{
              color: colors.white,
              fontSize: 16,
              fontWeight: '800',
            }}>
            {ride.drop}
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: colors.graphite800,
          height: 1,
          marginVertical: 12,
        }}
      />

      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: colors.graphite400,
            fontSize: 11,
            fontWeight: '600',
          }}>
          {ride.duration
            ? `${ride.when} · ${ride.duration} · ₹${ride.fare}`
            : `${ride.when} · CANCELLED`}
        </Text>

        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            gap: 8,
          }}>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: colors.graphite800,
              borderRadius: radius.sm,
              gap: 3,
              paddingHorizontal: 8,
              paddingVertical: 6,
            }}>
            <Text
              style={[
                {
                  color: colors.green500,
                  fontSize: 12,
                  fontWeight: '800',
                },
                isCancelled && {
                  color: colors.coral500,
                },
              ]}>
              {isCancelled ? '✕' : '✓'}
            </Text>
            <Text
              style={[
                {
                  color: colors.green500,
                  fontSize: 8,
                  fontWeight: '800',
                  letterSpacing: 0.4,
                },
                isCancelled && {
                  color: colors.coral500,
                },
              ]}>
              {isCancelled ? 'CANCELLED' : 'COMPLETED'}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: colors.graphite800,
              borderRadius: radius.sm,
              height: 30,
              justifyContent: 'center',
              width: 30,
            }}>
            <Text
              style={{
                color: colors.white,
                fontSize: 16,
                fontWeight: '800',
              }}>
              ›
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          alignSelf: 'flex-start',
          backgroundColor: colors.graphite800,
          borderRadius: radius.sm,
          marginTop: 10,
          paddingHorizontal: 8,
          paddingVertical: 4,
        }}>
        <Text
          style={{
            color: colors.graphite400,
            fontSize: 9,
            fontWeight: '600',
            letterSpacing: 0.4,
          }}>
          TRIP ID: {ride.id}
        </Text>
      </View>
    </View>
  );
}

export default RidesScreen;
