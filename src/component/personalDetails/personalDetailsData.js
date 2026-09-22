import { images } from '../../assets/images';

/**
 * XCAB Driver Personal Details Mock Data
 * API-friendly data model for the Personal Details screen.
 * Values can be replaced directly with remote driver profile API payload.
 */
export const personalDetailsData = {
  driverId: 'XC784521',
  fullName: 'Raj Kumar',
  phone: '+91 91234 56789',
  email: 'rajkumar@gmail.com',
  dateOfBirth: '14 Feb 1995',
  gender: 'Male',
  avatar: images.driverAvatar,
  isVerified: true,
  address: {
    line1: 'Main Road, Ranchi',
    line2: 'Jharkhand - 834001',
  },
  aadhaar: 'XXXX XXXX 4821',
  pan: 'XXXXXXX732K',
  accountInfo: {
    joinedOn: '12 Mar 2023',
    accountStatus: 'Active',
    kycStatus: 'Verified',
  },
};

export default personalDetailsData;
