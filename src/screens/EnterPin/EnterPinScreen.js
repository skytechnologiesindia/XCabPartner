import React, {useRef, useState} from 'react';
import {
  Image,
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {colors} from '../../assets/colors/colors';
import {icons} from '../../assets/icons';

// Valid sample PIN (allows testing success with '1234' or any 4-digit except '0000' which triggers the demo error state)
const VALID_SAMPLE_PIN = '1234';

function EnterPinScreen({
  riderName = 'Aarav M.',
  rating = '4.8',
  pickupLocation = 'Main Road, Ranchi',
  dropLocation = 'Lalpur Market, Ranchi',
  onBack,
  onStartTrip,
  onResendHelp,
}) {
  const [pin, setPin] = useState('');
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef(null);

  const handlePinChange = text => {
    // Only accept numerical digits up to 4 characters
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 4);
    setPin(cleaned);
    if (hasError) {
      setHasError(false);
      setErrorMessage('');
    }
  };

  const handleStartTrip = () => {
    Keyboard.dismiss();
    if (pin.length !== 4) {
      return;
    }

    // Explicit error demo trigger: '0000' or non-matching if testing strict mode
    // (Accepts '1234' or any valid 4-digit code except '0000' to test error states)
    if (pin === '0000') {
      setHasError(true);
      setErrorMessage('Please ask the rider to confirm their PIN.');
      return;
    }

    // PIN is valid, proceed to start trip
    if (onStartTrip) {
      onStartTrip();
    }
  };

  const isButtonEnabled = pin.length === 4;

  return (
    <View style={styles.container}>
      {/* Top Header Row */}
      <View style={styles.headerRow}>
        <Pressable
          style={styles.backButton}
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Go back">
          <Text style={styles.backChevron}>‹</Text>
          <Text style={styles.backText}>Back</Text>
        </Pressable>

        <View style={styles.brandLockup}>
          <Text style={styles.brandX}>X</Text>
          <Text style={styles.brandCab}>CAB</Text>
        </View>

        <View style={styles.riderPresentBadge}>
          <View style={styles.onlineDot} />
          <Text style={styles.riderPresentText}>RIDER PRESENT</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* Screen Title & Subtitle */}
        <Text style={styles.screenTitle}>Enter trip PIN</Text>
        <Text style={styles.screenSubtitle}>
          Ask the rider for their 4-digit PIN to start the trip.
        </Text>

        {/* 4 Interactive PIN Input Boxes */}
        <Pressable
          style={styles.pinBoxesContainer}
          onPress={() => inputRef.current?.focus()}>
          {[0, 1, 2, 3].map(index => {
            const digit = pin[index] || '';
            const isCurrent = pin.length === index;
            return (
              <View
                key={index}
                style={[
                  styles.pinBox,
                  isCurrent && styles.pinBoxFocused,
                  digit && styles.pinBoxFilled,
                  hasError && styles.pinBoxError,
                ]}>
                <Text style={styles.pinDigit}>{digit}</Text>
              </View>
            );
          })}
        </Pressable>

        {/* Hidden Native Number Input */}
        <TextInput
          ref={inputRef}
          value={pin}
          onChangeText={handlePinChange}
          keyboardType="number-pad"
          maxLength={4}
          style={styles.hiddenInput}
          autoFocus={true}
        />

        {/* Error State Banner */}
        {hasError ? (
          <View style={styles.errorContainer}>
            <View style={styles.errorHeaderRow}>
              <Text style={styles.errorIcon}>⚠</Text>
              <Text style={styles.errorTitle}>Incorrect PIN</Text>
            </View>
            <Text style={styles.errorSubtitle}>{errorMessage}</Text>
          </View>
        ) : null}

        {/* Rider & Trip Details Card */}
        <View style={styles.detailsCard}>
          {/* Rider Meta Row */}
          <View style={styles.riderRow}>
            <View style={styles.riderAvatar}>
              <Text style={styles.riderAvatarText}>
                {riderName.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.riderInfo}>
              <View style={styles.riderNameRow}>
                <Text style={styles.riderName}>{riderName}</Text>
                <Text style={styles.starIcon}>★</Text>
                <Text style={styles.ratingText}>{rating}</Text>
              </View>
              <Text style={styles.riderSub}>Rider · Cash · ₹180</Text>
            </View>
          </View>

          <View style={styles.cardDivider} />

          {/* Route Section */}
          <View style={styles.routeContainer}>
            <View style={styles.routePoint}>
              <View style={styles.pickupDot} />
              <View style={styles.addressWrap}>
                <Text style={styles.routeLabel}>PICKUP</Text>
                <Text style={styles.addressText} numberOfLines={1}>
                  {pickupLocation}
                </Text>
              </View>
            </View>

            <View style={styles.dashedLine} />

            <View style={styles.routePoint}>
              <View style={styles.dropSquare} />
              <View style={styles.addressWrap}>
                <Text style={styles.routeLabel}>DROP</Text>
                <Text style={styles.addressText} numberOfLines={1}>
                  {dropLocation}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Primary Action Button: Start trip */}
        <Pressable
          style={({pressed}) => [
            styles.startButton,
            !isButtonEnabled && styles.startButtonDisabled,
            isButtonEnabled && pressed && styles.startButtonPressed,
          ]}
          onPress={handleStartTrip}
          disabled={!isButtonEnabled}
          accessibilityRole="button"
          accessibilityLabel="Start Trip">
          <Text
            style={[
              styles.startButtonText,
              !isButtonEnabled && styles.startButtonTextDisabled,
            ]}>
            Start trip
          </Text>
          <Text
            style={[
              styles.startChevron,
              !isButtonEnabled && styles.startChevronDisabled,
            ]}>
            →
          </Text>
        </Pressable>

        {/* Secondary Action: Resend / Help */}
        <Pressable
          style={styles.helpButton}
          onPress={onResendHelp}
          accessibilityRole="button"
          accessibilityLabel="Resend or Help">
          <Text style={styles.helpQuestionIcon}>?</Text>
          <Text style={styles.helpButtonText}>Resend / help</Text>
        </Pressable>

        {/* Safety Disclaimer */}
        <View style={styles.safetyRow}>
          <Image source={icons.shield} style={styles.shieldIcon} />
          <Text style={styles.safetyText}>
            Never start the trip without the rider PIN.
          </Text>
        </View>

        {/* Demo Helper Hint */}
        <Text style={styles.demoNote}>
          Demo PIN: {VALID_SAMPLE_PIN} (enter 0000 to test error state)
        </Text>
      </ScrollView>
    </View>
  );
}

