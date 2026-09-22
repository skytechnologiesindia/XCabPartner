import React from 'react';
import {
  Pressable,
  Text,
  View,
} from 'react-native';

/**
 * PersonalDetailRow
 * Reusable row component for both read-only (verified) and editable profile fields.
 *
 * Props:
 * - icon: string ('user' | 'phone' | 'mail' | 'calendar' | 'gender' | 'location' | 'shield' | 'document' | 'idCard' | 'star' | 'checkCircle')
 * - label: string (e.g. "Full Name")
 * - value: string (e.g. "Raj Kumar")
 * - subValue: string (optional, e.g. "Jharkhand - 834001")
 * - editable: boolean (shows subtle pencil ✎ and chevron ›)
 * - verified: boolean (shows verified green tick badge)
 * - isLast: boolean (omits bottom divider line)
 * - onPress: callback for edit action
 */
function PersonalDetailRow({
  icon,
  label,
  value,
  subValue,
  editable = false,
  verified = false,
  isLast = false,
  onPress,
}) {
  const ContainerComponent = editable ? Pressable : View;

  return (
    <ContainerComponent
      style={({ pressed }) => [
        {
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          minHeight: 52,
          paddingVertical: 12,
        },
        !isLast && {
          borderBottomColor: '#F1EEE5',
          borderBottomWidth: 1,
        },
        editable &&
          pressed && {
            backgroundColor: '#FAF9F5',
            marginHorizontal: -8,
            paddingHorizontal: 8,
            borderRadius: 8,
          },
      ]}
      onPress={editable ? onPress : undefined}
      accessibilityRole={editable ? 'button' : 'text'}
      accessibilityLabel={`${label}: ${value}${subValue ? ', ' + subValue : ''}${
        verified ? ', Verified' : editable ? ', Editable' : ''
      }`}
    >
      {/* 1. Left Section: Outline Category Icon + Label */}
      <View
        style={{
          alignItems: 'center',
          flex: 1.1,
          flexDirection: 'row',
          marginRight: 8,
        }}>
        <View
          style={{
            alignItems: 'center',
            height: 24,
            justifyContent: 'center',
            marginRight: 10,
            width: 22,
          }}>
          <FieldIcon type={icon} />
        </View>
        <Text
          style={{
            color: '#687078',
            fontSize: 13.5,
            fontWeight: '400',
            letterSpacing: -0.1,
          }}
          numberOfLines={1}>
          {label}
        </Text>
      </View>

      {/* 2. Right Section: Field Value + Edit/Verified Indicator */}
      <View
        style={{
          alignItems: 'center',
          flex: 1.5,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#17191C',
              fontSize: 13.5,
              fontWeight: '600',
              letterSpacing: -0.15,
              textAlign: 'right',
            }}
            numberOfLines={2}>
            {value}
          </Text>
          {subValue ? (
            <Text
              style={{
                color: '#17191C',
                fontSize: 13.5,
                fontWeight: '600',
                letterSpacing: -0.15,
                marginTop: 2,
                textAlign: 'right',
              }}
              numberOfLines={1}>
              {subValue}
            </Text>
          ) : null}
        </View>

        {editable ? (
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              gap: 3,
              marginLeft: 8,
              paddingLeft: 2,
            }}>
            <Text
              style={{
                color: '#687078',
                fontSize: 12.5,
                fontWeight: '700',
              }}>
              ✎
            </Text>
            <Text
              style={{
                color: '#687078',
                fontSize: 17,
                fontWeight: '600',
                lineHeight: 18,
                marginTop: -1,
              }}>
              ›
            </Text>
          </View>
        ) : verified ? (
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#18A66A',
              borderRadius: 9,
              height: 18,
              justifyContent: 'center',
              marginLeft: 8,
              width: 18,
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 10.5,
                fontWeight: '900',
                lineHeight: 12,
                marginTop: -1,
              }}>
              ✓
            </Text>
          </View>
        ) : null}
      </View>
    </ContainerComponent>
  );
}

/**
 * Outline vector icons matching the XCAB design language
 */
