/**
 * Documents hub configuration.
 * Order follows the Documents screen design. `route` points at the existing
 * registration step that captures/edits that document.
 *
 * [API] `stepKey` links each card to its step in the API
 * (/requirements, /me documents, onboarding upload). The permissions card has
 * no step: it is app-only and never sent. Cards are shown in the order of
 * the live /requirements reply, not the order of this list.
 */
export const documentItems = [
  { id: 'licence', stepKey: 'DRIVING_LICENCE', title: 'Driving License', icon: '🪪', tint: '#FFF0DD', route: 'RegDrivingLicence' },
  { id: 'photo', stepKey: 'PERSONAL_INFO', title: 'Photo and name', icon: '👤', tint: '#E4EEFD', route: 'PhotoAndName' },
  { id: 'vehicleNumber', stepKey: 'VEHICLE_NUMBER', title: 'Vehicle Number', icon: '🚘', tint: '#ECEEF1', route: 'RegVehicleDetails' },
  { id: 'identity', stepKey: 'PERSONAL_IDENTITY', title: 'Aadhaar or PAN card', icon: '🪪', tint: '#ECEEF1', route: 'AadhaarPan' },
  { id: 'permit', stepKey: 'PERMIT', title: 'Permit', icon: '📄', tint: '#ECEEF1', route: 'Permit' },
  { id: 'insurance', stepKey: 'CAB_INSURANCE', title: 'Cab Insurance', icon: '🛡️', tint: '#ECEEF1', route: 'CabInsurance' },
  { id: 'fitness', stepKey: 'FITNESS', title: 'Fitness Certificate', icon: '📋', tint: '#ECEEF1', route: 'FitnessCertificate' },
  { id: 'permissions', stepKey: null, title: 'Permissions (optional)', icon: '📍', tint: '#ECEEF1', route: 'AppPermissions' },
];

export const statusColors = {
  green: '#16A34A',
  orange: '#F08A00',
  grey: '#687078',
  red: '#DC2626',
};

/**
 * [API] Card status line for one API step.
 *   stepError  -> problem returned by the last submit (INVALID_INPUT details)
 *   serverDoc  -> this step inside /me `documents` ({ status, reviewNote })
 *   isComplete -> every field and photo of the step is filled on the phone
 */
export function getStepStatus({ mode, stepError, serverDoc, isComplete }) {
  if (stepError) {
    return { label: stepError, color: statusColors.red };
  }
  if (serverDoc && serverDoc.status === 'REJECTED') {
    // [API] Show the admin's reason, e.g. "Back photo is blurry".
    const note = serverDoc.reviewNote ? `: ${serverDoc.reviewNote}` : '';
    return {
      label: isComplete && mode === 'fix' ? `Updated, ready to resend${note}` : `Rejected${note}`,
      color: statusColors.red,
    };
  }
  if (mode === 'view' && serverDoc) {
    if (serverDoc.status === 'APPROVED') {
      return { label: 'Verified', color: statusColors.green };
    }
    return { label: 'Under verification...', color: statusColors.orange };
  }
  return isComplete
    ? { label: 'Details added', color: statusColors.green }
    : { label: 'Required', color: statusColors.grey };
}

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
