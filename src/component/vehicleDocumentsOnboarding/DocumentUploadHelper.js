import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * DocumentUploadHelper
 * Compact quality assurance and compliance notice matching the reference banner:
 * "Please ensure all documents are clear, valid and not expired."
 */
function DocumentUploadHelper() {
  return (
    <View style={styles.container}>
      <View style={styles.bannerCard}>
        {/* Info Icon in Yellow Circle */}
        <View style={styles.iconCircle}>
          <Text style={styles.infoIcon}>ⓘ</Text>
        </View>

        {/* Advisory Text */}
        <Text style={styles.messageText}>
          Please ensure all documents are clear, valid and not expired.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 4,
    marginBottom: 12,
    width: '100%',
  },
  bannerCard: {
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    borderColor: '#FFE082',
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 12,
    width: '100%',
  },
  iconCircle: {
    alignItems: 'center',
    backgroundColor: '#D97706',
    borderRadius: 10,
    height: 20,
    justifyContent: 'center',
    marginRight: 10,
    width: 20,
  },
  infoIcon: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    marginTop: -1,
  },
  messageText: {
    color: '#4B5563',
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 17,
  },
});

export default DocumentUploadHelper;
