/**
 * XCAB Driver Help & Safety Mock Data
 * Structured, API-friendly configuration for the Help & Safety screen.
 */

export const emergencyContactsConfig = {
  police: {
    title: 'Emergency Call',
    subtitle: 'Police · 112',
    number: '112',
  },
  support: {
    title: 'XCAB Support',
    subtitle: '24/7 Assistance',
    number: '1800-123-XCAB',
  },
};

export const helpItems = [
  {
    id: 'report-issue',
    title: 'Report an Issue',
    subtitle: 'Report any problem during a trip',
    iconType: 'chat',
  },
  {
    id: 'faqs',
    title: 'FAQs',
    subtitle: 'Find answers to common questions',
    iconType: 'faq',
  },
  {
    id: 'contact-support',
    title: 'Contact Support',
    subtitle: 'Reach out to our support team',
    iconType: 'mail',
  },
];

export const safetyItems = [
  {
    id: 'safety-tips',
    title: 'Safety Tips',
    subtitle: 'Learn how to stay safe while driving',
    iconType: 'shield',
  },
  {
    id: 'live-location',
    title: 'Live Location Sharing',
    subtitle: 'Share your live location with trusted contacts',
    iconType: 'location',
  },
  {
    id: 'emergency-contacts',
    title: 'Emergency Contacts',
    subtitle: 'Manage your emergency contacts',
    iconType: 'phoneShield',
  },
];

export const guidelineItems = [
  {
    id: 'community-guidelines',
    title: 'Community Guidelines',
    subtitle: 'Our safety and community standards',
    iconType: 'book',
  },
  {
    id: 'terms-policies',
    title: 'Terms & Policies',
    subtitle: 'Read our terms, privacy policy and more',
    iconType: 'document',
  },
];

export default {
  emergencyContactsConfig,
  helpItems,
  safetyItems,
  guidelineItems,
};
