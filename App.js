import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import LocationRequiredModal from './src/component/locationGuard/LocationRequiredModal';
import { RegistrationProvider } from './src/context/RegistrationContext';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <RegistrationProvider>
        <NavigationContainer>
          <RootNavigator />
          <LocationRequiredModal />
        </NavigationContainer>
      </RegistrationProvider>
    </SafeAreaProvider>
  );
}

export default App;
