import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { icons } from '../../assets/icons';

/**
 * VehicleDetails
 * 4-column grid displaying key vehicle technical specifications
 * (Vehicle Type, Make & Model, Year, Color).
 */
function VehicleDetails({ vehicle }) {
  const type = vehicle?.type || 'Sedan';
  const makeModel = vehicle?.makeModel || 'Maruti Dzire';
  const year = vehicle?.year || '2022';
  const color = vehicle?.color || 'White';

  return (
    <View style={styles.container}>
      {/* 1. Vehicle Type */}
      <View style={styles.column}>
        <Image
          source={icons.rides}
          style={styles.colIcon}
          tintColor="#17191C"
          resizeMode="contain"
        />
        <Text style={styles.label}>Vehicle Type</Text>
        <Text style={styles.value} numberOfLines={1}>
          {type}
        </Text>
      </View>

      {/* Vertical Divider */}
      <View style={styles.verticalDivider} />

      {/* 2. Make & Model */}
      <View style={styles.column}>
        <Text style={styles.symbolIcon}>⚙</Text>
        <Text style={styles.label}>Make & Model</Text>
        <Text style={styles.value} numberOfLines={1}>
          {makeModel}
        </Text>
      </View>

      {/* Vertical Divider */}
      <View style={styles.verticalDivider} />

      {/* 3. Year */}
      <View style={styles.column}>
        <View style={styles.calendarIcon}>
          <View style={styles.calendarTopBar} />
          <View style={styles.calendarDot} />
        </View>
        <Text style={styles.label}>Year</Text>
        <Text style={styles.value} numberOfLines={1}>
          {year}
        </Text>
      </View>

      {/* Vertical Divider */}
      <View style={styles.verticalDivider} />

      {/* 4. Color */}
      <View style={styles.column}>
        <View style={styles.paletteIcon}>
          <View style={styles.paletteHole} />
        </View>
        <Text style={styles.label}>Color</Text>
        <Text style={styles.value} numberOfLines={1}>
          {color}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopColor: '#EFECE6',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
  },
  column: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 2,
  },
  colIcon: {
    height: 18,
    marginBottom: 4,
    width: 18,
  },
  symbolIcon: {
    color: '#17191C',
    fontSize: 15,
    lineHeight: 18,
    marginBottom: 4,
  },
  calendarIcon: {
    borderColor: '#17191C',
    borderRadius: 2.5,
    borderWidth: 1.5,
    height: 15,
    justifyContent: 'center',
    marginBottom: 4,
    position: 'relative',
    width: 15,
  },
  calendarTopBar: {
    backgroundColor: '#17191C',
    height: 3,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  calendarDot: {
    alignSelf: 'center',
    backgroundColor: '#17191C',
    borderRadius: 1,
    height: 2,
    marginTop: 2,
    width: 2,
  },
  paletteIcon: {
    borderColor: '#17191C',
    borderRadius: 8,
    borderWidth: 1.5,
    height: 16,
    justifyContent: 'center',
    marginBottom: 4,
    paddingLeft: 3,
    width: 16,
  },
  paletteHole: {
    backgroundColor: '#17191C',
    borderRadius: 1.5,
    height: 3,
    width: 3,
  },
  label: {
    color: '#687078',
    fontSize: 10.5,
    fontWeight: '500',
    marginBottom: 2,
    textAlign: 'center',
  },
  value: {
    color: '#17191C',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: -0.2,
    textAlign: 'center',
  },
  verticalDivider: {
    backgroundColor: '#EFECE6',
    height: 38,
    width: 1,
  },
});

export default VehicleDetails;
