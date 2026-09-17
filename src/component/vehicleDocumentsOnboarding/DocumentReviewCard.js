import React from 'react';
import {
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';

/**
 * DocumentReviewCard
 * Single reusable card for reviewing an uploaded document:
 * - Left thumbnail preview showing certificate/document
 * - Title and green "Uploaded" status badge
 * - Right action buttons: View (👁) and Delete (🗑)
 */
function DocumentReviewCard({
  document,
  uploadState = {},
  onView,
  onDelete,
}) {
  const isUploaded = uploadState.status === 'uploaded';
  const fileUri = uploadState.uri;

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#E2DFD6',
        borderRadius: 14,
        borderWidth: 1.2,
        flexDirection: 'row',
        marginBottom: 10,
        paddingHorizontal: 12,
        paddingVertical: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 3,
        elevation: 1,
        width: '100%',
      }}
    >
      {/* 1. Left Thumbnail Preview */}
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#FAF8F3',
          borderColor: '#DDD9CF',
          borderRadius: 8,
          borderWidth: 1,
          height: 42,
          justifyContent: 'center',
          overflow: 'hidden',
          width: 54,
        }}
      >
        {fileUri ? (
          <Image
            source={{ uri: fileUri }}
            style={{
              height: '100%',
              width: '100%',
            }}
            resizeMode="cover"
          />
        ) : (
          <View
            style={{
              alignItems: 'flex-start',
              backgroundColor: '#FFFFFF',
              height: '100%',
              padding: 3,
              position: 'relative',
              width: '100%',
            }}
          >
            <View
              style={{
                backgroundColor: '#4A7BB0',
                borderRadius: 1,
                height: 3,
                marginBottom: 3,
                width: '70%',
              }}
            />
            <View
              style={{
                backgroundColor: '#D1D5DB',
                borderRadius: 1,
                height: 2,
                marginBottom: 2,
                width: '90%',
              }}
            />
            <View
              style={{
                backgroundColor: '#E5E7EB',
                borderRadius: 1,
                height: 2,
                marginBottom: 2,
                width: '60%',
              }}
            />
            <View
              style={{
                backgroundColor: '#E5E7EB',
                borderRadius: 1,
                height: 2,
                width: '80%',
              }}
            />
            <View
              style={{
                backgroundColor: '#FFC928',
                borderColor: '#B45309',
                borderRadius: 4,
                borderWidth: 0.5,
                bottom: 3,
                height: 8,
                position: 'absolute',
                right: 3,
                width: 8,
              }}
            />
          </View>
        )}
      </View>

      {/* 2. Middle Title & Uploaded Status */}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          marginLeft: 12,
          marginRight: 8,
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
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            gap: 5,
            marginTop: 4,
          }}
        >
          {isUploaded ? (
            <>
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: '#18A66A',
                  borderRadius: 7,
                  height: 14,
                  justifyContent: 'center',
                  width: 14,
                }}
              >
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 9,
                    fontWeight: '900',
                  }}
                >
                  ✓
                </Text>
              </View>
              <Text
                style={{
                  color: '#18A66A',
                  fontSize: 12,
                  fontWeight: '600',
                }}
              >
                Uploaded
              </Text>
            </>
          ) : (
            <>
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: '#F26B5B',
                  borderRadius: 7,
                  height: 14,
                  justifyContent: 'center',
                  width: 14,
                }}
              >
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 9,
                    fontWeight: '900',
                  }}
                >
                  !
                </Text>
              </View>
              <Text
                style={{
                  color: '#F26B5B',
                  fontSize: 12,
                  fontWeight: '600',
                }}
              >
                {document.required ? 'Missing (Required)' : 'Not Uploaded'}
              </Text>
            </>
          )}
        </View>
      </View>

      {/* 3. Right Action Buttons: View (👁) & Delete (🗑) */}
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          gap: 6,
        }}
      >
        <Pressable
          style={({ pressed }) => [
            {
              alignItems: 'center',
              backgroundColor: '#FAFAF8',
              borderColor: '#DDD9CF',
              borderRadius: 8,
              borderWidth: 1,
              height: 34,
              justifyContent: 'center',
              width: 34,
            },
            pressed && {
              backgroundColor: '#EBE7DE',
            },
          ]}
          onPress={() => onView && onView(document)}
          accessibilityRole="button"
          accessibilityLabel={`View ${document.title}`}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          <Text style={{ fontSize: 15 }}>👁</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            {
              alignItems: 'center',
              backgroundColor: '#FAFAF8',
              borderColor: '#DDD9CF',
              borderRadius: 8,
              borderWidth: 1,
              height: 34,
              justifyContent: 'center',
              width: 34,
            },
            pressed && {
              backgroundColor: '#EBE7DE',
            },
          ]}
          onPress={() => onDelete && onDelete(document)}
          accessibilityRole="button"
          accessibilityLabel={`Delete or Replace ${document.title}`}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          <Text style={{ fontSize: 14 }}>🗑</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default DocumentReviewCard;
