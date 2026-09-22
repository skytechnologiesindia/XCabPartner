/**
 * XCAB Driver Emergency Contact Mock Data
 * API-friendly data model for the Emergency Contact screen.
 * Can be directly replaced with backend payload.
 */

export const primaryEmergencyContact = {
  id: 'primary',
  name: 'Suresh Kumar',
  relationship: 'Brother',
  phone: '+91 98765 43210',
  location: 'Ranchi, Jharkhand',
  status: 'active',
};

export const alternateEmergencyContact = null;

export default {
  primaryEmergencyContact,
  alternateEmergencyContact,
};
