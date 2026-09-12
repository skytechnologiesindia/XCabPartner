import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {colors} from '../../assets/colors/colors';
import {icons} from '../../assets/icons';

function ReadyPanel({isOnline = true, onToggleOnline, onGoOffline}) {
  const handlePress = onToggleOnline || onGoOffline;

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: '#FAF8F1',
        borderColor: '#ECE7DB',
        borderRadius: 20,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        marginHorizontal: 16,
        marginTop: 4,
        paddingHorizontal: 14,
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.04,
        shadowRadius: 3,
        elevation: 1,
      }}>
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          flexDirection: 'row',
          marginRight: 10,
        }}>
        {/* Soft Status Indicator (Green for Online, Gray for Offline) */}
        <View
          style={{
            alignItems: 'center',
            backgroundColor: isOnline
              ? 'rgba(34, 197, 94, 0.22)'
              : 'rgba(156, 163, 175, 0.22)',
            borderRadius: 17,
            height: 34,
            justifyContent: 'center',
            width: 34,
          }}>
          <View
            style={{
              backgroundColor: isOnline ? '#10B981' : '#9CA3AF',
              borderRadius: 7,
              height: 14,
              width: 14,
            }}
          />
        </View>

        {/* Status Text Hierarchy */}
        <View style={{flex: 1, marginLeft: 10}}>
          <Text
            style={{
              color: '#111315',
              fontSize: 14.5,
              fontWeight: '700',
              letterSpacing: -0.2,
            }}
            numberOfLines={1}>
            You are{' '}
            <Text
              style={{
                color: isOnline ? '#10B981' : '#6B7280',
                fontWeight: '800',
              }}>
              {isOnline ? 'Online' : 'Offline'}
            </Text>
          </Text>
          <Text
            style={{
              color: '#6B7280',
              fontSize: 11.5,
              marginTop: 2,
            }}
            numberOfLines={1}>
            {isOnline
              ? 'You’ll receive ride requests nearby.'
              : 'Go online to receive ride requests.'}
          </Text>
        </View>
      </View>

      {/* Yellow GO OFFLINE / GO ONLINE Button */}
      <Pressable
        style={({pressed}) => [
          {
            alignItems: 'center',
            backgroundColor: colors.yellow500 || '#FFD21A',
            borderRadius: 14,
            flexDirection: 'row',
            height: 38,
            justifyContent: 'center',
            paddingHorizontal: 14,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.08,
            shadowRadius: 2,
            elevation: 2,
          },
          pressed && {
            backgroundColor: colors.yellow600 || '#E9B900',
            opacity: 0.9,
          },
        ]}
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={isOnline ? 'Go Offline' : 'Go Online'}>
        <Image
          source={icons.power}
          style={{
            height: 16,
            marginRight: 6,
            resizeMode: 'contain',
            tintColor: '#111315',
            width: 16,
          }}
        />
        <Text
          style={{
            color: '#111315',
            fontSize: 11.5,
            fontWeight: '800',
            letterSpacing: 0.3,
          }}>
          {isOnline ? 'GO OFFLINE' : 'GO ONLINE'}
        </Text>
      </Pressable>
    </View>
  );
}

export default ReadyPanel;



