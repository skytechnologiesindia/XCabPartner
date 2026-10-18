import React from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '../../assets/colors/colors';
import { LOCATION_STATUS } from '../../utils/locationService';
import useLocationGuard from '../../hooks/useLocationGuard';

const COPY = {
  [LOCATION_STATUS.SERVICE_OFF]: {
    title: 'Turn on location',
    message:
      'Your phone location is off. Please turn on location to continue using TREEPS Partner.',
    button: 'Turn on location',
  },
  [LOCATION_STATUS.PERMISSION_DENIED]: {
    title: 'Location permission needed',
    message:
      'TREEPS Partner needs access to your location to show ride requests and navigate trips.',
    button: 'Allow location',
  },
  [LOCATION_STATUS.PERMISSION_BLOCKED]: {
    title: 'Location permission needed',
    message:
      'Location permission is blocked. Open app settings and allow location access to continue.',
    button: 'Open settings',
  },
};

/**
 * LocationRequiredModal
 * Blocking modal: cannot be dismissed with back button or by tapping outside.
 * It disappears on its own once location is available again.
 * Mount once at the app root; it reads the location state by itself.
 */
function LocationRequiredModal() {
  const { status, isBusy, isBlocking, onAction } = useLocationGuard();
  const copy = COPY[status] || COPY[LOCATION_STATUS.SERVICE_OFF];

  return (
    <Modal
      visible={isBlocking}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => {}}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>📍</Text>
          </View>

          <Text style={styles.title}>{copy.title}</Text>
          <Text style={styles.message}>{copy.message}</Text>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={onAction}
            disabled={isBusy}
            accessibilityRole="button"
            accessibilityLabel={copy.button}>
            {isBusy ? (
              <ActivityIndicator color={colors.graphite950} />
            ) : (
              <Text style={styles.buttonText}>{copy.button}</Text>
            )}
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    alignItems: 'center',
    backgroundColor: 'rgba(11, 12, 13, 0.7)',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 22,
    paddingVertical: 26,
    width: '100%',
  },
  iconCircle: {
    alignItems: 'center',
    backgroundColor: colors.ivory100,
    borderRadius: 32,
    height: 64,
    justifyContent: 'center',
    marginBottom: 16,
    width: 64,
  },
  icon: {
    fontSize: 30,
  },
  title: {
    color: colors.graphite950,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  message: {
    color: colors.graphite600,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.yellow500,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    marginTop: 22,
    width: '100%',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: colors.graphite950,
    fontSize: 15,
    fontWeight: '800',
  },
});

export default LocationRequiredModal;
