/**
 * Verification Status Static Data & Checklist Items
 */
export const verificationChecklistItems = [
  { id: 'personal', label: 'Personal Details', status: 'verified', icon: '✓' },
  { id: 'aadhaar', label: 'Aadhaar Identity', status: 'verified', icon: '✓' },
  { id: 'licence', label: 'Driving Licence', status: 'verified', icon: '✓' },
  { id: 'vehicle', label: 'Vehicle Details', status: 'verified', icon: '✓' },
  { id: 'documents', label: 'Vehicle Documents', status: 'reviewing', icon: '⏳' },
  { id: 'emergency', label: 'Emergency Contact', status: 'verified', icon: '✓' },
];

export const approvalBenefits = [
  {
    id: 'rides',
    icon: '⚡',
    title: 'Start receiving ride requests',
    subtitle: 'Access customer ride requests in real-time.',
  },
  {
    id: 'schedule',
    icon: '🕒',
    title: 'Drive on your own schedule',
    subtitle: 'Go online and offline anytime as per your convenience.',
  },
  {
    id: 'support',
    icon: '🤝',
    title: 'Get support anytime',
    subtitle: '24/7 dedicated driver helpline and safety response.',
  },
];

export default {
  verificationChecklistItems,
  approvalBenefits,
};
