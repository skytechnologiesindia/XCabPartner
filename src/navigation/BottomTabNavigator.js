import React, { createContext, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../assets/colors/colors';
import Header from '../component/Header/Header';
import Footer from '../component/Footer/Footer';
import HomeScreen from '../screens/Home/HomeScreen';
import RidesScreen from '../screens/Rides/RidesScreen';
import EarningsScreen from '../screens/Earnings/EarningsScreen';
import AlertsScreen from '../screens/Alerts/AlertsScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const NavigationContext = createContext({
  tripStage: 'scanning',
  onTripChange: () => {},
  onEditProfile: () => {},
  onOpenSettings: () => {},
  onOpenVehicleDocuments: () => {},
});

const renderCustomTabBar = props => <Footer {...props} hidePinBar={true} />;

function TabScreenContainer({ children }) {
  return <View style={styles.screen}>{children}</View>;
}

function DeskScreenWrapper() {
  const { tripStage, onTripChange } = useContext(NavigationContext);

  return (
    <TabScreenContainer>
      <HomeScreen
        tripStage={tripStage || 'scanning'}
        onGoOffline={() => onTripChange && onTripChange('request')}
        onAcceptRequest={() => onTripChange && onTripChange('pickup')}
        onDeclineRequest={() => onTripChange && onTripChange('scanning')}
        onEnterPin={() => onTripChange && onTripChange('enterPin')}
        onCantFind={() => {}}
        onCompleteTrip={() => onTripChange && onTripChange('scanning')}
        onReportIssue={() => {}}
      />
    </TabScreenContainer>
  );
}

function RidesScreenWrapper() {
  return (
    <TabScreenContainer>
      <Header subtitle="DRIVER CONSOLE" />
      <RidesScreen />
    </TabScreenContainer>
  );
}

function EarningsScreenWrapper() {
  return (
    <TabScreenContainer>
      <Header subtitle="DRIVER CONSOLE" />
      <EarningsScreen />
    </TabScreenContainer>
  );
}

function AlertsScreenWrapper({ navigation }) {
  return (
    <TabScreenContainer>
      <Header subtitle="DRIVER CONSOLE" />
      <AlertsScreen navigation={navigation} />
    </TabScreenContainer>
  );
}

function ProfileScreenWrapper({ navigation }) {
  const { onEditProfile, onOpenSettings, onOpenVehicleDocuments } =
    useContext(NavigationContext);

  return (
    <TabScreenContainer>
      <Header subtitle="DRIVER CONSOLE" />
      <ProfileScreen
        navigation={navigation}
        onEditProfile={onEditProfile}
        onOpenSettings={onOpenSettings}
        onOpenVehicleDocuments={onOpenVehicleDocuments}
        onLogout={() => navigation && navigation.navigate('Desk')}
      />
    </TabScreenContainer>
  );
}

export function BottomTabNavigator({
  tripStage = 'scanning',
  onTripChange,
  onEditProfile,
  onOpenSettings,
  onOpenVehicleDocuments,
  initialRouteName = 'Desk',
}) {
  const contextValue = {
    tripStage,
    onTripChange,
    onEditProfile,
    onOpenSettings,
    onOpenVehicleDocuments,
  };

  return (
    <NavigationContext.Provider value={contextValue}>
      <Tab.Navigator
        initialRouteName={initialRouteName}
        tabBar={renderCustomTabBar}
        detachInactiveScreens={false}
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        <Tab.Screen name="Desk" component={DeskScreenWrapper} />
        <Tab.Screen name="Rides" component={RidesScreenWrapper} />
        <Tab.Screen name="Earnings" component={EarningsScreenWrapper} />
        <Tab.Screen name="Alerts" component={AlertsScreenWrapper} />
        <Tab.Screen name="Profile" component={ProfileScreenWrapper} />
      </Tab.Navigator>
    </NavigationContext.Provider>
  );
}

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.paper || '#FBFAF5',
    flex: 1,
  },
});

export default BottomTabNavigator;
