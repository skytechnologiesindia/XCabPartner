import React from 'react';
import {
  Dimensions,
  Image,
  Text,
  View,
} from 'react-native';
import { icons } from '../../assets/icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * OnboardingIllustration
 * Visual illustration section for each onboarding step:
 * - Slide 1: XCAB white sedan + 3 benefit badges (Safe Journeys, Better Earnings, Stronger Communities)
 * - Slide 2: Location/navigation route device + "You're in Control" checklist card
 * - Slide 3: Front-three-quarter XCAB sedan + 3 feature badges (Safer Roads, Happier Communities, Cleaner Cities)
 */
function OnboardingIllustration({ slide }) {
  if (!slide) return null;

  const { image, benefits, id } = slide;
  const isSlide1 = id === 'drive-your-way';

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 4,
        width: '100%',
      }}>
      {/* 1. Main Visual Asset */}
      <View
        style={{
          alignItems: 'center',
          height: isSlide1
            ? Math.min(SCREEN_WIDTH * 0.54, 220)
            : Math.min(SCREEN_WIDTH * 0.76, 310),
          justifyContent: 'center',
          position: 'relative',
          width: '100%',
        }}>
        <Image
          source={image}
          style={{
            height: '100%',
            width: '100%',
          }}
          resizeMode="contain"
          accessibilityRole="image"
          accessibilityLabel={slide.title || 'Onboarding illustration'}
        />
      </View>

      {/* 2. Slide 1 specific inline benefits */}
      {benefits && benefits.length > 0 ? (
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderColor: '#ECEAE2',
            borderRadius: 20,
            borderWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            paddingHorizontal: 12,
            paddingVertical: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 6,
            elevation: 2,
            width: '94%',
          }}>
          {benefits.map((benefit, index) => (
            <React.Fragment key={benefit.id}>
              {index > 0 ? (
                <View
                  style={{
                    backgroundColor: '#ECEAE2',
                    height: 32,
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
                    borderRadius: 20,
                    borderWidth: 1,
                    height: 40,
                    justifyContent: 'center',
                    width: 40,
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
                    fontSize: 10,
                    fontWeight: '700',
                    letterSpacing: 0.3,
                    lineHeight: 13,
                    marginTop: 6,
                    textAlign: 'center',
                  }}>
                  {benefit.label}
                </Text>
              </View>
            </React.Fragment>
          ))}
        </View>
      ) : null}
    </View>
  );
}

export default OnboardingIllustration;
