import React from 'react';
import {
  Alert,
  Platform,
  StatusBar,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  DocumentsHeader,
  VehicleTypeSection,
} from '../../component/documents';
import { useRegistration } from '../../context/RegistrationContext';

function getVehicleCategory(type = '') {
  const normalizedType = type.toLowerCase();
  if (normalizedType.includes('auto')) {
    return 'auto';
  }
  if (normalizedType.includes('bike')) {
    return 'bike';
  }
  return 'car';
}

function VehicleTypeScreen({ onBack }) {
  const insets = useSafeAreaInsets();
  const { registrationData, updateRegistrationData, requirements } = useRegistration();
  const selectedType = getVehicleCategory(
    registrationData.vehicle?.option || registrationData.vehicle?.type,
  );
  // [API] Options of the VEHICLE step from /requirements (loaded by the hub).
  const vehicleOptions = (requirements || []).find(step => step.key === 'VEHICLE')?.options;

  const handleHelp = () => {
    Alert.alert(
      'TREEPS Support (24/7)',
      'Need help with your vehicle type?\n\nContact our 24/7 Driver Support at 1800-247-TREEPS (9222).',
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  const handleSelect = type => {
    const currentType = registrationData.vehicle?.type || '';
    const value =
      type.id === 'car' && selectedType === 'car'
        ? currentType || type.value
        : type.value;
    // [API] `option` is what the VEHICLE step sends ({"key":"VEHICLE","option":"CAR"}).
    updateRegistrationData('vehicle', { type: value, option: type.apiValue });
    console.log('VEHICLE saved:', { type: value, option: type.apiValue });
  };

  return (
    <View style={{ backgroundColor: '#FBFAF6', flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEF0F2" translucent={false} />
      <DocumentsHeader
        title="Vehicle Type"
        onBack={onBack}
        onHelp={handleHelp}
        topInset={Platform.OS === 'ios' ? insets.top : 0}
      />
      <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
        <VehicleTypeSection
          selectedType={selectedType}
          onSelect={handleSelect}
          options={vehicleOptions}
        />
      </View>
    </View>
  );
}

export default VehicleTypeScreen;
