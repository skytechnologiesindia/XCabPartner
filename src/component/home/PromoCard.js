import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {icons} from '../../assets/icons';
import {images} from '../../assets/images';

function PromoCard({onPressOffers}) {
  return (
    <View style={styles.card}>
      <View style={styles.contentLeft}>
        {/* Discount Tag Icon Circle */}
        <View style={styles.tagCircle}>
          <Image source={icons.promoTag} style={styles.tagIcon} />
        </View>

        {/* Text & Action */}
        <View style={styles.textWrap}>
          <Text style={styles.title} numberOfLines={1}>
            Ride More, Save More!
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            Get up to ₹150 off on your next 3 rides
          </Text>
          <Pressable
            style={({pressed}) => [
              styles.offersButton,
              pressed && styles.offersButtonPressed,
            ]}
            onPress={onPressOffers}
            accessibilityRole="button"
            accessibilityLabel="View Offers">
            <Text style={styles.offersText}>View Offers</Text>
            <Text style={styles.offersChevron}>›</Text>
          </Pressable>
        </View>
      </View>

      {/* 3D Yellow Gift Box with Bow & Sparkles */}
      <View style={styles.giftBoxWrap}>
        <Image
          source={images.giftBox}
          style={styles.giftImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#FAF5EA',
    borderColor: '#ECE0C8',
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginHorizontal: 16,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 6,
    paddingTop: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  contentLeft: {
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    marginRight: 6,
  },
  tagCircle: {
    alignItems: 'center',
    backgroundColor: '#111315',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  tagIcon: {
    height: 18,
    resizeMode: 'contain',
    width: 18,
  },
  textWrap: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    color: '#111315',
    fontSize: 13.5,
    fontWeight: '800',
    letterSpacing: -0.1,
  },
  subtitle: {
    color: '#6B7280',
    fontSize: 11,
    marginTop: 2,
  },
  offersButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#111315',
    borderRadius: 14,
    flexDirection: 'row',
    gap: 4,
    marginTop: 8,
    paddingHorizontal: 11,
    paddingVertical: 5,
  },
  offersButtonPressed: {
    opacity: 0.85,
  },
  offersText: {
    color: '#FFFFFF',
    fontSize: 10.5,
    fontWeight: '700',
  },
  offersChevron: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 14,
  },
  giftBoxWrap: {
    alignItems: 'center',
    height: 74,
    justifyContent: 'center',
    width: 74,
  },
  giftImage: {
    height: 72,
    width: 72,
  },
});

export default PromoCard;