function FieldIcon({ type }) {
  const iconColor = '#687078';

  switch (type) {
    case 'user':
    case 'gender':
      return (
        <View
          style={{
            alignItems: 'center',
            height: 18,
            justifyContent: 'center',
            width: 18,
          }}>
          <View
            style={{
              borderRadius: 4.5,
              borderWidth: 1.5,
              height: 8,
              marginBottom: 1.5,
              width: 8,
              borderColor: iconColor,
            }}
          />
          <View
            style={{
              borderBottomWidth: 0,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              borderWidth: 1.5,
              height: 6,
              width: 14,
              borderColor: iconColor,
            }}
          />
        </View>
      );

    case 'phone':
      return (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 13,
              transform: [{ rotate: '15deg' }],
              color: iconColor,
            }}>
            📞
          </Text>
        </View>
      );

    case 'mail':
    case 'email':
      return (
        <View
          style={{
            borderRadius: 2.5,
            borderWidth: 1.5,
            height: 14,
            justifyContent: 'flex-start',
            overflow: 'hidden',
            width: 18,
            borderColor: iconColor,
          }}>
          <View
            style={{
              borderBottomWidth: 1.5,
              borderRightWidth: 1.5,
              height: 9,
              marginHorizontal: 'auto',
              marginTop: -5,
              transform: [{ rotate: '45deg' }],
              width: 9,
              borderColor: iconColor,
            }}
          />
        </View>
      );

    case 'calendar':
    case 'dob':
      return (
        <View
          style={{
            borderRadius: 2.5,
            borderWidth: 1.5,
            height: 16,
            position: 'relative',
            width: 17,
            borderColor: iconColor,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              left: 2,
              position: 'absolute',
              right: 2,
              top: -3,
            }}>
            <View
              style={{
                borderRadius: 0.5,
                height: 3,
                width: 2,
                backgroundColor: iconColor,
              }}
            />
            <View
              style={{
                borderRadius: 0.5,
                height: 3,
                width: 2,
                backgroundColor: iconColor,
              }}
            />
          </View>
          <View
            style={{
              height: 2.5,
              marginTop: 2.5,
              width: '100%',
              backgroundColor: iconColor,
            }}
          />
        </View>
      );

    case 'location':
    case 'address':
      return (
        <View
          style={{
            alignItems: 'center',
            height: 18,
            justifyContent: 'center',
            width: 16,
          }}>
          <View
            style={{
              alignItems: 'center',
              borderRadius: 6.5,
              borderWidth: 1.5,
              height: 13,
              justifyContent: 'center',
              width: 13,
              borderColor: iconColor,
            }}>
            <View
              style={{
                borderRadius: 2,
                height: 4,
                width: 4,
                backgroundColor: iconColor,
              }}
            />
          </View>
          <View
            style={{
              borderLeftColor: 'transparent',
              borderLeftWidth: 3,
              borderRightColor: 'transparent',
              borderRightWidth: 3,
              borderTopWidth: 4,
              height: 0,
              marginTop: -1.5,
              width: 0,
              borderTopColor: iconColor,
            }}
          />
        </View>
      );

    case 'shield':
    case 'aadhaar':
      return (
        <View
          style={{
            alignItems: 'center',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
            borderWidth: 1.5,
            height: 16,
            justifyContent: 'center',
            width: 15,
            borderColor: iconColor,
          }}>
          <Text
            style={{
              fontSize: 9,
              fontWeight: '800',
              marginTop: -1,
              color: iconColor,
            }}>
            ✓
          </Text>
        </View>
      );

    case 'document':
    case 'pan':
      return (
        <View
          style={{
            borderRadius: 2,
            borderWidth: 1.5,
            height: 16,
            justifyContent: 'center',
            paddingHorizontal: 2,
            width: 14,
            borderColor: iconColor,
          }}>
          <View
            style={{
              borderRadius: 0.5,
              height: 1.5,
              marginBottom: 1.5,
              width: '100%',
              backgroundColor: iconColor,
            }}
          />
          <View
            style={{
              borderRadius: 0.5,
              height: 1.5,
              marginBottom: 1.5,
              width: '75%',
              backgroundColor: iconColor,
            }}
          />
          <View
            style={{
              borderRadius: 0.5,
              height: 1.5,
              marginBottom: 1.5,
              width: '50%',
              backgroundColor: iconColor,
            }}
          />
        </View>
      );

    case 'idCard':
    case 'driverId':
      return (
        <View
          style={{
            alignItems: 'center',
            borderRadius: 2.5,
            borderWidth: 1.5,
            flexDirection: 'row',
            height: 14,
            paddingHorizontal: 2,
            width: 18,
            borderColor: iconColor,
          }}>
          <View
            style={{
              borderRadius: 1,
              borderWidth: 1,
              height: 8,
              marginRight: 2,
              width: 5,
              borderColor: iconColor,
            }}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <View
              style={{
                borderRadius: 0.5,
                height: 1.5,
                marginBottom: 1.5,
                width: '100%',
                backgroundColor: iconColor,
              }}
            />
            <View
              style={{
                borderRadius: 0.5,
                height: 1.5,
                marginBottom: 1.5,
                width: '50%',
                backgroundColor: iconColor,
              }}
            />
          </View>
        </View>
      );

    case 'star':
      return (
        <Text
          style={{
            fontSize: 17,
            color: iconColor,
          }}>
          ☆
        </Text>
      );

    case 'checkCircle':
      return (
        <View
          style={{
            alignItems: 'center',
            borderRadius: 8,
            borderWidth: 1.5,
            height: 16,
            justifyContent: 'center',
            width: 16,
            borderColor: iconColor,
          }}>
          <Text
            style={{
              fontSize: 9.5,
              fontWeight: '800',
              marginTop: -1,
              color: iconColor,
            }}>
            ✓
          </Text>
        </View>
      );

    default:
      return (
        <Text
          style={{
            fontSize: 17,
            color: iconColor,
          }}>
          •
        </Text>
      );
  }
}

export default PersonalDetailRow;
