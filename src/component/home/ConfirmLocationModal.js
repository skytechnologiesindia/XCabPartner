import React from 'react';
import {
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '../../assets/colors/colors';
import {icons} from '../../assets/icons';

function ConfirmLocationModal({
  visible = false,
  pickupLocation = 'Main Road, Ranchi',
  onConfirm,
  onCancel,
}) {
  if (!visible) {
    return null;
  }

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={onCancel}>
      <Pressable style={styles.backdrop} onPress={onCancel}>
        <Pressable style={styles.modalCard} onPress={e => e.stopPropagation()}>
          {/* Top Yellow Icon with Soft Aura */}
          <View style={styles.topIconAura}>
            <View style={styles.topIconCircle}>
              <Image source={icons.pinDark} style={styles.topIcon} />
            </View>
          </View>

          {/* Title & Subtitle */}
          <Text style={styles.title}>I am on location</Text>
          <Text style={styles.subtitle}>
            Confirm that you have reached the pickup point.
          </Text>

          {/* Location Preview Card */}
          <View style={styles.previewCard}>
            {/* Mini Map Thumbnail */}
            <View style={styles.miniMap}>
              <View style={styles.miniMapRoadH} />
              <View style={styles.miniMapRoadV} />
              <View style={styles.miniMapPinWrap}>
                <Image
                  source={icons.mapPickupPin || icons.pinDark}
                  style={styles.miniMapPin}
                />
              </View>
            </View>

            {/* Address & Notification Note */}
            <View style={styles.previewMeta}>
              <Text style={styles.previewAddress} numberOfLines={1}>
                {pickupLocation}
              </Text>
              <Text style={styles.previewSub}>
                Rider will be notified that you have arrived.
              </Text>
            </View>
          </View>

          {/* Primary Action: Confirm location */}
          <Pressable
            style={({pressed}) => [
              styles.confirmButton,
              pressed && styles.confirmButtonPressed,
            ]}
            onPress={onConfirm}
            accessibilityRole="button"
            accessibilityLabel="Confirm Location">
            <Text style={styles.confirmButtonText}>Confirm location</Text>
            <Image source={icons.chevronRight} style={styles.chevronIcon} />
          </Pressable>

          {/* Secondary Action: Cancel */}
          <Pressable
            style={({pressed}) => [
              styles.cancelButton,
              pressed && styles.cancelButtonPressed,
            ]}
            onPress={onCancel}
            accessibilityRole="button"
            accessibilityLabel="Cancel">
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const fontSans = Platform.select({
  ios: 'System',
  android: 'sans-serif',
});

const styles = StyleSheet.create({
  backdrop: {
    alignItems: 'center',
    backgroundColor: 'rgba(17, 19, 21, 0.65)',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  modalCard: {
    alignItems: 'center',
    backgroundColor: '#FAF8F1',
    borderColor: '#ECE5D6',
    borderRadius: 24,
    borderWidth: 1,
    paddingBottom: 16,
    paddingHorizontal: 18,
    paddingTop: 22,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
    width: '100%',
  },
  topIconAura: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 210, 26, 0.25)',
    borderRadius: 32,
    height: 64,
    justifyContent: 'center',
    marginBottom: 14,
    width: 64,
  },
  topIconCircle: {
    alignItems: 'center',
    backgroundColor: colors.yellow500 || '#FFD21A',
    borderColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 2,
    height: 44,
    justifyContent: 'center',
    width: 44,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  topIcon: {
    height: 20,
    resizeMode: 'contain',
    tintColor: '#111315',
    width: 20,
  },
  title: {
    color: '#111315',
    fontFamily: fontSans,
    fontSize: 21,
    fontWeight: '800',
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  subtitle: {
    color: '#6B7280',
    fontFamily: fontSans,
    fontSize: 12.5,
    marginTop: 4,
    textAlign: 'center',
  },
  previewCard: {
    alignItems: 'center',
    backgroundColor: '#F5F2E8',
    borderColor: '#E8E1D2',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 16,
    marginTop: 18,
    padding: 12,
    width: '100%',
  },
  miniMap: {
    alignItems: 'center',
    backgroundColor: '#DDE9F0',
    borderColor: '#CCDCE6',
    borderRadius: 12,
    borderWidth: 1,
    height: 54,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    width: 54,
  },
  miniMapRoadH: {
    backgroundColor: '#FFFFFF',
    height: 8,
    position: 'absolute',
    top: '44%',
    width: '100%',
  },
  miniMapRoadV: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    left: '44%',
    position: 'absolute',
    width: 8,
  },
  miniMapPinWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  miniMapPin: {
    height: 24,
    resizeMode: 'contain',
    width: 24,
  },
  previewMeta: {
    flex: 1,
    marginLeft: 12,
  },
  previewAddress: {
    color: '#111315',
    fontFamily: fontSans,
    fontSize: 14.5,
    fontWeight: '800',
  },
  previewSub: {
    color: '#6B7280',
    fontFamily: fontSans,
    fontSize: 11.5,
    marginTop: 3,
  },
  confirmButton: {
    alignItems: 'center',
    backgroundColor: colors.yellow500 || '#FFD21A',
    borderRadius: 14,
    flexDirection: 'row',
    height: 48,
    justifyContent: 'center',
    marginBottom: 10,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    width: '100%',
  },
  confirmButtonPressed: {
    backgroundColor: colors.yellow600 || '#E9B900',
    opacity: 0.94,
  },
  confirmButtonText: {
    color: '#111315',
    fontFamily: fontSans,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  chevronIcon: {
    height: 12,
    position: 'absolute',
    resizeMode: 'contain',
    right: 18,
    tintColor: '#111315',
    width: 12,
  },
  cancelButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#D8D4C8',
    borderRadius: 14,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: '100%',
  },
  cancelButtonPressed: {
    backgroundColor: '#F5F3EB',
  },
  cancelButtonText: {
    color: '#111315',
    fontFamily: fontSans,
    fontSize: 14,
    fontWeight: '700',
  },
});

export default ConfirmLocationModal;
