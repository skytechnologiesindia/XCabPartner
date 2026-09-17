import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ProfileActions,
  ProfileCard,
  ProfileMenuList,
  ProfileStats,
  menuItemsData,
  profileData as initialProfileData,
} from '../../component/profile';

/**
 * ProfileScreen
 * Driver profile composition screen managing account details,
 * vehicle information, performance statistics, settings menus, and session logout.
 */
function ProfileScreen({
  navigation,
  onOpenSettings,
  onOpenVehicleDocuments,
  onOpenPersonalDetails,
  onOpenEmergencyContact,
  onOpenHelpSafety,
  onLogout,
}) {
  const insets = useSafeAreaInsets();
  const [profile] = useState(initialProfileData);

  const handleOpenPersonalDetails = () => {
    if (onOpenPersonalDetails) {
      onOpenPersonalDetails();
    } else if (navigation && navigation.navigate) {
      navigation.navigate('PersonalDetails');
    }
  };

  const handleOpenEmergencyContact = () => {
    if (onOpenEmergencyContact) {
      onOpenEmergencyContact();
    } else if (navigation && navigation.navigate) {
      navigation.navigate('EmergencyContact');
    }
  };

  const handleOpenHelpSafety = () => {
    if (onOpenHelpSafety) {
      onOpenHelpSafety();
    } else if (navigation && navigation.navigate) {
      navigation.navigate('HelpSafety');
    }
  };

  const handleViewVehicle = () => {
    if (onOpenVehicleDocuments) {
      onOpenVehicleDocuments();
    } else if (navigation && navigation.navigate) {
      navigation.navigate('VehicleDocuments');
    }
  };

  const handleMenuItemPress = item => {
    switch (item.targetScreen) {
      case 'PersonalDetails':
        handleOpenPersonalDetails();
        break;

      case 'Emergency':
      case 'EmergencyContact':
        handleOpenEmergencyContact();
        break;

      case 'Help':
      case 'HelpSafety':
        handleOpenHelpSafety();
        break;

      case 'Vehicle':
      case 'VehicleDocuments':
        handleViewVehicle();
        break;

      case 'Settings':
        if (onOpenSettings) {
          onOpenSettings();
        } else if (navigation && navigation.navigate) {
          navigation.navigate('Settings');
        }
        break;

      case 'Earnings':
        if (navigation && navigation.navigate) {
          navigation.navigate('Earnings');
        }
        break;

      default:
        break;
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else if (navigation && navigation.navigate) {
      navigation.navigate('Desk');
    }
  };

  const topPadding = Platform.OS === 'ios' ? Math.max(insets.top, 12) : 12;

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F5EF' }}>
      {/* Fixed Top Header (Non-scrollable) */}
      <View
        style={{
          backgroundColor: '#F7F5EF',
          borderBottomColor: 'rgba(0, 0, 0, 0.06)',
          borderBottomWidth: 1,
          elevation: 2,
          paddingBottom: 10,
          paddingHorizontal: 16,
          paddingTop: topPadding,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.04,
          shadowRadius: 3,
          zIndex: 10,
        }}
      >
        <Text
          style={{
            color: '#17191C',
            fontSize: 30,
            fontWeight: '800',
            letterSpacing: -0.6,
          }}
        >
          Profile
        </Text>
        <Text
          style={{
            color: '#687078',
            fontSize: 14,
            fontWeight: '400',
            marginTop: 4,
          }}
        >
          Manage your account and settings
        </Text>
      </View>

      {/* Scrollable Profile Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: 110,
          paddingHorizontal: 16,
          paddingTop: 12,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* 2. Driver Identity Hero Card */}
        <ProfileCard
          profile={profile}
          onPressCard={handleOpenPersonalDetails}
          onViewVehicle={handleViewVehicle}
        />

        {/* 3. Performance & Earnings Stats */}
        <ProfileStats stats={profile.stats} />

        {/* 4. Menu Settings List */}
        <ProfileMenuList
          items={menuItemsData}
          onItemPress={handleMenuItemPress}
        />

        {/* 5. Bottom Actions: Logout */}
        <ProfileActions
          onLogout={handleLogout}
        />
      </ScrollView>
    </View>
  );
}

export default ProfileScreen;
