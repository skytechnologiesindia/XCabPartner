import React from 'react';
import {
  Dimensions,
  Image,
  Text,
  View,
} from 'react-native';
import { icons } from '../../assets/icons';
import { images } from '../../assets/images';
import { benefitItems } from './mobileVerificationData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * VerificationHelper
 * Consistent lower visual section displaying:
 * - Approved white XCAB sedan on curved highway toward sunrise skyline
 * - Curved white card showcasing 3 driver benefits: Safe Journeys, Better Earnings, Stronger Communities
 */
function VerificationHelper() {
  const sceneHeight = Math.min(SCREEN_WIDTH * 0.52, 210);

  return (
    <View
      style={{
        alignItems: 'center',
        marginTop: 20,
        position: 'relative',
        width: '100%',
      }}>
      {/* 1. Vehicle & Highway Hero Illustration */}
      <View
        style={{
          height: sceneHeight,
          overflow: 'hidden',
          width: '100%',
        }}>
        <Image
          source={images.authCarScene}
          style={{
            height: '100%',
            width: '100%',
          }}
          resizeMode="cover"
          accessibilityRole="image"
          accessibilityLabel="White XCAB sedan on highway"
        />
      </View>

      {/* 2. Curved White Card with 3 Benefit Badges */}
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          elevation: 3,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: -22,
          paddingBottom: 16,
          paddingHorizontal: 16,
          paddingTop: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 6,
          width: '100%',
        }}>
        {benefitItems.map((benefit, index) => (
          <React.Fragment key={benefit.id}>
            {index > 0 ? (
              <View
                style={{
                  backgroundColor: '#ECEAE2',
                  height: 36,
                  width: 1,
                }}
              />
            ) : null}
            <View
              style={{
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: '#FFF3CF',
                  borderColor: 'rgba(255, 201, 40, 0.3)',
                  borderRadius: 21,
                  borderWidth: 1,
                  height: 42,
                  justifyContent: 'center',
                  width: 42,
                }}>
                {benefit.icon === 'shield' ? (
                  <Image
                    source={icons.shield}
                    style={{
                      height: 18,
                      width: 18,
                    }}
                    tintColor="#17191C"
                    resizeMode="contain"
                  />
                ) : benefit.icon === 'chart' ? (
                  <View
                    style={{
                      alignItems: 'flex-end',
                      flexDirection: 'row',
                      gap: 2.5,
                      height: 16,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#17191C',
                        borderRadius: 1.5,
                        height: 7,
                        width: 3,
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: '#17191C',
                        borderRadius: 1.5,
                        height: 11,
                        width: 3,
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: '#17191C',
                        borderRadius: 1.5,
                        height: 16,
                        width: 3,
                      }}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      alignItems: 'center',
                      height: 18,
                      justifyContent: 'center',
                      position: 'relative',
                      width: 22,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#17191C',
                        borderRadius: 3.5,
                        height: 7,
                        position: 'absolute',
                        top: 1,
                        width: 7,
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: '#17191C',
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                        bottom: 0,
                        height: 7,
                        position: 'absolute',
                        width: 12,
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: '#525B64',
                        borderRadius: 2.5,
                        height: 5,
                        left: 1,
                        position: 'absolute',
                        top: 4,
                        width: 5,
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: '#525B64',
                        borderRadius: 2.5,
                        height: 5,
                        right: 1,
                        position: 'absolute',
                        top: 4,
                        width: 5,
                      }}
                    />
                  </View>
                )}
              </View>
              <Text
                style={{
                  color: '#525B64',
                  fontSize: 10.5,
                  fontWeight: '700',
                  letterSpacing: 0.2,
                  lineHeight: 14,
                  marginTop: 6,
                  textAlign: 'center',
                }}>
                {benefit.label}
              </Text>
            </View>
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

export default VerificationHelper;
