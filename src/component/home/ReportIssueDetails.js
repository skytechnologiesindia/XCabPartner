import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors } from '../../assets/colors/colors';
import { icons } from '../../assets/icons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const fontSans = Platform.select({
  ios: 'System',
  android: 'sans-serif',
});

/**
 * ReportIssueDetails
 * Dynamic detail flow covering:
 * - Specific sub-reason selection
 * - Safety emergency help call banner
 * - Provide more details (multiline description)
 * - Photo attachments (add/remove photos)
 * - Submit action & error handling
 */
function ReportIssueDetails({
  issueData,
  tripData,
  onBack,
  onClose,
  onSubmit,
}) {
  const isSafety = issueData?.isSafety || false;
  const hasSubReasons = issueData?.subReasons && issueData.subReasons.length > 0;

  // Step 1: Sub-reason selection (if available), Step 2: Description & Photos
  const [currentSubStep, setCurrentSubStep] = useState(
    hasSubReasons ? 'select_reason' : 'provide_details'
  );
  const [selectedSubReason, setSelectedSubReason] = useState(null);
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const getIconSource = () => {
    switch (issueData?.icon) {
      case 'wallet':
        return icons.statWallet || icons.payment;
      case 'rider':
        return icons.profile || icons.profileActive;
      case 'lost_item':
        return icons.promoTag || icons.desk;
      case 'document':
        return icons.mapList || icons.road;
      case 'vehicle':
        return icons.mapCar || icons.rides;
      case 'safety':
        return icons.shield;
      case 'dots':
        return icons.chat || icons.desk;
      default:
        return icons.flag;
    }
  };

  const handleCallEmergency = () => {
    Alert.alert(
      'Emergency Assistance',
      'If you are in immediate danger, connect directly with Emergency Services or XCAB 24/7 Safety Helpline.',
      [
        {
          text: 'Call Emergency (112)',
          style: 'destructive',
          onPress: () => {
            Linking.openURL('tel:112').catch(() => {
              Alert.alert('Unable to dial', 'Please call 112 from your dialer.');
            });
          },
        },
        {
          text: 'XCAB Safety Support',
          onPress: () => {
            Linking.openURL('tel:18002479222').catch(() => {
              Alert.alert('Support Helpline', 'XCAB Driver Safety: 1800-247-9222');
            });
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const handleAddPhoto = () => {
    if (photos.length >= 3) {
      Alert.alert('Limit Reached', 'You can attach up to 3 photos.');
      return;
    }

    Alert.alert(
      'Add Photo Evidence',
      'Choose source to attach proof of issue:',
      [
        {
          text: 'Take Photo',
          onPress: () => {
            // Mock capture photo
            const newPhoto = {
              id: `photo_${Date.now()}`,
              uri: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500&auto=format&fit=crop&q=80',
            };
            setPhotos(prev => [...prev, newPhoto]);
          },
        },
        {
          text: 'Choose from Gallery',
          onPress: () => {
            // Mock select photo
            const newPhoto = {
              id: `photo_${Date.now()}`,
              uri: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&auto=format&fit=crop&q=80',
            };
            setPhotos(prev => [...prev, newPhoto]);
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const handleRemovePhoto = photoId => {
    setPhotos(prev => prev.filter(p => p.id !== photoId));
  };

  const handleContinueToDetails = () => {
    if (hasSubReasons && !selectedSubReason) {
      Alert.alert('Selection Required', 'Please select what happened to continue.');
      return;
    }
    setCurrentSubStep('provide_details');
  };

  const handleBackStep = () => {
    if (currentSubStep === 'provide_details' && hasSubReasons) {
      setCurrentSubStep('select_reason');
    } else {
      if (onBack) onBack();
    }
  };

  const handleSubmitReport = () => {
    setErrorMessage(null);
    setIsSubmitting(true);

    const reportPayload = {
      issueCategory: issueData?.id,
      issueTitle: issueData?.title,
      subReason: selectedSubReason,
      description: description.trim(),
      photos,
      tripData: tripData || {
        tripId: 'XC-84920',
        fare: '₹180',
        distance: '6.4 km',
        pickup: 'Main Road, Ranchi',
        drop: 'Lalpur Market, Ranchi',
      },
      timestamp: new Date().toISOString(),
    };

    setTimeout(() => {
      setIsSubmitting(false);
      if (onSubmit) {
        onSubmit(reportPayload);
      }
    }, 800);
  };

  return (
    <View style={{ width: '100%', maxHeight: SCREEN_HEIGHT * 0.85 }}>
      {/* 1. Header Navigation Bar */}
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 12,
          paddingHorizontal: 4,
        }}
      >
        <Pressable
          onPress={handleBackStep}
          hitSlop={12}
          style={{
            alignItems: 'center',
            backgroundColor: '#F3EFE6',
            borderRadius: 16,
            height: 32,
            justifyContent: 'center',
            width: 32,
          }}
          accessibilityLabel="Go back"
        >
          <Text
            style={{
              color: '#17191C',
              fontSize: 18,
              fontWeight: '700',
              marginTop: -2,
            }}
          >
            ‹
          </Text>
        </Pressable>

        <Text
          style={{
            color: '#17191C',
            fontFamily: fontSans,
            fontSize: 16,
            fontWeight: '800',
            letterSpacing: -0.2,
          }}
        >
          Report an issue
        </Text>

        <Pressable
          onPress={onClose}
          hitSlop={12}
          style={{
            alignItems: 'center',
            backgroundColor: '#F3EFE6',
            borderRadius: 16,
            height: 32,
            justifyContent: 'center',
            width: 32,
          }}
          accessibilityLabel="Close"
        >
          <Text
            style={{
              color: '#17191C',
              fontSize: 14,
              fontWeight: '700',
            }}
          >
            ✕
          </Text>
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* 2. Top Centered Icon Badge */}
        <View style={{ alignItems: 'center', marginVertical: 10 }}>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: isSafety ? '#EF4444' : '#FFF4C7',
              borderRadius: 24,
              height: 48,
              justifyContent: 'center',
              width: 48,
            }}
          >
            <Image
              source={getIconSource()}
              style={{
                height: 24,
                resizeMode: 'contain',
                tintColor: isSafety ? '#FFFFFF' : '#17191C',
                width: 24,
              }}
            />
          </View>

          {/* Heading */}
          <Text
            style={{
              color: '#17191C',
              fontFamily: fontSans,
              fontSize: 19,
              fontWeight: '800',
              letterSpacing: -0.3,
              marginTop: 10,
              textAlign: 'center',
            }}
          >
            {currentSubStep === 'select_reason'
              ? issueData?.heading || issueData?.title
              : 'Provide more details'}
          </Text>

          {/* Subtitle / Prompt */}
          <Text
            style={{
              color: '#687078',
              fontFamily: fontSans,
              fontSize: 13,
              lineHeight: 18,
              marginTop: 4,
              paddingHorizontal: 16,
              textAlign: 'center',
            }}
          >
            {currentSubStep === 'select_reason'
              ? issueData?.prompt
              : 'Help us understand the issue better.'}
          </Text>
        </View>

        {/* 3. Safety Immediate Emergency Action Card */}
        {isSafety ? (
          <Pressable
            style={({ pressed }) => [
              {
                alignItems: 'center',
                backgroundColor: '#FEF2F2',
                borderColor: '#FCA5A5',
                borderRadius: 16,
                borderWidth: 1.5,
                flexDirection: 'row',
                marginBottom: 16,
                marginTop: 6,
                paddingHorizontal: 16,
                paddingVertical: 14,
              },
              pressed && {
                backgroundColor: '#FEE2E2',
                transform: [{ scale: 0.99 }],
              },
            ]}
            onPress={handleCallEmergency}
            accessibilityRole="button"
            accessibilityLabel="Call Emergency Help"
          >
            <View
              style={{
                alignItems: 'center',
                backgroundColor: '#DC2626',
                borderRadius: 20,
                height: 40,
                justifyContent: 'center',
                marginRight: 14,
                width: 40,
              }}
            >
              <Image
                source={icons.phone}
                style={{
                  height: 18,
                  resizeMode: 'contain',
                  tintColor: '#FFFFFF',
                  width: 18,
                }}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: '#DC2626',
                  fontFamily: fontSans,
                  fontSize: 15,
                  fontWeight: '800',
                }}
              >
                Call Emergency Help
              </Text>
              <Text
                style={{
                  color: '#EF4444',
                  fontFamily: fontSans,
                  fontSize: 12,
                  marginTop: 2,
                }}
              >
                Get immediate assistance
              </Text>
            </View>

            <Text
              style={{
                color: '#DC2626',
                fontSize: 18,
                fontWeight: '800',
              }}
            >
              ›
            </Text>
          </Pressable>
        ) : null}

        {/* --- SUB-STEP 1: REASON SELECTION --- */}
        {currentSubStep === 'select_reason' && hasSubReasons ? (
          <View style={{ marginTop: 6 }}>
            {isSafety ? (
              <Text
                style={{
                  color: '#17191C',
                  fontFamily: fontSans,
                  fontSize: 14,
                  fontWeight: '700',
                  marginBottom: 10,
                }}
              >
                What happened?
              </Text>
            ) : null}

            {issueData.subReasons.map(reason => {
              const isSelected = selectedSubReason === reason.id;
              return (
                <Pressable
                  key={reason.id}
                  style={({ pressed }) => [
                    {
                      alignItems: 'center',
                      backgroundColor: isSelected ? '#FFFBEB' : '#FFFFFF',
                      borderColor: isSelected ? '#F59E0B' : '#ECE7DB',
                      borderRadius: 14,
                      borderWidth: isSelected ? 1.5 : 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                      paddingHorizontal: 16,
                      paddingVertical: 14,
                    },
                    pressed && {
                      backgroundColor: '#F7F5EF',
                    },
                  ]}
                  onPress={() => setSelectedSubReason(reason.id)}
                >
                  <Text
                    style={{
                      color: isSelected ? '#17191C' : '#374151',
                      fontFamily: fontSans,
                      fontSize: 14,
                      fontWeight: isSelected ? '700' : '500',
                    }}
                  >
                    {reason.label}
                  </Text>

                  {/* Radio Indicator */}
                  <View
                    style={{
                      alignItems: 'center',
                      borderColor: isSelected ? '#F59E0B' : '#D1D5DB',
                      borderRadius: 10,
                      borderWidth: 2,
                      height: 20,
                      justifyContent: 'center',
                      width: 20,
                    }}
                  >
                    {isSelected ? (
                      <View
                        style={{
                          backgroundColor: '#F59E0B',
                          borderRadius: 5,
                          height: 10,
                          width: 10,
                        }}
                      />
                    ) : null}
                  </View>
                </Pressable>
              );
            })}

            {/* Continue Button */}
            <Pressable
              style={({ pressed }) => [
                {
                  alignItems: 'center',
                  backgroundColor: colors.yellow500 || '#FFC928',
                  borderRadius: 14,
                  height: 48,
                  justifyContent: 'center',
                  marginTop: 12,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 3,
                  elevation: 2,
                },
                pressed && {
                  opacity: 0.9,
                },
                !selectedSubReason && {
                  opacity: 0.6,
                },
              ]}
              disabled={!selectedSubReason}
              onPress={handleContinueToDetails}
            >
              <Text
                style={{
                  color: '#111315',
                  fontFamily: fontSans,
                  fontSize: 15.5,
                  fontWeight: '800',
                }}
              >
                Continue
              </Text>
            </Pressable>
          </View>
        ) : null}

        {/* --- SUB-STEP 2: PROVIDE MORE DETAILS & PHOTOS --- */}
        {currentSubStep === 'provide_details' || !hasSubReasons ? (
          <View style={{ marginTop: 6 }}>
            {/* Description Label */}
            <Text
              style={{
                color: '#17191C',
                fontFamily: fontSans,
                fontSize: 14,
                fontWeight: '700',
                marginBottom: 6,
              }}
            >
              Describe the issue{' '}
              <Text style={{ color: '#687078', fontWeight: '400', fontSize: 13 }}>
                {issueData?.id === 'something_else' ? '(Required)' : '(optional)'}
              </Text>
            </Text>

            {/* Multiline Text Area */}
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E5E7EB',
                borderRadius: 14,
                borderWidth: 1,
                marginBottom: 16,
                minHeight: 110,
                padding: 12,
              }}
            >
              <TextInput
                style={{
                  color: '#17191C',
                  fontFamily: fontSans,
                  fontSize: 14,
                  minHeight: 80,
                  textAlignVertical: 'top',
                }}
                multiline={true}
                numberOfLines={4}
                placeholder="Tell us what happened..."
                placeholderTextColor="#9CA3AF"
                value={description}
                onChangeText={setDescription}
              />
            </View>

            {/* Photos Section */}
            <Text
              style={{
                color: '#17191C',
                fontFamily: fontSans,
                fontSize: 14,
                fontWeight: '700',
                marginBottom: 8,
              }}
            >
              Add photos{' '}
              <Text style={{ color: '#687078', fontWeight: '400', fontSize: 13 }}>
                (optional)
              </Text>
            </Text>

            {/* Photo Slots */}
            <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
              {/* Existing Uploaded Photos */}
              {photos.map(photo => (
                <View
                  key={photo.id}
                  style={{
                    borderRadius: 14,
                    height: 80,
                    overflow: 'hidden',
                    position: 'relative',
                    width: 80,
                  }}
                >
                  <Image
                    source={{ uri: photo.uri }}
                    style={{ height: '100%', width: '100%', resizeMode: 'cover' }}
                  />
                  <Pressable
                    style={{
                      alignItems: 'center',
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      borderRadius: 12,
                      height: 22,
                      justifyContent: 'center',
                      position: 'absolute',
                      right: 4,
                      top: 4,
                      width: 22,
                    }}
                    onPress={() => handleRemovePhoto(photo.id)}
                  >
                    <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '800' }}>
                      ✕
                    </Text>
                  </Pressable>
                </View>
              ))}

              {/* Add Photo Button Slot (Up to 3 total slots) */}
              {photos.length === 0 ? (
                <>
                  <Pressable
                    style={{
                      alignItems: 'center',
                      backgroundColor: '#F9FAFB',
                      borderColor: '#D1D5DB',
                      borderRadius: 14,
                      borderStyle: 'dashed',
                      borderWidth: 1.5,
                      flex: 1,
                      height: 80,
                      justifyContent: 'center',
                    }}
                    onPress={handleAddPhoto}
                  >
                    <Image
                      source={icons.statCar || icons.rides}
                      style={{
                        height: 20,
                        resizeMode: 'contain',
                        tintColor: '#4B5563',
                        width: 20,
                      }}
                    />
                    <Text
                      style={{
                        color: '#374151',
                        fontFamily: fontSans,
                        fontSize: 11.5,
                        fontWeight: '700',
                        marginTop: 4,
                      }}
                    >
                      Add photo
                    </Text>
                  </Pressable>

                  <Pressable
                    style={{
                      alignItems: 'center',
                      backgroundColor: '#F9FAFB',
                      borderColor: '#E5E7EB',
                      borderRadius: 14,
                      borderStyle: 'dashed',
                      borderWidth: 1.5,
                      flex: 1,
                      height: 80,
                      justifyContent: 'center',
                    }}
                    onPress={handleAddPhoto}
                  >
                    <Text style={{ color: '#9CA3AF', fontSize: 22, fontWeight: '400' }}>
                      +
                    </Text>
                  </Pressable>

                  <Pressable
                    style={{
                      alignItems: 'center',
                      backgroundColor: '#F9FAFB',
                      borderColor: '#E5E7EB',
                      borderRadius: 14,
                      borderStyle: 'dashed',
                      borderWidth: 1.5,
                      flex: 1,
                      height: 80,
                      justifyContent: 'center',
                    }}
                    onPress={handleAddPhoto}
                  >
                    <Text style={{ color: '#9CA3AF', fontSize: 22, fontWeight: '400' }}>
                      +
                    </Text>
                  </Pressable>
                </>
              ) : photos.length < 3 ? (
                <Pressable
                  style={{
                    alignItems: 'center',
                    backgroundColor: '#F9FAFB',
                    borderColor: '#D1D5DB',
                    borderRadius: 14,
                    borderStyle: 'dashed',
                    borderWidth: 1.5,
                    height: 80,
                    justifyContent: 'center',
                    width: 80,
                  }}
                  onPress={handleAddPhoto}
                >
                  <Text style={{ color: '#6B7280', fontSize: 22, fontWeight: '600' }}>
                    +
                  </Text>
                </Pressable>
              ) : null}
            </View>

            {/* Error message card */}
            {errorMessage ? (
              <View
                style={{
                  backgroundColor: '#FEF2F2',
                  borderColor: '#FCA5A5',
                  borderRadius: 12,
                  borderWidth: 1,
                  marginBottom: 12,
                  padding: 12,
                }}
              >
                <Text
                  style={{
                    color: '#B91C1C',
                    fontFamily: fontSans,
                    fontSize: 13,
                    fontWeight: '700',
                  }}
                >
                  Unable to submit report
                </Text>
                <Text
                  style={{
                    color: '#DC2626',
                    fontFamily: fontSans,
                    fontSize: 12,
                    marginTop: 2,
                  }}
                >
                  {errorMessage}
                </Text>
                <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
                  <Pressable onPress={handleSubmitReport}>
                    <Text
                      style={{
                        color: '#B91C1C',
                        fontWeight: '800',
                        fontSize: 12,
                        textDecorationLine: 'underline',
                      }}
                    >
                      Try Again
                    </Text>
                  </Pressable>
                  <Pressable onPress={handleCallEmergency}>
                    <Text
                      style={{
                        color: '#6B7280',
                        fontWeight: '700',
                        fontSize: 12,
                        textDecorationLine: 'underline',
                      }}
                    >
                      Contact Support
                    </Text>
                  </Pressable>
                </View>
              </View>
            ) : null}

            {/* Submit Report Primary Button */}
            <Pressable
              style={({ pressed }) => [
                {
                  alignItems: 'center',
                  backgroundColor: colors.yellow500 || '#FFC928',
                  borderRadius: 14,
                  height: 50,
                  justifyContent: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 3,
                  elevation: 2,
                },
                pressed && {
                  opacity: 0.92,
                },
                (isSubmitting ||
                  (issueData?.id === 'something_else' && !description.trim())) && {
                  opacity: 0.6,
                },
              ]}
              disabled={
                isSubmitting ||
                (issueData?.id === 'something_else' && !description.trim())
              }
              onPress={handleSubmitReport}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#111315" size="small" />
              ) : (
                <Text
                  style={{
                    color: '#111315',
                    fontFamily: fontSans,
                    fontSize: 15.5,
                    fontWeight: '800',
                  }}
                >
                  Submit report
                </Text>
              )}
            </Pressable>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

export default ReportIssueDetails;
