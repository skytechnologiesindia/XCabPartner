import React, { useState } from 'react';
import {
  Alert,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  DocumentCard,
  DocumentsHeader,
  documentItems,
  getDocumentStatus,
} from '../../component/documents';
import { supportedLanguages } from '../Language/LanguageScreen';
import { useRegistration } from '../../context/RegistrationContext';

/**
 * DocumentsScreen
 * Hub listing every driver document with its current status.
 * Navigation is injected via `onBack` / `onOpenDocument(route)`.
 */
function DocumentsScreen({
  onBack,
  onOpenDocument,
}) {
  const insets = useSafeAreaInsets();
  const { registrationData, updateRegistrationData } = useRegistration();
  const [languageOpen, setLanguageOpen] = useState(false);

  const handleHelp = () => {
    Alert.alert(
      'TREEPS Support (24/7)',
      'Need help with your documents?\n\nContact our 24/7 Driver Support at 1800-247-TREEPS (9222).',
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  const handleSelectLanguage = id => {
    updateRegistrationData('language', id);
    setLanguageOpen(false);
  };

  const safeTopInset = Platform.OS === 'ios' ? insets.top : 0;

  return (
    <View style={{ backgroundColor: '#FBFAF6', flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEF0F2" translucent={false} />

      <DocumentsHeader
        onBack={onBack}
        onHelp={handleHelp}
        onLanguage={() => setLanguageOpen(true)}
        topInset={safeTopInset}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: Math.max(insets.bottom, 16) + 8,
          paddingHorizontal: 16,
          paddingTop: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        {documentItems.map(item => (
          <DocumentCard
            key={item.id}
            title={item.title}
            icon={item.icon}
            tint={item.tint}
            status={getDocumentStatus(item.id, registrationData)}
            onPress={() => onOpenDocument && onOpenDocument(item.route)}
          />
        ))}
      </ScrollView>

      <Modal
        visible={languageOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setLanguageOpen(false)}>
        <Pressable
          style={{
            backgroundColor: 'rgba(0,0,0,0.4)',
            flex: 1,
            justifyContent: 'flex-end',
          }}
          onPress={() => setLanguageOpen(false)}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingBottom: Math.max(insets.bottom, 16),
              paddingHorizontal: 20,
              paddingTop: 20,
            }}>
            <Text
              style={{
                color: '#17191C',
                fontSize: 18,
                fontWeight: '700',
                marginBottom: 8,
              }}>
              Choose language
            </Text>
            {supportedLanguages.map(lang => {
              const selected = registrationData.language === lang.id;
              return (
                <Pressable
                  key={lang.id}
                  style={({ pressed }) => [
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 14,
                    },
                    pressed && { opacity: 0.6 },
                  ]}
                  onPress={() => handleSelectLanguage(lang.id)}
                  accessibilityRole="button"
                  accessibilityLabel={lang.name}>
                  <Text style={{ color: '#17191C', fontSize: 16, fontWeight: selected ? '700' : '500' }}>
                    {lang.nativeName}
                  </Text>
                  {selected ? (
                    <Text style={{ color: '#16A34A', fontSize: 16, fontWeight: '700' }}>✓</Text>
                  ) : null}
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

export default DocumentsScreen;
