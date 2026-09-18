import React from 'react';
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {
  EmergencyActions,
  GuidelinesSection,
  HelpSection,
  SafetyFeatures,
  SafetyInfoBanner,
  SupportCard,
  emergencyContactsConfig,
} from '../../../component/helpSafety';

/**
 * HelpSafetyScreen
 * Main page container for XCAB Driver Help & Safety with inline styles.
 * Composes emergency police/support actions, assistance categories,
 * safety tools, community guidelines, and support escalation.
 */
function HelpSafetyScreen({
  navigation,
  onBack,
  onOpenEmergencyContact,
}) {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  const handleEmergencyCall = () => {
    Alert.alert(
      'Emergency Call (112)',
      'Are you sure you want to dial emergency police services (112)?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call 112',
          style: 'destructive',
          onPress: () => {
            Linking.openURL(`tel:${emergencyContactsConfig.police.number}`).catch(
              () => {},
            );
          },
        },
      ],
    );
  };

  const handleSupportCall = () => {
    Alert.alert(
      'XCAB Partner Support (24/7)',
      'Connect with dedicated driver operations for real-time assistance.\n\n• Toll-Free: 1800-123-XCAB\n• Email: support@xcab.in',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call Support',
          onPress: () => {
            Linking.openURL(
              `tel:${emergencyContactsConfig.support.number}`,
            ).catch(() => {});
          },
        },
      ],
    );
  };

  const handleItemPress = item => {
    switch (item.id) {
      case 'emergency-contacts':
        if (onOpenEmergencyContact) {
          onOpenEmergencyContact();
        } else if (navigation && navigation.navigate) {
          navigation.navigate('EmergencyContact');
        }
        break;

      case 'report-issue':
        Alert.alert(
          'Report an Issue',
          'Select the trip or account issue you would like to report to driver operations.',
          [
            { text: 'Fare Dispute', onPress: () => {} },
            { text: 'Rider Behavior', onPress: () => {} },
            { text: 'Vehicle Issue', onPress: () => {} },
            { text: 'Close', style: 'cancel' },
          ],
        );
        break;

      case 'faqs':
        Alert.alert(
          'Driver FAQs',
          'Common Topics:\n• Daily Payouts & Incentives\n• Ride Acceptance & Cancellation Rates\n• Navigation & GPS Accuracy\n• Toll Reimbursements',
          [{ text: 'Close', style: 'cancel' }],
        );
        break;

      case 'contact-support':
        handleSupportCall();
        break;

      case 'safety-tips':
        Alert.alert(
          'Driver Safety Guidelines',
          '1. Always verify rider PIN before starting trips.\n2. Keep your doors locked in isolated areas.\n3. Take mandatory breaks every 4 hours.\n4. Use hands-free phone mounts while driving.',
          [{ text: 'Understood' }],
        );
        break;

      case 'live-location':
        Alert.alert(
          'Live Location Sharing',
          'Live GPS sharing is ACTIVE during all trips. Your registered emergency contacts receive real-time location updates whenever SOS or trip sharing is triggered.',
          [{ text: 'Manage Settings' }, { text: 'Close', style: 'cancel' }],
        );
        break;

      case 'community-guidelines':
        Alert.alert(
          'Community Guidelines',
          'XCAB maintains zero tolerance for harassment, discrimination, or reckless driving. Mutual respect ensures safety for both partners and passengers.',
          [{ text: 'Read Full Policy' }, { text: 'Close', style: 'cancel' }],
        );
        break;

      case 'terms-policies':
        Alert.alert(
          'Terms & Policies',
          'Review the Driver Partner Agreement, Privacy Policy, Insurance Coverage terms, and local state transport regulations.',
          [{ text: 'View Documents' }, { text: 'Close', style: 'cancel' }],
        );
        break;

      default:
        break;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F5EF' }}>
      {/* 1. Existing Secondary Back Header: [‹  XCAB] */}
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#F7F5EF',
          flexDirection: 'row',
          paddingBottom: 8,
          paddingHorizontal: 16,
          paddingTop: 8,
        }}
      >
        <Pressable
          style={({ pressed }) => [
            {
              alignItems: 'center',
              height: 38,
              justifyContent: 'center',
              marginRight: 8,
              width: 32,
              opacity: pressed ? 0.6 : 1,
            },
          ]}
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={12}
        >
          <Text
            style={{
              color: '#17191C',
              fontSize: 34,
              fontWeight: '300',
              lineHeight: 36,
              marginTop: -2,
            }}
          >
            ‹
          </Text>
        </Pressable>

        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <Text
            style={{
              color: '#FFC928',
              fontSize: 26,
              fontWeight: '900',
              letterSpacing: -0.5,
            }}
          >
            X
          </Text>
          <Text
            style={{
              color: '#17191C',
              fontSize: 26,
              fontWeight: '900',
              letterSpacing: -0.5,
            }}
          >
            CAB
          </Text>
        </View>
      </View>

      {/* 2. Scrollable Content Area */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: 40,
          paddingHorizontal: 16,
          paddingTop: 6,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Title & Subtitle */}
        <View style={{ marginBottom: 16 }}>
          <Text
            style={{
              color: '#17191C',
              fontSize: 30,
              fontWeight: '800',
              letterSpacing: -0.6,
            }}
          >
            Help & Safety
          </Text>
          <Text
            style={{
              color: '#687078',
              fontSize: 14,
              fontWeight: '400',
              marginTop: 4,
            }}
          >
            Get help and learn about safety
          </Text>
        </View>

        {/* Informational Safety Banner */}
        <SafetyInfoBanner />

        {/* Prominent Emergency Action Cards */}
        <EmergencyActions
          onEmergencyCall={handleEmergencyCall}
          onSupportCall={handleSupportCall}
        />

        {/* 1. Get Help Section */}
        <HelpSection onItemPress={handleItemPress} />

        {/* 2. Safety Features Section */}
        <SafetyFeatures onItemPress={handleItemPress} />

        {/* 3. Guidelines Section */}
        <GuidelinesSection onItemPress={handleItemPress} />

        {/* 4. Support Assistance Banner Card */}
        <SupportCard onContactSupport={handleSupportCall} />
      </ScrollView>
    </View>
  );
}

export default HelpSafetyScreen;
