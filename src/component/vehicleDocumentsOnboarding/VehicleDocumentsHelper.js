import React from 'react';
import DocumentUploadHelper from './DocumentUploadHelper';

/**
 * VehicleDocumentsHelper
 * Helper notice component for vehicle documents onboarding:
 * Displays clear document quality guidelines and compliance tips.
 */
function VehicleDocumentsHelper({
  message = 'Please ensure all documents are clear, valid and not expired.',
}) {
  return <DocumentUploadHelper message={message} />;
}

export default VehicleDocumentsHelper;
