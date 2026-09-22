/**
 * Mobile Verification Static Configuration & Benefits Data
 */
export const verificationConfig = {
  countryCode: '+91',
  countryFlag: '🇮🇳',
  countryName: 'India',
  phoneLength: 10,
  otpLength: 6,
  resendSeconds: 28,
};

export const supportedCountries = [
  {
    code: '+91',
    flag: '🇮🇳',
    name: 'India',
    maxDigits: 10,
  },
];

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
  verificationConfig,
  supportedCountries,
  benefitItems,
};
