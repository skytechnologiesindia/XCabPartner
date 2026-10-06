import React, { useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { OnboardingHeader, RegistrationProgress } from '../../component/onboarding';
import {
  MobileNumberForm,
  OtpForm,
  VerificationActions,
  VerificationHelper,
  verificationConfig,
} from '../../component/mobileVerification';
import { useRegistration } from '../../context/RegistrationContext';
import { post } from '../../utils/requestBuilder';

/**
 * MobileVerificationScreen (Step 1 of 8)
 * Single unified screen supporting:
 * - State 1: Enter Mobile Number (Phone Mode)
 * - State 2: Enter OTP (OTP Mode)
 *
 * Toggles modes on the same screen without pushing a separate route.
 */
function MobileVerificationScreen({
  onBack,
  onSuccess,
}) {
  const insets = useSafeAreaInsets();
  const { registrationData, updateRegistrationData } = useRegistration();

  const [mode, setMode] = useState('phone'); // 'phone' | 'otp'
  const [phoneNumber, setPhoneNumber] = useState(registrationData.phone || '');
  const [otpValue, setOtpValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle Back Navigation
  const handleBack = () => {
    if (mode === 'otp') {
      // Return to Phone mode within the SAME screen
      setMode('phone');
      setOtpValue('');
      setErrorMessage('');
    } else if (onBack) {
      onBack();
    }
  };

  // Handle "Need Help?"
  const handleNeedHelp = () => {
    Alert.alert(
      'TREEPS Support (24/7)',
      'Need assistance with your phone verification or account login?\n\nCall our 24/7 Driver Helpline at 1800-247-TREEPS (9222).',
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  // State 1 Action: Send OTP
  const handleSendOtp = async () => {
    const cleaned = phoneNumber.replace(/[^0-9]/g, '');
    if (cleaned.length !== verificationConfig.phoneLength) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage('');

      // API Call: Send OTP
      const response = await post('auth/send-otp', { phone: cleaned });
      console.log('Send OTP Response:', response);

      // Check for API-level failure in response payload
      if (response && (response.success === false || response.status === false || response.error)) {
        const errorText = response.message || response.error || 'Failed to send OTP. Please try again.';
        setErrorMessage(errorText);
        return;
      }

      updateRegistrationData('phone', phoneNumber);
      // Switch SAME SCREEN into OTP mode
      setMode('otp');
      setOtpValue('');
    } catch (error) {
      console.error('Send OTP Error:', error);
      const serverMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.data?.response ||
        error?.message ||
        'Failed to send OTP. Please check your network and try again.';
      setErrorMessage(serverMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // State 2 Action: Verify OTP & Continue
  const handleVerifyOtp = async () => {
    const cleanedOtp = otpValue.replace(/[^0-9]/g, '');
    if (cleanedOtp.length !== verificationConfig.otpLength) {
      setErrorMessage('Please enter the complete 6-digit verification code.');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage('');
      const cleanedPhone = phoneNumber.replace(/[^0-9]/g, '');

      // API Call: Verify OTP
      const response = await post('auth/verify-otp', {
        phone: cleanedPhone,
        otp: cleanedOtp,
      });
      console.log('Verify OTP Response:', response);

      // Check for API-level failure in response payload
      if (response && (response.success === false || response.status === false || response.error)) {
        const errorText = response.message || response.error || 'Invalid OTP. Please try again.';
        setErrorMessage(errorText);
        return;
      }

      updateRegistrationData('phone', phoneNumber);
      updateRegistrationData('otpVerified', true);

      if (onSuccess) {
        onSuccess(phoneNumber);
      }
    } catch (error) {
      console.error('Verify OTP Error:', error);
      const serverMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.data?.response ||
        error?.message ||
        'Invalid or expired verification code. Please try again.';
      setErrorMessage(serverMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // State 2 Action: Change Number
  const handleChangeNumber = () => {
    setMode('phone');
    setOtpValue('');
    setErrorMessage('');
  };

  // State 2 Action: Resend OTP
  const handleResendOtp = async () => {
    const cleaned = phoneNumber.replace(/[^0-9]/g, '');
    try {
      setErrorMessage('');
      const response = await post('auth/send-otp', { phone: cleaned });
      if (response && (response.success === false || response.status === false || response.error)) {
        setErrorMessage(response.message || response.error || 'Failed to resend code.');
        return;
      }
      Alert.alert(
        'Code Sent',
        `A new 6-digit verification code has been sent to +91 ${phoneNumber}.`,
        [{ text: 'OK' }],
      );
    } catch (error) {
      console.error('Resend OTP Error:', error);
      const serverMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.data?.response ||
        error?.message ||
        'Failed to resend code. Please try again.';
      setErrorMessage(serverMsg);
    }
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

      {/* 1. Standard Header */}
      <OnboardingHeader
        onBack={handleBack}
        onNeedHelp={handleNeedHelp}
      />

      {/* 2. Step 1 of 8 Single Progress Bar */}
      <RegistrationProgress
        currentStep={1}
        totalSteps={8}
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
          isLoading={isLoading}
          onPrimaryPress={mode === 'phone' ? handleSendOtp : handleVerifyOtp}
          onChangeNumber={handleChangeNumber}
        />

        {/* 5. Lower Visual */}
        <VerificationHelper />
      </ScrollView>
    </View>
  );
}

export default MobileVerificationScreen;
