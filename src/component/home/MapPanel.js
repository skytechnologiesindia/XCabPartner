import React from 'react';
import {Image, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../assets/colors/colors';
import {icons} from '../../assets/icons';

// Softer premium ride-hailing map palette (slate/navy/charcoal base)
const mapBase = '#1C262E';
const mapRoadMajor = 'rgba(74, 96, 110, 0.85)';
const mapRoadMinor = 'rgba(56, 74, 86, 0.65)';
const mapPark = 'rgba(40, 78, 58, 0.45)';
const mapRiver = 'rgba(46, 88, 126, 0.82)';
const mapLabelColor = 'rgba(215, 228, 235, 0.6)';

function MapPanel({
  isAtPickup = false,
  onRecenter,
  onFilter,
  onListToggle,
  onNavigate,
}) {
  return (
    <View
      style={[
        styles.mapContainer,
        isAtPickup && styles.mapContainerAtPickup,
      ]}>
      {/* Soft Blue River / Water Body */}
      <View style={styles.riverCurve} />
      <View style={styles.riverCurveBranch} />

      {/* Terrain Parks / Green spaces */}
      <View style={styles.parkKokar} />
      <View style={styles.parkHarmu} />
      <View style={styles.parkKadru} />
      <View style={styles.parkKantatoli} />

      {/* Road Grid Network */}
      <View style={[styles.roadMajor, styles.roadMajor1]} />
      <View style={[styles.roadMajor, styles.roadMajor2]} />
      <View style={[styles.roadMajor, styles.roadMajor3]} />
      <View style={[styles.roadMajor, styles.roadMajor4]} />
      <View style={[styles.roadMajor, styles.roadMajor5]} />

      {/* Minor Vein Roads */}
      <View style={[styles.roadMinor, styles.roadMinor1]} />
      <View style={[styles.roadMinor, styles.roadMinor2]} />
      <View style={[styles.roadMinor, styles.roadMinor3]} />
      <View style={[styles.roadMinor, styles.roadMinor4]} />
      <View style={[styles.roadMinor, styles.roadMinor5]} />

      {/* Prominent Ranchi Location Labels */}
      <Text style={[styles.mapLabel, styles.labelKantatoli]}>KANTATOLI</Text>
      <Text style={[styles.mapLabel, styles.labelKokar]}>KOKAR</Text>
      <Text style={[styles.mapLabel, styles.labelLalpur]}>LALPUR</Text>
      <Text style={[styles.mapLabel, styles.labelHarmu]}>HARMU</Text>
      <Text style={[styles.mapLabel, styles.labelKadru]}>KADRU</Text>
      <Text style={[styles.mapLabel, styles.labelMainRoad]}>MAIN ROAD</Text>

      {/* Top Left: RANCHI Live Area Badge */}
      <View style={styles.liveAreaBadge}>
        <View style={styles.liveArrowWrap}>
          <Text style={styles.liveArrowIcon}>▲</Text>
        </View>
        <View style={styles.liveAreaTextWrap}>
          <Text style={styles.liveAreaCity}>RANCHI</Text>
          <Text style={styles.liveAreaSub}>Live Area</Text>
        </View>
        <Text style={styles.liveAreaChevron}>›</Text>
      </View>

      {/* Right Side Map Controls (Location / Filter / Layers / Expand) */}
      <View style={styles.controlsColumn}>
        <Pressable
          style={styles.controlButton}
          onPress={onRecenter}
          accessibilityRole="button"
          accessibilityLabel="Recenter Map">
          <Image source={icons.mapGps} style={styles.controlIcon} />
        </Pressable>
        <Pressable
          style={styles.controlButton}
          onPress={onFilter}
          accessibilityRole="button"
          accessibilityLabel="Filter Map">
          <Image source={icons.mapFilter} style={styles.controlIcon} />
        </Pressable>
        <Pressable
          style={styles.controlButton}
          onPress={onListToggle}
          accessibilityRole="button"
          accessibilityLabel="Toggle Map Layers">
          <Image source={icons.mapList} style={styles.controlIcon} />
        </Pressable>
        <Pressable
          style={styles.controlButton}
          onPress={() => {}}
          accessibilityRole="button"
          accessibilityLabel="Expand Map Fullscreen">
          <Image source={icons.mapExpand} style={styles.controlIcon} />
        </Pressable>
      </View>

      {/* Conditional Rendering: Normal Scanning Mode vs. At Pickup Mode */}
      {!isAtPickup ? (
        <>
          {/* Nearby Vehicle / Request Markers */}
          <VehicleMarker style={styles.markerKantatoli} />
          <VehicleMarker style={styles.markerKokar} />
          <VehicleMarker style={styles.markerKadru} />

          {/* Driver's Current Location Marker (Center) with Yellow Aura */}
          <View style={styles.driverContainer}>
            <View style={styles.driverAura}>
              <View style={styles.driverCircle}>
                <Text style={styles.driverArrow}>▲</Text>
              </View>
            </View>
            <View style={styles.onlinePill}>
              <Text style={styles.onlineText}>You are online</Text>
            </View>
          </View>
        </>
      ) : (
        <>
          {/* --- AT PICKUP MODE --- */}

          {/* 1. Yellow Route Line Segments Connecting Driver to Pickup */}
          <View style={[styles.routeSegment, styles.routeSeg1]} />
          <View style={[styles.routeSegment, styles.routeSeg2]} />
          <View style={[styles.routeSegment, styles.routeSeg3]} />

          {/* 2. Pickup Location Marker (Yellow Pin + 'Pickup' Pill) */}
          <View style={styles.pickupMarkerContainer}>
            <Image
              source={icons.mapPickupPin}
              style={styles.pickupPinIcon}
            />
            <View style={styles.pickupBadge}>
              <Text style={styles.pickupBadgeText}>Pickup</Text>
            </View>
          </View>

          {/* 3. Driver Vehicle Marker (Angled Top-Down Car with Yellow Glowing Halo) */}
          <View style={styles.pickupDriverContainer}>
            <View style={styles.pickupDriverHaloOuter}>
              <View style={styles.pickupDriverHaloInner}>
                <Image
                  source={icons.mapCar}
                  style={styles.pickupDriverCar}
                />
              </View>
            </View>
          </View>

          {/* 4. Floating 'Navigate' Pill Button (Bottom Right) */}
          <Pressable
            style={[styles.navigateButton, styles.navigateButtonAtPickup]}
            onPress={onNavigate}
            accessibilityRole="button"
            accessibilityLabel="Navigate to pickup">
            <Image source={icons.navigate} style={styles.navigateIcon} />
            <Text style={styles.navigateText}>Navigate</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

function VehicleMarker({style}) {
  return (
    <View style={[styles.markerAura, style]}>
      <View style={styles.markerCircle}>
        <Image
          source={icons.rides}
          style={styles.markerCarIcon}
          tintColor="#FFFFFF"
        />
      </View>
    </View>
  );
}

const fontSans = Platform.select({
  ios: 'System',
  android: 'sans-serif',
});

const styles = StyleSheet.create({
  mapContainer: {
    backgroundColor: mapBase,
    borderColor: '#2D3A44',
    borderRadius: 24,
    borderWidth: 1,
    height: 345,
    marginBottom: 12,
    marginHorizontal: 16,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  mapContainerAtPickup: {
    height: 310,
    marginBottom: 12,
    marginTop: 4,
  },
  riverCurve: {
    backgroundColor: mapRiver,
    borderRadius: 60,
    height: 380,
    position: 'absolute',
    right: '18%',
    top: '-15%',
    transform: [{rotate: '-32deg'}],
    width: 26,
  },
  riverCurveBranch: {
    backgroundColor: mapRiver,
    borderRadius: 40,
    height: 180,
    position: 'absolute',
    right: '12%',
    top: '35%',
    transform: [{rotate: '45deg'}],
    width: 18,
  },
  parkKokar: {
    backgroundColor: mapPark,
    borderRadius: 50,
    height: 85,
    left: '26%',
    position: 'absolute',
    top: '10%',
    width: 105,
  },
  parkHarmu: {
    backgroundColor: mapPark,
    borderRadius: 45,
    bottom: '12%',
    height: 75,
    left: '4%',
    position: 'absolute',
    width: 90,
  },
  parkKadru: {
    backgroundColor: mapPark,
    borderRadius: 45,
    bottom: '6%',
    height: 75,
    position: 'absolute',
    right: '4%',
    width: 95,
  },
  parkKantatoli: {
    backgroundColor: mapPark,
    borderRadius: 40,
    height: 60,
    left: '8%',
    position: 'absolute',
    top: '18%',
    width: 70,
  },
  roadMajor: {
    backgroundColor: mapRoadMajor,
    height: 3.5,
    position: 'absolute',
    width: '140%',
  },
  roadMajor1: {top: '32%', left: '-10%', transform: [{rotate: '-38deg'}]},
  roadMajor2: {top: '58%', left: '-15%', transform: [{rotate: '24deg'}]},
  roadMajor3: {top: '48%', left: '10%', transform: [{rotate: '-55deg'}]},
  roadMajor4: {top: '74%', left: '-20%', transform: [{rotate: '-14deg'}]},
  roadMajor5: {top: '12%', left: '-10%', transform: [{rotate: '95deg'}]},
  roadMinor: {
    backgroundColor: mapRoadMinor,
    height: 1.5,
    position: 'absolute',
    width: '130%',
  },
  roadMinor1: {top: '20%', left: '-8%', transform: [{rotate: '-20deg'}]},
  roadMinor2: {top: '40%', left: '-12%', transform: [{rotate: '75deg'}]},
  roadMinor3: {top: '68%', left: '20%', transform: [{rotate: '-42deg'}]},
  roadMinor4: {top: '84%', left: '-5%', transform: [{rotate: '28deg'}]},
  roadMinor5: {top: '50%', left: '35%', transform: [{rotate: '45deg'}]},
  mapLabel: {
    color: mapLabelColor,
    fontFamily: fontSans,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    position: 'absolute',
  },
  labelKantatoli: {left: '12%', top: '22%'},
  labelKokar: {left: '42%', top: '22%'},
  labelLalpur: {right: '18%', top: '18%'},
  labelHarmu: {left: '8%', bottom: '18%'},
  labelKadru: {right: '18%', bottom: '10%'},
  labelMainRoad: {bottom: '10%', left: '26%', transform: [{rotate: '-18deg'}]},
  liveAreaBadge: {
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
  },
  liveArrowWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveArrowIcon: {
    color: colors.yellow500 || '#FFD21A',
    fontSize: 16,
    transform: [{rotate: '-45deg'}],
  },
  liveAreaTextWrap: {
    justifyContent: 'center',
  },
  liveAreaCity: {
    color: '#FFFFFF',
    fontFamily: fontSans,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  liveAreaSub: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: fontSans,
    fontSize: 9.5,
    fontWeight: '500',
  },
  liveAreaChevron: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 2,
  },
  controlsColumn: {
    gap: 8,
    position: 'absolute',
    right: 14,
    top: 14,
    zIndex: 10,
  },
  controlButton: {
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
  },
  controlIcon: {
    height: 18,
    resizeMode: 'contain',
    width: 18,
  },
  driverContainer: {
    alignItems: 'center',
    left: '50%',
    marginLeft: -48,
    marginTop: -48,
    position: 'absolute',
    top: '49%',
    zIndex: 8,
  },
  driverAura: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 210, 26, 0.18)',
    borderRadius: 48,
    height: 96,
    justifyContent: 'center',
    width: 96,
  },
  driverCircle: {
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
  },
  driverArrow: {
    color: '#111315',
    fontSize: 20,
    fontWeight: '900',
    transform: [{rotate: '-45deg'}],
  },
  onlinePill: {
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
  },
  onlineText: {
    color: '#111315',
    fontFamily: fontSans,
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.1,
  },
  markerAura: {
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.24)',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    position: 'absolute',
    width: 40,
    zIndex: 6,
  },
  markerCircle: {
    alignItems: 'center',
    backgroundColor: '#0D1E17',
    borderColor: '#10B981',
    borderRadius: 14,
    borderWidth: 2,
    height: 28,
    justifyContent: 'center',
    width: 28,
  },
  markerCarIcon: {
    height: 15,
    resizeMode: 'contain',
    width: 15,
  },
  markerKantatoli: {left: '18%', top: '38%'},
  markerKokar: {left: '58%', top: '30%'},
  markerKadru: {right: '22%', bottom: '26%'},

  /* --- AT PICKUP SPECIFIC STYLES --- */
  routeSegment: {
    backgroundColor: '#FFD21A',
    borderRadius: 2.5,
    height: 4.5,
    position: 'absolute',
    shadowColor: '#FFD21A',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 7,
  },
  routeSeg1: {
    left: '28%',
    top: '33%',
    transform: [{rotate: '34deg'}],
    width: 52,
  },
  routeSeg2: {
    left: '37%',
    top: '44%',
    transform: [{rotate: '82deg'}],
    width: 48,
  },
  routeSeg3: {
    left: '42%',
    top: '55%',
    transform: [{rotate: '40deg'}],
    width: 36,
  },
  pickupMarkerContainer: {
    alignItems: 'center',
    left: '22%',
    position: 'absolute',
    top: '19%',
    zIndex: 9,
  },
  pickupPinIcon: {
    height: 36,
    resizeMode: 'contain',
    width: 36,
  },
  pickupBadge: {
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
  },
  pickupBadgeText: {
    color: '#111315',
    fontFamily: fontSans,
    fontSize: 9.5,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  pickupDriverContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    left: '46%',
    position: 'absolute',
    top: '55%',
    zIndex: 9,
  },
  pickupDriverHaloOuter: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 210, 26, 0.22)',
    borderRadius: 33,
    height: 66,
    justifyContent: 'center',
    width: 66,
  },
  pickupDriverHaloInner: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 210, 26, 0.45)',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  pickupDriverCar: {
    height: 34,
    resizeMode: 'contain',
    transform: [{rotate: '-42deg'}],
    width: 34,
  },
  navigateButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(20, 28, 34, 0.94)',
    borderColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 20,
    borderWidth: 1,
    bottom: 14,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 13,
    paddingVertical: 7,
    position: 'absolute',
    right: 14,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 12,
  },
  navigateButtonAtPickup: {
    bottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    right: 14,
  },
  navigateIcon: {
    height: 14,
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
    width: 14,
  },
  navigateText: {
    color: '#FFFFFF',
    fontFamily: fontSans,
    fontSize: 12,
    fontWeight: '700',
  },
});

export default MapPanel;
