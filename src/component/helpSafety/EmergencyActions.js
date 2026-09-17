import React from 'react';
import {
  Pressable,
  Text,
  View,
} from 'react-native';
import styles from '../../assets/styles/styles';

/**
 * EmergencyActions
 * Side-by-side action cards for instant Police (112) escalation and 24/7 XCAB Support with utility styles.
 */
function EmergencyActions({ onEmergencyCall, onSupportCall }) {
  return (
    <View
      style={[
        styles.mb16,
        {
          flexDirection: 'row',
          gap: 12,
        },
      ]}
    >
      {/* 1. Emergency Police Call Card */}
      <Pressable
        style={({ pressed }) => [
          styles.pdh12,
          styles.pdv16,
          {
            alignItems: 'center',
            backgroundColor: '#FDECEB',
            borderColor: '#FCD0CD',
            borderRadius: 14,
            borderWidth: 1,
            flex: 1,
            flexDirection: 'row',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.03,
            shadowRadius: 3,
            elevation: 1,
            opacity: pressed ? 0.75 : 1,
            transform: [{ scale: pressed ? 0.985 : 1 }],
          },
        ]}
        onPress={onEmergencyCall}
        accessibilityRole="button"
        accessibilityLabel="Emergency Call, Police 112"
      >
        <View
          style={[
            styles.mr8,
            {
              alignItems: 'center',
              height: 32,
              justifyContent: 'center',
              width: 28,
            },
          ]}
        >
          <Text
            style={[
              styles.ts20,
              {
                color: '#E11D48',
                transform: [{ rotate: '15deg' }],
              },
            ]}
          >
            📞
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.ts13,
              {
                color: '#E11D48',
                fontWeight: '800',
                letterSpacing: -0.2,
              },
            ]}
          >
            Emergency Call
          </Text>
          <Text
            style={[
              styles.ts11,
              styles.mt4,
              {
                color: '#687078',
                fontWeight: '400',
              },
            ]}
          >
            Police · 112
          </Text>
        </View>
      </Pressable>

      {/* 2. XCAB Support 24/7 Card */}
      <Pressable
        style={({ pressed }) => [
          styles.pdh12,
          styles.pdv16,
          {
            alignItems: 'center',
            backgroundColor: '#FFFDF5',
            borderColor: '#FDE68A',
            borderRadius: 14,
            borderWidth: 1,
            flex: 1,
            flexDirection: 'row',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.03,
            shadowRadius: 3,
            elevation: 1,
            opacity: pressed ? 0.75 : 1,
            transform: [{ scale: pressed ? 0.985 : 1 }],
          },
        ]}
        onPress={onSupportCall}
        accessibilityRole="button"
        accessibilityLabel="XCAB Support, 24/7 Assistance"
      >
        <View
          style={[
            styles.mr8,
            {
              alignItems: 'center',
              height: 32,
              justifyContent: 'center',
              width: 28,
            },
          ]}
        >
          <View
            style={{
              borderColor: '#17191C',
              borderRadius: 8,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              borderWidth: 1.8,
              borderBottomWidth: 0,
              height: 14,
              position: 'relative',
              width: 17,
            }}
          >
            <View
              style={{
                backgroundColor: '#17191C',
                borderRadius: 2,
                bottom: -5,
                height: 7,
                left: -2,
                position: 'absolute',
                width: 3.5,
              }}
            />
            <View
              style={{
                backgroundColor: '#17191C',
                borderRadius: 2,
                bottom: -5,
                height: 7,
                position: 'absolute',
                right: -2,
                width: 3.5,
              }}
            />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.ts13,
              {
                color: '#17191C',
                fontWeight: '800',
                letterSpacing: -0.2,
              },
            ]}
          >
            XCAB Support
          </Text>
          <Text
            style={[
              styles.ts11,
              styles.mt4,
              {
                color: '#687078',
                fontWeight: '400',
              },
            ]}
          >
            24/7 Assistance
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default EmergencyActions;
