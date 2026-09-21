import React, { useState } from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  OnboardingHeader,
  RegistrationButton,
  RegistrationProgress,
} from '../../component/onboarding';
import {
  LocationBenefits,
  LocationPermissionCard,
} from '../../component/locationPermission';
import { useRegistration } from '../../context/RegistrationContext';

/**
 * LocationPermissionScreen (Step 7 of 8)
 * Explains and requests location access from the driver:
 * - Real Android PermissionsAndroid support
 * - Visual map graphic
 * - 3 key benefit points
 * - "Allow Location" & "Maybe Later"
 */
function LocationPermissionScreen({
  onBack,
  onContinue,
}) {
  const insets = useSafeAreaInsets();
  const { updateRegistrationData } = useRegistration();
  const [isRequesting, setIsRequesting] = useState(false);

  const handleNeedHelp = () => {
    Alert.alert(
      'Location Access Support',
      'Location is required for dispatching rides near you, navigating accurately, and calculating distance fares.\n\nContact support at 1800-247-XCAB.',
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  const requestRealPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'XCAB Partner Location Permission',
            message:
              'XCAB Driver App requires your precise location to receive ride requests and provide route navigation.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        return false;
      }
    }
    return true;
  };

  const handleAllowLocation = async () => {
    setIsRequesting(true);
    const granted = await requestRealPermission();
    setIsRequesting(false);

    updateRegistrationData('location', { permissionGranted: granted });

    if (onContinue) {
      onContinue({ permissionGranted: granted });
    }
  };

  const handleMaybeLater = () => {
    updateRegistrationData('location', { permissionGranted: false });

    if (onContinue) {
      onContinue({ permissionGranted: false });
    }
  };

  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight || 28 : 0;
  const safeTopPadding = Math.max(insets.top, statusBarHeight) + 8;
  const safeBottomPadding = Math.max(insets.bottom, 16);

  return (
    <View
      style={{
        backgroundColor: '#F7F5EF',
        flex: 1,
        paddingTop: safeTopPadding,
      }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F7F5EF"
        translucent={true}
      />

      {/* 1. Header */}
      <OnboardingHeader
        onBack={onBack}
        onNeedHelp={handleNeedHelp}
      />

      {/* 2. Step 7 of 8 Progress */}
      <RegistrationProgress currentStep={7} totalSteps={8} />

      <ScrollView
        style={{
          backgroundColor: '#F7F5EF',
          flex: 1,
        }}
        contentContainerStyle={{
          backgroundColor: '#F7F5EF',
          flexGrow: 1,
          justifyContent: 'space-between',
          paddingBottom: safeBottomPadding,
          paddingTop: 10,
        }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* 3. Title & Subtitle */}
        <View
          style={{
            paddingHorizontal: 20,
            marginBottom: 16,
          }}>
          <Text
            style={{
              color: '#17191C',
              fontSize: 27,
              fontWeight: '900',
              letterSpacing: -0.6,
              lineHeight: 33,
            }}>
            Allow Location{'\n'}Access
          </Text>
          <Text
            style={{
              color: '#687078',
              fontSize: 13.5,
              fontWeight: '400',
              lineHeight: 19,
              marginTop: 6,
            }}>
            We need your location to find nearby rides and help you go online.
          </Text>
        </View>

        {/* 4. Map Graphic */}
        <LocationPermissionCard />

        {/* 5. Benefits */}
        <LocationBenefits />

        {/* 6. Action CTAs */}
        <View style={styles.actionsContainer}>
          <RegistrationButton
            label="Allow Location"
            onPress={handleAllowLocation}
            isLoading={isRequesting}
            showArrow={false}
          />

          <Pressable
            style={({ pressed }) => [
              styles.maybeLaterBtn,
              pressed && { opacity: 0.6 },
            ]}
            onPress={handleMaybeLater}
            accessibilityRole="button"
            accessibilityLabel="Maybe Later"
          >
            <Text style={styles.maybeLaterText}>Maybe Later</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  actionsContainer: {
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  maybeLaterBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    paddingVertical: 10,
    width: '100%',
  },
  maybeLaterText: {
    color: '#687078',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default LocationPermissionScreen;
