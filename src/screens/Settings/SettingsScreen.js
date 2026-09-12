import React, {useState} from 'react';
import {Pressable, ScrollView, Switch, Text, View} from 'react-native';
import {colors, radius} from '../../assets/colors/colors';

function SettingsScreen({onLogout}) {
  const [autoAccept, setAutoAccept] = useState(false);
  const [busyMode, setBusyMode] = useState(false);
  const [voiceGuidance, setVoiceGuidance] = useState(true);
  const [rideRequests, setRideRequests] = useState(true);
  const [payoutAlerts, setPayoutAlerts] = useState(true);

  return (
    <ScrollView
      style={{
        backgroundColor: colors.ivory50,
        flex: 1,
      }}
      contentContainerStyle={{
        paddingBottom: 24,
        paddingHorizontal: 16,
        paddingTop: 10,
      }}
      showsVerticalScrollIndicator={false}>
      <View
        style={{
          alignItems: 'flex-end',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}>
        <View
          style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: colors.graphite950,
              fontSize: 22,
              fontWeight: '900',
              letterSpacing: -0.4,
              lineHeight: 26,
            }}>
            XCAB
          </Text>
          <Text
            style={{
              color: colors.graphite600,
              fontSize: 8,
              letterSpacing: 0.6,
              marginBottom: 5,
              marginLeft: 5,
            }}>
            DRIVER
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            gap: 10,
          }}>
          <View
            style={{
              alignItems: 'center',
              height: 26,
              justifyContent: 'center',
              position: 'relative',
              width: 26,
            }}>
            <Text
              style={{
                color: colors.graphite950,
                fontSize: 20,
                lineHeight: 22,
                transform: [{rotate: '180deg'}],
              }}>
              ♧
            </Text>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: colors.yellow500,
                borderColor: colors.graphite950,
                borderRadius: 7,
                borderWidth: 1,
                height: 14,
                justifyContent: 'center',
                position: 'absolute',
                right: -2,
                top: -3,
                width: 14,
              }}>
              <Text
                style={{
                  color: colors.graphite950,
                  fontSize: 9,
                  fontWeight: '800',
                }}>
                2
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: colors.graphite950,
              borderRadius: radius.sm,
              height: 34,
              justifyContent: 'center',
              width: 34,
            }}>
            <Text
              style={{
                color: colors.white,
                fontSize: 16,
              }}>
              ⚙
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          marginBottom: 16,
        }}>
        <Text
          style={{
            color: colors.yellow500,
            fontSize: 11,
            marginRight: 6,
          }}>
          ●
        </Text>
        <Text
          style={{
            color: colors.graphite950,
            fontSize: 10,
            fontWeight: '700',
            letterSpacing: 0.4,
          }}>
          RANCHI · CURRENT AREA
        </Text>
        <Text
          style={{
            color: colors.graphite950,
            fontSize: 13,
            marginLeft: 8,
            marginTop: -3,
          }}>
          ⌄
        </Text>
      </View>

      <Text
        style={{
          color: colors.graphite950,
          fontSize: 30,
          fontWeight: '900',
          letterSpacing: -0.5,
          marginBottom: 18,
        }}>
        Settings
      </Text>

      <Section icon="◉" label="AVAILABILITY">
        <ToggleRow
          label="Auto-accept rides"
          value={autoAccept}
          onValueChange={setAutoAccept}
        />
        <ToggleRow
          label="Busy mode"
          value={busyMode}
          onValueChange={setBusyMode}
        />
      </Section>

      <Section icon="◈" label="NAVIGATION">
        <LinkRow label="Preferred map" value="Google Maps" />
        <ToggleRow
          label="Voice guidance"
          value={voiceGuidance}
          onValueChange={setVoiceGuidance}
        />
      </Section>

      <Section icon="♧" label="NOTIFICATIONS">
        <ToggleRow
          label="Ride requests"
          value={rideRequests}
          onValueChange={setRideRequests}
        />
        <ToggleRow
          label="Payout alerts"
          value={payoutAlerts}
          onValueChange={setPayoutAlerts}
        />
      </Section>

      <Section icon="◐" label="ACCOUNT">
        <LinkRow label="Personal details" />
        <LinkRow label="Vehicle & documents" />
        <LinkRow label="Payout account" />
      </Section>

      <Section icon="◑" label="SUPPORT">
        <LinkRow label="Help center" />
        <LinkRow label="Contact operations" />
      </Section>

      <View
        style={{
          alignItems: 'center',
          backgroundColor: colors.sage100,
          borderColor: colors.line,
          borderRadius: radius.md,
          borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
          paddingHorizontal: 12,
          paddingVertical: 12,
        }}>
        <Text
          style={{
            color: colors.graphite600,
            fontSize: 10,
            fontWeight: '700',
            letterSpacing: 0.4,
          }}>
          DRIVER ACCESS · APP VERSION 1.0.0
        </Text>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: colors.yellow500,
            borderRadius: 9,
            height: 18,
            justifyContent: 'center',
            width: 18,
          }}>
          <Text
            style={{
              color: colors.graphite950,
              fontSize: 11,
              fontWeight: '800',
            }}>
            i
          </Text>
        </View>
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
        }}
        onPress={onLogout}>
        <Text
          style={{
            color: colors.graphite950,
            fontSize: 14,
            fontWeight: '800',
          }}>
          →
        </Text>
        <Text
          style={{
            color: colors.graphite950,
            fontSize: 13,
            fontWeight: '800',
          }}>
          Log out
        </Text>
      </Pressable>
    </ScrollView>
  );
}

