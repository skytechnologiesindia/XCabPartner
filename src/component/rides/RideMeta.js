import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { icons } from '../../assets/icons';

/**
 * RideMeta
 * Renders the 3 metadata chips (Duration, Distance, Rider)
 * with small outline icons and bold values.
 */
function RideMeta({ duration = '-', distance = '-', rider = '-' }) {
  return (
    <View style={styles.metaRow}>
      {/* 1. Duration Chip */}
      <View style={styles.chip}>
        <Image
          source={icons.statClock}
          style={styles.icon}
          tintColor="#17191C"
          resizeMode="contain"
        />
        <View style={styles.textColumn}>
          <Text style={styles.valueText} numberOfLines={1}>
            {duration}
          </Text>
          <Text style={styles.labelText}>Duration</Text>
        </View>
      </View>

      {/* 2. Distance Chip */}
      <View style={styles.chip}>
        {/* Route / Distance icon graphic */}
        <View style={styles.distanceIconContainer}>
          <View style={styles.distCornerTL} />
          <View style={styles.distCornerBR} />
        </View>
        <View style={styles.textColumn}>
          <Text style={styles.valueText} numberOfLines={1}>
            {distance}
          </Text>
          <Text style={styles.labelText}>Distance</Text>
        </View>
      </View>

      {/* 3. Rider Chip */}
      <View style={styles.chip}>
        <Image
          source={icons.profile}
          style={styles.icon}
          tintColor="#17191C"
          resizeMode="contain"
        />
        <View style={styles.textColumn}>
          <Text style={styles.valueText} numberOfLines={1}>
            {rider}
          </Text>
          <Text style={styles.labelText}>Rider</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  chip: {
    alignItems: 'center',
    backgroundColor: '#F4F2EB',
    borderRadius: 10,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  icon: {
    height: 14,
    width: 14,
  },
  distanceIconContainer: {
    height: 14,
    justifyContent: 'space-between',
    position: 'relative',
    width: 14,
  },
  distCornerTL: {
    borderColor: '#17191C',
    borderLeftWidth: 1.8,
    borderTopLeftRadius: 3,
    borderTopWidth: 1.8,
    height: 8,
    width: 8,
  },
  distCornerBR: {
    alignSelf: 'flex-end',
    borderColor: '#17191C',
    borderBottomRightRadius: 3,
    borderBottomWidth: 1.8,
    borderRightWidth: 1.8,
    height: 8,
    marginTop: -2,
    width: 8,
  },
  textColumn: {
    justifyContent: 'center',
  },
  valueText: {
    color: '#17191C',
    fontSize: 11.5,
    fontWeight: '700',
    letterSpacing: -0.1,
  },
  labelText: {
    color: '#687078',
    fontSize: 9.5,
    fontWeight: '500',
    marginTop: 1,
  },
});

export default RideMeta;
