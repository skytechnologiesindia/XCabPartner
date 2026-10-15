import React from 'react';
import {
  Alert,
  Platform,
  Pressable,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { VerificationHeader } from '../../component/mobileVerification';

/**
 * DocumentVerificationScreen
 * Shown after a document has been submitted. `onBack` (header arrow) and
 * `onBackToDocuments` (bottom button) both return to the Documents hub.
 */
function DocumentVerificationScreen({
  onBack,
  onBackToDocuments,
  onGoHome,
}) {
  const insets = useSafeAreaInsets();

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

      <VerificationHeader
        title="Document Verification"
        centerTitle
        onBack={onBack}
        onNeedHelp={handleNeedHelp}
        backgroundColor="#EEF0F2"
        topInset={safeTopInset}
      />

      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: 32,
        }}>
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
      </View>

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
          onPress={onBackToDocuments}
          accessibilityRole="button"
          accessibilityLabel="Back to Documents"
        >
          <Text style={{ color: '#17191C', fontSize: 18, fontWeight: '800' }}>
            Back to Documents
          </Text>
          <Text style={{ color: '#17191C', fontSize: 20, fontWeight: '800', marginLeft: 10 }}>→</Text>
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
