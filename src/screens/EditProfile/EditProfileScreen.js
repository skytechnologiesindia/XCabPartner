import React, {useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {colors, radius} from '../../assets/colors/colors';

function EditProfileScreen({onBack, onSave, onCancel}) {
  const [fullName, setFullName] = useState('Raj Kumar');
  const [city, setCity] = useState('Ranchi');
  const [vehicle, setVehicle] = useState('White Sedan');
  const [registration, setRegistration] = useState('JH 01 AB 4821');
  const [contactName, setContactName] = useState('Anita Kumar');

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
          alignItems: 'center',
          flexDirection: 'row',
          marginBottom: 8,
        }}>
        <Pressable
          style={{
            alignItems: 'center',
            height: 34,
            justifyContent: 'center',
            width: 28,
          }}
          onPress={onBack}
          hitSlop={8}>
          <Text
            style={{
              color: colors.graphite950,
              fontSize: 20,
              fontWeight: '700',
            }}>
            ←
          </Text>
        </Pressable>
        <View
          style={{
            alignItems: 'flex-end',
            flex: 1,
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
              borderRadius: 17,
              height: 34,
              justifyContent: 'center',
              width: 34,
            }}>
            <Text
              style={{
                color: colors.white,
                fontSize: 14,
                fontWeight: '800',
              }}>
              N
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
        Edit profile
      </Text>

      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          gap: 16,
          marginBottom: 20,
        }}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: colors.sage100,
            borderColor: colors.line,
            borderRadius: radius.sm,
            borderWidth: 1,
            height: 72,
            justifyContent: 'flex-end',
            overflow: 'hidden',
            width: 72,
          }}>
          <View
            style={{
              borderColor: colors.graphite600,
              borderRadius: 10,
              borderWidth: 2,
              height: 18,
              marginBottom: 4,
              width: 18,
            }}
          />
          <View
            style={{
              borderColor: colors.graphite600,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              borderTopWidth: 2,
              height: 14,
              width: 36,
            }}
          />
        </View>
        <Pressable
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            gap: 8,
          }}>
          <Text
            style={{
              alignItems: 'center',
              backgroundColor: colors.yellow500,
              borderColor: colors.graphite950,
              borderRadius: radius.sm,
              borderWidth: 1,
              fontSize: 11,
              height: 22,
              lineHeight: 20,
              textAlign: 'center',
              width: 22,
            }}>
            ✎
          </Text>
          <Text
            style={{
              color: colors.graphite950,
              fontSize: 11,
              fontWeight: '800',
              letterSpacing: 0.5,
            }}>
            CHANGE PHOTO
          </Text>
        </Pressable>
      </View>

      <Field label="FULL NAME" value={fullName} onChangeText={setFullName} />
      <Field
        label="PHONE NUMBER"
        value="+91 98••• 4821"
        editable={false}
        badge="VERIFIED"
      />
      <Field label="CITY" value={city} onChangeText={setCity} />

      <Text
        style={{
          color: colors.graphite950,
          fontSize: 13,
          fontWeight: '800',
          letterSpacing: 0.3,
          marginBottom: 8,
          marginTop: 8,
        }}>
        VEHICLE DETAILS
      </Text>
      <Field label="VEHICLE" value={vehicle} onChangeText={setVehicle} />
      <Field
        label="REGISTRATION"
        value={registration}
        onChangeText={setRegistration}
      />

      <Text
        style={{
          color: colors.graphite950,
          fontSize: 13,
          fontWeight: '800',
          letterSpacing: 0.3,
          marginBottom: 8,
          marginTop: 8,
        }}>
        EMERGENCY CONTACT
      </Text>
      <Field
        label="CONTACT NAME"
        value={contactName}
        onChangeText={setContactName}
      />
      <Field
        label="CONTACT NUMBER"
        value="+91 87••• 1048"
        editable={false}
      />

      <Pressable
        style={{
          alignItems: 'center',
          backgroundColor: colors.yellow500,
          borderColor: colors.graphite950,
          borderRadius: radius.sm,
          borderWidth: 1,
          height: 52,
          justifyContent: 'center',
          marginBottom: 10,
          marginTop: 8,
        }}
        onPress={onSave}>
        <Text
          style={{
            color: colors.graphite950,
            fontSize: 15,
            fontWeight: '800',
          }}>
          Save changes
        </Text>
      </Pressable>
      <Pressable
        style={{
          alignItems: 'center',
          borderColor: colors.line,
          borderRadius: radius.sm,
          borderWidth: 1,
          height: 48,
          justifyContent: 'center',
        }}
        onPress={onCancel}>
        <Text
          style={{
            color: colors.graphite950,
            fontSize: 14,
            fontWeight: '700',
          }}>
          Cancel
        </Text>
      </Pressable>
    </ScrollView>
  );
}

function Field({label, value, onChangeText, editable = true, badge}) {
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: colors.sage100,
        borderColor: colors.line,
        borderRadius: radius.sm,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
      }}>
      <View style={{flex: 1}}>
        <Text
          style={{
            color: colors.graphite600,
            fontSize: 9,
            fontWeight: '700',
            letterSpacing: 0.6,
            marginBottom: 4,
          }}>
          {label}
        </Text>
        <Text
          style={{
            color: colors.graphite950,
            fontSize: 15,
            fontWeight: '700',
          }}>
          {value}
        </Text>
        {badge ? (
          <View
            style={{
              alignItems: 'center',
              alignSelf: 'flex-start',
              backgroundColor: colors.yellow500,
              borderRadius: radius.sm,
              flexDirection: 'row',
              gap: 5,
              marginTop: 8,
              paddingHorizontal: 8,
              paddingVertical: 4,
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
                fontSize: 9,
                fontWeight: '800',
                letterSpacing: 0.4,
              }}>
              {badge}
            </Text>
          </View>
        ) : null}
      </View>
      {editable ? (
        <Pressable
          style={{
            alignItems: 'center',
            height: 26,
            justifyContent: 'center',
            width: 26,
          }}
          hitSlop={8}>
          <Text
            style={{
              color: colors.graphite950,
              fontSize: 14,
            }}>
            ✎
          </Text>
        </Pressable>
      ) : (
        <View
          style={{
            alignItems: 'center',
            height: 26,
            justifyContent: 'center',
            width: 26,
          }}>
          <Text
            style={{
              color: colors.graphite950,
              fontSize: 14,
            }}>
            ✎
          </Text>
        </View>
      )}
    </View>
  );
}

export default EditProfileScreen;
