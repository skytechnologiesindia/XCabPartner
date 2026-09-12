import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { colors, radius } from '../../assets/colors/colors';

const chart = [
  { day: 'MON', height: 0.42 },
  { day: 'TUE', height: 0.58 },
  { day: 'WED', height: 0.7 },
  { day: 'THU', height: 1 },
  { day: 'FRI', height: 0.62 },
  { day: 'SAT', height: 0.5 },
  { day: 'SUN', height: 0.46 },
];

const transactions = [
  { id: 'XC-1048', when: 'Today, 08:45 PM', amount: '152' },
  { id: 'XC-1042', when: 'Today, 07:12 PM', amount: '196' },
  { id: 'XC-1036', when: 'Today, 05:30 PM', amount: '178' },
];

function EarningsScreen() {
  return (
    <ScrollView
      style={{
        backgroundColor: colors.ivory50,
        flex: 1,
      }}
      contentContainerStyle={{
        paddingBottom: 24,
        paddingHorizontal: 16,
        paddingTop: 16,
      }}
      showsVerticalScrollIndicator={false}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}>
        <Text
          style={{
            color: colors.graphite950,
            fontSize: 30,
            fontWeight: '900',
            letterSpacing: -0.5,
          }}>
          Earnings
        </Text>
        <Pressable
          style={{
            borderColor: colors.line,
            borderRadius: radius.sm,
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 7,
          }}>
          <Text
            style={{
              color: colors.graphite950,
              fontSize: 10,
              fontWeight: '700',
              letterSpacing: 0.4,
            }}>
            THIS WEEK
          </Text>
        </Pressable>
      </View>

      <View
        style={{
          backgroundColor: colors.graphite950,
          borderRadius: radius.md,
          marginBottom: 14,
          padding: 16,
        }}>
        <Text
          style={{
            color: colors.graphite400,
            fontSize: 10,
            fontWeight: '700',
            letterSpacing: 0.6,
          }}>
          TOTAL EARNINGS
        </Text>
        <Text
          style={{
            color: colors.white,
            fontSize: 34,
            fontWeight: '900',
            letterSpacing: -0.5,
            marginTop: 4,
          }}>
          ₹4,860
        </Text>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            gap: 6,
            marginBottom: 18,
            marginTop: 6,
          }}>
          <View
            style={{
              backgroundColor: colors.green500,
              borderRadius: 4,
              height: 7,
              width: 7,
            }}
          />
          <Text
            style={{
              color: colors.green500,
              fontSize: 10,
              fontWeight: '700',
              letterSpacing: 0.5,
            }}>
            AVAILABLE TO SETTLE
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            height: 88,
            justifyContent: 'space-between',
          }}>
          {chart.map(bar => (
            <View
              key={bar.day}
              style={{
                alignItems: 'center',
                flex: 1,
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  width: 14,
                }}>
                <View
                  style={[
                    {
                      backgroundColor: colors.graphite600,
                      width: '100%',
                      height: `${bar.height * 100}%`,
                    },
                    bar.day === 'THU' && {
                      backgroundColor: colors.yellow500,
                    },
                  ]}
                />
              </View>
              <Text
                style={{
                  color: colors.graphite400,
                  fontSize: 8,
                  fontWeight: '700',
                  marginTop: 8,
                }}>
                {bar.day}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View
        style={{
          backgroundColor: colors.sage100,
          borderColor: colors.line,
          borderRadius: radius.md,
          borderWidth: 1,
          flexDirection: 'row',
          marginBottom: 14,
          paddingVertical: 14,
        }}>
        <Stat value="32" label="RIDES" />
        <Stat value="₹152" label="AVG / TRIP" divider />
        <Stat value="26.4" label="HRS ONLINE" divider />
      </View>

      <View
        style={{
          alignItems: 'center',
          backgroundColor: colors.sage100,
          borderColor: colors.yellow600,
          borderRadius: radius.md,
          borderWidth: 1,
          flexDirection: 'row',
          gap: 12,
          marginBottom: 10,
          padding: 12,
        }}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: colors.yellow500,
            borderRadius: radius.sm,
            height: 36,
            justifyContent: 'center',
            width: 36,
          }}>
          <Text
            style={{
              color: colors.graphite950,
              fontSize: 16,
            }}>
            ▤
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Text
            style={{
              color: colors.graphite600,
              fontSize: 9,
              fontWeight: '800',
              letterSpacing: 0.4,
            }}>
            NEXT PAYOUT · MON 01 SEP
          </Text>
          <Text
            style={{
              color: colors.graphite950,
              fontSize: 13,
              fontWeight: '700',
              marginTop: 3,
            }}>
            PhonePe / UPI · •••• 4821
          </Text>
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [
          {
            alignItems: 'center',
            backgroundColor: colors.yellow500,
            borderColor: colors.graphite950,
            borderRadius: radius.sm,
            borderWidth: 1,
            height: 48,
            justifyContent: 'center',
            marginBottom: 22,
          },
          pressed && {
            backgroundColor: colors.yellow600,
          },
        ]}>
        <Text
          style={{
            color: colors.graphite950,
            fontSize: 14,
            fontWeight: '800',
          }}>
          View transactions
        </Text>
      </Pressable>

      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}>
        <Text
          style={{
            color: colors.graphite600,
            fontSize: 11,
            fontWeight: '800',
            letterSpacing: 0.6,
          }}>
          RECENT EARNINGS
        </Text>
        <Pressable>
          <Text
            style={{
              color: colors.graphite950,
              fontSize: 11,
              fontWeight: '700',
            }}>
            VIEW ALL ›
          </Text>
        </Pressable>
      </View>

      <View style={{gap: 10}}>
        {transactions.map(item => (
          <View
            key={item.id}
            style={{
              alignItems: 'center',
              backgroundColor: colors.sage100,
              borderColor: colors.line,
              borderRadius: radius.sm,
              borderWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 14,
              paddingVertical: 12,
            }}>
            <View>
              <Text
                style={{
                  color: colors.graphite950,
                  fontSize: 13,
                  fontWeight: '800',
                }}>
                {item.id}
              </Text>
              <Text
                style={{
                  color: colors.graphite600,
                  fontSize: 10,
                  marginTop: 3,
                }}>
                {item.when}
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                gap: 8,
              }}>
              <Text
                style={{
                  color: colors.graphite950,
                  fontSize: 14,
                  fontWeight: '800',
                }}>
                ₹{item.amount}
              </Text>
              <Text
                style={{
                  color: colors.graphite950,
                  fontSize: 16,
                  fontWeight: '700',
                }}>
                ›
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function Stat({ value, label, divider }) {
  return (
    <View
      style={[
        {
          alignItems: 'center',
          flex: 1,
        },
        divider && {
          borderLeftColor: colors.line,
          borderLeftWidth: 1,
        },
      ]}>
      <Text
        style={{
          color: colors.graphite950,
          fontSize: 18,
          fontWeight: '900',
        }}>
        {value}
      </Text>
      <Text
        style={{
          color: colors.graphite600,
          fontSize: 9,
          fontWeight: '700',
          letterSpacing: 0.4,
          marginTop: 4,
        }}>
        {label}
      </Text>
    </View>
  );
}

export default EarningsScreen;