function Section({icon, label, children}) {
  return (
    <View style={{marginBottom: 14}}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: colors.graphite950,
          flexDirection: 'row',
          gap: 8,
          paddingHorizontal: 12,
          paddingVertical: 9,
        }}>
        <Text
          style={{
            color: colors.yellow500,
            fontSize: 12,
          }}>
          {icon}
        </Text>
        <Text
          style={{
            color: colors.white,
            fontSize: 10,
            fontWeight: '800',
            letterSpacing: 0.7,
          }}>
          {label}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: colors.sage100,
          borderColor: colors.line,
          borderTopWidth: 0,
          borderWidth: 1,
        }}>
        {children}
      </View>
    </View>
  );
}

function ToggleRow({label, value, onValueChange}) {
  return (
    <View
      style={{
        alignItems: 'center',
        borderTopColor: colors.line,
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 13,
      }}>
      <Text
        style={{
          color: colors.graphite950,
          fontSize: 13,
          fontWeight: '600',
        }}>
        {label}
      </Text>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          gap: 8,
        }}>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{false: colors.sage200, true: colors.yellow500}}
          thumbColor={value ? colors.graphite950 : colors.white}
        />
        <Text
          style={{
            color: colors.graphite600,
            fontSize: 10,
            fontWeight: '700',
            letterSpacing: 0.4,
          }}>
          {value ? 'ON' : 'OFF'}
        </Text>
      </View>
    </View>
  );
}

function LinkRow({label, value}) {
  return (
    <Pressable
      style={{
        alignItems: 'center',
        borderTopColor: colors.line,
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 13,
      }}>
      <Text
        style={{
          color: colors.graphite950,
          fontSize: 13,
          fontWeight: '600',
        }}>
        {label}
      </Text>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          gap: 8,
        }}>
        {value ? (
          <Text
            style={{
              color: colors.graphite600,
              fontSize: 12,
              fontWeight: '600',
            }}>
            {value}
          </Text>
        ) : null}
        <Text
          style={{
            color: colors.graphite950,
            fontSize: 16,
            fontWeight: '700',
          }}>
          ›
        </Text>
      </View>
    </Pressable>
  );
}

export default SettingsScreen;
