/**
 * Aadhaar / PAN document configuration.
 * `formatNumber` normalises raw text; `isValidNumber` mirrors the existing
 * Aadhaar rule (12 digits) and the standard PAN format.
 */
const formatAadhaar = text => {
  const cleaned = text.replace(/[^0-9]/g, '').slice(0, 12);
  const groups = [];
  for (let i = 0; i < cleaned.length; i += 4) {
    groups.push(cleaned.slice(i, i + 4));
  }
  return groups.join(' ');
};

const formatPan = text =>
  text.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);

export const identityDocuments = [
  {
    id: 'aadhaar',
    label: 'Aadhaar Card',
    uploadName: 'Aadhaar',
    numberLabel: 'Aadhaar',
    placeholder: '1234 5678 9012',
    example: 'Eg: 1234 5678 9012',
    maxLength: 14,
    formatNumber: formatAadhaar,
    isValidNumber: value => value.replace(/[^0-9]/g, '').length === 12,
    errorMessage: 'Please enter a valid 12-digit Aadhaar number.',
  },
  {
    id: 'pan',
    label: 'PAN Card',
    uploadName: 'PAN Card',
    numberLabel: 'PAN',
    placeholder: 'ABCDE1234F',
    example: 'Eg: ABCDE1234F',
    maxLength: 10,
    formatNumber: formatPan,
    isValidNumber: value => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value),
    errorMessage: 'Please enter a valid PAN number (e.g. ABCDE1234F).',
  },
];

export default { identityDocuments };
