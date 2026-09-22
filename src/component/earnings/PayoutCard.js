import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { icons } from '../../assets/icons';
import styles from '../../assets/styles/styles';

/**
 * PayoutCard
 * Displays Next Payout projection, processing badge, and payout schedule with utility styles.
 */
function PayoutCard({
  date = 'Tuesday, 23 Sep',
  amount = '₹4,200',
  status = 'Processing',
  onPress,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.p12,
        styles.mb16,
        {
          alignItems: 'center',
          backgroundColor: '#FFFBEB',
          borderColor: '#FDE68A',
          borderRadius: 16,
          borderWidth: 1,
          flexDirection: 'row',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.03,
          shadowRadius: 4,
          elevation: 1,
          opacity: pressed ? 0.9 : 1,
        },
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Next payout on ${date} of ${amount}, status ${status}`}
    >
      {/* 1. Left Icon Container */}
      <View
        style={[
          styles.mr12,
          {
            alignItems: 'center',
            backgroundColor: '#FFD21A',
            borderRadius: 12,
            height: 44,
            justifyContent: 'center',
            width: 44,
          },
        ]}
      >
        <Image
          source={icons.statWallet}
          style={{
            height: 22,
            width: 22,
          }}
          tintColor="#17191C"
          resizeMode="contain"
        />
      </View>

      {/* 2. Center Text Column */}
      <View style={{ flex: 1 }}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            gap: 8,
          }}
        >
          <Text
            style={[
              styles.ts12,
              {
                color: '#687078',
                fontWeight: '600',
              },
            ]}
          >
            Next Payout
          </Text>
          <View
            style={[
              styles.pdh8,
              styles.pdv4,
              {
                backgroundColor: '#E6F9F0',
                borderRadius: 8,
              },
            ]}
          >
            <Text
              style={[
                styles.ts10,
                {
                  color: '#10B981',
                  fontWeight: '700',
                },
              ]}
            >
              {status}
            </Text>
          </View>
        </View>

        <Text
          style={[
            styles.ts14,
            styles.mt4,
            {
              color: '#17191C',
              fontWeight: '700',
              letterSpacing: -0.2,
            },
          ]}
        >
          {date} • {amount}
        </Text>
      </View>

      {/* 3. Right Chevron */}
      <Text
        style={[
          styles.ts20,
          styles.ml8,
          styles.mr4,
          {
            color: '#17191C',
            fontWeight: '600',
          },
        ]}
      >
        ›
      </Text>
    </Pressable>
  );
}

export default PayoutCard;
