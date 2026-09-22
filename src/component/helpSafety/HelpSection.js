import React from 'react';
import { Text, View } from 'react-native';
import styles from '../../assets/styles/styles';
import HelpMenuItem from './HelpMenuItem';
import { helpItems as defaultHelpItems } from './helpSafetyData';

/**
 * HelpSection
 * "Get Help" card enclosing problem reporting, FAQs, and support inquiry options with utility styles.
 */
function HelpSection({ items = defaultHelpItems, onItemPress }) {
  return (
    <View style={styles.mb16}>
      <Text
        style={[
          styles.ts16,
          styles.mb8,
          {
            color: '#17191C',
            fontWeight: '800',
            letterSpacing: -0.3,
          },
        ]}
      >
        Get Help
      </Text>

      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#EFECE6',
          borderRadius: 16,
          borderWidth: 1,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.04,
          shadowRadius: 4,
          elevation: 1.5,
        }}
      >
        {items.map((item, index) => (
          <HelpMenuItem
            key={item.id}
            iconType={item.iconType}
            title={item.title}
            subtitle={item.subtitle}
            onPress={() => onItemPress && onItemPress(item)}
            isLast={index === items.length - 1}
          />
        ))}
      </View>
    </View>
  );
}

export default HelpSection;
