import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  AppState,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { VerificationHeader } from '../../component/mobileVerification';
import { documentItems, statusColors } from '../../component/documents';
import { useRegistration } from '../../context/RegistrationContext';
import { driverService, ERROR_CODES, NEXT_STEP } from '../../api';
import { showAccountBannedAlert } from '../../utils/apiAlerts';

// [API] App-owned labels for the step keys in /me documents.
const STEP_TITLES = {
  VEHICLE: 'Vehicle type',
  ...Object.fromEntries(
    documentItems.filter(item => item.stepKey).map(item => [item.stepKey, item.title]),
  ),
};

const STATUS_TEXT = {
  PENDING: { label: 'Pending', color: statusColors.orange },
  APPROVED: { label: 'Approved', color: statusColors.green },
  REJECTED: { label: 'Rejected', color: statusColors.red },
};

/**
 * DocumentVerificationScreen: "Under review" (Screen 6 of the guide).
 *
 * [API] Was a static page with "Back to Documents". After the submit the
 * documents can no longer be edited (a second submit gets 409), so now it:
 *   - shows each submitted step with Pending / Approved / Rejected (from /me)
 *   - calls GET /driver/me on pull-to-refresh, on "Refresh status" and when
 *     the app comes back to the foreground (there is no push notification yet)
 *   - calls onNextStep(nextStep) as soon as the server moves the driver on
 */
