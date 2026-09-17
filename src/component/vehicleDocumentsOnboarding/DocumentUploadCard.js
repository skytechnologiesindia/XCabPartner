import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import DocumentPreview from './DocumentPreview';
import DocumentUploadStatus from './DocumentUploadStatus';

/**
 * DocumentUploadCard
 * Single reusable card for every document item:
 * - Left document category icon (📄, 🛡️, etc.)
 * - Document title and (Required) / (If applicable) badge
 * - Right upload action or status badge
 * - Expandable preview section upon successful upload
 */
function DocumentUploadCard({
  document,
  uploadState = {},
  onPressUpload,
  onReplace,
  onRemove,
}) {
  const isUploaded = uploadState.status === 'uploaded';

  const renderIcon = () => {
    switch (document.iconType) {
      case 'insurance':
        return '🛡️';
      case 'puc':
        return '🌿';
      default:
        return '📄';
    }
  };

  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#E2DFD6',
        borderRadius: 14,
        borderWidth: 1.2,
        marginBottom: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 3,
        elevation: 1,
        width: '100%',
      }}
    >
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 14,
          paddingVertical: 12,
        }}
      >
        {/* 1. Left Document Icon */}
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#F7F5EF',
            borderColor: '#E8E5DB',
            borderRadius: 10,
            borderWidth: 1,
            height: 38,
            justifyContent: 'center',
            width: 38,
          }}
        >
          <Text style={{ fontSize: 18 }}>{renderIcon()}</Text>
        </View>

        {/* 2. Middle Title & Required Label */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            marginHorizontal: 12,
          }}
        >
          <Text
            style={{
              color: '#17191C',
              fontSize: 14,
              fontWeight: '700',
              letterSpacing: -0.2,
            }}
            numberOfLines={1}
          >
            {document.title}
          </Text>
          <Text
            style={[
              {
                fontSize: 11.5,
                fontWeight: '500',
                marginTop: 2,
              },
              document.required
                ? { color: '#687078' }
                : { color: '#8C949E' },
            ]}
          >
            {document.subtitle || (document.required ? '(Required)' : '(If applicable)')}
          </Text>
        </View>

        {/* 3. Right Status / Upload Action */}
        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <DocumentUploadStatus
            status={uploadState.status || 'not_uploaded'}
            onPress={() => onPressUpload(document)}
          />
        </View>
      </View>

      {/* 4. Preview Section (when uploaded) */}
      {isUploaded ? (
        <DocumentPreview
          documentTitle={document.title}
          fileUri={uploadState.uri}
          fileName={uploadState.fileName}
          onReplace={() => onReplace && onReplace(document)}
          onRemove={() => onRemove && onRemove(document)}
        />
      ) : null}
    </View>
  );
}

export default DocumentUploadCard;
