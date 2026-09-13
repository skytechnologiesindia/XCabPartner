import React, { useContext } from 'react';
import {
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { colors } from '../../assets/colors/colors';
import { icons } from '../../assets/icons';

const TABS = [
  {
    key: 'Desk',
    label: 'DESK',
    icon: icons.deskInactive || icons.desk,
  },
  {
    key: 'Rides',
    label: 'RIDES',
    icon: icons.rides,
  },
  {
    key: 'Earnings',
    label: 'EARNINGS',
    icon: icons.earnings,
  },
  {
    key: 'Alerts',
    label: 'ALERTS',
    icon: icons.bellOutline || icons.alerts,
    badge: '2',
  },
  {
    key: 'Profile',
    label: 'PROFILE',
    icon: icons.profile,
  },
];

/**
 * Integrated bottom navigation footer matching XCAB design system.
 * Uses inline styling for direct presentation control.
 */
function Footer(props) {
  const contextInsets = useContext(SafeAreaInsetsContext);

  const {
    state,
    navigation,
    hidePinBar = true,
    activeTab,
    onTabChange,
  } = props;

  // Detect active route key: from React Navigation state or standalone activeTab
  const currentTabName = state
    ? state.routes[state.index]?.name
    : activeTab || 'Desk';

  const handleTabPress = (tabKey, routeIndex, routeKey, routeName) => {
    if (navigation && state) {
      const isFocused = state.index === routeIndex;
      const event = navigation.emit({
        type: 'tabPress',
        target: routeKey,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate({ name: routeName || tabKey, merge: true });
      }
    }
    if (onTabChange) {
      onTabChange(tabKey);
    }
  };

  const bottomInset = props.insets?.bottom ?? contextInsets?.bottom ?? 0;

  return (
    <View
      style={{
        backgroundColor: '#F7F5EF',
        borderTopColor: '#DDD9CF',
        borderTopWidth: 1,
        paddingTop: 8,
        paddingBottom: Math.max(bottomInset, 8),
        width: '100%',
      }}
    >
      {!hidePinBar ? (
        <View
          style={{
            alignItems: 'center',
            backgroundColor: colors.graphite950,
            borderRadius: 8,
            flexDirection: 'row',
            gap: 6,
            height: 28,
            justifyContent: 'center',
            marginBottom: 8,
            marginHorizontal: 16,
          }}
        >
          <Text style={{ color: colors.ivory100, fontSize: 11 }}>▢</Text>
          <Text
            style={{
              color: colors.ivory100,
              fontSize: 10,
              fontWeight: '500',
            }}
          >
            Never start without the rider PIN.
          </Text>
        </View>
      ) : null}

      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          height: 52,
          justifyContent: 'space-between',
          paddingHorizontal: 6,
          width: '100%',
        }}
      >
        {TABS.map((tab, index) => {
          const isActive =
            currentTabName.toLowerCase() === tab.key.toLowerCase();
          const route = state?.routes?.find(
            r => r.name.toLowerCase() === tab.key.toLowerCase(),
          );
          const stateRouteIndex = state?.routes?.findIndex(
            r => r.name.toLowerCase() === tab.key.toLowerCase(),
          );
          const effectiveIndex =
            stateRouteIndex !== -1 && stateRouteIndex !== undefined
              ? stateRouteIndex
              : index;
          const routeKey = route ? route.key : tab.key;
          const routeName = route ? route.name : tab.key;

          const tint = isActive ? '#FFC928' : '#687078';

          const iconWidth =
            tab.key === 'Rides'
              ? 23
              : tab.key === 'Earnings' || tab.key === 'Profile'
              ? 21
              : 22;
          const iconHeight =
            tab.key === 'Rides'
              ? 20
              : tab.key === 'Earnings' || tab.key === 'Profile'
              ? 21
              : 22;

          return (
            <Pressable
              key={tab.key}
              testID={`tab-${tab.key.toLowerCase()}`}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={tab.label}
              style={({ pressed }) => ({
                alignItems: 'center',
                flex: 1,
                height: '100%',
                justifyContent: 'center',
                opacity: pressed ? 0.7 : 1,
              })}
              onPress={() =>
                handleTabPress(tab.key, effectiveIndex, routeKey, routeName)
              }
            >
              {/* Icon Container with optional notification badge */}
              <View
                style={{
                  alignItems: 'center',
                  height: 24,
                  justifyContent: 'center',
                  position: 'relative',
                  width: 28,
                }}
              >
                <Image
                  source={tab.icon}
                  style={{
                    height: iconHeight,
                    tintColor: tint,
                    width: iconWidth,
                  }}
                  resizeMode="contain"
                />
                {tab.badge ? (
                  <View
                    style={{
                      alignItems: 'center',
                      backgroundColor: '#FFC928',
                      borderRadius: 7.5,
                      height: 15,
                      justifyContent: 'center',
                      position: 'absolute',
                      right: -5,
                      top: -3,
                      width: 15,
                    }}
                  >
                    <Text
                      style={{
                        color: '#17191C',
                        fontSize: 9.5,
                        fontWeight: '700',
                        includeFontPadding: false,
                        lineHeight: 11,
                        textAlign: 'center',
                      }}
                    >
                      {tab.badge}
                    </Text>
                  </View>
                ) : null}
              </View>

              {/* Label */}
              <Text
                style={{
                  color: isActive ? '#17191C' : '#687078',
                  fontSize: 10,
                  fontWeight: isActive ? '700' : '600',
                  letterSpacing: 0.4,
                  marginTop: 4,
                  textTransform: 'uppercase',
                }}
              >
                {tab.label}
              </Text>

              {/* Active Indicator Underline */}
              <View
                style={{
                  backgroundColor: isActive ? '#FFC928' : 'transparent',
                  borderRadius: 1.5,
                  height: 2.5,
                  marginTop: 4,
                  width: 28,
                }}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default Footer;
