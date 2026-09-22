/**
 * Vehicle Details Onboarding Options & Presets
 */
export const vehicleTypes = [
  { id: 'sedan', label: 'Sedan', icon: '🚗' },
  { id: 'hatchback', label: 'Hatchback', icon: '🚙' },
  { id: 'suv', label: 'SUV', icon: '🚙' },
  { id: 'auto', label: 'Auto Rickshaw', icon: '🛺' },
  { id: 'premier', label: 'Premier', icon: '✨' },
];

export const vehicleMakes = [
  'Toyota',
  'Maruti Suzuki',
  'Hyundai',
  'Tata',
  'Mahindra',
  'Honda',
  'Kia',
  'Volkswagen',
];

export const modelsByMake = {
  Toyota: ['Etios', 'Innova', 'Innova Crysta', 'Glanza', 'Urban Cruiser', 'Yaris'],
  'Maruti Suzuki': ['Dzire', 'Swift', 'Wagon R', 'Ertiga', 'Baleno', 'Brezza', 'Ciaz', 'Alto'],
  Hyundai: ['Aura', 'Grand i10', 'i20', 'Creta', 'Verna', 'Venue', 'Xcent'],
  Tata: ['Tigor', 'Tiago', 'Nexon', 'Altroz', 'Punch', 'Harrier'],
  Mahindra: ['Bolero', 'Scorpio', 'XUV300', 'XUV700', 'Marazzo', 'Thar'],
  Honda: ['Amaze', 'City', 'WR-V', 'Jazz'],
  Kia: ['Sonet', 'Seltos', 'Carens', 'Carnival'],
  Volkswagen: ['Virtus', 'Taigun', 'Polo', 'Vento'],
};

export const vehicleYears = [
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
  { label: 'White', colorHex: '#FFFFFF', border: '#CBD5E1' },
  { label: 'Silver', colorHex: '#E2E8F0', border: '#94A3B8' },
  { label: 'Grey', colorHex: '#64748B', border: '#475569' },
  { label: 'Black', colorHex: '#0F172A', border: '#0F172A' },
  { label: 'Blue', colorHex: '#2563EB', border: '#1D4ED8' },
  { label: 'Red', colorHex: '#DC2626', border: '#B91C1C' },
  { label: 'Yellow', colorHex: '#FACC15', border: '#EAB308' },
];

export const initialVehicleValues = {
  type: 'Sedan',
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
  initialVehicleValues,
};
