import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import VehicleDetails from './VehicleDetails';

/**
 * VehicleCard
 * Primary card showcasing the active vehicle identity, thumbnail photo,
 * license plate, operational status badge, and specifications grid.
 */
function VehicleCard({ vehicle, onUpdatePress }) {
  if (!vehicle) return null;

  return (
    <View style={styles.card}>
      {/* Top Row: Thumbnail + Identity + Update CTA */}
      <View style={styles.topRow}>
        {/* Vehicle Image Thumbnail */}
        <View style={styles.thumbnailContainer}>
          <Image
            source={vehicle.image}
            style={styles.thumbnailImage}
            resizeMode="contain"
          />
        </View>

        {/* Identity & Status */}
        <View style={styles.infoCol}>
          <Text style={styles.vehicleName} numberOfLines={1}>
            {vehicle.name}
          </Text>
          <Text style={styles.vehiclePlate} numberOfLines={1}>
            {vehicle.registration}
          </Text>

          {/* Active on XCab Badge */}
          <View style={styles.statusPill}>
            <View style={styles.checkCircle}>
              <Text style={styles.checkMark}>✓</Text>
            </View>
            <Text style={styles.statusText}>{vehicle.statusText || 'Active on XCab'}</Text>
          </View>
        </View>

        {/* Update Button */}
        <Pressable
          style={({ pressed }) => [
            styles.updateButton,
            pressed && styles.updateButtonPressed,
          ]}
          onPress={onUpdatePress}
          accessibilityRole="button"
          accessibilityLabel="Update vehicle details"
        >
          <Text style={styles.updateIcon}>✎</Text>
          <Text style={styles.updateText}>Update</Text>
        </Pressable>
      </View>

      {/* Bottom Section: 4-Column Technical Specifications */}
      <VehicleDetails vehicle={vehicle} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#EFECE6',
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 14,
  },
  thumbnailContainer: {
    alignItems: 'center',
    backgroundColor: '#F7F5EF',
    borderRadius: 12,
    height: 68,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 90,
  },
  thumbnailImage: {
    height: 64,
    width: 86,
  },
  infoCol: {
    flex: 1,
    marginLeft: 12,
    marginRight: 6,
  },
  vehicleName: {
    color: '#17191C',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  vehiclePlate: {
    color: '#687078',
    fontSize: 12.5,
    fontWeight: '500',
    marginTop: 2,
  },
  statusPill: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#E6F8EF',
    borderRadius: 12,
    flexDirection: 'row',
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  checkCircle: {
    alignItems: 'center',
    backgroundColor: '#18A66A',
    borderRadius: 6,
    height: 12,
    justifyContent: 'center',
    marginRight: 4.5,
    width: 12,
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
    lineHeight: 9,
  },
  statusText: {
    color: '#18A66A',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
  updateButton: {
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
    borderRadius: 10,
    borderWidth: 1.2,
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  updateButtonPressed: {
    backgroundColor: '#FEF3C7',
    opacity: 0.9,
  },
  updateIcon: {
    color: '#17191C',
    fontSize: 12,
    fontWeight: '800',
    marginRight: 4,
  },
  updateText: {
    color: '#17191C',
    fontSize: 12.5,
    fontWeight: '700',
    letterSpacing: -0.1,
  },
});

export default VehicleCard;
