import React, { useEffect, useRef, useState } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';

/**
 * OtpForm
 * State 2 UI container:
 * - "Enter OTP" title
 * - Masked dynamic phone number
 * - 6 discrete auto-advancing input cells with clipboard paste and backspace navigation
 * - Realtime countdown resend timer
 */
function OtpForm({
  otpValue = '',
  onChangeOtp,
  phoneNumber = '',
  countryCode = '+91',
  resendSeconds = 28,
  onResendOtp,
  errorMessage,
}) {
  const [timer, setTimer] = useState(resendSeconds);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputsRef = useRef([]);

  // Resend Countdown
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const handleResendPress = () => {
    if (timer === 0 && onResendOtp) {
      setTimer(resendSeconds);
      onResendOtp();
    }
  };

  // Convert string to 6-char array
  const digits = Array.from({ length: 6 }).map((_, i) => otpValue[i] || '');

  const handleChangeText = (text, index) => {
    // Check if pasted full OTP
    const cleanText = text.replace(/[^0-9]/g, '');
    if (cleanText.length > 1) {
      const pasted = cleanText.slice(0, 6);
      onChangeOtp(pasted);
      const nextFocus = Math.min(pasted.length, 5);
      inputsRef.current[nextFocus]?.focus();
      return;
    }

    const newDigits = [...digits];
    newDigits[index] = cleanText;
    const newOtp = newDigits.join('');
    onChangeOtp(newOtp);

    // Auto-advance to next cell if digit typed
    if (cleanText && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const formattedPhone = phoneNumber
    ? `${countryCode} ${phoneNumber.replace(/(\d{5})(\d{1,5})/, '$1 $2')}`
    : `${countryCode} 98765 43210`;

  const formattedTimer = `00:${timer < 10 ? `0${timer}` : timer}`;

  return (
    <View
      style={{
        paddingHorizontal: 20,
        width: '100%',
      }}>
      {/* 1. Header Titles */}
      <Text
        style={{
          color: '#17191C',
          fontSize: 27,
          fontWeight: '900',
          letterSpacing: -0.6,
        }}>
        Enter OTP
      </Text>
      <Text
        style={{
          color: '#687078',
          fontSize: 13.5,
          fontWeight: '400',
          lineHeight: 20,
          marginTop: 8,
          marginBottom: 20,
        }}>
        We’ve sent a 6-digit code to{'\n'}
        <Text
          style={{
            color: '#17191C',
            fontWeight: '700',
          }}>
          {formattedPhone}
        </Text>
      </Text>

      {/* 2. 6-Cell Discrete OTP Input Grid */}
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          justifyContent: 'space-between',
          width: '100%',
        }}>
        {digits.map((digit, index) => {
          const isFocused = focusedIndex === index;
          const isError = !!errorMessage;
          return (
            <TextInput
              key={`otp-input-${index}`}
              ref={el => (inputsRef.current[index] = el)}
              style={[
                {
                  backgroundColor: '#FFFFFF',
                  borderColor: '#DDD9CF',
                  borderRadius: 12,
                  borderWidth: 1.5,
                  color: '#17191C',
                  fontSize: 20,
                  fontWeight: '800',
                  height: 54,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.04,
                  shadowRadius: 3,
                  elevation: 1,
                  width: 48,
                },
                isFocused && {
                  borderColor: '#FFC928',
                  borderWidth: 2,
                  backgroundColor: '#FFFEFA',
                },
                isError && {
                  borderColor: '#EF4444',
                },
              ]}
              value={digit}
              onChangeText={text => handleChangeText(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(-1)}
              keyboardType="number-pad"
              maxLength={index === 0 ? 6 : 1}
              textAlign="center"
              autoFocus={index === 0}
              accessibilityRole="text"
              accessibilityLabel={`OTP digit ${index + 1}`}
            />
          );
        })}
      </View>

      {/* Error Message */}
      {errorMessage ? (
        <Text
          style={{
            color: '#EF4444',
            fontSize: 12,
            fontWeight: '500',
            marginTop: 8,
            textAlign: 'center',
          }}>
          {errorMessage}
        </Text>
      ) : null}

      {/* 3. Timer & Resend Option */}
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 18,
          marginBottom: 8,
        }}>
        <Text
          style={{
            color: '#687078',
            fontSize: 12.5,
            fontWeight: '400',
          }}>
          Didn’t receive the code?{' '}
        </Text>
        {timer > 0 ? (
          <Text
            style={{
              color: '#9CA3AF',
              fontSize: 12.5,
              fontWeight: '600',
            }}>
            Resend in {formattedTimer}
          </Text>
        ) : (
          <Pressable
            onPress={handleResendPress}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityRole="button"
            accessibilityLabel="Resend OTP code"
          >
            <Text
              style={{
                color: '#FFC928',
                fontSize: 12.5,
                fontWeight: '800',
                textDecorationLine: 'underline',
              }}>
              Resend OTP
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

export default OtpForm;
