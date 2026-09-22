import React from 'react';
import { View } from 'react-native';
import DocumentReviewCard from './DocumentReviewCard';
import { documentTypes } from './vehicleDocumentsOnboardingData';

/**
 * DocumentReviewList
 * Composes the list of reviewed document items matching the reference design:
 * 1. Registration Certificate (RC)
 * 2. Insurance
 * 3. PUC Certificate
 * 4. Fitness Certificate
 * 5. Commercial Permit
 */
function DocumentReviewList({
  documentsState = {},
  onViewDocument,
  onDeleteDocument,
}) {
  return (
    <View style={{ paddingHorizontal: 20, width: '100%' }}>
      {documentTypes.map(doc => (
        <DocumentReviewCard
          key={doc.id}
          document={doc}
          uploadState={documentsState[doc.id] || {}}
          onView={onViewDocument}
          onDelete={onDeleteDocument}
        />
      ))}
    </View>
  );
}

export default DocumentReviewList;
