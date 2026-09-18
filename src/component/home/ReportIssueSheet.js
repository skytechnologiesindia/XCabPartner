import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import ReportIssueConfirmation from './ReportIssueConfirmation';
import ReportIssueDetails from './ReportIssueDetails';
import ReportIssueOption from './ReportIssueOption';
import { reportIssueOptions } from './reportIssueData';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const fontSans = Platform.select({
  ios: 'System',
  android: 'sans-serif',
});

/**
 * ReportIssueSheet
 * Main bottom sheet modal opened from Trip Complete / EndTripSheet screen.
 * Keeps existing trip screen visible behind a dark translucent overlay (rgba(0,0,0,0.45)).
 * Seamlessly manages internal flow:
 *   1. Issue list (ReportIssueOption)
 *   2. Issue details & photo proof (ReportIssueDetails)
 *   3. Confirmation (ReportIssueConfirmation)
 */
function ReportIssueSheet({
  visible = false,
  tripData,
  onClose,
  onSubmitReport,
}) {
  const [currentFlowStep, setCurrentFlowStep] = useState('list'); // 'list' | 'details' | 'confirmed'
  const [selectedIssue, setSelectedIssue] = useState(null);
  const translateY = useRef(new Animated.Value(550)).current;

  const handleClose = () => {
    Animated.timing(translateY, {
      toValue: 600,
      duration: 180,
      useNativeDriver: true,
    }).start(() => {
      setCurrentFlowStep('list');
      setSelectedIssue(null);
      if (onClose) {
        onClose();
      }
    });
  };

  // Drag down gesture responder
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 6,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 90 || gestureState.vy > 0.4) {
          Animated.timing(translateY, {
            toValue: 600,
            duration: 180,
            useNativeDriver: true,
          }).start(() => {
            setCurrentFlowStep('list');
            setSelectedIssue(null);
            if (onClose) {
              onClose();
            }
          });
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            damping: 22,
            stiffness: 240,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  // Slide up animation on open & reset state
  useEffect(() => {
    if (visible) {
      setCurrentFlowStep('list');
      setSelectedIssue(null);
      translateY.setValue(550);
      Animated.spring(translateY, {
        toValue: 0,
        damping: 22,
        stiffness: 220,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, translateY]);

  if (!visible) return null;

  const handleSelectIssue = issueId => {
    const issueObj = reportIssueOptions.find(opt => opt.id === issueId);
    setSelectedIssue(issueObj);
    setCurrentFlowStep('details');
  };

  const handleBackToList = () => {
    setSelectedIssue(null);
    setCurrentFlowStep('list');
  };

  const handleReportSubmitted = payload => {
    if (onSubmitReport) {
      onSubmitReport(payload);
    }
    setCurrentFlowStep('confirmed');
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={handleClose}
    >
      {/* 1. Full Dark Translucent Backdrop (Locks Background Interaction) */}
      <Pressable
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          flex: 1,
          justifyContent: 'flex-end',
        }}
        onPress={handleClose}
      >
        {/* 2. Bottom Sheet Container with Slide Up & Drag Down Animation */}
        <Animated.View
          style={{
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            elevation: 20,
            maxHeight: SCREEN_HEIGHT * 0.9,
            paddingBottom: Platform.OS === 'ios' ? 34 : 20,
            paddingHorizontal: 16,
            paddingTop: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -8 },
            shadowOpacity: 0.18,
            shadowRadius: 14,
            transform: [{ translateY }],
            width: '100%',
          }}
          onStartShouldSetResponder={() => true}
          onTouchEnd={e => e.stopPropagation()}
        >
          {/* Drag Handle Bar */}
          <View
            {...panResponder.panHandlers}
            style={{
              alignItems: 'center',
              paddingBottom: 8,
              paddingTop: 4,
              width: '100%',
            }}
          >
            <View
              style={{
                backgroundColor: '#D1D5DB',
                borderRadius: 2.5,
                height: 4.5,
                width: 42,
              }}
            />
          </View>

          {/* STEP 1: ISSUE LIST */}
          {currentFlowStep === 'list' && (
            <View style={{ maxHeight: SCREEN_HEIGHT * 0.82, width: '100%' }}>
              {/* Header Title & Close Button */}
              <View
                style={{
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 14,
                  marginTop: 4,
                }}
              >
                <View style={{ flex: 1, paddingRight: 8 }}>
                  <Text
                    style={{
                      color: '#111315',
                      fontFamily: fontSans,
                      fontSize: 21,
                      fontWeight: '800',
                      letterSpacing: -0.3,
                    }}
                  >
                    Report an issue
                  </Text>
                  <Text
                    style={{
                      color: '#6B7280',
                      fontFamily: fontSans,
                      fontSize: 13,
                      marginTop: 3,
                    }}
                  >
                    What went wrong with this trip?
                  </Text>
                </View>

                <Pressable
                  onPress={handleClose}
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

              {/* Scrollable Issue Options */}
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ maxHeight: SCREEN_HEIGHT * 0.62 }}
                contentContainerStyle={{ paddingBottom: 10 }}
              >
                {reportIssueOptions.map(option => (
                  <ReportIssueOption
                    key={option.id}
                    id={option.id}
                    title={option.title}
                    subtitle={option.subtitle}
                    icon={option.icon}
                    isSafety={option.isSafety}
                    onPress={handleSelectIssue}
                  />
                ))}
              </ScrollView>

              {/* Bottom Cancel Button */}
              <Pressable
                style={({ pressed }) => [
                  {
                    alignItems: 'center',
                    backgroundColor: '#F7F5EF',
                    borderColor: '#DDD9CF',
                    borderRadius: 14,
                    borderWidth: 1,
                    height: 48,
                    justifyContent: 'center',
                    marginTop: 6,
                  },
                  pressed && {
                    backgroundColor: '#ECE8DD',
                  },
                ]}
                onPress={handleClose}
                accessibilityRole="button"
                accessibilityLabel="Cancel"
              >
                <Text
                  style={{
                    color: '#17191C',
                    fontFamily: fontSans,
                    fontSize: 15,
                    fontWeight: '700',
                  }}
                >
                  Cancel
                </Text>
              </Pressable>
            </View>
          )}

          {/* STEP 2: ISSUE DETAILS & EVIDENCE */}
          {currentFlowStep === 'details' && selectedIssue && (
            <ReportIssueDetails
              issueData={selectedIssue}
              tripData={tripData}
              onBack={handleBackToList}
              onClose={handleClose}
              onSubmit={handleReportSubmitted}
            />
          )}

          {/* STEP 3: SUBMISSION CONFIRMATION */}
          {currentFlowStep === 'confirmed' && (
            <ReportIssueConfirmation
              onClose={handleClose}
              onDone={handleClose}
            />
          )}
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

export default ReportIssueSheet;
