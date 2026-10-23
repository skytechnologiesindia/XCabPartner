import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const PICKER_OPTIONS = {
  mediaType: 'photo',
  quality: 0.8,
  maxWidth: 1600,
  maxHeight: 1600,
  selectionLimit: 1,
  // [API] Ask iOS to hand over a JPEG instead of HEIC (the iPhone default),
  // because the server only accepts JPG and PNG.
  assetRepresentationMode: 'compatible',
};

// [API] The server refuses any photo over 2 MB (was 10 MB here). With the
// 1600px / 0.8 settings above a document photo is usually 200-600 KB.
const MAX_FILE_BYTES = 2 * 1024 * 1024;

// [API] Only JPG and PNG are accepted; HEIC, WebP, GIF and PDF are refused.
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

/** Asks for the Android CAMERA permission. Returns true when it is granted. */
async function ensureCameraPermission() {
  if (Platform.OS !== 'android') {
    return true;
  }
  try {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera permission',
        message: 'TREEPS needs camera access to capture your documents.',
        buttonPositive: 'Allow',
        buttonNegative: 'Cancel',
      },
    );
    if (result === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      Alert.alert(
        'Camera permission needed',
        'Camera access is turned off for TREEPS. Please enable it in Settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ],
      );
    }
    return false;
  } catch (error) {
    return false;
  }
}

/**
 * Opens the camera or gallery and resolves to a document object
 * `{ uri, name, type, size, status: 'uploaded', timestamp }`,
 * or `null` when cancelled / failed (an alert is shown on failure).
 * @param {'camera' | 'gallery'} source
 */
export async function launchImageSource(source) {
  if (source === 'camera' && !(await ensureCameraPermission())) {
    return null;
  }

  let result;
  try {
    result =
      source === 'camera'
        ? await launchCamera({ ...PICKER_OPTIONS, saveToPhotos: false })
        : await launchImageLibrary(PICKER_OPTIONS);
  } catch (error) {
    Alert.alert('Error', 'Could not open the image picker. Please try again.');
    return null;
  }

  if (!result || result.didCancel) {
    return null;
  }
  if (result.errorCode) {
    const message =
      result.errorCode === 'camera_unavailable'
        ? 'Camera is not available on this device.'
        : result.errorMessage || 'Could not read the selected image.';
    Alert.alert('Error', message);
    return null;
  }

  const asset = result.assets && result.assets[0];
  if (!asset || !asset.uri) {
    return null;
  }
  console.log('Picked image:', {
    source,
    type: asset.type, // e.g. image/jpeg, image/png, image/heic, image/webp
    fileName: asset.fileName,
    sizeKB: asset.fileSize ? Math.round(asset.fileSize / 1024) : null,
    width: asset.width,
    height: asset.height,
  });

  // [API] Check the size right after picking and ask again if it is too big,
  // so the driver does not find out only when the submit fails.
  if (asset.fileSize && asset.fileSize > MAX_FILE_BYTES) {
    console.log('Image rejected: bigger than 2 MB', asset.fileSize);
    Alert.alert('Image too large', 'Please choose an image smaller than 2 MB.');
    return null;
  }
  if (asset.type && !ALLOWED_TYPES.includes(asset.type.toLowerCase())) {
    console.log('Image rejected: not JPG/PNG', asset.type);
    Alert.alert('Unsupported image', 'Please use a JPG or PNG photo.');
    return null;
  }

  return {
    uri: asset.uri,
    name: asset.fileName || `document_${Date.now()}.jpg`,
    type: asset.type || 'image/jpeg',
    size: asset.fileSize || null,
    status: 'uploaded',
    timestamp: new Date().toISOString(),
  };
}

/**
 * Shows a "Take Photo / Choose from Gallery" chooser and resolves to the
 * picked document object, or `null` when the user cancels.
 */
export function pickDocumentImage(title = 'Upload photo') {
  return new Promise(resolve => {
    Alert.alert(
      title,
      'Choose how you want to add the photo',
      [
        {
          text: 'Take Photo',
          onPress: () => launchImageSource('camera').then(resolve),
        },
        {
          text: 'Choose from Gallery',
          onPress: () => launchImageSource('gallery').then(resolve),
        },
        { text: 'Cancel', style: 'cancel', onPress: () => resolve(null) },
      ],
      { cancelable: true, onDismiss: () => resolve(null) },
    );
  });
}
