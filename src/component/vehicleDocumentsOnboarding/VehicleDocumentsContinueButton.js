import React from 'react';
import OnboardingContinueButton from '../personalDetailsOnboarding/OnboardingContinueButton';

/**
 * VehicleDocumentsContinueButton
 * Primary CTA ("Continue →") in XCAB yellow (#FFC928):
 * - Disabled until all required documents (RC, Insurance, PUC) are uploaded
 * - Shows loading state during submission
 */
function VehicleDocumentsContinueButton({
  label = 'Continue',
  onPress,
  isDisabled = false,
  isLoading = false,
}) {
  return (
    <OnboardingContinueButton
      label={label}
      onPress={onPress}
      isDisabled={isDisabled}
      isLoading={isLoading}
    />
  );
}

export default VehicleDocumentsContinueButton;
