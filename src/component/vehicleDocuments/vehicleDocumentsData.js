import { images } from '../../assets/images';

/**
 * XCAB Mock Vehicle & Documents Data
 * Model data for attached vehicle, specifications, and regulatory documents.
 * Structured to be easily swapped with live API/backend data.
 */
export const vehicleData = {
  name: 'White Sedan',
  registration: 'JH 01 AB 4821',
  status: 'active',
  statusText: 'Active on XCab',
  type: 'Sedan',
  makeModel: 'Maruti Dzire',
  year: '2022',
  color: 'White',
  image: images.whiteSedan,
};

export const documentsData = [
  {
    id: 'rc',
    type: 'registration',
    title: 'Registration Certificate (RC)',
    validity: 'Valid till 21 May 2025',
    status: 'valid',
    iconType: 'car',
  },
  {
    id: 'insurance',
    type: 'insurance',
    title: 'Insurance',
    validity: 'Valid till 10 Nov 2025',
    status: 'valid',
    iconType: 'shield',
  },
  {
    id: 'puc',
    type: 'puc',
    title: 'Pollution Under Control (PUC)',
    validity: 'Valid till 05 Aug 2025',
    status: 'valid',
    iconType: 'leaf',
  },
  {
    id: 'dl',
    type: 'license',
    title: 'Driving License',
    validity: 'Valid till 14 Feb 2035',
    status: 'valid',
    iconType: 'license',
  },
  {
    id: 'fitness',
    type: 'fitness',
    title: 'Fitness Certificate',
    validity: 'Expired on 12 Jan 2025',
    status: 'expired',
    iconType: 'document',
  },
  {
    id: 'permit',
    type: 'permit',
    title: 'Permit (Commercial)',
    validity: 'Valid till 30 Mar 2026',
    status: 'valid',
    iconType: 'permit',
  },
];

export default {
  vehicleData,
  documentsData,
};
