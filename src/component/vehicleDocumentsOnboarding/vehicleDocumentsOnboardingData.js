/**
 * Vehicle Documents Onboarding Data & Static Configuration
 */
export const documentTypes = [
  {
    id: 'rc',
    title: 'Registration Certificate (RC)',
    required: true,
    subtitle: '(Required)',
    iconType: 'rc',
    description: 'Vehicle Registration Certificate with owner details and engine/chassis number.',
  },
  {
    id: 'insurance',
    title: 'Insurance',
    required: true,
    subtitle: '(Required)',
    iconType: 'insurance',
    description: 'Valid commercial or private comprehensive insurance policy.',
  },
  {
    id: 'puc',
    title: 'PUC Certificate',
    required: true,
    subtitle: '(Required)',
    iconType: 'puc',
    description: 'Pollution Under Control certificate indicating emission compliance.',
  },
  {
    id: 'fitness',
    title: 'Fitness Certificate',
    required: false,
    subtitle: '(If applicable)',
    iconType: 'fitness',
    description: 'State RTO vehicle roadworthiness and inspection fitness certificate.',
  },
  {
    id: 'permit',
    title: 'Commercial Permit',
    required: false,
    subtitle: '(If applicable)',
    iconType: 'permit',
    description: 'Contract carriage / commercial taxi permit issued by transport department.',
  },
];

export const initialDocumentsState = {
  rc: {
    status: 'not_uploaded', // 'not_uploaded' | 'uploading' | 'uploaded' | 'failed' | 'reviewing'
    uri: null,
    fileName: null,
    uploadProgress: 0,
    uploadedAt: null,
  },
  insurance: {
    status: 'not_uploaded',
    uri: null,
    fileName: null,
    uploadProgress: 0,
    uploadedAt: null,
  },
  puc: {
    status: 'not_uploaded',
    uri: null,
    fileName: null,
    uploadProgress: 0,
    uploadedAt: null,
  },
  fitness: {
    status: 'not_uploaded',
    uri: null,
    fileName: null,
    uploadProgress: 0,
    uploadedAt: null,
  },
  permit: {
    status: 'not_uploaded',
    uri: null,
    fileName: null,
    uploadProgress: 0,
    uploadedAt: null,
  },
};

export const documentUploadTips = [
  'Good lighting with no camera flash glare',
  'All 4 corners of document must be visible',
  'Document text must be clearly readable',
  'Ensure document is valid and not expired',
];

export default {
  documentTypes,
  initialDocumentsState,
  documentUploadTips,
};
