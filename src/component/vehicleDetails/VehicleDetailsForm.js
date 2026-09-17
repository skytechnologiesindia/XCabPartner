import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import VehicleRegistrationField from './VehicleRegistrationField';
import VehicleSelectField from './VehicleSelectField';
import VehicleSelectModal from './VehicleSelectModal';
import {
  modelsByMake,
  vehicleColors,
  vehicleMakes,
  vehicleTypes,
  vehicleYears,
} from './vehicleDetailsData';

/**
 * VehicleDetailsForm
 * Composes all 6 vehicle configuration fields:
 * 1. Vehicle Type (Sedan, Hatchback, SUV, etc.)
 * 2. Make (Toyota, Maruti Suzuki, etc.)
 * 3. Model (Etios, Dzire, etc.)
 * 4. Year (2020, etc.)
 * 5. Color (White, etc.)
 * 6. Registration Number (JH01AB1234)
 */
function VehicleDetailsForm({
  formData,
  onChangeField,
  errors = {},
}) {
  const [activeModal, setActiveModal] = useState(null);

  const availableModels =
    modelsByMake[formData.make] || modelsByMake.Toyota;

  const handleSelectMake = make => {
    onChangeField('make', make);
    // Auto-update model to first available model for this make if current model doesn't belong
    const makeModels = modelsByMake[make] || [];
    if (makeModels.length > 0 && !makeModels.includes(formData.model)) {
      onChangeField('model', makeModels[0]);
    }
  };

  return (
    <View style={styles.container}>
      {/* 1. Vehicle Type */}
      <VehicleSelectField
        label="Vehicle Type"
        value={formData.vehicleType}
        icon="🚗"
        onPress={() => setActiveModal('type')}
      />

      {/* 2. Make */}
      <VehicleSelectField
        label="Make"
        value={formData.make}
        icon="🏢"
        onPress={() => setActiveModal('make')}
      />

      {/* 3. Model */}
      <VehicleSelectField
        label="Model"
        value={formData.model}
        icon="🚗"
        onPress={() => setActiveModal('model')}
      />

      {/* 4. Year */}
      <VehicleSelectField
        label="Year"
        value={formData.year}
        icon="📅"
        onPress={() => setActiveModal('year')}
      />

      {/* 5. Color */}
      <VehicleSelectField
        label="Color"
        value={formData.color}
        icon="🎨"
        onPress={() => setActiveModal('color')}
      />

      {/* 6. Registration Number */}
      <VehicleRegistrationField
        label="Registration Number"
        value={formData.registrationNumber}
        onChangeNumber={val => onChangeField('registrationNumber', val)}
        errorMessage={errors.registrationNumber}
      />

      {/* Modals for Dropdowns */}
      <VehicleSelectModal
        visible={activeModal === 'type'}
        title="Select Vehicle Type"
        options={vehicleTypes}
        selectedValue={formData.vehicleType}
        onSelect={val => onChangeField('vehicleType', val)}
        onClose={() => setActiveModal(null)}
      />

      <VehicleSelectModal
        visible={activeModal === 'make'}
        title="Select Vehicle Make"
        options={vehicleMakes}
        selectedValue={formData.make}
        onSelect={handleSelectMake}
        onClose={() => setActiveModal(null)}
      />

      <VehicleSelectModal
        visible={activeModal === 'model'}
        title="Select Vehicle Model"
        options={availableModels}
        selectedValue={formData.model}
        onSelect={val => onChangeField('model', val)}
        onClose={() => setActiveModal(null)}
      />

      <VehicleSelectModal
        visible={activeModal === 'year'}
        title="Select Manufacturing Year"
        options={vehicleYears}
        selectedValue={formData.year}
        onSelect={val => onChangeField('year', val)}
        onClose={() => setActiveModal(null)}
      />

      <VehicleSelectModal
        visible={activeModal === 'color'}
        title="Select Vehicle Color"
        options={vehicleColors}
        selectedValue={formData.color}
        onSelect={val => onChangeField('color', val)}
        onClose={() => setActiveModal(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    width: '100%',
  },
});

export default VehicleDetailsForm;
