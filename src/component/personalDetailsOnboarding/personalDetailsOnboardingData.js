/**
 * Personal Details Onboarding Configuration & Constants
 */
export const personalDetailsConfig = {
  minDriverAge: 18,
  maxDriverAge: 75,
  minNameLength: 3,
  emailOptional: true,
};

export const genderOptions = [
  { id: 'male', label: 'Male', symbol: '♂' },
  { id: 'female', label: 'Female', symbol: '♀' },
  { id: 'other', label: 'Other', symbol: '👥' },
];

export const initialFormValues = {
  fullName: '',
  dateOfBirth: '12 Jan 1998',
  gender: 'male',
  email: '',
};

export const benefitItems = [
  {
    id: 'safe',
    label: 'Safe\nJourneys',
    icon: 'shield',
  },
  {
    id: 'earnings',
    label: 'Better\nEarnings',
    icon: 'chart',
  },
  {
    id: 'community',
    label: 'Stronger\nCommunities',
    icon: 'community',
  },
];

export default {
  personalDetailsConfig,
  genderOptions,
  initialFormValues,
  benefitItems,
};
