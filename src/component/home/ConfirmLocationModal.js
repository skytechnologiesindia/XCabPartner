import React from 'react';
import {
  Image,
  Modal,
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

function ConfirmLocationModal({
  visible = false,
  pickupLocation = 'Main Road, Ranchi',
  onConfirm,
  onCancel,
}) {
  if (!visible) {
    return null;
  }

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={onCancel}>
      <Pressable
        style={{
          alignItems: 'center',
          backgroundColor: 'rgba(17, 19, 21, 0.65)',
          flex: 1,
          justifyContent: 'flex-end',
          paddingBottom: 20,
          paddingHorizontal: 16,
        }}
        onPress={onCancel}>
        <Pressable
          style={{
            alignItems: 'center',
            backgroundColor: '#FAF8F1',
            borderColor: '#ECE5D6',
            borderRadius: 24,
            borderWidth: 1,
            paddingBottom: 16,
            paddingHorizontal: 18,
            paddingTop: 22,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: -4},
            shadowOpacity: 0.15,
            shadowRadius: 16,
            elevation: 12,
            width: '100%',
          }}
          onPress={e => e.stopPropagation()}>
          {/* Top Yellow Icon with Soft Aura */}
          <View
            style={{
              alignItems: 'center',
              backgroundColor: 'rgba(255, 210, 26, 0.25)',
              borderRadius: 32,
              height: 64,
              justifyContent: 'center',
              marginBottom: 14,
              width: 64,
            }}>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: colors.yellow500 || '#FFD21A',
                borderColor: '#FFFFFF',
                borderRadius: 22,
                borderWidth: 2,
                height: 44,
                justifyContent: 'center',
                width: 44,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.12,
                shadowRadius: 3,
                elevation: 2,
              }}>
              <Image
                source={icons.pinDark}
                style={{
                  height: 20,
                  resizeMode: 'contain',
                  tintColor: '#111315',
                  width: 20,
                }}
              />
            </View>
          </View>

          {/* Title & Subtitle */}
          <Text
            style={{
              color: '#111315',
              fontFamily: fontSans,
              fontSize: 21,
              fontWeight: '800',
              letterSpacing: -0.3,
              textAlign: 'center',
            }}>
            I am on location
          </Text>
          <Text
            style={{
              color: '#6B7280',
              fontFamily: fontSans,
              fontSize: 12.5,
              marginTop: 4,
              textAlign: 'center',
            }}>
            Confirm that you have reached the pickup point.
          </Text>

          {/* Location Preview Card */}
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#F5F2E8',
              borderColor: '#E8E1D2',
              borderRadius: 16,
              borderWidth: 1,
              flexDirection: 'row',
              marginBottom: 16,
              marginTop: 18,
              padding: 12,
              width: '100%',
            }}>
            {/* Mini Map Thumbnail */}
            <View
              style={{
                alignItems: 'center',
                backgroundColor: '#DDE9F0',
                borderColor: '#CCDCE6',
                borderRadius: 12,
                borderWidth: 1,
                height: 54,
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
                width: 54,
              }}>
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  height: 8,
                  position: 'absolute',
                  top: '44%',
                  width: '100%',
                }}
              />
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  height: '100%',
                  left: '44%',
                  position: 'absolute',
                  width: 8,
                }}
              />
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2,
                }}>
                <Image
                  source={icons.mapPickupPin || icons.pinDark}
                  style={{
                    height: 24,
                    resizeMode: 'contain',
                    width: 24,
                  }}
                />
              </View>
            </View>

            {/* Address & Notification Note */}
            <View
              style={{
                flex: 1,
                marginLeft: 12,
              }}>
              <Text
                style={{
                  color: '#111315',
                  fontFamily: fontSans,
                  fontSize: 14.5,
                  fontWeight: '800',
                }}
                numberOfLines={1}>
                {pickupLocation}
              </Text>
              <Text
                style={{
                  color: '#6B7280',
                  fontFamily: fontSans,
                  fontSize: 11.5,
                  marginTop: 3,
                }}>
                Rider will be notified that you have arrived.
              </Text>
            </View>
          </View>

          {/* Primary Action: Confirm location */}
          <Pressable
            style={({pressed}) => [
              {
                alignItems: 'center',
                backgroundColor: colors.yellow500 || '#FFD21A',
                borderRadius: 14,
                flexDirection: 'row',
                height: 48,
                justifyContent: 'center',
                marginBottom: 10,
                position: 'relative',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 2,
                width: '100%',
              },
              pressed && {
                backgroundColor: colors.yellow600 || '#E9B900',
                opacity: 0.94,
              },
            ]}
            onPress={onConfirm}
            accessibilityRole="button"
            accessibilityLabel="Confirm Location">
            <Text
              style={{
                color: '#111315',
                fontFamily: fontSans,
                fontSize: 15,
                fontWeight: '800',
                letterSpacing: 0.2,
              }}>
              Confirm location
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

          {/* Secondary Action: Cancel */}
          <Pressable
            style={({pressed}) => [
              {
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderColor: '#D8D4C8',
                borderRadius: 14,
                borderWidth: 1,
                height: 44,
                justifyContent: 'center',
                width: '100%',
              },
              pressed && {
                backgroundColor: '#F5F3EB',
              },
            ]}
            onPress={onCancel}
            accessibilityRole="button"
            accessibilityLabel="Cancel">
            <Text
              style={{
                color: '#111315',
                fontFamily: fontSans,
                fontSize: 14,
                fontWeight: '700',
              }}>
              Cancel
            </Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default ConfirmLocationModal;
