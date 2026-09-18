import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Header from '../../component/Header/Header';
import {
  AtPickupSheet,
  CantFindRiderSheet,
  DeskSkeleton,
  EndTripSheet,
  MapPanel,
  PromoCard,
  ReadyPanel,
  ReportIssueSheet,
  RideRequestSheet,
  ScanningBar,
  StatsRow,
} from '../../component/home';
import { colors } from '../../assets/colors/colors';

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
  const [isLoading, setIsLoading] = useState(true);
  const [showCantFindRiderSheet, setShowCantFindRiderSheet] = useState(false);
  const [showReportIssueSheet, setShowReportIssueSheet] = useState(false);

  // 2-second simulation delay for skeleton loading presentation
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleOnline = () => {
    const nextState = !isOnline;
    setIsOnline(nextState);
    if (onGoOffline) {
      onGoOffline();
    }
  };

  return (
    <View
      style={{
        backgroundColor: colors.ivory50 || '#F7F5EE',
        flex: 1,
        position: 'relative',
      }}>
      {/* iOS Style XCAB Header */}
      <Header
        onNotificationPress={onNotificationPress}
        onProfilePress={onProfilePress}
        onLocationPress={onLocationPress}
      />

      {/* Main Dashboard Content */}
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          paddingBottom:
            tripStage === 'pickup' || tripStage === 'onTrip' ? 360 : 25,
        }}
        showsVerticalScrollIndicator={false}
        bounces={true}>
        {isLoading ? (
          <DeskSkeleton />
        ) : (
          <>
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
          </>
        )}
      </ScrollView>

      {/* Active Trip Overlays (Anchored directly above footer) */}
      {tripStage === 'request' ? (
        <RideRequestSheet
          visible={tripStage === 'request'}
          onAccept={onAcceptRequest}
          onDecline={onDeclineRequest}
        />
      ) : null}
      {tripStage === 'pickup' ? (
        <View
          style={{
            bottom: 0,
            left: 0,
            position: 'absolute',
            right: 0,
            zIndex: 99,
          }}>
          <AtPickupSheet
            onEnterPin={onEnterPin}
            onCantFind={() => {
              setShowCantFindRiderSheet(true);
              if (onCantFind) {
                onCantFind();
              }
            }}
          />
        </View>
      ) : null}
      {tripStage === 'onTrip' ? (
        <View
          style={{
            bottom: 0,
            left: 0,
            position: 'absolute',
            right: 0,
            zIndex: 99,
          }}>
          <EndTripSheet
            onComplete={onCompleteTrip}
            onReportIssue={() => {
              setShowReportIssueSheet(true);
              if (onReportIssue) {
                onReportIssue();
              }
            }}
          />
        </View>
      ) : null}

      {/* "Report an Issue" Bottom Sheet Modal over Trip Complete */}
      <ReportIssueSheet
        visible={showReportIssueSheet}
        tripData={{
          tripId: 'XC-84920',
          pickup: 'Main Road, Ranchi',
          drop: 'Lalpur Market, Ranchi',
          tripDuration: '18 min',
          distance: '6.4 km',
          fare: '₹180',
        }}
        onClose={() => setShowReportIssueSheet(false)}
        onSubmitReport={reportData => {
          // Keep completed trip intact as requested
        }}
      />

      {/* "Can't Find The Rider?" Bottom Sheet Modal */}
      <CantFindRiderSheet
        visible={showCantFindRiderSheet}
        waitTime="02:23 min"
        onClose={() => setShowCantFindRiderSheet(false)}
        onContinueWaiting={() => setShowCantFindRiderSheet(false)}
        onCancelRide={reason => {
          setShowCantFindRiderSheet(false);
          if (onCompleteTrip) {
            onCompleteTrip();
          }
        }}
        onCallRider={() => {
          // Call rider hook
        }}
        onMessageRider={() => {
          // Message rider hook
        }}
        onOpenInMaps={() => {
          // Open in maps hook
        }}
        onSubmitOtherIssue={text => {
          setShowCantFindRiderSheet(false);
        }}
      />
    </View>
  );
}

export default HomeScreen;
