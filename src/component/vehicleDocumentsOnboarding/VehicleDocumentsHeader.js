import React from 'react';
import OnboardingHeader from '../personalDetailsOnboarding/OnboardingHeader';

/**
 * VehicleDocumentsHeader
 * Consistent authentication/onboarding navigation header:
 * - Left: Back arrow (←)
 * - Center: Master XCAB brand logo + DRIVER APP
 * - Right: Need Help? action
 */
function VehicleDocumentsHeader({
  onBack,
  onNeedHelp,
}) {
  return (
    <OnboardingHeader
      onBack={onBack}
      onNeedHelp={onNeedHelp}
    />
  );
}

export default VehicleDocumentsHeader;
