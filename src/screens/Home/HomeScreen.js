import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Header from '../../component/Header/Header';
import {
  AtPickupSheet,
  EndTripSheet,
  MapPanel,
  PromoCard,
  ReadyPanel,
  RideRequestSheet,
  ScanningBar,
  StatsRow,
} from '../../component/home';
import {colors} from '../../assets/colors/colors';

function HomeScreen({
  tripStage = 'scanning',
  onGoOffline,
  onAcceptRequest,
  onDeclineRequest,
  onEnterPin,
  onCantFind,
  onCompleteTrip,
  onReportIssue,
  onNotificationPress,
  onProfilePress,
  onLocationPress,
  onPressOffers,
}) {
  const [isOnline, setIsOnline] = useState(true);

  const handleToggleOnline = () => {
    const nextState = !isOnline;
    setIsOnline(nextState);
    if (onGoOffline) {
      onGoOffline();
    }
  };

  return (
    <View style={styles.container}>
      {/* iOS Style XCAB Header */}
      <Header
        onNotificationPress={onNotificationPress}
        onProfilePress={onProfilePress}
        onLocationPress={onLocationPress}
      />

      {/* Main Dashboard Content */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          (tripStage === 'pickup' || tripStage === 'onTrip') &&
            styles.scrollContentPickup,
        ]}
        showsVerticalScrollIndicator={false}
        bounces={true}>
        {/* 1. Online / Offline Status Card (Hidden once ride is accepted) */}
        {tripStage === 'scanning' || tripStage === 'request' ? (
          <ReadyPanel
            isOnline={isOnline}
            onToggleOnline={handleToggleOnline}
          />
        ) : null}

        {/* 2. Large Dark Live Map Section (Scrollable) */}
        <MapPanel isAtPickup={tripStage === 'pickup'} />

        {/* 3. Scanning State Dashboard Items */}
        {tripStage === 'scanning' ? (
          <>
            <ScanningBar />
            {/* 4. Statistics Cards */}
            <StatsRow />
            {/* 5. Promotional Card */}
            <PromoCard onPressOffers={onPressOffers} />
          </>
        ) : null}
      </ScrollView>

      {/* Active Trip Overlays (Anchored directly above footer) */}
      {tripStage === 'request' ? (
        <View style={styles.sheetOverlay}>
          <RideRequestSheet
            onAccept={onAcceptRequest}
            onDecline={onDeclineRequest}
          />
        </View>
      ) : null}
      {tripStage === 'pickup' ? (
        <View style={styles.sheetOverlay}>
          <AtPickupSheet
            onEnterPin={onEnterPin}
            onCantFind={onCantFind}
          />
        </View>
      ) : null}
      {tripStage === 'onTrip' ? (
        <View style={styles.sheetOverlay}>
          <EndTripSheet
            onComplete={onCompleteTrip}
            onReportIssue={onReportIssue}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ivory50 || '#F7F5EE',
    flex: 1,
    position: 'relative',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 25,
  },
  scrollContentPickup: {
    paddingBottom: 360,
  },
  sheetOverlay: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    zIndex: 99,
  },
});

export default HomeScreen;

