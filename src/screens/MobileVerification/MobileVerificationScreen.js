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
// [API] Screens now call services instead of raw post('driver/auth/...').
// The services build the request, save the token and throw an ApiError.
import { authService, driverService, ERROR_CODES } from '../../api';
import { showAccountBannedAlert } from '../../utils/apiAlerts';

function MobileVerificationScreen({
  onSuccess,
}) {
  const insets = useSafeAreaInsets();
  const { registrationData, updateRegistrationData, setDriverSession } = useRegistration();

  const [mode, setMode] = useState('phone'); // 'phone' | 'otp'
  const [phoneNumber, setPhoneNumber] = useState(registrationData.phone || '');
  const [otpValue, setOtpValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendSeconds, setResendSeconds] = useState("30");

  // Clean & formatted phone derived in one place
  const cleanedPhone = phoneNumber.replace(/[^0-9]/g, '');
  // [API] The server does not clean the number, so it must arrive exactly as
  // "+91XXXXXXXXXX" (spaces removed, +91 added).
  const formattedPhone = authService.toE164(cleanedPhone);

  // [API] Shared error -> UI handling. Decides from `error.code`, never from
  // the message text; `error.message` is written for the driver and shown as is.
  const handleAuthError = error => {
    switch (error.code) {
      case ERROR_CODES.INVALID_INPUT:
        setErrorMessage(
          mode === 'phone'
            ? 'Enter a valid mobile number.'
            : 'Something is wrong with this request. Please try again.',
        );
        break;
      case ERROR_CODES.OTP_INVALID:
        setErrorMessage('That code is not right. Please try again.');
        break;
      case ERROR_CODES.OTP_EXPIRED:
      case ERROR_CODES.OTP_ATTEMPTS_EXCEEDED:
        // The current code can no longer be used: the driver must ask for a
        // new one with "Resend code".
        setOtpValue('');
        setErrorMessage(
          error.code === ERROR_CODES.OTP_EXPIRED
            ? 'Code expired. Please send a new code.'
            : 'Too many wrong tries. Please send a new code.',
        );
        break;
      case ERROR_CODES.ACCOUNT_BANNED:
        showAccountBannedAlert();
        break;
      case ERROR_CODES.CONFLICT:
        setErrorMessage('Please request a new code and try again.');
        break;
      default:
        // RATE_LIMITED, OTP_PROVIDER_ERROR, NETWORK_ERROR, INTERNAL_ERROR:
        // show the server's message; the driver retries with the button.
        setErrorMessage(error.message);
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
    // [API] Guide rule: 10 digits and the first one 6, 7, 8 or 9.
    if (!authService.isValidIndianMobile(cleanedPhone)) {
      setErrorMessage('Enter a valid mobile number.');
      return;
    }
    try {
      setIsLoading(true);
      setErrorMessage('');

      // [API] POST /driver/auth/send-otp -> { expiresInSeconds, resendAfterSeconds }
      const data = await authService.sendOtp(formattedPhone);

      // [API] Start the "Resend code" countdown from the server's value.
      if (typeof data?.resendAfterSeconds === 'number' && data.resendAfterSeconds > 0) {
        setResendSeconds(data.resendAfterSeconds);
      }

      updateRegistrationData('phone', phoneNumber);
      // Switch to OTP entry mode
      setMode('otp');
      setOtpValue('');
    } catch (error) {
      handleAuthError(error);
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

      // [API] POST /driver/auth/verify-otp. The service sends the real device
      // block (install id, platform, app version) and saves the access token.
      // [API] The token is no longer printed to the console: it is a login
      // secret and must not end up in logs.
      const data = await authService.verifyOtp(formattedPhone, cleanedOtp);

      updateRegistrationData('phone', phoneNumber);
      updateRegistrationData('otpVerified', true);
      updateRegistrationData('driverInfo', data.driver);

      // [API] Next step after login: call GET /driver/me and open the screen
      // named by `nextStep`. Do NOT decide from `isNewDriver`: a returning
      // driver can be at any step.
      const me = await driverService.getMe();
      setDriverSession(me);

      if (onSuccess) {
        onSuccess(me);
      }
    } catch (error) {
      handleAuthError(error);
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
      // [API] "Resend code" is the same send-otp call (limit: one per 30 s).
      const data = await authService.sendOtp(formattedPhone);

      if (typeof data?.resendAfterSeconds === 'number' && data.resendAfterSeconds > 0) {
        setResendSeconds(data.resendAfterSeconds);
      }

      Alert.alert(
        'Code Sent',
        `A new 6-digit verification code has been sent to +91 ${phoneNumber}.`,
        [{ text: 'OK' }],
      );
    } catch (error) {
      handleAuthError(error);
    }
  };

  // [API] Same rule as handleSendOtp, so Continue is only enabled for a number
  // the server will accept.
  const isPhoneValid = authService.isValidIndianMobile(phoneNumber.replace(/[^0-9]/g, ''));
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
