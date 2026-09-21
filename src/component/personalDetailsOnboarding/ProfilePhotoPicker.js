import React, { useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { images } from '../../assets/images';

/**
 * ProfilePhotoPicker
 * Circular avatar photo upload component matching XCAB design:
 * - Circular placeholder with silhouette icon
 * - Yellow camera badge in bottom-right corner
 * - "Add Profile Photo" label
 * - Modal sheet to choose / capture / remove photo
 */
function ProfilePhotoPicker({
  photo = null,
  onChangePhoto,
  errorMessage,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectSample = () => {
    if (onChangePhoto) {
      onChangePhoto(images.driverAvatar);
    }
    setModalVisible(false);
  };

  const handleSimulateCamera = () => {
    if (onChangePhoto) {
      onChangePhoto(images.driverAvatar);
    }
    setModalVisible(false);
  };

  const handleRemovePhoto = () => {
    if (onChangePhoto) {
      onChangePhoto(null);
    }
    setModalVisible(false);
  };

  const hasPhoto = !!photo;
  const imageSource =
    typeof photo === 'string'
      ? { uri: photo }
      : photo || null;

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.avatarWrapper,
          pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] },
        ]}
        onPress={() => setModalVisible(true)}
        accessibilityRole="button"
        accessibilityLabel={hasPhoto ? 'Change Profile Photo' : 'Add Profile Photo'}
      >
        {/* Circular Avatar Container */}
        <View style={styles.avatarCircle}>
          {hasPhoto && imageSource ? (
            <Image
              source={imageSource}
              style={styles.avatarImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.silhouetteContainer}>
              {/* Silhouette Head */}
              <View style={styles.silhouetteHead} />
              {/* Silhouette Shoulders */}
              <View style={styles.silhouetteBody} />
            </View>
          )}
        </View>

        {/* Yellow Camera Badge */}
        <View style={styles.cameraBadge}>
          <Text style={styles.cameraIcon}>📷</Text>
        </View>
      </Pressable>

      {/* Label */}
      <Pressable
        onPress={() => setModalVisible(true)}
        hitSlop={{ top: 8, bottom: 8, left: 16, right: 16 }}
      >
        <Text style={styles.labelText}>
          {hasPhoto ? 'Change Profile Photo' : 'Add Profile Photo'}
        </Text>
      </Pressable>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      {/* Photo Picker Options Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <Pressable
            style={styles.modalContent}
            onPress={e => e.stopPropagation()}
          >
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Profile Photo</Text>
            <Text style={styles.modalSubtitle}>
              Please provide a clear front-facing photo of yourself
            </Text>

            <View style={styles.optionsList}>
              <Pressable
                style={({ pressed }) => [
                  styles.optionButton,
                  pressed && styles.optionButtonPressed,
                ]}
                onPress={handleSimulateCamera}
              >
                <View style={[styles.optionIconBox, { backgroundColor: '#FFF4C7' }]}>
                  <Text style={styles.optionEmoji}>📷</Text>
                </View>
                <View style={styles.optionTextCol}>
                  <Text style={styles.optionLabel}>Take Photo</Text>
                  <Text style={styles.optionDesc}>Use your camera to take a new picture</Text>
                </View>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.optionButton,
                  pressed && styles.optionButtonPressed,
                ]}
                onPress={handleSelectSample}
              >
                <View style={[styles.optionIconBox, { backgroundColor: '#E0F2FE' }]}>
                  <Text style={styles.optionEmoji}>🖼️</Text>
                </View>
                <View style={styles.optionTextCol}>
                  <Text style={styles.optionLabel}>Choose from Gallery</Text>
                  <Text style={styles.optionDesc}>Select photo from device library</Text>
                </View>
              </Pressable>

              {hasPhoto ? (
                <Pressable
                  style={({ pressed }) => [
                    styles.optionButton,
                    pressed && styles.optionButtonPressed,
                  ]}
                  onPress={handleRemovePhoto}
                >
                  <View style={[styles.optionIconBox, { backgroundColor: '#FEE2E2' }]}>
                    <Text style={styles.optionEmoji}>🗑️</Text>
                  </View>
                  <View style={styles.optionTextCol}>
                    <Text style={[styles.optionLabel, { color: '#EF4444' }]}>
                      Remove Photo
                    </Text>
                    <Text style={styles.optionDesc}>Delete current profile photo</Text>
                  </View>
                </Pressable>
              ) : null}
            </View>

            <Pressable
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 4,
    width: '100%',
  },
  avatarWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarCircle: {
    alignItems: 'center',
    backgroundColor: '#DCE4EC',
    borderRadius: 50,
    elevation: 2,
    height: 100,
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    width: 100,
  },
  avatarImage: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  silhouetteContainer: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
    width: '100%',
  },
  silhouetteHead: {
    backgroundColor: '#6B7A8C',
    borderRadius: 15,
    height: 30,
    marginBottom: 5,
    width: 30,
  },
  silhouetteBody: {
    backgroundColor: '#6B7A8C',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    height: 34,
    width: 58,
  },
  cameraBadge: {
    alignItems: 'center',
    backgroundColor: '#FFC928',
    borderColor: '#F7F5EF',
    borderRadius: 16,
    borderWidth: 2.5,
    bottom: -2,
    elevation: 3,
    height: 32,
    justifyContent: 'center',
    position: 'absolute',
    right: -2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    width: 32,
  },
  cameraIcon: {
    fontSize: 14,
  },
  labelText: {
    color: '#17191C',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.2,
    marginTop: 10,
    textAlign: 'center',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 11.5,
    fontWeight: '500',
    marginTop: 4,
    textAlign: 'center',
  },
  modalOverlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 32,
    paddingHorizontal: 20,
    paddingTop: 12,
    width: '100%',
  },
  modalHandle: {
    alignSelf: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 2.5,
    height: 5,
    marginBottom: 16,
    width: 40,
  },
  modalTitle: {
    color: '#17191C',
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  modalSubtitle: {
    color: '#687078',
    fontSize: 13,
    fontWeight: '400',
    marginBottom: 20,
    marginTop: 4,
    textAlign: 'center',
  },
  optionsList: {
    gap: 10,
    marginBottom: 16,
  },
  optionButton: {
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  optionButtonPressed: {
    backgroundColor: '#F1F5F9',
  },
  optionIconBox: {
    alignItems: 'center',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    marginRight: 12,
    width: 40,
  },
  optionEmoji: {
    fontSize: 20,
  },
  optionTextCol: {
    flex: 1,
  },
  optionLabel: {
    color: '#17191C',
    fontSize: 14.5,
    fontWeight: '700',
  },
  optionDesc: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 2,
  },
  cancelButton: {
    alignItems: 'center',
    backgroundColor: '#F1EEE5',
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    marginTop: 4,
    width: '100%',
  },
  cancelText: {
    color: '#17191C',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default ProfilePhotoPicker;
