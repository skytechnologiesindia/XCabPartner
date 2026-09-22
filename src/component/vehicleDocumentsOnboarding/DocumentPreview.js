import React, { useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  Text,
  View,
} from 'react-native';

/**
 * DocumentPreview
 * Displays small thumbnail preview and actions (View, Replace, Remove) for an uploaded document.
 */
function DocumentPreview({
  documentTitle,
  fileUri,
  fileName,
  onReplace,
  onRemove,
}) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  return (
    <View
      style={{
        backgroundColor: '#FAF9F5',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        borderColor: '#E8E5DC',
        borderTopWidth: 1,
        marginTop: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
      }}
    >
      {/* Thumbnail + File Info */}
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <Pressable
          style={{
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderColor: '#DDD9CF',
            borderRadius: 8,
            borderWidth: 1,
            height: 38,
            justifyContent: 'center',
            overflow: 'hidden',
            width: 38,
          }}
          onPress={() => setIsViewerOpen(true)}
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
            <Text style={{ fontSize: 20 }}>📄</Text>
          )}
        </Pressable>

        <View
          style={{
            flex: 1,
            marginLeft: 10,
          }}
        >
          <Text
            style={{
              color: '#17191C',
              fontSize: 12.5,
              fontWeight: '700',
            }}
            numberOfLines={1}
          >
            {fileName || `${documentTitle.replace(/\s/g, '_').toLowerCase()}.jpg`}
          </Text>
          <Text
            style={{
              color: '#18A66A',
              fontSize: 11,
              fontWeight: '600',
              marginTop: 1,
            }}
          >
            ✓ Ready for verification
          </Text>
        </View>
      </View>

      {/* Action Buttons: View, Replace, Remove */}
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 8,
          paddingTop: 6,
        }}
      >
        <Pressable
          style={{
            paddingHorizontal: 10,
            paddingVertical: 4,
          }}
          onPress={() => setIsViewerOpen(true)}
          accessibilityRole="button"
          accessibilityLabel={`View ${documentTitle}`}
        >
          <Text
            style={{
              color: '#1D68D8',
              fontSize: 12,
              fontWeight: '700',
            }}
          >
            View
          </Text>
        </Pressable>

        <View
          style={{
            backgroundColor: '#DDD9CF',
            height: 12,
            width: 1,
          }}
        />

        <Pressable
          style={{
            paddingHorizontal: 10,
            paddingVertical: 4,
          }}
          onPress={onReplace}
          accessibilityRole="button"
          accessibilityLabel={`Replace ${documentTitle}`}
        >
          <Text
            style={{
              color: '#1D68D8',
              fontSize: 12,
              fontWeight: '700',
            }}
          >
            Replace
          </Text>
        </Pressable>

        <View
          style={{
            backgroundColor: '#DDD9CF',
            height: 12,
            width: 1,
          }}
        />

        <Pressable
          style={{
            paddingHorizontal: 10,
            paddingVertical: 4,
          }}
          onPress={onRemove}
          accessibilityRole="button"
          accessibilityLabel={`Remove ${documentTitle}`}
        >
          <Text
            style={{
              color: '#F26B5B',
              fontSize: 12,
              fontWeight: '700',
            }}
          >
            Remove
          </Text>
        </Pressable>
      </View>

      {/* Full-screen Document Viewer Modal */}
      <Modal
        visible={isViewerOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsViewerOpen(false)}
      >
        <Pressable
          style={{
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}
          onPress={() => setIsViewerOpen(false)}
        >
          <Pressable
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 20,
              maxHeight: '80%',
              padding: 16,
              width: '100%',
            }}
            onPress={e => e.stopPropagation()}
          >
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: 12,
              }}
            >
              <Text
                style={{
                  color: '#17191C',
                  fontSize: 16,
                  fontWeight: '800',
                  maxWidth: '80%',
                }}
                numberOfLines={1}
              >
                {documentTitle}
              </Text>
              <Pressable
                style={{
                  alignItems: 'center',
                  backgroundColor: '#F1EEE5',
                  borderRadius: 14,
                  height: 28,
                  justifyContent: 'center',
                  width: 28,
                }}
                onPress={() => setIsViewerOpen(false)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text
                  style={{
                    color: '#687078',
                    fontSize: 13,
                    fontWeight: '700',
                  }}
                >
                  ✕
                </Text>
              </Pressable>
            </View>

            <View
              style={{
                alignItems: 'center',
                backgroundColor: '#F7F5EF',
                borderRadius: 12,
                height: 240,
                justifyContent: 'center',
                marginVertical: 10,
                overflow: 'hidden',
                width: '100%',
              }}
            >
              {fileUri ? (
                <Image
                  source={{ uri: fileUri }}
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  resizeMode="contain"
                />
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 16,
                  }}
                >
                  <Text style={{ fontSize: 48, marginBottom: 8 }}>📄</Text>
                  <Text
                    style={{
                      color: '#17191C',
                      fontSize: 15,
                      fontWeight: '700',
                    }}
                  >
                    Sample Document Preview
                  </Text>
                  <Text
                    style={{
                      color: '#687078',
                      fontSize: 12,
                      marginTop: 4,
                      textAlign: 'center',
                    }}
                  >
                    {documentTitle} uploaded successfully.
                  </Text>
                </View>
              )}
            </View>

            <Pressable
              style={{
                alignItems: 'center',
                backgroundColor: '#FFC928',
                borderRadius: 12,
                height: 44,
                justifyContent: 'center',
                marginTop: 6,
              }}
              onPress={() => setIsViewerOpen(false)}
            >
              <Text
                style={{
                  color: '#17191C',
                  fontSize: 14,
                  fontWeight: '800',
                }}
              >
                Close Preview
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

export default DocumentPreview;