const fontSans = Platform.select({
  ios: 'System',
  android: 'sans-serif',
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F5EF',
    flex: 1,
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 14,
  },
  backButton: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
    paddingVertical: 4,
  },
  backChevron: {
    color: '#17191C',
    fontFamily: fontSans,
    fontSize: 22,
    fontWeight: '700',
    marginTop: -2,
  },
  backText: {
    color: '#17191C',
    fontFamily: fontSans,
    fontSize: 14,
    fontWeight: '700',
  },
  brandLockup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandX: {
    color: colors.yellow500 || '#FFC928',
    fontSize: 20,
    fontWeight: '900',
  },
  brandCab: {
    color: '#17191C',
    fontSize: 20,
    fontWeight: '900',
  },
  riderPresentBadge: {
    alignItems: 'center',
    backgroundColor: '#DDF5E9',
    borderColor: '#BBE8D2',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  onlineDot: {
    backgroundColor: '#18A66A',
    borderRadius: 3.5,
    height: 7,
    width: 7,
  },
  riderPresentText: {
    color: '#18A66A',
    fontFamily: fontSans,
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 36,
  },
  screenTitle: {
    color: '#17191C',
    fontFamily: fontSans,
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.4,
    marginTop: 8,
  },
  screenSubtitle: {
    color: '#687078',
    fontFamily: fontSans,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
    marginBottom: 24,
  },
  pinBoxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  pinBox: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#DDD9CF',
    borderRadius: 14,
    borderWidth: 1.5,
    height: 60,
    justifyContent: 'center',
    width: 60,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  pinBoxFocused: {
    borderColor: '#FFC928',
    borderWidth: 2,
  },
  pinBoxFilled: {
    borderColor: '#17191C',
  },
  pinBoxError: {
    backgroundColor: 'rgba(242, 107, 91, 0.08)',
    borderColor: '#F26B5B',
  },
  pinDigit: {
    color: '#17191C',
    fontFamily: fontSans,
    fontSize: 24,
    fontWeight: '900',
  },
  hiddenInput: {
    height: 0,
    opacity: 0,
    position: 'absolute',
    width: 0,
  },
  errorContainer: {
    backgroundColor: 'rgba(242, 107, 91, 0.1)',
    borderColor: '#F26B5B',
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  errorHeaderRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  errorIcon: {
    color: '#F26B5B',
    fontSize: 14,
    fontWeight: '800',
  },
  errorTitle: {
    color: '#F26B5B',
    fontFamily: fontSans,
    fontSize: 13,
    fontWeight: '800',
  },
  errorSubtitle: {
    color: '#F26B5B',
    fontFamily: fontSans,
    fontSize: 11.5,
    marginTop: 2,
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DDD9CF',
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 20,
    marginTop: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  riderRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  riderAvatar: {
    alignItems: 'center',
    backgroundColor: '#F1EEE5',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  riderAvatarText: {
    color: '#17191C',
    fontFamily: fontSans,
    fontSize: 16,
    fontWeight: '800',
  },
  riderInfo: {
    marginLeft: 12,
  },
  riderNameRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  riderName: {
    color: '#17191C',
    fontFamily: fontSans,
    fontSize: 15,
    fontWeight: '800',
  },
  starIcon: {
    color: '#EAB308',
    fontSize: 12,
    marginLeft: 6,
    marginRight: 3,
  },
  ratingText: {
    color: '#687078',
    fontFamily: fontSans,
    fontSize: 12.5,
    fontWeight: '700',
  },
  riderSub: {
    color: '#687078',
    fontFamily: fontSans,
    fontSize: 12,
    marginTop: 2,
  },
  cardDivider: {
    backgroundColor: '#EAE5D9',
    height: 1,
    marginVertical: 14,
  },
  routeContainer: {
    gap: 8,
  },
  routePoint: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  pickupDot: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFC928',
    borderRadius: 6,
    borderWidth: 3,
    height: 12,
    marginRight: 10,
    width: 12,
  },
  dashedLine: {
    backgroundColor: '#C4BEB2',
    height: 8,
    marginLeft: 5,
    marginVertical: -3,
    width: 2,
  },
  dropSquare: {
    backgroundColor: '#FFFFFF',
    borderColor: '#F26B5B',
    borderRadius: 2,
    borderWidth: 3,
    height: 11,
    marginRight: 11,
    width: 11,
  },
  addressWrap: {
    flex: 1,
  },
  routeLabel: {
    color: '#9CA3AF',
    fontFamily: fontSans,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  addressText: {
    color: '#17191C',
    fontFamily: fontSans,
    fontSize: 13.5,
    fontWeight: '700',
    marginTop: 1,
  },
  startButton: {
    alignItems: 'center',
    backgroundColor: colors.yellow500 || '#FFC928',
    borderRadius: 14,
    flexDirection: 'row',
    height: 52,
    justifyContent: 'center',
    marginBottom: 10,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  startButtonDisabled: {
    backgroundColor: '#E6E2D8',
    shadowOpacity: 0,
    elevation: 0,
  },
  startButtonPressed: {
    backgroundColor: '#E9B900',
    opacity: 0.94,
  },
  startButtonText: {
    color: '#17191C',
    fontFamily: fontSans,
    fontSize: 15.5,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  startButtonTextDisabled: {
    color: '#9CA3AF',
  },
  startChevron: {
    color: '#17191C',
    fontFamily: fontSans,
    fontSize: 18,
    fontWeight: '800',
    position: 'absolute',
    right: 18,
  },
  startChevronDisabled: {
    color: '#9CA3AF',
  },
  helpButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#DDD9CF',
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    height: 44,
    justifyContent: 'center',
    marginBottom: 16,
  },
  helpQuestionIcon: {
    color: '#687078',
    fontFamily: fontSans,
    fontSize: 13,
    fontWeight: '800',
  },
  helpButtonText: {
    color: '#17191C',
    fontFamily: fontSans,
    fontSize: 13.5,
    fontWeight: '700',
  },
  safetyRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 14,
  },
  shieldIcon: {
    height: 14,
    marginRight: 6,
    resizeMode: 'contain',
    tintColor: '#687078',
    width: 14,
  },
  safetyText: {
    color: '#687078',
    fontFamily: fontSans,
    fontSize: 11.5,
    fontWeight: '500',
  },
  demoNote: {
    color: '#9CA3AF',
    fontFamily: fontSans,
    fontSize: 10.5,
    letterSpacing: 0.2,
    textAlign: 'center',
  },
});

export default EnterPinScreen;
