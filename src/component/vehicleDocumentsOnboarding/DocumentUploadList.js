import React from 'react';
import { StyleSheet, View } from 'react-native';
import DocumentUploadCard from './DocumentUploadCard';
import { documentTypes } from './vehicleDocumentsOnboardingData';

/**
 * DocumentUploadList
 * Renders the vertical stack of document upload cards:
 * 1. Registration Certificate (RC) - Required
 * 2. Insurance - Required
 * 3. PUC Certificate - Required
 * 4. Fitness Certificate - If applicable
 * 5. Commercial Permit - If applicable
 */
function DocumentUploadList({
  documentsState = {},
  onPressUpload,
  onReplace,
  onRemove,
}) {
  return (
    <View style={styles.container}>
      {documentTypes.map(doc => (
        <DocumentUploadCard
          key={doc.id}
          document={doc}
          uploadState={documentsState[doc.id] || {}}
          onPressUpload={onPressUpload}
          onReplace={onReplace}
          onRemove={onRemove}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    width: '100%',
  },
});

export default DocumentUploadList;
