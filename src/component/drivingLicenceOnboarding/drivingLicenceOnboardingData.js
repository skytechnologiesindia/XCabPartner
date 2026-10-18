/**
 * Driving Licence Onboarding Configuration & Initial Values
 */
export const licenceConfig = {
  minLicenceLength: 10,
  maxLicenceLength: 20,
  minValidityYears: 0,
};

export const initialLicenceValues = {
  licenceNumber: '',
  dateOfBirth: '',
  validUntil: '',
  frontDocument: null,
  backDocument: null,
};

export default {
  licenceConfig,
  initialLicenceValues,
};
