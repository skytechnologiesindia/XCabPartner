import { images } from '../../assets/images';

/**
 * XCAB Mock Profile Data
 * Structured profile and stats information for the Driver App Profile screen.
 * Can be easily swapped with live API / user context data.
 */
export const profileData = {
  name: 'Kaif sir',
  phone: '+91 91234 56789',
  verified: true,
  avatar: images.driverAvatar,
  vehicle: {
    type: 'White Sedan',
    registration: 'JH01 AB 4821',
  },
  stats: {
    trips: 142,
    earned: '₹18,420',
    avgOnlineHours: '4.8',
  },
};

/**
 * Navigation items for Profile Menu List
 */
export const menuItemsData = [
  {
    id: 'personal_details',
    title: 'Personal details',
    subtitle: 'View and update your profile information',
    iconType: 'user',
    targetScreen: 'EditProfile',
  },
  {
    id: 'vehicle_documents',
    title: 'Vehicle & documents',
    subtitle: 'Manage your vehicle and documents',
    iconType: 'car',
    targetScreen: 'Vehicle',
  },
  // {
  //   id: 'payout_account',
  //   title: 'Payout account',
  //   subtitle: 'Manage your earnings and bank details',
  //   iconType: 'card',
  //   targetScreen: 'Earnings',
  // },
  {
    id: 'emergency_contact',
    title: 'Emergency contact',
    subtitle: 'Add or update emergency contact',
    iconType: 'shield',
    targetScreen: 'Emergency',
  },
  {
    id: 'help_safety',
    title: 'Help & safety',
    subtitle: 'Get help and learn about safety',
    iconType: 'help',
    targetScreen: 'Help',
  },
  {
    id: 'settings',
    title: 'Settings',
    subtitle: 'App preferences and notifications',
    iconType: 'settings',
    targetScreen: 'Settings',
  },
];

export default {
  profileData,
  menuItemsData,
};
