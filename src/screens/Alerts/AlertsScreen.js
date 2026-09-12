import React, {useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {colors, radius} from '../../assets/colors/colors';

const filters = ['All', 'Trips', 'Payouts'];

const alerts = [
  {
    id: 1,
    category: 'Trips',
    barColor: colors.yellow500,
    title: 'New ride request',
    detailTitle: 'Pickup in 4 min',
    time: 'NOW',
    lines: [
      {icon: '●', text: 'Main Road, Ranchi'},
      {icon: '○', text: 'Lalpur Market'},
    ],
  },
  {
    id: 2,
    category: 'Payouts',
    barColor: colors.graphite400,
    title: 'Settlement confirmed',
    detailTitle: 'Trip XC-1048',
    time: '12 min ago',
    lines: [
      {icon: '₹', text: 'Payout of ₹180 credited'},
      {icon: '', text: 'Wallet Balance: ₹1,248'},
    ],
  },
  {
    id: 3,
    category: 'Trips',
    barColor: colors.coral500,
    title: 'Documents expire in 14 days',
    detailTitle: 'Update RC',
    time: 'YESTERDAY',
    lines: [
      {icon: '⚠', text: 'Vehicle RC will expire on 24 May 2025'},
      {icon: '', text: 'Update now to avoid disruptions'},
    ],
  },
  {
    id: 4,
    category: 'Trips',
    barColor: colors.green500,
    title: 'High demand zone',
    detailTitle: 'Morabadi',
    time: 'MON 08:20',
    lines: [
      {icon: '↗', text: 'Higher earnings expected in your area'},
      {icon: '', text: '7:00 PM – 10:00 PM'},
    ],
  },
];

function AlertsScreen() {
  const [activeFilter, setActiveFilter] = useState('All');

  const visibleAlerts =
    activeFilter === 'All'
      ? alerts
      : alerts.filter(alert => alert.category === activeFilter);

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
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          gap: 10,
          marginBottom: 16,
        }}>
        <Text
          style={{
            color: colors.graphite950,
            fontSize: 30,
            fontWeight: '900',
            letterSpacing: -0.5,
          }}>
          Alerts
        </Text>
        <View
          style={{
            backgroundColor: colors.yellow500,
            borderRadius: radius.sm,
            paddingHorizontal: 8,
            paddingVertical: 4,
          }}>
          <Text
            style={{
              color: colors.graphite950,
              fontSize: 12,
              fontWeight: '800',
            }}>
            02
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          marginBottom: 16,
        }}>
        {filters.map(filter => {
          const isActive = filter === activeFilter;
          return (
            <Pressable
              key={filter}
              style={[
                {
                  backgroundColor: colors.sage100,
                  borderColor: colors.line,
                  borderRadius: radius.sm,
                  borderWidth: 1,
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                },
                isActive && {
                  backgroundColor: colors.graphite950,
                  borderColor: colors.graphite950,
                },
              ]}
              onPress={() => setActiveFilter(filter)}>
              <Text
                style={[
                  {
                    color: colors.graphite950,
                    fontSize: 12,
                    fontWeight: '700',
                  },
                  isActive && {
                    color: colors.white,
                  },
                ]}>
                {filter}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View
        style={{
          gap: 12,
          marginBottom: 18,
        }}>
        {visibleAlerts.map(alert => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </View>

      <Pressable
        style={{
          alignItems: 'center',
          borderColor: colors.line,
          borderRadius: radius.sm,
          borderWidth: 1,
          flexDirection: 'row',
          gap: 8,
          height: 48,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: colors.graphite950,
            fontSize: 14,
          }}>
          ♬
        </Text>
        <Text
          style={{
            color: colors.graphite950,
            fontSize: 13,
            fontWeight: '700',
          }}>
          Mark all as read
        </Text>
      </Pressable>
    </ScrollView>
  );
}

function AlertCard({alert}) {
  return (
    <View
      style={{
        backgroundColor: colors.sage100,
        borderColor: colors.line,
        borderRadius: radius.md,
        borderWidth: 1,
        flexDirection: 'row',
        overflow: 'hidden',
      }}>
      <View
        style={{
          width: 5,
          backgroundColor: alert.barColor,
        }}
      />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 12,
          paddingVertical: 12,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}>
          <Text
            style={{
              color: colors.graphite950,
              flex: 1,
              fontSize: 13,
              fontWeight: '700',
              marginRight: 8,
            }}
            numberOfLines={1}>
            {alert.title} ·{' '}
            <Text style={{fontWeight: '800'}}>{alert.detailTitle}</Text>
          </Text>
          <Text
            style={{
              color: colors.graphite600,
              fontSize: 9,
              fontWeight: '700',
              letterSpacing: 0.4,
            }}>
            {alert.time}
          </Text>
        </View>

        <View style={{gap: 4}}>
          {alert.lines.map((line, index) => (
            <View
              key={index}
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                gap: 6,
              }}>
              {line.icon ? (
                <Text
                  style={{
                    color: colors.graphite600,
                    fontSize: 10,
                    width: 12,
                  }}>
                  {line.icon}
                </Text>
              ) : null}
              <Text
                style={{
                  color: colors.graphite600,
                  fontSize: 11,
                }}>
                {line.text}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingRight: 12,
        }}>
        <Text
          style={{
            alignItems: 'center',
            backgroundColor: colors.graphite950,
            borderRadius: radius.sm,
            color: colors.white,
            fontSize: 18,
            fontWeight: '800',
            height: 30,
            lineHeight: 30,
            textAlign: 'center',
            width: 30,
          }}>
          ›
        </Text>
      </View>
    </View>
  );
}

export default AlertsScreen;
