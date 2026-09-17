import React from 'react';
import {Image, Platform, Pressable, Text, View} from 'react-native';
import {colors} from '../../assets/colors/colors';
import {icons} from '../../assets/icons';

// Softer premium ride-hailing map palette (slate/navy/charcoal base)
const mapBase = '#1C262E';
const mapRoadMajor = 'rgba(74, 96, 110, 0.85)';
const mapRoadMinor = 'rgba(56, 74, 86, 0.65)';
const mapPark = 'rgba(40, 78, 58, 0.45)';
const mapRiver = 'rgba(46, 88, 126, 0.82)';
const mapLabelColor = 'rgba(215, 228, 235, 0.6)';

const fontSans = Platform.select({
  ios: 'System',
  android: 'sans-serif',
});

function MapPanel({
  isAtPickup = false,
  onRecenter,
  onFilter,
  onListToggle,
  onNavigate,
}) {
  return (
    <View
      style={{
        backgroundColor: mapBase,
        borderColor: '#2D3A44',
        borderRadius: 24,
        borderWidth: 1,
        height: isAtPickup ? 310 : 345,
        marginBottom: 12,
        marginHorizontal: 16,
        marginTop: isAtPickup ? 4 : 0,
        overflow: 'hidden',
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.18,
        shadowRadius: 8,
        elevation: 4,
      }}>
      {/* Soft Blue River / Water Body */}
      <View
        style={{
          backgroundColor: mapRiver,
          borderRadius: 60,
          height: 380,
          position: 'absolute',
          right: '18%',
          top: '-15%',
          transform: [{rotate: '-32deg'}],
          width: 26,
        }}
      />
      <View
        style={{
          backgroundColor: mapRiver,
          borderRadius: 40,
          height: 180,
          position: 'absolute',
          right: '12%',
          top: '35%',
          transform: [{rotate: '45deg'}],
          width: 18,
        }}
      />

      {/* Terrain Parks / Green spaces */}
      <View
        style={{
          backgroundColor: mapPark,
          borderRadius: 50,
          height: 85,
          left: '26%',
          position: 'absolute',
          top: '10%',
          width: 105,
        }}
      />
      <View
        style={{
          backgroundColor: mapPark,
          borderRadius: 45,
          bottom: '12%',
          height: 75,
          left: '4%',
          position: 'absolute',
          width: 90,
        }}
      />
      <View
        style={{
          backgroundColor: mapPark,
          borderRadius: 45,
          bottom: '6%',
          height: 75,
          position: 'absolute',
          right: '4%',
          width: 95,
        }}
      />
      <View
        style={{
          backgroundColor: mapPark,
          borderRadius: 40,
          height: 60,
          left: '8%',
          position: 'absolute',
          top: '18%',
          width: 70,
        }}
      />

      {/* Road Grid Network */}
      <View
        style={{
          backgroundColor: mapRoadMajor,
          height: 3.5,
          left: '-10%',
          position: 'absolute',
          top: '32%',
          transform: [{rotate: '-38deg'}],
          width: '140%',
        }}
      />
      <View
        style={{
          backgroundColor: mapRoadMajor,
          height: 3.5,
          left: '-15%',
          position: 'absolute',
          top: '58%',
          transform: [{rotate: '24deg'}],
          width: '140%',
        }}
      />
      <View
        style={{
          backgroundColor: mapRoadMajor,
          height: 3.5,
          left: '10%',
          position: 'absolute',
          top: '48%',
          transform: [{rotate: '-55deg'}],
          width: '140%',
        }}
      />
      <View
        style={{
          backgroundColor: mapRoadMajor,
          height: 3.5,
          left: '-20%',
          position: 'absolute',
          top: '74%',
          transform: [{rotate: '-14deg'}],
          width: '140%',
        }}
      />
      <View
        style={{
          backgroundColor: mapRoadMajor,
          height: 3.5,
          left: '-10%',
          position: 'absolute',
          top: '12%',
          transform: [{rotate: '95deg'}],
          width: '140%',
        }}
      />

      {/* Minor Vein Roads */}
      <View
        style={{
          backgroundColor: mapRoadMinor,
          height: 1.5,
          left: '-8%',
          position: 'absolute',
          top: '20%',
          transform: [{rotate: '-20deg'}],
          width: '130%',
        }}
      />
      <View
        style={{
          backgroundColor: mapRoadMinor,
          height: 1.5,
          left: '-12%',
          position: 'absolute',
          top: '40%',
          transform: [{rotate: '75deg'}],
          width: '130%',
        }}
      />
      <View
        style={{
          backgroundColor: mapRoadMinor,
          height: 1.5,
          left: '20%',
          position: 'absolute',
          top: '68%',
          transform: [{rotate: '-42deg'}],
          width: '130%',
        }}
      />
      <View
        style={{
          backgroundColor: mapRoadMinor,
          height: 1.5,
          left: '-5%',
          position: 'absolute',
          top: '84%',
          transform: [{rotate: '28deg'}],
          width: '130%',
        }}
      />
      <View
        style={{
          backgroundColor: mapRoadMinor,
          height: 1.5,
          left: '35%',
          position: 'absolute',
          top: '50%',
          transform: [{rotate: '45deg'}],
          width: '130%',
        }}
      />

      {/* Prominent Ranchi Location Labels */}
      <Text
        style={{
          color: mapLabelColor,
          fontFamily: fontSans,
          fontSize: 10,
          fontWeight: '700',
          left: '12%',
          letterSpacing: 0.6,
          position: 'absolute',
          top: '22%',
        }}>
        KANTATOLI
      </Text>
      <Text
        style={{
          color: mapLabelColor,
          fontFamily: fontSans,
          fontSize: 10,
          fontWeight: '700',
          left: '42%',
          letterSpacing: 0.6,
          position: 'absolute',
          top: '22%',
        }}>
        KOKAR
      </Text>
      <Text
        style={{
          color: mapLabelColor,
          fontFamily: fontSans,
          fontSize: 10,
          fontWeight: '700',
          letterSpacing: 0.6,
          position: 'absolute',
          right: '18%',
          top: '18%',
        }}>
        LALPUR
      </Text>
      <Text
        style={{
          bottom: '18%',
          color: mapLabelColor,
          fontFamily: fontSans,
          fontSize: 10,
          fontWeight: '700',
          left: '8%',
          letterSpacing: 0.6,
          position: 'absolute',
        }}>
        HARMU
      </Text>
      <Text
        style={{
          bottom: '10%',
          color: mapLabelColor,
          fontFamily: fontSans,
          fontSize: 10,
          fontWeight: '700',
          letterSpacing: 0.6,
          position: 'absolute',
          right: '18%',
        }}>
        KADRU
      </Text>
      <Text
        style={{
          bottom: '10%',
          color: mapLabelColor,
          fontFamily: fontSans,
          fontSize: 10,
          fontWeight: '700',
          left: '26%',
          letterSpacing: 0.6,
          position: 'absolute',
          transform: [{rotate: '-18deg'}],
        }}>
        MAIN ROAD
      </Text>

      {/* Top Left: RANCHI Live Area Badge */}
      <View
        style={{
          alignItems: 'center',
          backgroundColor: 'rgba(24, 32, 38, 0.92)',
          borderColor: 'rgba(255, 255, 255, 0.12)',
          borderRadius: 12,
          borderWidth: 1,
          flexDirection: 'row',
          gap: 8,
          left: 14,
          paddingHorizontal: 10,
          paddingVertical: 7,
          position: 'absolute',
          top: 14,
          zIndex: 10,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: colors.yellow500 || '#FFD21A',
              fontSize: 16,
              transform: [{rotate: '-45deg'}],
            }}>
            ▲
          </Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              color: '#FFFFFF',
              fontFamily: fontSans,
              fontSize: 11,
              fontWeight: '800',
              letterSpacing: 0.5,
            }}>
            RANCHI
          </Text>
          <Text
            style={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontFamily: fontSans,
              fontSize: 9.5,
              fontWeight: '500',
            }}>
            Live Area
          </Text>
        </View>
        <Text
          style={{
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: 14,
            fontWeight: '700',
            marginLeft: 2,
          }}>
          ›
        </Text>
      </View>

      {/* Right Side Map Controls (Location / Filter / Layers / Expand) */}
      <View
        style={{
          gap: 8,
          position: 'absolute',
          right: 14,
          top: 14,
          zIndex: 10,
        }}>
        <Pressable
          style={{
            alignItems: 'center',
            backgroundColor: 'rgba(24, 33, 40, 0.94)',
            borderColor: 'rgba(255, 255, 255, 0.14)',
            borderRadius: 12,
            borderWidth: 1,
            height: 38,
            justifyContent: 'center',
            width: 38,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3,
            elevation: 3,
          }}
          onPress={onRecenter}
          accessibilityRole="button"
          accessibilityLabel="Recenter Map">
          <Image
            source={icons.mapGps}
            style={{
              height: 18,
              resizeMode: 'contain',
              width: 18,
            }}
          />
        </Pressable>
        <Pressable
          style={{
            alignItems: 'center',
            backgroundColor: 'rgba(24, 33, 40, 0.94)',
            borderColor: 'rgba(255, 255, 255, 0.14)',
            borderRadius: 12,
            borderWidth: 1,
            height: 38,
            justifyContent: 'center',
            width: 38,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3,
            elevation: 3,
          }}
          onPress={onFilter}
          accessibilityRole="button"
          accessibilityLabel="Filter Map">
          <Image
            source={icons.mapFilter}
            style={{
              height: 18,
              resizeMode: 'contain',
              width: 18,
            }}
          />
        </Pressable>
        <Pressable
          style={{
            alignItems: 'center',
            backgroundColor: 'rgba(24, 33, 40, 0.94)',
            borderColor: 'rgba(255, 255, 255, 0.14)',
            borderRadius: 12,
            borderWidth: 1,
            height: 38,
            justifyContent: 'center',
            width: 38,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3,
            elevation: 3,
          }}
          onPress={onListToggle}
          accessibilityRole="button"
          accessibilityLabel="Toggle Map Layers">
          <Image
            source={icons.mapList}
            style={{
              height: 18,
              resizeMode: 'contain',
              width: 18,
            }}
          />
        </Pressable>
        <Pressable
          style={{
            alignItems: 'center',
            backgroundColor: 'rgba(24, 33, 40, 0.94)',
            borderColor: 'rgba(255, 255, 255, 0.14)',
            borderRadius: 12,
            borderWidth: 1,
            height: 38,
            justifyContent: 'center',
            width: 38,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3,
            elevation: 3,
          }}
          onPress={() => {}}
          accessibilityRole="button"
          accessibilityLabel="Expand Map Fullscreen">
          <Image
            source={icons.mapExpand}
            style={{
              height: 18,
              resizeMode: 'contain',
              width: 18,
            }}
          />
        </Pressable>
      </View>

      {/* Conditional Rendering: Normal Scanning Mode vs. At Pickup Mode */}
      {!isAtPickup ? (
        <>
          {/* Nearby Vehicle / Request Markers */}
          <VehicleMarker
            style={{
              left: '18%',
              top: '38%',
            }}
          />
          <VehicleMarker
            style={{
              left: '58%',
              top: '30%',
            }}
          />
          <VehicleMarker
            style={{
              bottom: '26%',
              right: '22%',
            }}
          />

          {/* Driver's Current Location Marker (Center) with Yellow Aura */}
          <View
            style={{
              alignItems: 'center',
              left: '50%',
              marginLeft: -48,
              marginTop: -48,
              position: 'absolute',
              top: '49%',
              zIndex: 8,
            }}>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 210, 26, 0.18)',
                borderRadius: 48,
                height: 96,
                justifyContent: 'center',
                width: 96,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: colors.yellow500 || '#FFD21A',
                  borderColor: '#FFFFFF',
                  borderRadius: 24,
                  borderWidth: 2.5,
                  height: 48,
                  justifyContent: 'center',
                  width: 48,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 3},
                  shadowOpacity: 0.35,
                  shadowRadius: 4,
                  elevation: 5,
                }}>
                <Text
                  style={{
                    color: '#111315',
                    fontSize: 20,
                    fontWeight: '900',
                    transform: [{rotate: '-45deg'}],
                  }}>
                  ▲
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: colors.yellow500 || '#FFD21A',
                borderRadius: 10,
                marginTop: -6,
                paddingHorizontal: 10,
                paddingVertical: 3.5,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.2,
                shadowRadius: 3,
                elevation: 3,
              }}>
              <Text
                style={{
                  color: '#111315',
                  fontFamily: fontSans,
                  fontSize: 9.5,
                  fontWeight: '800',
                  letterSpacing: 0.1,
                }}>
                You are online
              </Text>
            </View>
          </View>
        </>
      ) : (
        <>
          {/* --- AT PICKUP MODE --- */}

          {/* 1. Yellow Route Line Segments Connecting Driver to Pickup */}
          <View
            style={{
              backgroundColor: '#FFD21A',
              borderRadius: 2.5,
              height: 4.5,
              left: '28%',
              position: 'absolute',
              shadowColor: '#FFD21A',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0.8,
              shadowRadius: 4,
              top: '33%',
              transform: [{rotate: '34deg'}],
              width: 52,
              elevation: 3,
              zIndex: 7,
            }}
          />
          <View
            style={{
              backgroundColor: '#FFD21A',
              borderRadius: 2.5,
              height: 4.5,
              left: '37%',
              position: 'absolute',
              shadowColor: '#FFD21A',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0.8,
              shadowRadius: 4,
              top: '44%',
              transform: [{rotate: '82deg'}],
              width: 48,
              elevation: 3,
              zIndex: 7,
            }}
          />
          <View
            style={{
              backgroundColor: '#FFD21A',
              borderRadius: 2.5,
              height: 4.5,
              left: '42%',
              position: 'absolute',
              shadowColor: '#FFD21A',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0.8,
              shadowRadius: 4,
              top: '55%',
              transform: [{rotate: '40deg'}],
              width: 36,
              elevation: 3,
              zIndex: 7,
            }}
          />

          {/* 2. Pickup Location Marker (Yellow Pin + 'Pickup' Pill) */}
          <View
            style={{
              alignItems: 'center',
              left: '22%',
              position: 'absolute',
              top: '19%',
              zIndex: 9,
            }}>
            <Image
              source={icons.mapPickupPin}
              style={{
                height: 36,
                resizeMode: 'contain',
                width: 36,
              }}
            />
            <View
              style={{
                backgroundColor: '#FFD21A',
                borderRadius: 8,
                marginTop: -4,
                paddingHorizontal: 8,
                paddingVertical: 2.5,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.3,
                shadowRadius: 3,
                elevation: 4,
              }}>
              <Text
                style={{
                  color: '#111315',
                  fontFamily: fontSans,
                  fontSize: 9.5,
                  fontWeight: '900',
                  letterSpacing: 0.3,
                }}>
                Pickup
              </Text>
            </View>
          </View>

          {/* 3. Driver Vehicle Marker (Angled Top-Down Car with Yellow Glowing Halo) */}
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              left: '46%',
              position: 'absolute',
              top: '55%',
              zIndex: 9,
            }}>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 210, 26, 0.22)',
                borderRadius: 33,
                height: 66,
                justifyContent: 'center',
                width: 66,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 210, 26, 0.45)',
                  borderRadius: 24,
                  height: 48,
                  justifyContent: 'center',
                  width: 48,
                }}>
                <Image
                  source={icons.mapCar}
                  style={{
                    height: 34,
                    resizeMode: 'contain',
                    transform: [{rotate: '-42deg'}],
                    width: 34,
                  }}
                />
              </View>
            </View>
          </View>

          {/* 4. Floating 'Navigate' Pill Button (Bottom Right) */}
          <Pressable
            style={{
              alignItems: 'center',
              backgroundColor: 'rgba(20, 28, 34, 0.94)',
              borderColor: 'rgba(255, 255, 255, 0.16)',
              borderRadius: 20,
              borderWidth: 1,
              bottom: 16,
              flexDirection: 'row',
              gap: 6,
              paddingHorizontal: 12,
              paddingVertical: 6,
              position: 'absolute',
              right: 14,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 4,
              zIndex: 12,
            }}
            onPress={onNavigate}
            accessibilityRole="button"
            accessibilityLabel="Navigate to pickup">
            <Image
              source={icons.navigate}
              style={{
                height: 14,
                resizeMode: 'contain',
                tintColor: '#FFFFFF',
                width: 14,
              }}
            />
            <Text
              style={{
                color: '#FFFFFF',
                fontFamily: fontSans,
                fontSize: 12,
                fontWeight: '700',
              }}>
              Navigate
            </Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

function VehicleMarker({style}) {
  return (
    <View
      style={[
        {
          alignItems: 'center',
          backgroundColor: 'rgba(16, 185, 129, 0.24)',
          borderRadius: 20,
          height: 40,
          justifyContent: 'center',
          position: 'absolute',
          width: 40,
          zIndex: 6,
        },
        style,
      ]}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#0D1E17',
          borderColor: '#10B981',
          borderRadius: 14,
          borderWidth: 2,
          height: 28,
          justifyContent: 'center',
          width: 28,
        }}>
        <Image
          source={icons.rides}
          style={{
            height: 15,
            resizeMode: 'contain',
            width: 15,
          }}
          tintColor="#FFFFFF"
        />
      </View>
    </View>
  );
}

export default MapPanel;
