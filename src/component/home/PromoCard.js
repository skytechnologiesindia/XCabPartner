import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {icons} from '../../assets/icons';
import {images} from '../../assets/images';

function PromoCard({onPressOffers}) {
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: '#FAF5EA',
        borderColor: '#ECE0C8',
        borderRadius: 20,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        marginHorizontal: 16,
        paddingBottom: 12,
        paddingLeft: 12,
        paddingRight: 6,
        paddingTop: 12,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.03,
        shadowRadius: 2,
        elevation: 1,
      }}>
      <View
        style={{
          alignItems: 'flex-start',
          flex: 1,
          flexDirection: 'row',
          marginRight: 6,
        }}>
        {/* Discount Tag Icon Circle */}
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#111315',
            borderRadius: 18,
            height: 36,
            justifyContent: 'center',
            width: 36,
          }}>
          <Image
            source={icons.promoTag}
            style={{
              height: 18,
              resizeMode: 'contain',
              width: 18,
            }}
          />
        </View>

        {/* Text & Action */}
        <View
          style={{
            flex: 1,
            marginLeft: 10,
          }}>
          <Text
            style={{
              color: '#111315',
              fontSize: 13.5,
              fontWeight: '800',
              letterSpacing: -0.1,
            }}
            numberOfLines={1}>
            Ride More, Save More!
          </Text>
          <Text
            style={{
              color: '#6B7280',
              fontSize: 11,
              marginTop: 2,
            }}
            numberOfLines={1}>
            Get up to ₹150 off on your next 3 rides
          </Text>
          <Pressable
            style={({pressed}) => [
              {
                alignItems: 'center',
                alignSelf: 'flex-start',
                backgroundColor: '#111315',
                borderRadius: 14,
                flexDirection: 'row',
                gap: 4,
                marginTop: 8,
                paddingHorizontal: 11,
                paddingVertical: 5,
              },
              pressed && {
                opacity: 0.85,
              },
            ]}
            onPress={onPressOffers}
            accessibilityRole="button"
            accessibilityLabel="View Offers">
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 10.5,
                fontWeight: '700',
              }}>
              View Offers
            </Text>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 13,
                fontWeight: '700',
                lineHeight: 14,
              }}>
              ›
            </Text>
          </Pressable>
        </View>
      </View>

      {/* 3D Yellow Gift Box with Bow & Sparkles */}
      <View
        style={{
          alignItems: 'center',
          height: 74,
          justifyContent: 'center',
          width: 74,
        }}>
        <Image
          source={images.giftBox}
          style={{
            height: 72,
            width: 72,
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

export default PromoCard;