function DocumentVerificationScreen({
  onNextStep,
  onGoHome,
}) {
  const insets = useSafeAreaInsets();
  const { driverSession, setDriverSession } = useRegistration();
  const [refreshing, setRefreshing] = useState(false);
  const documents = (driverSession && driverSession.documents) || [];
  // Kept in a ref so a new onNextStep function from the parent does not
  // re-create refresh() and trigger the effect below again.
  const onNextStepRef = useRef(onNextStep);
  onNextStepRef.current = onNextStep;

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const me = await driverService.getMe();
      setDriverSession(me);
      // [API] "When nextStep changes: open that screen."
      if (me.nextStep !== NEXT_STEP.WAIT_FOR_REVIEW && onNextStepRef.current) {
        onNextStepRef.current(me.nextStep);
      }
    } catch (error) {
      if (error.code === ERROR_CODES.ACCOUNT_BANNED) {
        showAccountBannedAlert();
      } else if (error.code !== ERROR_CODES.UNAUTHORIZED) {
        // UNAUTHORIZED is handled by the api client (back to phone screen).
        Alert.alert(error.isNetworkError ? 'No internet' : 'Could not refresh', error.message);
      }
    } finally {
      setRefreshing(false);
    }
  }, [setDriverSession]);

  // [API] Refresh when the screen opens and whenever the app returns to the
  // foreground, so an admin decision shows up without a restart.
  useEffect(() => {
    refresh();
    const subscription = AppState.addEventListener('change', state => {
      if (state === 'active') {
        refresh();
      }
    });
    return () => subscription.remove();
  }, [refresh]);

  const handleNeedHelp = () => {
    Alert.alert(
      'TREEPS Support (24/7)',
      'Need help with document verification?\n\nContact our 24/7 Driver Support at 1800-247-TREEPS (9222).',
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  const safeTopInset = Platform.OS === 'ios' ? insets.top : 0;

  return (
    <View style={{ backgroundColor: '#FBFAF6', flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEF0F2" translucent={false} />

      {/* [API] No Back arrow: this is the driver's current step, not a page
          on top of the Documents hub. */}
      <VerificationHeader
        title="Document Verification"
        centerTitle
        onNeedHelp={handleNeedHelp}
        backgroundColor="#EEF0F2"
        topInset={safeTopInset}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          alignItems: 'center',
          flexGrow: 1,
          justifyContent: 'center',
          paddingHorizontal: 32,
          paddingVertical: 24,
        }}
        // [API] pull-to-refresh calls GET /driver/me
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
      >
        {/* Illustration: document with magnifying glass */}
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#FDF1DE',
            borderRadius: 95,
            height: 190,
            justifyContent: 'center',
            width: 190,
          }}>
          <View
            style={{
              backgroundColor: '#E4EEFD',
              borderRadius: 14,
              height: 120,
              paddingHorizontal: 16,
              paddingTop: 20,
              width: 96,
            }}>
            {[44, 62, 52, 40].map((width, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: '#A9C3F2',
                  borderRadius: 3,
                  height: 6,
                  marginBottom: 10,
                  width,
                }}
              />
            ))}
          </View>
          <View
            style={{
              borderColor: '#1F2F86',
              borderRadius: 24,
              borderWidth: 7,
              backgroundColor: '#BFD4FB',
              bottom: 38,
              height: 48,
              position: 'absolute',
              right: 34,
              width: 48,
            }}
          />
          <View
            style={{
              backgroundColor: '#12194B',
              borderRadius: 4,
              bottom: 30,
              height: 8,
              position: 'absolute',
              right: 20,
              transform: [{ rotate: '45deg' }],
              width: 26,
            }}
          />
        </View>

        <Text
          style={{
            color: '#12194B',
            fontSize: 28,
            fontWeight: '800',
            lineHeight: 36,
            marginTop: 40,
            textAlign: 'center',
          }}>
          Your Document{'\n'}is Under Verification
        </Text>
        <Text
          style={{
            color: '#8A929B',
            fontSize: 18,
            lineHeight: 26,
            marginTop: 14,
            textAlign: 'center',
          }}>
          We will verify your document{'\n'}as soon as possible.
        </Text>

        {/* [API] Checklist built from /me documents, in screen order. */}
        {documents.length > 0 ? (
          <View style={{ alignSelf: 'stretch', marginTop: 28 }}>
            {documents.map(doc => {
              const status = STATUS_TEXT[doc.status] || STATUS_TEXT.PENDING;
              return (
                <View
                  key={doc.key}
                  style={{
                    borderBottomColor: '#EEECE5',
                    borderBottomWidth: 1,
                    paddingVertical: 10,
                  }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#17191C', fontSize: 15, fontWeight: '600' }}>
                      {STEP_TITLES[doc.key] || doc.key}
                    </Text>
                    <Text style={{ color: status.color, fontSize: 14, fontWeight: '600' }}>
                      {status.label}
                    </Text>
                  </View>
                  {doc.reviewNote ? (
                    <Text style={{ color: '#687078', fontSize: 13, marginTop: 2 }}>
                      {doc.reviewNote}
                    </Text>
                  ) : null}
                </View>
              );
            })}
          </View>
        ) : null}
      </ScrollView>

      <View
        style={{
          paddingBottom: Math.max(insets.bottom, 16) + 8,
          paddingHorizontal: 20,
        }}>
        <Pressable
          style={({ pressed }) => [
            {
              alignItems: 'center',
              backgroundColor: '#FFC928',
              borderRadius: 12,
              flexDirection: 'row',
              height: 58,
              justifyContent: 'center',
            },
            pressed && { backgroundColor: '#E5B422' },
          ]}
          // [API] Was "Back to Documents"; now asks the server for the latest status.
          onPress={refresh}
          disabled={refreshing}
          accessibilityRole="button"
          accessibilityLabel="Refresh status"
        >
          {refreshing ? (
            <ActivityIndicator color="#17191C" />
          ) : (
            <Text style={{ color: '#17191C', fontSize: 18, fontWeight: '800' }}>
              Refresh status
            </Text>
          )}
        </Pressable>

        {/* TEMPORARY: remove this button (and `onGoHome`) once the flow is final. */}
        {onGoHome ? (
          <Pressable
            style={({ pressed }) => [
              {
                alignItems: 'center',
                borderColor: '#17191C',
                borderRadius: 12,
                borderWidth: 1,
                height: 52,
                justifyContent: 'center',
                marginTop: 12,
              },
              pressed && { opacity: 0.6 },
            ]}
            onPress={onGoHome}
            accessibilityRole="button"
            accessibilityLabel="Go to Home"
          >
            <Text style={{ color: '#17191C', fontSize: 16, fontWeight: '700' }}>
              Go to Home (temporary)
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

export default DocumentVerificationScreen;
