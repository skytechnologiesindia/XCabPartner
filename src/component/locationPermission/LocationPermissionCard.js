import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

/**
 * LocationPermissionCard
 * Illustrative card for location access with map pin motif
 */
function LocationPermissionCard() {
  return (
    <View style={styles.container}>
      <View style={styles.mapVisual}>
        {/* Abstract Map Grid Lines */}
        <View style={styles.gridLineHorizontal1} />
        <View style={styles.gridLineHorizontal2} />
        <View style={styles.gridLineVertical1} />
        <View style={styles.gridLineVertical2} />
        
        {/* Animated-look Route */}
        <View style={styles.routePill}>
          <Text style={styles.routeIcon}>🚕</Text>
          <Text style={styles.routeText}>Active Route</Text>
        </View>

        {/* Center Pin Badge */}
        <View style={styles.pinCircle}>
          <Text style={styles.pinIcon}>📍</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  mapVisual: {
    alignItems: 'center',
    backgroundColor: '#F1EEE5',
    borderColor: '#DDD9CF',
    borderRadius: 16,
    borderWidth: 1,
    height: 140,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
  gridLineHorizontal1: {
    backgroundColor: '#E5E1D4',
    height: 2,
    position: 'absolute',
    top: 40,
    width: '100%',
  },
  gridLineHorizontal2: {
    backgroundColor: '#E5E1D4',
    height: 2,
    position: 'absolute',
    top: 95,
    width: '100%',
  },
  gridLineVertical1: {
    backgroundColor: '#E5E1D4',
    height: '100%',
    left: 80,
    position: 'absolute',
    width: 2,
  },
  gridLineVertical2: {
    backgroundColor: '#E5E1D4',
    height: '100%',
    position: 'absolute',
    right: 80,
    width: 2,
  },
  routePill: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#DDD9CF',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 4,
    left: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    position: 'absolute',
    top: 14,
  },
  routeIcon: {
    fontSize: 12,
  },
  routeText: {
    color: '#17191C',
    fontSize: 10,
    fontWeight: '700',
  },
  pinCircle: {
    alignItems: 'center',
    backgroundColor: '#FFC928',
    borderColor: '#FFFFFF',
    borderRadius: 28,
    borderWidth: 3,
    elevation: 4,
    height: 56,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    width: 56,
  },
  pinIcon: {
    fontSize: 26,
  },
});

export default LocationPermissionCard;
