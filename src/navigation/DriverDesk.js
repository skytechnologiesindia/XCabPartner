import React, { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomTabNavigator from './BottomTabNavigator';
import EnterPinScreen from '../screens/EnterPin/EnterPinScreen';
import {
  EmergencyContactScreen,
  HelpSafetyScreen,
  PersonalDetailsScreen,
  SettingsScreen,
  VehicleDocumentsScreen,
} from '../screens/Profile';
import { colors } from '../assets/colors/colors';

const paper = colors.ivory50 || '#F7F5EE';

// Android already lays the window out below the status bar, so adding the top
// inset again leaves a large empty gap above the header.
const SAFE_EDGES =
  Platform.OS === 'ios' ? ['top', 'left', 'right'] : ['left', 'right'];

export default function DriverDesk({ navigation }) {
  const [tripStage, setTripStage] = useState('scanning');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [vehicleDocumentsOpen, setVehicleDocumentsOpen] = useState(false);
  const [personalDetailsOpen, setPersonalDetailsOpen] = useState(false);
  const [emergencyContactOpen, setEmergencyContactOpen] = useState(false);
  const [helpSafetyOpen, setHelpSafetyOpen] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={SAFE_EDGES}>
      <View style={styles.screen}>
        <BottomTabNavigator
          tripStage={tripStage}
          onTripChange={setTripStage}
          onOpenSettings={() => setSettingsOpen(true)}
          onOpenVehicleDocuments={() => navigation.navigate('Documents')}
          onOpenPersonalDetails={() => setPersonalDetailsOpen(true)}
          onOpenEmergencyContact={() => setEmergencyContactOpen(true)}
          onOpenHelpSafety={() => setHelpSafetyOpen(true)}
        />
        {personalDetailsOpen ? (
          <View style={StyleSheet.absoluteFill}>
            <PersonalDetailsScreen
              onBack={() => setPersonalDetailsOpen(false)}
            />
          </View>
        ) : null}
        {emergencyContactOpen ? (
          <View style={StyleSheet.absoluteFill}>
            <EmergencyContactScreen
              onBack={() => setEmergencyContactOpen(false)}
            />
          </View>
        ) : null}
        {helpSafetyOpen ? (
          <View style={StyleSheet.absoluteFill}>
            <HelpSafetyScreen
              onBack={() => setHelpSafetyOpen(false)}
              onOpenEmergencyContact={() => {
                setHelpSafetyOpen(false);
                setEmergencyContactOpen(true);
              }}
            />
          </View>
        ) : null}
        {settingsOpen ? (
          <View style={StyleSheet.absoluteFill}>
            <SettingsScreen
              onBack={() => setSettingsOpen(false)}
              onLogout={() => setSettingsOpen(false)}
              onDeleteAccount={() => setSettingsOpen(false)}
            />
          </View>
        ) : null}
        {vehicleDocumentsOpen ? (
          <View style={StyleSheet.absoluteFill}>
            <VehicleDocumentsScreen
              onBack={() => setVehicleDocumentsOpen(false)}
            />
          </View>
        ) : null}
        {tripStage === 'enterPin' ? (
          <View style={StyleSheet.absoluteFill}>
            <EnterPinScreen
              onBack={() => setTripStage('pickup')}
              onStartTrip={() => setTripStage('onTrip')}
              onResendHelp={() => { }}
            />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: paper,
  },
  screen: {
    flex: 1,
    backgroundColor: paper,
  },
});
