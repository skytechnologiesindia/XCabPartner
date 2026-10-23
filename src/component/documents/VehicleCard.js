import React from 'react';
import {
  Pressable,
  Text,
} from 'react-native';

// [API] `status` ({ label, color }) comes from the API step state (selected,
// rejected, verified); defaults to the old fixed "Selected" text.
function VehicleCard({ title, onPress, status }) {
  const statusLabel = status ? status.label : 'Selected';
  const statusColor = status ? status.color : '#687078';
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: '#FFFFFF',
          borderColor: '#EEECE5',
          borderRadius: 16,
          borderWidth: 1,
          elevation: 1,
          marginBottom: 12,
          paddingHorizontal: 16,
          paddingVertical: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
        },
        pressed && { opacity: 0.85 },
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${statusLabel}`}
    >
      <Text style={{ color: '#17191C', fontSize: 16, fontWeight: '600' }}>
        {title}
      </Text>
      <Text style={{ color: statusColor, fontSize: 12, marginTop: 2 }}>
        {statusLabel}
      </Text>
    </Pressable>
  );
}

export default VehicleCard;
