import React from 'react';
import { Pressable, Text, View } from 'react-native';
import styles from '../../assets/styles/styles';
import AlertIcon from './AlertIcon';

/**
 * AlertCard
 * Renders a single alert notification with utility styles.
 */
function AlertCard({ alert, onPress }) {
  if (!alert) return null;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.pdh16,
        styles.pdv16,
        styles.mb12,
        {
          alignItems: 'flex-start',
          backgroundColor: '#FFFFFF',
          borderColor: '#EFECE6',
          borderRadius: 20,
          borderWidth: 1,
          flexDirection: 'row',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.04,
          shadowRadius: 6,
          elevation: 1.5,
          opacity: pressed ? 0.92 : 1,
          transform: [{ scale: pressed ? 0.995 : 1 }],
        },
      ]}
      onPress={() => onPress && onPress(alert)}
      accessibilityRole="button"
      accessibilityLabel={`${alert.title}: ${alert.subtitle}`}
    >
      {/* 1. Left: Icon Accent Circle */}
      <View style={[styles.mr12, styles.mt4]}>
        <AlertIcon type={alert.type} />
      </View>

      {/* 2. Center: Content Column */}
      <View style={[styles.pdr4, { flex: 1 }]}>
        {/* Title */}
        <Text
          style={[
            styles.ts15,
            {
              color: '#17191C',
              letterSpacing: -0.2,
              fontWeight: alert.unread ? '800' : '600',
            },
          ]}
          numberOfLines={1}
        >
          {alert.title}
        </Text>

        {/* Subtitle */}
        {alert.subtitle ? (
          <Text
            style={[
              styles.ts13,
              styles.mt4,
              {
                color: '#4B5157',
                fontWeight: '600',
              },
            ]}
            numberOfLines={1}
          >
            {alert.subtitle}
          </Text>
        ) : null}

        {/* Details: Route points or text lines */}
        {alert.route ? (
          <View style={[styles.mt8, { gap: 4 }]}>
            {alert.route.map((point, index) => (
              <View
                key={index}
                style={{ alignItems: 'center', flexDirection: 'row' }}
              >
                <View
                  style={[
                    styles.mr8,
                    {
                      backgroundColor:
                        point.type === 'pickup' ? '#FFC928' : '#F26B5B',
                      borderRadius: 3,
                      height: 6,
                      width: 6,
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.ts12,
                    {
                      color: '#687078',
                      fontWeight: '400',
                      lineHeight: 16,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {point.text}
                </Text>
              </View>
            ))}
          </View>
        ) : alert.details ? (
          <View style={[styles.mt8, { gap: 2 }]}>
            {alert.details.map((line, index) => (
              <Text
                key={index}
                style={[
                  styles.ts12,
                  {
                    color: '#687078',
                    fontWeight: '400',
                    lineHeight: 16,
                  },
                ]}
                numberOfLines={1}
              >
                {line}
              </Text>
            ))}
          </View>
        ) : null}
      </View>

      {/* 3. Right: Time & Chevron Circle Button */}
      <View
        style={[
          styles.ml8,
          styles.pdt4,
          {
            alignItems: 'flex-end',
            alignSelf: 'stretch',
            justifyContent: 'space-between',
            minHeight: 64,
          },
        ]}
      >
        <Text
          style={[
            styles.ts12,
            {
              color: '#8A929A',
              fontWeight: '500',
            },
          ]}
        >
          {alert.time}
        </Text>

        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#F4F2EB',
            borderRadius: 16,
            height: 32,
            justifyContent: 'center',
            width: 32,
          }}
        >
          <Text
            style={[
              styles.ts18,
              {
                color: '#17191C',
                fontWeight: '600',
                lineHeight: 18,
                marginTop: -1,
              },
            ]}
          >
            ›
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export default AlertCard;
