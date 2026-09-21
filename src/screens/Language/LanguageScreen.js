import React, { useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { OnboardingHeader, RegistrationButton } from '../../component/onboarding';
import { useRegistration } from '../../context/RegistrationContext';

const supportedLanguages = [
  { id: 'en', name: 'English', nativeName: 'English', subtitle: 'Default Language' },
  { id: 'hi', name: 'Hindi', nativeName: 'हिन्दी', subtitle: 'हिंदी में जारी रखें' },
  { id: 'bn', name: 'Bengali', nativeName: 'বাংলা', subtitle: 'বাংলায় চালিয়ে যান' },
  { id: 'mr', name: 'Marathi', nativeName: 'मराठी', subtitle: 'मराठीत सुरू ठेवा' },
  { id: 'ta', name: 'Tamil', nativeName: 'தமிழ்', subtitle: 'தமிழில் தொடரவும்' },
];

function LanguageScreen({ onBack, onContinue }) {
  const insets = useSafeAreaInsets();
  const { registrationData, updateRegistrationData } = useRegistration();
  const [selectedLang, setSelectedLang] = useState(registrationData.language || 'en');

  const handleSelectLanguage = (id) => {
    setSelectedLang(id);
    updateRegistrationData('language', id);
  };

  const handleContinue = () => {
    updateRegistrationData('language', selectedLang);
    if (onContinue) {
      onContinue(selectedLang);
    }
  };

  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 28 : 0;
  const safeTopPadding = Math.max(insets.top, statusBarHeight) + 8;
  const safeBottomPadding = Math.max(insets.bottom, 16);

  return (
    <View style={[styles.container, { paddingTop: safeTopPadding }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F5EF" translucent={true} />

      <OnboardingHeader onBack={onBack} showHelp={true} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: safeBottomPadding }]}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <View style={styles.headerTitleContainer}>
          <Text style={styles.title}>Choose Your{'\n'}Language</Text>
          <Text style={styles.subtitle}>
            Select your preferred language for the XCAB Driver App. You can change this later in settings.
          </Text>
        </View>

        {/* Language Options */}
        <View style={styles.listContainer}>
          {supportedLanguages.map((item) => {
            const isSelected = selectedLang === item.id;
            return (
              <Pressable
                key={item.id}
                style={({ pressed }) => [
                  styles.card,
                  isSelected && styles.cardSelected,
                  pressed && styles.cardPressed,
                ]}
                onPress={() => handleSelectLanguage(item.id)}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
              >
                <View style={styles.cardLeft}>
                  <Text style={[styles.nativeText, isSelected && styles.nativeTextSelected]}>
                    {item.nativeName}
                  </Text>
                  <Text style={styles.englishText}>
                    {item.name} • {item.subtitle}
                  </Text>
                </View>

                <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
                  {isSelected ? <View style={styles.radioInner} /> : null}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Continue Button */}
        <View style={styles.ctaWrapper}>
          <RegistrationButton
            label="Continue"
            onPress={handleContinue}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F5EF',
    flex: 1,
  },
  scroll: {
    backgroundColor: '#F7F5EF',
    flex: 1,
  },
  scrollContent: {
    backgroundColor: '#F7F5EF',
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  headerTitleContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    color: '#17191C',
    fontSize: 27,
    fontWeight: '900',
    letterSpacing: -0.6,
    lineHeight: 33,
  },
  subtitle: {
    color: '#687078',
    fontSize: 13.5,
    fontWeight: '400',
    lineHeight: 19,
    marginTop: 6,
  },
  listContainer: {
    gap: 10,
    paddingHorizontal: 20,
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#DDD9CF',
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  cardSelected: {
    backgroundColor: '#FFFDF5',
    borderColor: '#FFC928',
    borderWidth: 1.5,
  },
  cardPressed: {
    opacity: 0.9,
  },
  cardLeft: {
    flex: 1,
  },
  nativeText: {
    color: '#17191C',
    fontSize: 17,
    fontWeight: '700',
  },
  nativeTextSelected: {
    color: '#17191C',
    fontWeight: '800',
  },
  englishText: {
    color: '#687078',
    fontSize: 12,
    marginTop: 2,
  },
  radioOuter: {
    alignItems: 'center',
    borderColor: '#DDD9CF',
    borderRadius: 11,
    borderWidth: 2,
    height: 22,
    justifyContent: 'center',
    marginLeft: 12,
    width: 22,
  },
  radioOuterSelected: {
    borderColor: '#FFC928',
  },
  radioInner: {
    backgroundColor: '#FFC928',
    borderRadius: 6,
    height: 12,
    width: 12,
  },
  ctaWrapper: {
    marginTop: 20,
    width: '100%',
  },
});

export default LanguageScreen;
