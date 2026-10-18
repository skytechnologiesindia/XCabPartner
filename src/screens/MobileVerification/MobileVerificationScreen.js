import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  MobileNumberForm,
  OtpForm,
  VerificationActions,
  VerificationHeader,
  verificationConfig,
} from '../../component/mobileVerification';
import { useRegistration } from '../../context/RegistrationContext';
import { post } from '../../utils/requestBuilder';
import { storage, STORAGE_KEYS } from '../../utils/storage';

function MobileVerificationScreen({
  onSuccess,
}) {
  const insets = useSafeAreaInsets();
  const { registrationData, updateRegistrationData } = useRegistration();

  const [mode, setMode] = useState('phone'); // 'phone' | 'otp'
  const [phoneNumber, setPhoneNumber] = useState(registrationData.phone || '');
  const [otpValue, setOtpValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendSeconds, setResendSeconds] = useState("30");

  // Clean & formatted phone derived in one place
  const cleanedPhone = phoneNumber.replace(/[^0-9]/g, '');
  const formattedPhone = `+91${cleanedPhone}`;

  // Handle "Need Help?"
  const handleNeedHelp = () => {
    Alert.alert(
      'TREEPS Support (24/7)',
      'Need assistance with your phone verification or account login?\n\nCall our 24/7 Driver Helpline at 1800-247-TREEPS (9222).',
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  // Terms & Conditions (no dedicated terms route exists yet)
  const handleOpenTerms = () => {
    Alert.alert(
      'Terms & Conditions',
      'Terms of Service, Privacy Policy and the Driver Partner Agreement apply to all TREEPS driver partners.',
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  // State 1 Action: Send OTP
  const handleSendOtp = async () => {
    if (cleanedPhone.length !== verificationConfig.phoneLength) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    try {
      setIsLoading(true);
      setErrorMessage('');

      // API Call: Driver Send OTP
      const response = await post('driver/auth/send-otp', {
        phoneNumber: formattedPhone,
      });
      console.log('Driver Send OTP Response:', response);

      if (response && response.success === false) {
        const errorText = response.error?.message || response.message || 'Failed to send OTP. Please try again.';
        setErrorMessage(errorText);
        return;
      }

      const serverResendSeconds =
        response?.data?.resendAfterSeconds ?? response?.data?.resendSeconds;
      if (typeof serverResendSeconds === 'number' && serverResendSeconds > 0) {
        setResendSeconds(serverResendSeconds);
      }

      console.log('Server Resend Seconds:', serverResendSeconds);

      updateRegistrationData('phone', phoneNumber);
      // Switch to OTP entry mode
      setMode('otp');
      setOtpValue('');
    } catch (error) {
      console.error('Send OTP Error:', error);
      const apiError = error?.response?.data?.error;
      const serverMsg =
        apiError?.message ||
        error?.response?.data?.message ||
        (error?.message === 'Network Error'
          ? 'Network Error: Cannot connect to server. Ensure your backend server is running.'
          : error?.message) ||
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
      setErrorMessage('Please enter the 6-digit OTP code.');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage('');

      // API Call: Driver Verify OTP
      const response = await post('driver/auth/verify-otp', {
        phoneNumber: formattedPhone,
        otp: String(cleanedOtp),
        device: {
          deviceId: `driver-${Platform.OS}-device`,
          platform: Platform.OS === 'ios' ? 'IOS' : 'ANDROID',
          appVersion: '1.4.2',
        },
      });
      console.log('Driver Verify OTP Response:', response);

      if (response && response.success === false) {
        const errorText = response.error?.message || response.message || 'Invalid OTP. Please try again.';
        setErrorMessage(errorText);
        return;
      }

      const driverData = response?.data?.driver;
      const tokens = response?.data?.tokens;

      updateRegistrationData('phone', phoneNumber);
      updateRegistrationData('otpVerified', true);
      if (driverData) {
        updateRegistrationData('driverInfo', driverData);
      }
      if (tokens) {
        updateRegistrationData('tokens', tokens);
      }

      // Save to local storage for persistent login
      const authToken = tokens?.accessToken || response?.data?.token || tokens?.token;
      if (authToken) {
        await storage.setItem(STORAGE_KEYS.TOKEN, authToken);
      }
      await storage.setItem(STORAGE_KEYS.PHONE, phoneNumber);
      await storage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');
      if (driverData) {
        await storage.setItem(STORAGE_KEYS.DRIVER_DATA, driverData);
      }
      // --- VERIFY STORAGE DEBUG LOG ---
      const savedToken = await storage.getItem(STORAGE_KEYS.TOKEN);
      const savedPhone = await storage.getItem(STORAGE_KEYS.PHONE);
      const savedStatus = await storage.getItem(STORAGE_KEYS.IS_LOGGED_IN);
      const savedDriver = await storage.getItem(STORAGE_KEYS.DRIVER_DATA, true);
      console.log('✅ ================= STORAGE VERIFICATION =================');
      console.log('📦 Saved Token:', savedToken);
      console.log('📦 Saved Phone:', savedPhone);
      console.log('📦 Is Logged In:', savedStatus);
      console.log('📦 Driver Data:', savedDriver);
      console.log('==========================================================');

      if (onSuccess) {
        onSuccess(phoneNumber, response?.data);
      }
    } catch (error) {
      console.error('Verify OTP Error:', error);
      const apiError = error?.response?.data?.error;
      const serverMsg =
        apiError?.message ||
        error?.response?.data?.message ||
        (error?.message === 'Network Error'
          ? 'Network Error: Cannot connect to server. Please check your connection.'
          : error?.message) ||
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
    try {
      setErrorMessage('');
      const response = await post('driver/auth/send-otp', {
        phoneNumber: formattedPhone,
      });
      console.log('Driver Resend OTP Response:', response);

      if (response && response.success === false) {
        setErrorMessage(response.error?.message || response.message || 'Failed to resend code.');
        return;
      }

      const serverResendSeconds =
        response?.data?.resendAfterSeconds ?? response?.data?.resendSeconds;
      if (typeof serverResendSeconds === 'number' && serverResendSeconds > 0) {
        setResendSeconds(serverResendSeconds);
      }

      Alert.alert(
        'Code Sent',
        `A new 6-digit verification code has been sent to +91 ${phoneNumber}.`,
        [{ text: 'OK' }],
      );
    } catch (error) {
      console.error('Resend OTP Error:', error);
      const apiError = error?.response?.data?.error;
      const serverMsg =
        apiError?.message ||
        error?.response?.data?.message ||
        'Failed to resend code. Please try again.';
      setErrorMessage(serverMsg);
    }
  };

  const isPhoneValid = phoneNumber.replace(/[^0-9]/g, '').length === verificationConfig.phoneLength;
  const isOtpValid = otpValue.replace(/[^0-9]/g, '').length === verificationConfig.otpLength;

  // Android draws below the (non-translucent) status bar, so only iOS needs the inset.
  const safeTopInset = Platform.OS === 'ios' ? insets.top : 0;

  return (
    <KeyboardAvoidingView
      style={{
        backgroundColor: '#FBFAF6',
        flex: 1,
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FBFAF6"
        translucent={false}
      />

      {/* 1. Grey navigation bar: back + Need Help? */}
      <VerificationHeader
        onNeedHelp={handleNeedHelp}
        topInset={safeTopInset}
      />

      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: Math.max(insets.bottom, 16) + 8,
        }}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* 2. Brand */}
        <View
          style={{
            alignItems: 'center',
            marginBottom: 28,
            marginTop: 8,
          }}>
          {/* <Text
            style={{
              color: '#17191C',
              fontSize: 34,
              fontWeight: '900',
              letterSpacing: -1.2,
            }}>
            TREEPS
          </Text>
          <Text
            style={{
              color: '#687078',
              fontSize: 10,
              fontWeight: '700',
              letterSpacing: 6,
              marginTop: 2,
            }}>
            DRIVER APP
          </Text> */}
        </View>

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
            resendSeconds={resendSeconds}
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

        {/* 5. Terms footer */}
        {mode === 'phone' ? (
          <View
            style={{
              alignItems: 'center',
              marginTop: 'auto',
              paddingHorizontal: 20,
              paddingTop: 32,
            }}>
            <Text
              style={{
                color: '#687078',
                fontSize: 13,
                textAlign: 'center',
              }}>
              By continuing, you agree to our
            </Text>
            <Pressable
              onPress={handleOpenTerms}
              hitSlop={{ top: 8, bottom: 8, left: 12, right: 12 }}
              accessibilityRole="link"
              accessibilityLabel="Terms and Conditions">
              <Text
                style={{
                  color: '#17191C',
                  fontSize: 14,
                  fontWeight: '500',
                  marginTop: 4,
                  textDecorationLine: 'underline',
                }}>
                Terms & Conditions
              </Text>
            </Pressable>
          </View>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default MobileVerificationScreen;
