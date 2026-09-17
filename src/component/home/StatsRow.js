import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {icons} from '../../assets/icons';

function StatsRow({
  earnings = '₹1,240',
  rides = '07',
  onlineHours = '4.8',
  onEarningsPress,
  onRidesPress,
  onHoursPress,
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 10,
        marginBottom: 12,
        marginHorizontal: 16,
      }}>
      {/* 1. Today's Earnings */}
      <Pressable
        style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#ECE7DB',
          borderRadius: 18,
          borderWidth: 1,
          flex: 1,
          justifyContent: 'space-between',
          paddingHorizontal: 11,
          paddingVertical: 12,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.04,
          shadowRadius: 3,
          elevation: 1,
        }}
        onPress={onEarningsPress}
        accessibilityRole="button"
        accessibilityLabel="Today's Earnings">
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#FAF5EA',
            borderRadius: 10,
            height: 32,
            justifyContent: 'center',
            width: 32,
          }}>
          <Image
            source={icons.statWallet}
            style={{
              height: 16,
              resizeMode: 'contain',
              width: 16,
            }}
          />
        </View>
        <Text
          style={{
            color: '#6B7280',
            fontSize: 8.5,
            fontWeight: '700',
            letterSpacing: 0.2,
            marginTop: 8,
          }}
          numberOfLines={1}>
          TODAY&apos;S EARNINGS
        </Text>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 4,
          }}>
          <Text
            style={{
              color: '#111315',
              fontSize: 18,
              fontWeight: '900',
              letterSpacing: -0.3,
            }}
            numberOfLines={1}>
            {earnings}
          </Text>
          <Image
            source={icons.chevronRight}
            style={{
              height: 10,
              resizeMode: 'contain',
              width: 10,
            }}
          />
        </View>
      </Pressable>

      {/* 2. Rides Completed */}
      <Pressable
        style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#ECE7DB',
          borderRadius: 18,
          borderWidth: 1,
          flex: 1,
          justifyContent: 'space-between',
          paddingHorizontal: 11,
          paddingVertical: 12,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.04,
          shadowRadius: 3,
          elevation: 1,
        }}
        onPress={onRidesPress}
        accessibilityRole="button"
        accessibilityLabel="Rides Completed">
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#EDF8F2',
            borderRadius: 10,
            height: 32,
            justifyContent: 'center',
            width: 32,
          }}>
          <Image
            source={icons.statCar}
            style={{
              height: 16,
              resizeMode: 'contain',
              width: 16,
            }}
          />
        </View>
        <Text
          style={{
            color: '#6B7280',
            fontSize: 8.5,
            fontWeight: '700',
            letterSpacing: 0.2,
            marginTop: 8,
          }}
          numberOfLines={1}>
          RIDES COMPLETED
        </Text>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 4,
          }}>
          <Text
            style={{
              color: '#111315',
              fontSize: 18,
              fontWeight: '900',
              letterSpacing: -0.3,
            }}
            numberOfLines={1}>
            {rides}
          </Text>
          <Image
            source={icons.chevronRight}
            style={{
              height: 10,
              resizeMode: 'contain',
              width: 10,
            }}
          />
        </View>
      </Pressable>

      {/* 3. Online Hours */}
      <Pressable
        style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#ECE7DB',
          borderRadius: 18,
          borderWidth: 1,
          flex: 1,
          justifyContent: 'space-between',
          paddingHorizontal: 11,
          paddingVertical: 12,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.04,
          shadowRadius: 3,
          elevation: 1,
        }}
        onPress={onHoursPress}
        accessibilityRole="button"
        accessibilityLabel="Online Hours">
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#EEF4FA',
            borderRadius: 10,
            height: 32,
            justifyContent: 'center',
            width: 32,
          }}>
          <Image
            source={icons.statClock}
            style={{
              height: 16,
              resizeMode: 'contain',
              width: 16,
            }}
          />
        </View>
        <Text
          style={{
            color: '#6B7280',
            fontSize: 8.5,
            fontWeight: '700',
            letterSpacing: 0.2,
            marginTop: 8,
          }}
          numberOfLines={1}>
          ONLINE HOURS
        </Text>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 4,
          }}>
          <View
            style={{
              alignItems: 'baseline',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                color: '#111315',
                fontSize: 18,
                fontWeight: '900',
                letterSpacing: -0.3,
              }}>
              {onlineHours}
            </Text>
            <Text
              style={{
                color: '#111315',
                fontSize: 11.5,
                fontWeight: '700',
              }}>
              {' '}
              hrs
            </Text>
          </View>
          <Image
            source={icons.chevronRight}
            style={{
              height: 10,
              resizeMode: 'contain',
              width: 10,
            }}
          />
        </View>
      </Pressable>
    </View>
  );
}

export default StatsRow;
