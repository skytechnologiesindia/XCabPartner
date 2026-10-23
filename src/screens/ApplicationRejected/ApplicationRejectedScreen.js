import React, { useState } from 'react';
import {
  Platform,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { VerificationHeader } from '../../component/mobileVerification';
import { RegistrationButton } from '../../component/onboarding';
import { useRegistration } from '../../context/RegistrationContext';
import { SUPPORT_PHONE } from '../../api';
import { resetToLogin } from '../../navigation/navigationRef';

/**
 * ApplicationRejectedScreen
 *
 * [API] New screen for nextStep REJECTED (Screen 8 of the guide): "Your
 * application was not approved" and a support contact. The driver cannot
 * resubmit, so the only action is Logout.
 */
function ApplicationRejectedScreen() {
  const insets = useSafeAreaInsets();
  const { logoutDriver } = useRegistration();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    // [API] POST /driver/auth/logout, then delete the token and the draft.
    await logoutDriver();
    resetToLogin();
  };

  return (
    <View style={{ backgroundColor: '#FBFAF6', flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEF0F2" translucent={false} />
      <VerificationHeader
        title="Application status"
        centerTitle
        backgroundColor="#EEF0F2"
        topInset={Platform.OS === 'ios' ? insets.top : 0}
      />

      <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 32 }}>
        <Text style={{ fontSize: 56, textAlign: 'center' }}>📄</Text>
        <Text
          style={{
            color: '#12194B',
            fontSize: 26,
            fontWeight: '800',
            lineHeight: 34,
            marginTop: 24,
            textAlign: 'center',
          }}>
          Your application was not approved
        </Text>
        <Text
          style={{
            color: '#687078',
            fontSize: 16,
            lineHeight: 24,
            marginTop: 14,
            textAlign: 'center',
          }}>
          {`If you have questions, please contact TREEPS support at ${SUPPORT_PHONE}.`}
        </Text>
      </View>

      <RegistrationButton
        label="Logout"
        showArrow={false}
        onPress={handleLogout}
        isLoading={isLoggingOut}
        style={{ paddingBottom: Math.max(insets.bottom, 16) + 8 }}
      />
    </View>
  );
}

export default ApplicationRejectedScreen;
