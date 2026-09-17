import React, { useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  MobileNumberForm,
  OtpForm,
  VerificationActions,
  VerificationHeader,
  VerificationHelper,
  VerificationProgress,
  verificationConfig,
} from '../../component/mobileVerification';

/**
 * MobileVerificationScreen
 * Unified single-screen authentication supporting:
 * - State 1: Enter Mobile Number (Phone Mode)
 * - State 2: Enter OTP (OTP Mode)
 *
 * Smoothly toggles modes on the same screen without pushing a separate route.
 */
function MobileVerificationScreen({
  navigation,
  onBack,
  onSuccess,
}) {
  const insets = useSafeAreaInsets();

  const [mode, setMode] = useState('phone'); // 'phone' | 'otp'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Back Navigation
  const handleBack = () => {
    if (mode === 'otp') {
      // Return to Phone mode within the SAME screen
      setMode('phone');
      setOtpValue('');
      setErrorMessage('');
    } else if (onBack) {
      onBack();
    } else if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  // Handle "Need Help?"
  const handleNeedHelp = () => {
    Alert.alert(
      'XCAB Partner Support',
      'Need assistance with your phone verification or account login?\n\nCall our 24/7 Driver Helpline at 1800-247-XCAB (9222).',
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  // State 1 Action: Send OTP
  const handleSendOtp = () => {
    const cleaned = phoneNumber.replace(/[^0-9]/g, '');
    if (cleaned.length !== verificationConfig.phoneLength) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setErrorMessage('');
    // Switch SAME SCREEN into OTP mode
    setMode('otp');
    setOtpValue('');
  };

  // State 2 Action: Verify OTP & Continue
  const handleVerifyOtp = () => {
    const cleanedOtp = otpValue.replace(/[^0-9]/g, '');
    if (cleanedOtp.length !== verificationConfig.otpLength) {
      setErrorMessage('Please enter the complete 6-digit verification code.');
      return;
    }

    // Mock validation check
    setErrorMessage('');

    if (onSuccess) {
      onSuccess(phoneNumber);
    } else if (navigation && navigation.navigate) {
      navigation.navigate('PersonalDetails');
    }
  };

  // State 2 Action: Change Number
  const handleChangeNumber = () => {
    setMode('phone');
    setOtpValue('');
    setErrorMessage('');
  };

  // State 2 Action: Resend OTP
  const handleResendOtp = () => {
    setErrorMessage('');
    Alert.alert(
      'Code Sent',
      `A new 6-digit verification code has been sent to +91 ${phoneNumber}.`,
      [{ text: 'OK' }],
    );
  };

  const isPhoneValid = phoneNumber.replace(/[^0-9]/g, '').length === verificationConfig.phoneLength;
  const isOtpValid = otpValue.replace(/[^0-9]/g, '').length === verificationConfig.otpLength;

  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight || 28 : 0;
  const safeTopPadding = Math.max(insets.top, statusBarHeight) + 8;

  return (
    <View
      style={{
        backgroundColor: '#F7F5EF',
        flex: 1,
        paddingTop: safeTopPadding,
      }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F7F5EF"
        translucent={true}
      />

      {/* 1. Authentication Header */}
      <VerificationHeader
        onBack={handleBack}
        onNeedHelp={handleNeedHelp}
      />

      {/* 2. Progress Indicator (Step 1 for Phone, Step 2 for OTP) */}
      <VerificationProgress
        step={mode === 'phone' ? 1 : 2}
        totalSteps={3}
      />

      <ScrollView
        style={{
          backgroundColor: '#F7F5EF',
          flex: 1,
        }}
        contentContainerStyle={{
          backgroundColor: '#F7F5EF',
          flexGrow: 1,
          justifyContent: 'space-between',
          paddingTop: 10,
        }}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* 3. Dynamic Form State */}
        {mode === 'phone' ? (
          <MobileNumberForm
            phoneNumber={phoneNumber}
            onChangePhone={num => {
              setPhoneNumber(num);
              if (errorMessage) setErrorMessage('');
            }}
            countryCode={verificationConfig.countryCode}
            countryFlag={verificationConfig.countryFlag}
            errorMessage={errorMessage}
          />
        ) : (
          <OtpForm
            otpValue={otpValue}
            onChangeOtp={val => {
              setOtpValue(val);
              if (errorMessage) setErrorMessage('');
            }}
            phoneNumber={phoneNumber}
            countryCode={verificationConfig.countryCode}
            resendSeconds={verificationConfig.resendSeconds}
            onResendOtp={handleResendOtp}
            errorMessage={errorMessage}
          />
        )}

        {/* 4. Action Buttons */}
        <VerificationActions
          mode={mode}
          isDisabled={mode === 'phone' ? !isPhoneValid : !isOtpValid}
          onPrimaryPress={mode === 'phone' ? handleSendOtp : handleVerifyOtp}
          onChangeNumber={handleChangeNumber}
        />

        {/* 5. Consistent Lower Automotive Visual */}
        <VerificationHelper />
      </ScrollView>
    </View>
  );
}

export default MobileVerificationScreen;
