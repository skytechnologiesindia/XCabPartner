import React from 'react';
import {
  Image,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import {colors} from '../../assets/colors/colors';
import {icons} from '../../assets/icons';

const fontSans = Platform.select({
  ios: 'System',
  android: 'sans-serif',
});

function EndTripSheet({
  pickupLocation = 'Main Road, Ranchi',
  dropLocation = 'Lalpur Market, Ranchi',
  tripDuration = '18 min',
  distance = '6.4 km',
  estimatedFare = '₹180',
  onComplete,
  onReportIssue,
}) {
  return (
    <View
      style={{
        backgroundColor: '#FAF8F1',
        borderColor: '#ECE5D6',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        borderTopWidth: 1,
        elevation: 10,
        paddingBottom: 14,
        paddingHorizontal: 16,
        paddingTop: 16,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -4},
        shadowOpacity: 0.08,
        shadowRadius: 10,
        width: '100%',
      }}>
      {/* Top Badge: TRIP COMPLETE */}
      <View
        style={{
          alignItems: 'flex-start',
          marginBottom: 8,
        }}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#DDF5E9',
            borderColor: '#BFE7D3',
            borderRadius: 14,
            borderWidth: 1,
            flexDirection: 'row',
            gap: 6,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}>
          <Image
            source={icons.checkCircle}
            style={{
              height: 14,
              resizeMode: 'contain',
              width: 14,
            }}
          />
          <Text
            style={{
              color: '#16A34A',
              fontFamily: fontSans,
              fontSize: 11,
              fontWeight: '800',
              letterSpacing: 0.4,
            }}>
            TRIP COMPLETE
          </Text>
        </View>
      </View>

      {/* Heading & Subtitle */}
      <Text
        style={{
          color: '#111315',
          fontFamily: fontSans,
          fontSize: 22,
          fontWeight: '800',
          letterSpacing: -0.3,
        }}>
        End this trip?
      </Text>
      <Text
        style={{
          color: '#6B7280',
          fontFamily: fontSans,
          fontSize: 13,
          marginTop: 4,
        }}>
        Confirm only after the rider has exited.
      </Text>

      {/* Trip Route Card */}
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#F5F2E8',
          borderColor: '#E8E1D2',
          borderRadius: 14,
          borderWidth: 1,
          flexDirection: 'row',
          marginBottom: 12,
          marginTop: 12,
          paddingHorizontal: 14,
          paddingVertical: 12,
        }}>
        {/* Route Track */}
        <View
          style={{
            alignItems: 'center',
            marginRight: 12,
            width: 14,
          }}>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderColor: '#F5A623',
              borderRadius: 7,
              borderWidth: 2.5,
              height: 14,
              justifyContent: 'center',
              width: 14,
            }}>
            <View
              style={{
                backgroundColor: '#F5A623',
                borderRadius: 3,
                height: 5,
                width: 5,
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: '#B5AFA2',
              borderRadius: 1,
              height: 3.5,
              marginVertical: 1.5,
              width: 2,
            }}
          />
          <View
            style={{
              backgroundColor: '#B5AFA2',
              borderRadius: 1,
              height: 3.5,
              marginVertical: 1.5,
              width: 2,
            }}
          />
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderColor: '#E8505B',
              borderRadius: 3,
              borderWidth: 2.5,
              height: 14,
              justifyContent: 'center',
              width: 14,
            }}>
            <View
              style={{
                backgroundColor: '#E8505B',
                borderRadius: 1,
                height: 4.5,
                width: 4.5,
              }}
            />
          </View>
        </View>

        {/* Addresses */}
        <View style={{flex: 1}}>
          <Text
            style={{
              color: '#111315',
              fontFamily: fontSans,
              fontSize: 13.5,
              fontWeight: '700',
            }}
            numberOfLines={1}>
            {pickupLocation}
          </Text>
          <Text
            style={{
              color: '#111315',
              fontFamily: fontSans,
              fontSize: 13.5,
              fontWeight: '700',
              marginTop: 10,
            }}
            numberOfLines={1}>
            {dropLocation}
          </Text>
        </View>
      </View>

      {/* 3 Trip Stats Cards */}
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          marginBottom: 12,
        }}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#FEF3C7',
            borderRadius: 12,
            flex: 1,
            justifyContent: 'center',
            paddingVertical: 11,
          }}>
          <Text
            style={{
              color: '#111315',
              fontFamily: fontSans,
              fontSize: 15.5,
              fontWeight: '800',
            }}>
            {tripDuration}
          </Text>
          <Text
            style={{
              color: '#78716C',
              fontFamily: fontSans,
              fontSize: 8.5,
              fontWeight: '700',
              letterSpacing: 0.3,
              marginTop: 3,
            }}>
            TRIP DURATION
          </Text>
        </View>

        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#FEF3C7',
            borderRadius: 12,
            flex: 1,
            justifyContent: 'center',
            paddingVertical: 11,
          }}>
          <Text
            style={{
              color: '#111315',
              fontFamily: fontSans,
              fontSize: 15.5,
              fontWeight: '800',
            }}>
            {distance}
          </Text>
          <Text
            style={{
              color: '#78716C',
              fontFamily: fontSans,
              fontSize: 8.5,
              fontWeight: '700',
              letterSpacing: 0.3,
              marginTop: 3,
            }}>
            DISTANCE
          </Text>
        </View>

        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#FEF3C7',
            borderRadius: 12,
            flex: 1,
            justifyContent: 'center',
            paddingVertical: 11,
          }}>
          <Text
            style={{
              color: '#111315',
              fontFamily: fontSans,
              fontSize: 15.5,
              fontWeight: '800',
            }}>
            {estimatedFare}
          </Text>
          <Text
            style={{
              color: '#78716C',
              fontFamily: fontSans,
              fontSize: 8.5,
              fontWeight: '700',
              letterSpacing: 0.3,
              marginTop: 3,
            }}>
            ESTIMATED FARE
          </Text>
        </View>
      </View>

      {/* Primary Action Button: Complete trip */}
      <Pressable
        style={({pressed}) => [
          {
            alignItems: 'center',
            backgroundColor: colors.yellow500 || '#FFD21A',
            borderRadius: 14,
            flexDirection: 'row',
            height: 50,
            justifyContent: 'center',
            marginBottom: 8,
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
        onPress={onComplete}
        accessibilityRole="button"
        accessibilityLabel="Complete Trip">
        <Text
          style={{
            color: '#111315',
            fontFamily: fontSans,
            fontSize: 15.5,
            fontWeight: '800',
            letterSpacing: 0.2,
          }}>
          Complete trip
        </Text>
        <Text
          style={{
            color: '#111315',
            fontSize: 20,
            fontWeight: '800',
            position: 'absolute',
            right: 20,
          }}>
          →
        </Text>
      </Pressable>

      {/* Secondary Action Button: Report an issue */}
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
            height: 46,
            justifyContent: 'center',
          },
          pressed && {
            backgroundColor: '#F5F3EB',
          },
        ]}
        onPress={onReportIssue}
        accessibilityRole="button"
        accessibilityLabel="Report an issue">
        <Image
          source={icons.flag}
          style={{
            height: 16,
            resizeMode: 'contain',
            tintColor: '#111315',
            width: 16,
          }}
        />
        <Text
          style={{
            color: '#111315',
            fontFamily: fontSans,
            fontSize: 14,
            fontWeight: '700',
          }}>
          Report an issue
        </Text>
      </Pressable>
    </View>
  );
}

export default EndTripSheet;
