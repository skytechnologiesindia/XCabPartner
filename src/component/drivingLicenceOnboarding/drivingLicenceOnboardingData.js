/**
 * Driving Licence Onboarding Configuration & Initial Values
 */
export const licenceConfig = {
  minLicenceLength: 10,
  maxLicenceLength: 20,
  minValidityYears: 0,
};

export const initialLicenceValues = {
  licenceNumber: 'JH01 2019 0012345',
  dateOfBirth: '12 Jan 1998',
  validUntil: '12 Jan 2035',
  frontDocument: null,
  backDocument: null,
};

export default {
  licenceConfig,
  initialLicenceValues,
};
