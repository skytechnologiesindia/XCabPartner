import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
  onEditProfile,
  onOpenSettings,
  onOpenVehicleDocuments,
  onLogout,
}) {
  const [profile] = useState(initialProfileData);

  const handleEditProfile = () => {
    if (onEditProfile) {
      onEditProfile();
    } else if (navigation && navigation.navigate) {
      navigation.navigate('EditProfile');
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
      case 'EditProfile':
        handleEditProfile();
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
        // Default to EditProfile if applicable
        if (onEditProfile) {
          onEditProfile();
        }
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

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Page Title & Subtitle */}
        <View style={styles.titleSection}>
          <Text style={styles.titleText}>Profile</Text>
          <Text style={styles.subtitleText}>
            Manage your account and settings
          </Text>
        </View>

        {/* 2. Driver Identity Hero Card */}
        <ProfileCard
          profile={profile}
          onEditAvatar={handleEditProfile}
          onPressCard={handleEditProfile}
          onViewVehicle={handleViewVehicle}
        />

        {/* 3. Performance & Earnings Stats */}
        <ProfileStats stats={profile.stats} />

        {/* 4. Menu Settings List */}
        <ProfileMenuList
          items={menuItemsData}
          onItemPress={handleMenuItemPress}
        />

        {/* 5. Bottom Actions: Edit Profile & Logout */}
        <ProfileActions
          onEditProfile={handleEditProfile}
          onLogout={handleLogout}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F5EF',
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 110,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  titleSection: {
    marginBottom: 16,
  },
  titleText: {
    color: '#17191C',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  subtitleText: {
    color: '#687078',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 4,
  },
});

export default ProfileScreen;
