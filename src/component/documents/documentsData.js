/**
 * Documents hub configuration.
 * Order follows the Documents screen design. `route` points at the existing
 * registration step that captures/edits that document.
 *
 * No documents API exists yet, so statuses are derived from RegistrationContext.
 */
export const documentItems = [
  { id: 'licence', title: 'Driving License', icon: '🪪', tint: '#FFF0DD', route: 'RegDrivingLicence' },
  { id: 'photo', title: 'Photo and name', icon: '👤', tint: '#E4EEFD', route: 'PhotoAndName' },
  { id: 'vehicleNumber', title: 'Vehicle Number', icon: '🚘', tint: '#ECEEF1', route: 'RegVehicleDetails' },
  { id: 'identity', title: 'Aadhaar or PAN card', icon: '🪪', tint: '#ECEEF1', route: 'AadhaarPan' },
  { id: 'permit', title: 'Permit', icon: '📄', tint: '#ECEEF1', route: 'Permit' },
  { id: 'insurance', title: 'Cab Insurance', icon: '🛡️', tint: '#ECEEF1', route: 'CabInsurance' },
  { id: 'fitness', title: 'Fitness Certificate', icon: '📋', tint: '#ECEEF1', route: 'FitnessCertificate' },
  { id: 'permissions', title: 'Permissions (optional)', icon: '📍', tint: '#ECEEF1', route: 'AppPermissions' },
];

export const statusColors = {
  green: '#16A34A',
  orange: '#F08A00',
  grey: '#687078',
};

const isUploaded = doc =>
  !!doc && (doc.status === 'uploaded' || doc.status === 'reviewing');

/**
 * Returns { label, color } for a document, or null when no status applies yet.
 */
export function getDocumentStatus(id, data) {
  const { verificationStatus } = data;

  // Once the driver is submitted, collected documents share the review state.
  const reviewState = hasData => {
    if (!hasData) return null;
    if (verificationStatus === 'approved') {
      return { label: 'Verified', color: statusColors.green };
    }
    if (verificationStatus === 'pending') {
      return { label: 'Under verification...', color: statusColors.orange };
    }
    return { label: 'Details added', color: statusColors.grey };
  };

  const vehicleDocs = data.vehicleDocuments || {};

  switch (id) {
    case 'vehicle':
      return data.vehicle?.type
        ? { label: 'Selected', color: statusColors.green }
        : null;
    case 'licence': {
      const dl = data.drivingLicence || {};
      return reviewState(!!dl.licenceNumber || !!dl.frontDocument);
    }
    case 'photo':
      return reviewState(
        !!data.personalDetails?.fullName || !!data.personalDetails?.profilePhoto,
      );
    case 'vehicleNumber':
      return reviewState(!!data.vehicle?.registrationNumber);
    case 'identity':
      return reviewState(
        !!data.aadhaar?.aadhaarNumber ||
          !!data.aadhaar?.frontDocument ||
          !!data.pan?.panNumber ||
          !!data.pan?.frontDocument,
      );
    case 'permit':
      return reviewState(
        isUploaded(vehicleDocs.permit) ||
          !!data.permit?.number ||
          !!data.permit?.frontDocument,
      );
    case 'insurance':
      return reviewState(
        isUploaded(vehicleDocs.insurance) ||
          !!data.insurance?.number ||
          !!data.insurance?.frontDocument,
      );
    case 'fitness':
      // Submitted from the Fitness Certificate screen (pending review).
      if (data.fitness?.status === 'pending' && verificationStatus !== 'approved') {
        return { label: 'Under verification...', color: statusColors.orange };
      }
      return reviewState(
        isUploaded(vehicleDocs.fitness) ||
          !!data.fitness?.number ||
          !!data.fitness?.frontDocument,
      );
    default:
      return null;
  }
}

export default { documentItems, getDocumentStatus, statusColors };
