import React from 'react';
import { Text, View } from 'react-native';

/**
 * DocumentUploadHelper
 * Compact quality assurance and compliance notice matching the reference banner:
 * "Please ensure all documents are clear, valid and not expired."
 */
function DocumentUploadHelper() {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        marginTop: 4,
        marginBottom: 12,
        width: '100%',
      }}
    >
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#FFF8E1',
          borderColor: '#FFE082',
          borderRadius: 14,
          borderWidth: 1,
          flexDirection: 'row',
          paddingHorizontal: 14,
          paddingVertical: 12,
          width: '100%',
        }}
      >
        {/* Info Icon in Yellow Circle */}
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#D97706',
            borderRadius: 10,
            height: 20,
            justifyContent: 'center',
            marginRight: 10,
            width: 20,
          }}
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 13,
              fontWeight: '800',
              marginTop: -1,
            }}
          >
            ⓘ
          </Text>
        </View>

        {/* Advisory Text */}
        <Text
          style={{
            color: '#4B5563',
            flex: 1,
            fontSize: 12,
            fontWeight: '500',
            lineHeight: 17,
          }}
        >
          Please ensure all documents are clear, valid and not expired.
        </Text>
      </View>
    </View>
  );
}

export default DocumentUploadHelper;
