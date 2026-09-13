import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AlertIcon from './AlertIcon';

/**
 * AlertCard
 * Renders a single alert notification.
 * Uses a clean white card with soft shadow and no vertical colored side strips.
 */
function AlertCard({ alert, onPress }) {
  if (!alert) return null;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={() => onPress && onPress(alert)}
      accessibilityRole="button"
      accessibilityLabel={`${alert.title}: ${alert.subtitle}`}
    >
      {/* 1. Left: Icon Accent Circle */}
      <View style={styles.iconWrapper}>
        <AlertIcon type={alert.type} />
      </View>

      {/* 2. Center: Content Column */}
      <View style={styles.contentCol}>
        {/* Title */}
        <Text
          style={[
            styles.titleText,
            alert.unread ? styles.titleUnread : styles.titleRead,
          ]}
          numberOfLines={1}
        >
          {alert.title}
        </Text>

        {/* Subtitle */}
        {alert.subtitle ? (
          <Text style={styles.subtitleText} numberOfLines={1}>
            {alert.subtitle}
          </Text>
        ) : null}

        {/* Details: Route points or text lines */}
        {alert.route ? (
          <View style={styles.routeBlock}>
            {alert.route.map((point, index) => (
              <View key={index} style={styles.routeRow}>
                <View
                  style={[
                    styles.routeDot,
                    point.type === 'pickup'
                      ? styles.pickupDot
                      : styles.dropDot,
                  ]}
                />
                <Text style={styles.detailLineText} numberOfLines={1}>
                  {point.text}
                </Text>
              </View>
            ))}
          </View>
        ) : alert.details ? (
          <View style={styles.detailsBlock}>
            {alert.details.map((line, index) => (
              <Text key={index} style={styles.detailLineText} numberOfLines={1}>
                {line}
              </Text>
            ))}
          </View>
        ) : null}
      </View>

      {/* 3. Right: Time & Chevron Circle Button */}
      <View style={styles.rightCol}>
        <Text style={styles.timeText}>{alert.time}</Text>

        <View style={styles.chevronCircle}>
          <Text style={styles.chevronIcon}>›</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderColor: '#EFECE6',
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1.5,
  },
  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.995 }],
  },
  iconWrapper: {
    marginRight: 12,
    marginTop: 2,
  },
  contentCol: {
    flex: 1,
    paddingRight: 4,
  },
  titleText: {
    color: '#17191C',
    fontSize: 15,
    letterSpacing: -0.2,
  },
  titleUnread: {
    fontWeight: '800',
  },
  titleRead: {
    fontWeight: '600',
  },
  subtitleText: {
    color: '#4B5157',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 3,
  },
  routeBlock: {
    gap: 4,
    marginTop: 8,
  },
  routeRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  routeDot: {
    borderRadius: 3,
    height: 6,
    marginRight: 8,
    width: 6,
  },
  pickupDot: {
    backgroundColor: '#FFC928',
  },
  dropDot: {
    backgroundColor: '#F26B5B',
  },
  detailsBlock: {
    gap: 2,
    marginTop: 8,
  },
  detailLineText: {
    color: '#687078',
    fontSize: 12.5,
    fontWeight: '400',
    lineHeight: 16,
  },
  rightCol: {
    alignItems: 'flex-end',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginLeft: 8,
    minHeight: 64,
    paddingTop: 1,
  },
  timeText: {
    color: '#8A929A',
    fontSize: 12,
    fontWeight: '500',
  },
  chevronCircle: {
    alignItems: 'center',
    backgroundColor: '#F4F2EB',
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  chevronIcon: {
    color: '#17191C',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 18,
    marginTop: -1,
  },
});

export default AlertCard;
