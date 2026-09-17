/**
 * Vehicle Details Onboarding Data & Static Configuration
 */
export const vehicleTypes = [
  { id: 'sedan', label: 'Sedan' },
  { id: 'hatchback', label: 'Hatchback' },
  { id: 'suv', label: 'SUV' },
  { id: 'premium', label: 'Premium Sedan' },
  { id: 'auto', label: 'Auto / Rickshaw' },
];

export const vehicleMakes = [
  'Toyota',
  'Maruti Suzuki',
  'Hyundai',
  'Tata Motors',
  'Honda',
  'Mahindra',
];

export const modelsByMake = {
  Toyota: ['Etios', 'Innova', 'Innova Crysta', 'Glanza', 'Urban Cruiser', 'Yaris'],
  'Maruti Suzuki': ['Dzire', 'Swift', 'WagonR', 'Ertiga', 'Baleno', 'Ciaz', 'Tour S'],
  Hyundai: ['Aura', 'Grand i10', 'Verna', 'Creta', 'Xcent', 'i20'],
  'Tata Motors': ['Tigor', 'Tiago', 'Nexon', 'Altroz', 'Punch', 'Zest'],
  Honda: ['Amaze', 'City', 'WR-V'],
  Mahindra: ['Bolero', 'Scorpio', 'XUV300', 'Marazzo', 'Xylo'],
};

export const vehicleYears = [
  '2025',
  '2024',
  '2023',
  '2022',
  '2021',
  '2020',
  '2019',
  '2018',
  '2017',
  '2016',
  '2015',
];

export const vehicleColors = [
  'White',
  'Silver',
  'Grey',
  'Black',
  'Blue',
  'Red',
  'Brown',
  'Golden',
];

export const initialVehicleDetails = {
  vehicleType: 'Sedan',
  make: 'Toyota',
  model: 'Etios',
  year: '2020',
  color: 'White',
  registrationNumber: 'JH01AB1234',
};

export default {
  vehicleTypes,
  vehicleMakes,
  modelsByMake,
  vehicleYears,
  vehicleColors,
  initialVehicleDetails,
};
