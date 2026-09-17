import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import {colors} from '../../assets/colors/colors';
import {icons} from '../../assets/icons';
import ConfirmLocationModal from './ConfirmLocationModal';

const fontSans = Platform.select({
  ios: 'System',
  android: 'sans-serif',
});

function AtPickupSheet({
  riderName = 'Aarav M.',
  rating = '4.8 (120)',
  riderSubtitle = 'Rider · Cash | ₹180',
  pickupLocation = 'Main Road, Ranchi',
  dropLocation = 'Lalpur Market, Ranchi',
  initialSeconds = 134, // 02:14 in seconds
  isLocationConfirmed: propIsConfirmed,
  onLocationConfirmed,
  onEnterPin,
  onCantFind,
  onCallRider,
  onMessageRider,
  onOpenInMaps,
}) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const isLocationConfirmed =
    propIsConfirmed !== undefined ? propIsConfirmed : isConfirmed;

  const handleConfirmLocation = () => {
    setConfirmModalVisible(false);
    setIsConfirmed(true);
    if (onLocationConfirmed) {
      onLocationConfirmed();
    }
  };

  // Live waiting timer incrementing every second
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = totalSec => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    const pad = n => (n < 10 ? `0${n}` : `${n}`);
    return `${pad(mins)}:${pad(secs)}`;
  };

  return (
    <View
      style={{
        backgroundColor: '#FAF8F1',
        borderColor: '#ECE5D6',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        borderTopWidth: 1,
        elevation: 10,
        marginTop: 0,
        paddingBottom: 8,
        paddingHorizontal: 16,
        paddingTop: 12,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -6},
        shadowOpacity: 0.12,
        shadowRadius: 12,
        width: '100%',
        zIndex: 20,
      }}>
      {/* Top Header: Badge, Heading, and Waiting Timer Card */}
      <View
        style={{
          alignItems: 'flex-start',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 6,
        }}>
        <View
          style={{
            flex: 1,
            marginRight: 10,
          }}>
          <View
            style={{
              alignSelf: 'flex-start',
              backgroundColor: '#FDE047',
              borderRadius: 8,
              marginBottom: 4,
              paddingHorizontal: 8,
              paddingVertical: 3,
            }}>
            <Text
              style={{
                color: '#111315',
                fontFamily: fontSans,
                fontSize: 10,
                fontWeight: '800',
                letterSpacing: 0.4,
              }}>
              AT PICKUP
            </Text>
          </View>
          <Text
            style={{
              color: '#111315',
              fontFamily: fontSans,
              fontSize: 18,
              fontWeight: '800',
              letterSpacing: -0.3,
            }}>
            You’re at the pickup point
          </Text>
          <Text
            style={{
              color: '#6B7280',
              fontFamily: fontSans,
              fontSize: 11,
              marginTop: 2,
            }}>
            Wait for {riderName} to arrive before starting the trip.
          </Text>
        </View>

        {/* Waiting Timer Card */}
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#FAF5EA',
            borderColor: '#EFE6D4',
            borderRadius: 14,
            borderWidth: 1,
            justifyContent: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.03,
            shadowRadius: 2,
            elevation: 1,
          }}>
          <Text
            style={{
              color: '#9CA3AF',
              fontFamily: fontSans,
              fontSize: 8,
              fontWeight: '800',
              letterSpacing: 0.5,
            }}>
            WAITING
          </Text>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 1,
            }}>
            <Image
              source={icons.statClock}
              style={{
                height: 14,
                marginRight: 4,
                resizeMode: 'contain',
                tintColor: '#111315',
                width: 14,
              }}
            />
            <Text
              style={{
                color: '#111315',
                fontFamily: fontSans,
                fontSize: 16,
                fontWeight: '900',
                letterSpacing: 0.2,
              }}>
              {formatTimer(seconds)}
            </Text>
          </View>
          <Text
            style={{
              color: '#9CA3AF',
              fontFamily: fontSans,
              fontSize: 8.5,
              fontWeight: '500',
              marginTop: 1,
            }}>
            min
          </Text>
        </View>
      </View>

      {/* Trip Route Timeline & Open in Maps Button */}
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          marginBottom: 6,
          marginTop: 0,
          paddingLeft: 4,
        }}>
        {/* Timeline Visual Track */}
        <View
          style={{
            alignItems: 'center',
            marginRight: 10,
            width: 16,
          }}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: colors.yellow500 || '#FFD21A',
              borderRadius: 7,
              borderWidth: 3,
              height: 14,
              width: 14,
            }}
          />
          <View
            style={{
              backgroundColor: '#B5AFA2',
              borderRadius: 1,
              height: 4,
              marginVertical: 2,
              width: 2,
            }}
          />
          <View
            style={{
              backgroundColor: '#B5AFA2',
              borderRadius: 1,
              height: 4,
              marginVertical: 2,
              width: 2,
            }}
          />
          <View
            style={{
              backgroundColor: '#B5AFA2',
              borderRadius: 1,
              height: 4,
              marginVertical: 2,
              width: 2,
            }}
          />
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: '#E87861',
              borderRadius: 2,
              borderWidth: 3,
              height: 12,
              width: 12,
            }}
          />
        </View>

        {/* Addresses */}
        <View style={{flex: 1}}>
          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                color: '#9CA3AF',
                fontFamily: fontSans,
                fontSize: 9,
                fontWeight: '800',
                letterSpacing: 0.6,
              }}>
              PICKUP
            </Text>
            <Text
              style={{
                color: '#111315',
                fontFamily: fontSans,
                fontSize: 13.5,
                fontWeight: '700',
                marginTop: 1,
              }}
              numberOfLines={1}>
              {pickupLocation}
            </Text>
          </View>

          <View style={{justifyContent: 'center', marginTop: 8}}>
            <Text
              style={{
                color: '#9CA3AF',
                fontFamily: fontSans,
                fontSize: 9,
                fontWeight: '800',
                letterSpacing: 0.6,
              }}>
              DROP
            </Text>
            <Text
              style={{
                color: '#111315',
                fontFamily: fontSans,
                fontSize: 13.5,
                fontWeight: '700',
                marginTop: 1,
              }}
              numberOfLines={1}>
              {dropLocation}
            </Text>
          </View>
        </View>

        {/* Open in Maps Button */}
        <Pressable
          style={{
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderColor: '#E2DCD2',
            borderRadius: 12,
            borderWidth: 1,
            flexDirection: 'row',
            gap: 6,
            marginLeft: 8,
            paddingHorizontal: 11,
            paddingVertical: 8,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.04,
            shadowRadius: 2,
            elevation: 1,
          }}
          onPress={onOpenInMaps}
          accessibilityRole="button"
          accessibilityLabel="Open in Maps">
          <Image
            source={icons.pinDark}
            style={{
              height: 14,
              resizeMode: 'contain',
              tintColor: '#111315',
              width: 14,
            }}
          />
          <Text
            style={{
              color: '#111315',
              fontFamily: fontSans,
              fontSize: 11.5,
              fontWeight: '700',
            }}>
            Open in Maps
          </Text>
        </Pressable>
      </View>

      {/* Rider Info Card */}
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#F5F2E8',
          borderColor: '#E8E1D2',
          borderRadius: 16,
          borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 6,
          paddingHorizontal: 12,
          paddingVertical: 7,
        }}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#EBE6DC',
              borderRadius: 17,
              height: 34,
              justifyContent: 'center',
              width: 34,
            }}>
            <Text
              style={{
                color: '#111315',
                fontFamily: fontSans,
                fontSize: 14.5,
                fontWeight: '800',
              }}>
              {riderName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={{marginLeft: 10}}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: '#111315',
                  fontFamily: fontSans,
                  fontSize: 14,
                  fontWeight: '700',
                }}>
                {riderName}
              </Text>
              <Text
                style={{
                  color: '#EAB308',
                  fontSize: 11.5,
                  marginLeft: 6,
                  marginRight: 3,
                }}>
                ★
              </Text>
              <Text
                style={{
                  color: '#6B7280',
                  fontFamily: fontSans,
                  fontSize: 11.5,
                  fontWeight: '600',
                }}>
                {rating}
              </Text>
            </View>
            <Text
              style={{
                color: '#6B7280',
                fontFamily: fontSans,
                fontSize: 11,
                marginTop: 1,
              }}>
              {riderSubtitle}
            </Text>
          </View>
        </View>

        {/* Call & Message Action Buttons */}
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
          }}>
          <Pressable
            style={{
              alignItems: 'center',
            }}
            onPress={onCallRider}
            accessibilityRole="button"
            accessibilityLabel="Call Rider">
            <View
              style={{
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderColor: '#E2DCD2',
                borderRadius: 17,
                borderWidth: 1,
                height: 34,
                justifyContent: 'center',
                width: 34,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 1,
              }}>
              <Image
                source={icons.phone}
                style={{
                  height: 14,
                  resizeMode: 'contain',
                  tintColor: '#111315',
                  width: 14,
                }}
              />
            </View>
            <Text
              style={{
                color: '#6B7280',
                fontFamily: fontSans,
                fontSize: 9,
                fontWeight: '600',
                marginTop: 1,
              }}>
              Call
            </Text>
          </Pressable>

          <Pressable
            style={{
              alignItems: 'center',
            }}
            onPress={onMessageRider}
            accessibilityRole="button"
            accessibilityLabel="Message Rider">
            <View
              style={{
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderColor: '#E2DCD2',
                borderRadius: 17,
                borderWidth: 1,
                height: 34,
                justifyContent: 'center',
                width: 34,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 1,
              }}>
              <Image
                source={icons.chat}
                style={{
                  height: 14,
                  resizeMode: 'contain',
                  tintColor: '#111315',
                  width: 14,
                }}
              />
            </View>
            <Text
              style={{
                color: '#6B7280',
                fontFamily: fontSans,
                fontSize: 9,
                fontWeight: '600',
                marginTop: 1,
              }}>
              Message
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Primary Action Button: 'I am on location' vs 'Enter trip PIN' */}
      {!isLocationConfirmed ? (
        <Pressable
          style={({pressed}) => [
            {
              alignItems: 'center',
              backgroundColor: colors.yellow500 || '#FFD21A',
              borderRadius: 14,
              flexDirection: 'row',
              height: 44,
              justifyContent: 'center',
              marginBottom: 6,
              position: 'relative',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.08,
              shadowRadius: 2,
              elevation: 2,
            },
            pressed && {
              backgroundColor: colors.yellow600 || '#E9B900',
              opacity: 0.92,
            },
          ]}
          onPress={() => setConfirmModalVisible(true)}
          accessibilityRole="button"
          accessibilityLabel="I am on location">
          <Image
            source={icons.pinDark}
            style={{
              height: 15,
              marginRight: 8,
              resizeMode: 'contain',
              tintColor: '#111315',
              width: 15,
            }}
          />
          <Text
            style={{
              color: '#111315',
              fontFamily: fontSans,
              fontSize: 14.5,
              fontWeight: '800',
              letterSpacing: 0.2,
            }}>
            I am on location
          </Text>
          <Image
            source={icons.chevronRight}
            style={{
              height: 12,
              position: 'absolute',
              resizeMode: 'contain',
              right: 18,
              tintColor: '#111315',
              width: 12,
            }}
          />
        </Pressable>
      ) : (
        <Pressable
          style={({pressed}) => [
            {
              alignItems: 'center',
              backgroundColor: colors.yellow500 || '#FFD21A',
              borderRadius: 14,
              flexDirection: 'row',
              height: 44,
              justifyContent: 'center',
              marginBottom: 6,
              position: 'relative',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.08,
              shadowRadius: 2,
              elevation: 2,
            },
            pressed && {
              backgroundColor: colors.yellow600 || '#E9B900',
              opacity: 0.92,
            },
          ]}
          onPress={onEnterPin}
          accessibilityRole="button"
          accessibilityLabel="Enter Trip PIN">
          <Text
            style={{
              color: '#111315',
              fontFamily: fontSans,
              fontSize: 14.5,
              fontWeight: '800',
              letterSpacing: 0.2,
            }}>
            Enter trip PIN
          </Text>
          <Image
            source={icons.chevronRight}
            style={{
              height: 12,
              position: 'absolute',
              resizeMode: 'contain',
              right: 18,
              tintColor: '#111315',
              width: 12,
            }}
          />
        </Pressable>
      )}

      {/* Secondary Action Button: I can't find the rider */}
      <Pressable
        style={({pressed}) => [
          {
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderColor: '#D8D4C8',
            borderRadius: 14,
            borderWidth: 1,
            flexDirection: 'row',
            gap: 8,
            height: 38,
            justifyContent: 'center',
            marginBottom: 6,
          },
          pressed && {
            backgroundColor: '#F5F3EB',
          },
        ]}
        onPress={onCantFind}
        accessibilityRole="button"
        accessibilityLabel="I Can't Find The Rider">
        <Image
          source={icons.cantFind}
          style={{
            height: 15,
            resizeMode: 'contain',
            tintColor: '#111315',
            width: 15,
          }}
        />
        <Text
          style={{
            color: '#111315',
            fontFamily: fontSans,
            fontSize: 13,
            fontWeight: '700',
          }}>
          I can’t find the rider
        </Text>
      </Pressable>

      {/* Safety / PIN Disclaimer */}
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 0,
        }}>
        <Image
          source={icons.shield}
          style={{
            height: 13,
            marginRight: 5,
            resizeMode: 'contain',
            tintColor: '#6B7280',
            width: 13,
          }}
        />
        <Text
          style={{
            color: '#6B7280',
            fontFamily: fontSans,
            fontSize: 11.5,
            fontWeight: '500',
          }}>
          Never start without the rider PIN.
        </Text>
      </View>

      {/* Location Confirmation Modal */}
      <ConfirmLocationModal
        visible={confirmModalVisible}
        pickupLocation={pickupLocation}
        onConfirm={handleConfirmLocation}
        onCancel={() => setConfirmModalVisible(false)}
      />
    </View>
  );
}

export default AtPickupSheet;
