import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import LocationRequiredModal from './src/component/locationGuard/LocationRequiredModal';
import { RegistrationProvider } from './src/context/RegistrationContext';
import { navigationRef, resetToLogin } from './src/navigation/navigationRef';
import { setSessionExpiredHandler } from './src/api';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  // [API] When any Token call gets a 401, the api client deletes the token and
  // calls this handler, which opens the phone number screen. The draft is kept.
  useEffect(() => {
    setSessionExpiredHandler(resetToLogin);
    return () => setSessionExpiredHandler(null);
  }, []);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <RegistrationProvider>
        {/* [API] ref lets the 401 handler and logout navigate from outside screens */}
        <NavigationContainer ref={navigationRef}>
          <RootNavigator />
          <LocationRequiredModal />
        </NavigationContainer>
      </RegistrationProvider>
    </SafeAreaProvider>
  );
}

export default App;
