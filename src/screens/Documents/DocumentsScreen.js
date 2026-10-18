import React from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  DocumentCard,
  DocumentsHeader,
  documentItems,
  getDocumentStatus,
} from '../../component/documents';
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
  const { registrationData } = useRegistration();

  const handleHelp = () => {
    Alert.alert(
      'TREEPS Support (24/7)',
      'Need help with your documents?\n\nContact our 24/7 Driver Support at 1800-247-TREEPS (9222).',
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  const safeTopInset = Platform.OS === 'ios' ? insets.top : 0;

  return (
    <View style={{ backgroundColor: '#FBFAF6', flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEF0F2" translucent={false} />

      <DocumentsHeader
        onBack={onBack}
        onHelp={handleHelp}
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
    </View>
  );
}

export default DocumentsScreen;
