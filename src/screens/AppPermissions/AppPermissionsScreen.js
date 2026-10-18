import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  AppState,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PermissionCard } from '../../component/appPermissions';
import {
  canDrawOverlays,
  isIgnoringBatteryOptimizations,
  openBatterySettings,
  openOverlaySettings,
} from '../../utils/appSettings';

/**
 * AppPermissionsScreen
 * Two Android background-running capabilities TREEPS needs for ride alerts:
 * - Display over other apps
 * - Battery usage (battery optimisation exemption)
 * Status is read from Android (not stored) on mount and whenever the app
 * returns to the foreground.
 */
function AppPermissionsScreen({
  onBack,
}) {
  const insets = useSafeAreaInsets();
  // true | false | null (null = cannot be determined on this build/device)
  const [overlayGranted, setOverlayGranted] = useState(null);
  const [batteryGranted, setBatteryGranted] = useState(null);

  const refreshStatus = useCallback(async () => {
    const [overlay, battery] = await Promise.all([
      canDrawOverlays(),
      isIgnoringBatteryOptimizations(),
    ]);
    setOverlayGranted(overlay);
    setBatteryGranted(battery);
  }, []);

  useEffect(() => {
    refreshStatus();
    const subscription = AppState.addEventListener('change', state => {
      if (state === 'active') {
        refreshStatus();
      }
    });
    return () => subscription.remove();
  }, [refreshStatus]);

  const handleHelp = () => {
    Alert.alert(
      'TREEPS Support (24/7)',
      'These permissions let TREEPS show ride alerts and keep running in the background.\n\nContact our 24/7 Driver Support at 1800-247-TREEPS (9222).',
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  const openSettings = async openFn => {
    const opened = await openFn();
    if (!opened) {
      Alert.alert(
        'Settings unavailable',
        'Could not open this settings page on your device. Please open Settings > Apps > TREEPS and enable it manually.',
        [{ text: 'OK' }],
      );
    }
  };

  const safeTopInset = Platform.OS === 'ios' ? insets.top : 0;

  return (
    <View style={{ backgroundColor: '#F7F8FB', flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8FB" translucent={false} />

      {/* Header: back + Help */}
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingBottom: 10,
          paddingHorizontal: 16,
          paddingTop: safeTopInset + 10,
        }}>
        <Pressable
          style={({ pressed }) => [
            { alignItems: 'center', height: 40, justifyContent: 'center', width: 40 },
            pressed && { opacity: 0.6 },
          ]}
          onPress={onBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={{ color: '#10153F', fontSize: 22, fontWeight: '600' }}>←</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            {
              alignItems: 'center',
              borderColor: '#10153F',
              borderRadius: 10,
              borderWidth: 1,
              flexDirection: 'row',
              height: 36,
              paddingHorizontal: 12,
            },
            pressed && { opacity: 0.6 },
          ]}
          onPress={handleHelp}
          accessibilityRole="button"
          accessibilityLabel="Help"
        >
          <Text style={{ fontSize: 13, marginRight: 6 }}>🎧</Text>
          <Text style={{ color: '#10153F', fontSize: 14, fontWeight: '600' }}>Help</Text>
        </Pressable>
      </View>

      {/* Blue banner */}
      <View
        style={{
          backgroundColor: '#1560BD',
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 21,
            fontWeight: '800',
            lineHeight: 28,
          }}>
          Give all permissions to proceed
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: Math.max(insets.bottom, 16) + 8,
          paddingHorizontal: 16,
          paddingTop: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <PermissionCard
          title="Display over other apps"
          description="Permit app to display on top of other apps to get rides alerts"
          icon="▦"
          granted={overlayGranted === true}
          onPress={() => openSettings(openOverlaySettings)}
        />
        <PermissionCard
          title="Battery Usage"
          description="Helps app run in background"
          icon="🔋"
          granted={batteryGranted === true}
          onPress={() => openSettings(openBatterySettings)}
        />
      </ScrollView>
    </View>
  );
}

export default AppPermissionsScreen;
