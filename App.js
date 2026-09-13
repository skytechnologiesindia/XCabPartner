import React, { useState } from 'react';
import { StatusBar, StyleSheet, View, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import EditProfileScreen from './src/screens/EditProfile/EditProfileScreen';
import EnterPinScreen from './src/screens/EnterPin/EnterPinScreen';
import SettingsScreen from './src/screens/Settings/SettingsScreen';
import VehicleDocumentsScreen from './src/screens/VehicleDocuments/VehicleDocumentsScreen';
import { colors } from './src/assets/colors/colors';

const paper = colors.ivory50 || '#F7F5EE';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <DriverDesk />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

function DriverDesk() {
  const [tripStage, setTripStage] = useState('onTrip');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [vehicleDocumentsOpen, setVehicleDocumentsOpen] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.screen}>
        <BottomTabNavigator
          tripStage={tripStage}
          onTripChange={setTripStage}
          onEditProfile={() => setEditProfileOpen(true)}
          onOpenSettings={() => setSettingsOpen(true)}
          onOpenVehicleDocuments={() => setVehicleDocumentsOpen(true)}
        />
        {editProfileOpen ? (
          <View style={StyleSheet.absoluteFill}>
            <EditProfileScreen
              onBack={() => setEditProfileOpen(false)}
              onCancel={() => setEditProfileOpen(false)}
              onSave={() => setEditProfileOpen(false)}
            />
          </View>
        ) : null}
        {settingsOpen ? (
          <View style={StyleSheet.absoluteFill}>
            <SettingsScreen onLogout={() => setSettingsOpen(false)} />
          </View>
        ) : null}
        {vehicleDocumentsOpen ? (
          <View style={StyleSheet.absoluteFill}>
            <VehicleDocumentsScreen
              onBack={() => setVehicleDocumentsOpen(false)}
              onUpdateVehicle={() => setEditProfileOpen(true)}
            />
          </View>
        ) : null}
        {tripStage === 'enterPin' ? (
          <View style={StyleSheet.absoluteFill}>
            <EnterPinScreen
              onBack={() => setTripStage('pickup')}
              onStartTrip={() => setTripStage('onTrip')}
              onResendHelp={() => {}}
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

export default App;
