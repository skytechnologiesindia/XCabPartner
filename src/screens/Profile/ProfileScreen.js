import React from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {colors, radius} from '../../assets/colors/colors';

const menuItems = [
  {icon: '⛶', label: 'Personal details'},
  {icon: '🚗', label: 'Vehicle & documents'},
  {icon: '▤', label: 'Payout account'},
  {icon: '☎', label: 'Emergency contact'},
  {icon: '⛨', label: 'Help & safety'},
  {icon: '⚙', label: 'Settings'},
];

function ProfileScreen({onEditProfile, onGoOffline, onOpenSettings}) {
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
          fontSize: 30,
          fontWeight: '900',
          letterSpacing: -0.5,
          marginBottom: 16,
        }}>
        Profile
      </Text>

      <View
        style={{
          backgroundColor: colors.graphite950,
          borderRadius: radius.md,
          marginBottom: 14,
          padding: 16,
        }}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: colors.graphite800,
            borderRadius: 28,
            height: 56,
            justifyContent: 'flex-end',
            marginBottom: 12,
            overflow: 'hidden',
            width: 56,
          }}>
          <View
            style={{
              backgroundColor: colors.graphite600,
              borderRadius: 10,
              height: 20,
              marginBottom: 4,
              width: 20,
            }}
          />
          <View
            style={{
              backgroundColor: colors.graphite600,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              height: 20,
              width: 40,
            }}
          />
        </View>
        <Text
          style={{
            color: colors.white,
            fontSize: 20,
            fontWeight: '800',
          }}>
          Raj Kumar
        </Text>
        <Text
          style={{
            color: colors.graphite400,
            fontSize: 12,
            marginTop: 4,
          }}>
          +91 98••• 4821
        </Text>

        <View
          style={{
            alignItems: 'center',
            alignSelf: 'flex-start',
            backgroundColor: colors.yellow500,
            borderRadius: radius.sm,
            flexDirection: 'row',
            gap: 5,
            marginTop: 12,
            paddingHorizontal: 8,
            paddingVertical: 5,
          }}>
          <Text
            style={{
              color: colors.graphite950,
              fontSize: 10,
              fontWeight: '900',
            }}>
            ✓
          </Text>
          <Text
            style={{
              color: colors.graphite950,
              fontSize: 10,
              fontWeight: '800',
              letterSpacing: 0.5,
            }}>
            VERIFIED DRIVER
          </Text>
        </View>

        <View
          style={{
            backgroundColor: colors.graphite800,
            height: 1,
            marginVertical: 14,
          }}
        />

        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            gap: 8,
          }}>
          <Text style={{fontSize: 13}}>🚗</Text>
          <Text
            style={{
              color: colors.graphite400,
              fontSize: 12,
              fontWeight: '600',
            }}>
            White Sedan · JH 01 AB 4821
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: colors.sage100,
          borderColor: colors.line,
          borderRadius: radius.md,
          borderWidth: 1,
          flexDirection: 'row',
          marginBottom: 16,
          paddingVertical: 14,
        }}>
        <Stat value="142" label="TRIPS" />
        <Stat value="₹18,420" label="EARNED" divider />
        <Stat value="4.8" label="HRS AVG ONLINE" divider />
      </View>

      <View
        style={{
          gap: 8,
          marginBottom: 18,
        }}>
        {menuItems.map(item => (
          <Pressable
            key={item.label}
            style={{
              alignItems: 'center',
              backgroundColor: colors.sage100,
              borderColor: colors.line,
              borderRadius: radius.sm,
              borderWidth: 1,
              flexDirection: 'row',
              gap: 12,
              paddingHorizontal: 12,
              paddingVertical: 12,
            }}
            onPress={item.label === 'Settings' ? onOpenSettings : undefined}>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: colors.graphite950,
                borderRadius: radius.sm,
                height: 32,
                justifyContent: 'center',
                width: 32,
              }}>
              <Text style={{fontSize: 14}}>{item.icon}</Text>
            </View>
            <Text
              style={{
                color: colors.graphite950,
                flex: 1,
                fontSize: 13,
                fontWeight: '700',
              }}>
              {item.label}
            </Text>
            <Text
              style={{
                color: colors.graphite950,
                fontSize: 16,
                fontWeight: '700',
              }}>
              ›
            </Text>
          </Pressable>
        ))}
      </View>

      <View
        style={{
          flexDirection: 'row',
          gap: 10,
        }}>
        <Pressable
          style={{
            alignItems: 'center',
            backgroundColor: colors.yellow500,
            borderColor: colors.graphite950,
            borderRadius: radius.sm,
            borderWidth: 1,
            flex: 1,
            flexDirection: 'row',
            gap: 8,
            height: 48,
            justifyContent: 'center',
          }}
          onPress={onEditProfile}>
          <Text
            style={{
              color: colors.graphite950,
              fontSize: 14,
            }}>
            ✎
          </Text>
          <Text
            style={{
              color: colors.graphite950,
              fontSize: 13,
              fontWeight: '800',
            }}>
            Edit profile
          </Text>
        </Pressable>
        <Pressable
          style={{
            alignItems: 'center',
            borderColor: colors.graphite950,
            borderRadius: radius.sm,
            borderWidth: 1,
            flex: 1,
            flexDirection: 'row',
            gap: 8,
            height: 48,
            justifyContent: 'center',
          }}
          onPress={onGoOffline}>
          <Text
            style={{
              color: colors.graphite950,
              fontSize: 14,
            }}>
            ⏻
          </Text>
          <Text
            style={{
              color: colors.graphite950,
              fontSize: 13,
              fontWeight: '800',
            }}>
            Go offline
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function Stat({value, label, divider}) {
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
          fontSize: 17,
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

export default ProfileScreen;
