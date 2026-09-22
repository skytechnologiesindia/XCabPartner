import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { locationBenefits } from './locationPermissionData';

/**
 * LocationBenefits
 * Displays the 3 key reasons why XCAB Driver App needs location access.
 */
function LocationBenefits() {
  return (
    <View style={styles.container}>
      {locationBenefits.map((item) => (
        <View key={item.id} style={styles.benefitRow}>
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>{item.icon}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
    paddingHorizontal: 20,
    width: '100%',
  },
  benefitRow: {
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderColor: '#DDD9CF',
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    padding: 14,
  },
  iconCircle: {
    alignItems: 'center',
    backgroundColor: '#FFF4C7',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    marginRight: 14,
    width: 40,
  },
  icon: {
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#17191C',
    fontSize: 14.5,
    fontWeight: '800',
    marginBottom: 2,
  },
  description: {
    color: '#687078',
    fontSize: 12,
    lineHeight: 17,
  },
});

export default LocationBenefits;
