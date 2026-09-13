import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { icons } from '../../assets/icons';

/**
 * AlertIcon
 * Renders the circular accent container and corresponding icon for each alert category.
 */
function AlertIcon({ type = 'ride_request' }) {
  switch (type) {
    case 'payout':
      return (
        <View style={[styles.circle, styles.payoutCircle]}>
          <Image
            source={icons.statWallet}
            style={styles.icon}
            tintColor="#17191C"
            resizeMode="contain"
          />
        </View>
      );

    case 'document':
      return (
        <View style={[styles.circle, styles.documentCircle]}>
          <DocumentGraphic />
        </View>
      );

    case 'high_demand':
      return (
        <View style={[styles.circle, styles.demandCircle]}>
          <DemandGraphic />
        </View>
      );

    case 'ride_request':
    default:
      return (
        <View style={[styles.circle, styles.rideCircle]}>
          <Image
            source={icons.rides}
            style={styles.icon}
            tintColor="#17191C"
            resizeMode="contain"
          />
        </View>
      );
  }
}

/**
 * Clean vector 3-bar surge/demand chart graphic matching reference
 */
function DemandGraphic() {
  return (
    <View style={styles.demandWrapper}>
      <View style={[styles.demandBar, styles.demandBar1]} />
      <View style={[styles.demandBar, styles.demandBar2]} />
      <View style={[styles.demandBar, styles.demandBar3]} />
    </View>
  );
}

/**
 * Clean vector document icon with folded top-right corner and horizontal lines
 */
function DocumentGraphic() {
  return (
    <View style={styles.docWrapper}>
      <View style={styles.docBody}>
        {/* Folded corner triangle */}
        <View style={styles.docFold} />
        {/* Document lines */}
        <View style={styles.docLine1} />
        <View style={styles.docLine2} />
        <View style={styles.docLine3} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    borderRadius: 23,
    height: 46,
    justifyContent: 'center',
    width: 46,
  },
  icon: {
    height: 20,
    width: 20,
  },
  rideCircle: {
    backgroundColor: '#FFF8E1',
  },
  payoutCircle: {
    backgroundColor: '#E6F8EF',
  },
  documentCircle: {
    backgroundColor: '#FDECEB',
  },
  demandCircle: {
    backgroundColor: '#E6F8EF',
  },
  demandWrapper: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    height: 18,
    justifyContent: 'center',
    gap: 3,
  },
  demandBar: {
    backgroundColor: '#17191C',
    borderRadius: 1.5,
    width: 3.5,
  },
  demandBar1: {
    height: 9,
  },
  demandBar2: {
    height: 17,
  },
  demandBar3: {
    height: 12,
  },
  docWrapper: {
    alignItems: 'center',
    height: 22,
    justifyContent: 'center',
    width: 18,
  },
  docBody: {
    borderColor: '#E53E3E',
    borderRadius: 3,
    borderWidth: 1.8,
    height: 22,
    justifyContent: 'center',
    paddingHorizontal: 2.5,
    position: 'relative',
    width: 17,
  },
  docFold: {
    backgroundColor: '#FDECEB',
    borderColor: '#E53E3E',
    borderLeftWidth: 1.8,
    borderBottomWidth: 1.8,
    height: 5,
    position: 'absolute',
    right: -1.8,
    top: -1.8,
    width: 5,
  },
  docLine1: {
    backgroundColor: '#E53E3E',
    borderRadius: 1,
    height: 1.6,
    marginBottom: 2.5,
    width: '75%',
  },
  docLine2: {
    backgroundColor: '#E53E3E',
    borderRadius: 1,
    height: 1.6,
    marginBottom: 2.5,
    width: '90%',
  },
  docLine3: {
    backgroundColor: '#E53E3E',
    borderRadius: 1,
    height: 1.6,
    width: '60%',
  },
});

export default AlertIcon;
