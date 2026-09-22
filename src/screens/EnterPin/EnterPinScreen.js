import React, {useRef, useState} from 'react';
import {
  Image,
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {colors} from '../../assets/colors/colors';
import {icons} from '../../assets/icons';

const fontSans = Platform.select({
  ios: 'System',
  android: 'sans-serif',
});

// Valid sample PIN (allows testing success with '1234' or any 4-digit except '0000' which triggers the demo error state)
const VALID_SAMPLE_PIN = '1234';

function EnterPinScreen({
  riderName = 'Aarav M.',
  rating = '4.8',
  pickupLocation = 'Main Road, Ranchi',
  dropLocation = 'Lalpur Market, Ranchi',
  onBack,
  onStartTrip,
  onResendHelp,
}) {
  const [pin, setPin] = useState('');
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef(null);

  const handlePinChange = text => {
    // Only accept numerical digits up to 4 characters
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 4);
    setPin(cleaned);
    if (hasError) {
      setHasError(false);
      setErrorMessage('');
    }
  };

  const handleStartTrip = () => {
    Keyboard.dismiss();
    if (pin.length !== 4) {
      return;
    }

    // Explicit error demo trigger: '0000' or non-matching if testing strict mode
    // (Accepts '1234' or any valid 4-digit code except '0000' to test error states)
    if (pin === '0000') {
      setHasError(true);
      setErrorMessage('Please ask the rider to confirm their PIN.');
      return;
    }

    // PIN is valid, proceed to start trip
    if (onStartTrip) {
      onStartTrip();
    }
  };

  const isButtonEnabled = pin.length === 4;

  return (
    <View
      style={{
        backgroundColor: '#F7F5EF',
        flex: 1,
      }}>
      {/* Top Header Row */}
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 18,
          paddingTop: 10,
          paddingBottom: 14,
        }}>
        <Pressable
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            gap: 2,
            paddingVertical: 4,
          }}
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Go back">
          <Text
            style={{
              color: '#17191C',
              fontFamily: fontSans,
              fontSize: 22,
              fontWeight: '700',
              marginTop: -2,
            }}>
            ‹
          </Text>
          <Text
            style={{
              color: '#17191C',
              fontFamily: fontSans,
              fontSize: 14,
              fontWeight: '700',
            }}>
            Back
          </Text>
        </Pressable>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: colors.yellow500 || '#FFC928',
              fontSize: 20,
              fontWeight: '900',
            }}>
            X
          </Text>
          <Text
            style={{
              color: '#17191C',
              fontSize: 20,
              fontWeight: '900',
            }}>
            CAB
          </Text>
        </View>

        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#DDF5E9',
            borderColor: '#BBE8D2',
            borderRadius: 12,
            borderWidth: 1,
            flexDirection: 'row',
            gap: 6,
            paddingHorizontal: 8,
            paddingVertical: 4,
          }}
          accessibilityLabel="Rider Present">
          <View
            style={{
              backgroundColor: '#18A66A',
              borderRadius: 3.5,
              height: 7,
              width: 7,
            }}
          />
          <Text
            style={{
              color: '#18A66A',
              fontFamily: fontSans,
              fontSize: 9.5,
              fontWeight: '800',
              letterSpacing: 0.4,
            }}>
            RIDER PRESENT
          </Text>
        </View>
      </View>

      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 36,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* Screen Title & Subtitle */}
        <Text
          style={{
            color: '#17191C',
            fontFamily: fontSans,
            fontSize: 26,
            fontWeight: '900',
            letterSpacing: -0.4,
            marginTop: 8,
          }}>
          Enter trip PIN
        </Text>
        <Text
          style={{
            color: '#687078',
            fontFamily: fontSans,
            fontSize: 13,
            lineHeight: 18,
            marginTop: 4,
            marginBottom: 24,
          }}>
          Ask the rider for their 4-digit PIN to start the trip.
        </Text>

        {/* 4 Interactive PIN Input Boxes */}
        <Pressable
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
          onPress={() => inputRef.current?.focus()}>
          {[0, 1, 2, 3].map(index => {
            const digit = pin[index] || '';
            const isCurrent = pin.length === index;
            return (
              <View
                key={index}
                style={[
                  {
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    borderColor: '#DDD9CF',
                    borderRadius: 14,
                    borderWidth: 1.5,
                    height: 60,
                    justifyContent: 'center',
                    width: 60,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.04,
                    shadowRadius: 2,
                    elevation: 1,
                  },
                  isCurrent && {
                    borderColor: '#FFC928',
                    borderWidth: 2,
                  },
                  digit
                    ? {
                        borderColor: '#17191C',
                      }
                    : null,
                  hasError && {
                    backgroundColor: 'rgba(242, 107, 91, 0.08)',
                    borderColor: '#F26B5B',
                  },
                ]}>
                <Text
                  style={{
                    color: '#17191C',
                    fontFamily: fontSans,
                    fontSize: 24,
                    fontWeight: '900',
                  }}>
                  {digit}
                </Text>
              </View>
            );
          })}
        </Pressable>

        {/* Hidden Native Number Input */}
        <TextInput
          ref={inputRef}
          value={pin}
          onChangeText={handlePinChange}
          keyboardType="number-pad"
          maxLength={4}
          style={{
            height: 0,
            opacity: 0,
            position: 'absolute',
            width: 0,
          }}
          autoFocus={true}
        />

        {/* Error State Banner */}
        {hasError ? (
          <View
            style={{
              backgroundColor: 'rgba(242, 107, 91, 0.1)',
              borderColor: '#F26B5B',
              borderRadius: 12,
              borderWidth: 1,
              marginBottom: 16,
              paddingHorizontal: 14,
              paddingVertical: 10,
            }}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                gap: 6,
              }}>
              <Text
                style={{
                  color: '#F26B5B',
                  fontSize: 14,
                  fontWeight: '800',
                }}>
                ⚠
              </Text>
              <Text
                style={{
                  color: '#F26B5B',
                  fontFamily: fontSans,
                  fontSize: 13,
                  fontWeight: '800',
                }}>
                Incorrect PIN
              </Text>
            </View>
            <Text
              style={{
                color: '#F26B5B',
                fontFamily: fontSans,
                fontSize: 11.5,
                marginTop: 2,
              }}>
              {errorMessage}
            </Text>
          </View>
        ) : null}

        {/* Rider & Trip Details Card */}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#DDD9CF',
            borderRadius: 18,
            borderWidth: 1,
            marginBottom: 20,
            marginTop: 8,
            padding: 16,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.04,
            shadowRadius: 3,
            elevation: 1,
          }}>
          {/* Rider Meta Row */}
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: '#F1EEE5',
                borderRadius: 20,
                height: 40,
                justifyContent: 'center',
                width: 40,
              }}>
              <Text
                style={{
                  color: '#17191C',
                  fontFamily: fontSans,
                  fontSize: 16,
                  fontWeight: '800',
                }}>
                {riderName.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View
              style={{
                marginLeft: 12,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: '#17191C',
                    fontFamily: fontSans,
                    fontSize: 15,
                    fontWeight: '800',
                  }}>
                  {riderName}
                </Text>
                <Text
                  style={{
                    color: '#EAB308',
                    fontSize: 12,
                    marginLeft: 6,
                    marginRight: 3,
                  }}>
                  ★
                </Text>
                <Text
                  style={{
                    color: '#687078',
                    fontFamily: fontSans,
                    fontSize: 12.5,
                    fontWeight: '700',
                  }}>
                  {rating}
                </Text>
              </View>
              <Text
                style={{
                  color: '#687078',
                  fontFamily: fontSans,
                  fontSize: 12,
                  marginTop: 2,
                }}>
                Rider · Cash · ₹180
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: '#EAE5D9',
              height: 1,
              marginVertical: 14,
            }}
          />

          {/* Route Section */}
          <View
            style={{
              gap: 8,
            }}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#FFC928',
                  borderRadius: 6,
                  borderWidth: 3,
                  height: 12,
                  marginRight: 10,
                  width: 12,
                }}
              />
              <View
                style={{
                  flex: 1,
                }}>
                <Text
                  style={{
                    color: '#9CA3AF',
                    fontFamily: fontSans,
                    fontSize: 9,
                    fontWeight: '800',
                    letterSpacing: 0.5,
                  }}>
                  PICKUP
                </Text>
                <Text
                  style={{
                    color: '#17191C',
                    fontFamily: fontSans,
                    fontSize: 13.5,
                    fontWeight: '700',
                    marginTop: 1,
                  }}
                  numberOfLines={1}>
                  {pickupLocation}
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: '#C4BEB2',
                height: 8,
                marginLeft: 5,
                marginVertical: -3,
                width: 2,
              }}
            />

            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#F26B5B',
                  borderRadius: 2,
                  borderWidth: 3,
                  height: 11,
                  marginRight: 11,
                  width: 11,
                }}
              />
              <View
                style={{
                  flex: 1,
                }}>
                <Text
                  style={{
                    color: '#9CA3AF',
                    fontFamily: fontSans,
                    fontSize: 9,
                    fontWeight: '800',
                    letterSpacing: 0.5,
                  }}>
                  DROP
                </Text>
                <Text
                  style={{
                    color: '#17191C',
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
          </View>
        </View>

        {/* Primary Action Button: Start trip */}
        <Pressable
          style={({pressed}) => [
            {
              alignItems: 'center',
              backgroundColor: colors.yellow500 || '#FFC928',
              borderRadius: 14,
              flexDirection: 'row',
              height: 52,
              justifyContent: 'center',
              marginBottom: 10,
              position: 'relative',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.08,
              shadowRadius: 3,
              elevation: 2,
            },
            !isButtonEnabled && {
              backgroundColor: '#E6E2D8',
              shadowOpacity: 0,
              elevation: 0,
            },
            isButtonEnabled &&
              pressed && {
                backgroundColor: '#E9B900',
                opacity: 0.94,
              },
          ]}
          onPress={handleStartTrip}
          disabled={!isButtonEnabled}
          accessibilityRole="button"
          accessibilityLabel="Start Trip">
          <Text
            style={[
              {
                color: '#17191C',
                fontFamily: fontSans,
                fontSize: 15.5,
                fontWeight: '800',
                letterSpacing: 0.2,
              },
              !isButtonEnabled && {
                color: '#9CA3AF',
              },
            ]}>
            Start trip
          </Text>
          <Text
            style={[
              {
                color: '#17191C',
                fontFamily: fontSans,
                fontSize: 18,
                fontWeight: '800',
                position: 'absolute',
                right: 18,
              },
              !isButtonEnabled && {
                color: '#9CA3AF',
              },
            ]}>
            →
          </Text>
        </Pressable>

        {/* Secondary Action: Resend / Help */}
        <Pressable
          style={{
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderColor: '#DDD9CF',
            borderRadius: 14,
            borderWidth: 1,
            flexDirection: 'row',
            gap: 8,
            height: 44,
            justifyContent: 'center',
            marginBottom: 16,
          }}
          onPress={onResendHelp}
          accessibilityRole="button"
          accessibilityLabel="Resend or Help">
          <Text
            style={{
              color: '#687078',
              fontFamily: fontSans,
              fontSize: 13,
              fontWeight: '800',
            }}>
            ?
          </Text>
          <Text
            style={{
              color: '#17191C',
              fontFamily: fontSans,
              fontSize: 13.5,
              fontWeight: '700',
            }}>
            Resend / help
          </Text>
        </Pressable>

        {/* Safety Disclaimer */}
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 14,
          }}>
          <Image
            source={icons.shield}
            style={{
              height: 14,
              marginRight: 6,
              resizeMode: 'contain',
              tintColor: '#687078',
              width: 14,
            }}
          />
          <Text
            style={{
              color: '#687078',
              fontFamily: fontSans,
              fontSize: 11.5,
              fontWeight: '500',
            }}>
            Never start the trip without the rider PIN.
          </Text>
        </View>

        {/* Demo Helper Hint */}
        <Text
          style={{
            color: '#9CA3AF',
            fontFamily: fontSans,
            fontSize: 10.5,
            letterSpacing: 0.2,
            textAlign: 'center',
          }}>
          Demo PIN: {VALID_SAMPLE_PIN} (enter 0000 to test error state)
        </Text>
      </ScrollView>
    </View>
  );
}

export default EnterPinScreen;
