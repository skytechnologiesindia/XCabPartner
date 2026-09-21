import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

/**
 * ReviewSection
 * Card representing a verified registration section with tap-to-edit action:
 * - Icon & Title
 * - Formatted Summary Values
 * - Chevron / Edit indicator (›)
 */
function ReviewSection({
  icon,
  title,
  summaryLines = [],
  onEditPress,
}) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onEditPress}
      accessibilityRole="button"
      accessibilityLabel={`Edit ${title}`}
    >
      <View style={styles.cardHeader}>
        <View style={styles.titleRow}>
          <Text style={styles.icon}>{icon}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </View>

      <View style={styles.body}>
        {summaryLines.map((line, index) => (
          <Text key={index} style={styles.summaryLine}>
            {line}
          </Text>
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DDD9CF',
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  cardPressed: {
    backgroundColor: '#FAF8F2',
    borderColor: '#FFC928',
  },
  cardHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
  },
  title: {
    color: '#17191C',
    fontSize: 14.5,
    fontWeight: '800',
  },
  chevron: {
    color: '#687078',
    fontSize: 20,
    fontWeight: '700',
  },
  body: {
    paddingLeft: 24,
  },
  summaryLine: {
    color: '#4B5563',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
});

export default ReviewSection;
