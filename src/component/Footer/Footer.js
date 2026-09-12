import React, { useContext } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
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
    icon: icons.desk,
    iconActive: icons.deskActive,
    iconInactive: icons.deskInactive,
    isDesk: true,
  },
  {
    key: 'Rides',
    label: 'RIDES',
    icon: icons.rides,
    iconActive: icons.ridesActive || icons.rides,
    iconInactive: icons.rides,
  },
  {
    key: 'Earnings',
    label: 'EARNINGS',
    icon: icons.earnings,
    iconActive: icons.earningsActive || icons.earnings,
    iconInactive: icons.earnings,
  },
  {
    key: 'Alerts',
    label: 'ALERTS',
    icon: icons.alerts,
    iconActive: icons.alertsActive || icons.alerts,
    iconInactive: icons.alerts,
  },
  {
    key: 'Profile',
    label: 'PROFILE',
    icon: icons.profile,
    iconActive: icons.profileActive || icons.profile,
    iconInactive: icons.profile,
  },
];

/**
 * Modern floating bottom tab bar matching reference UI.
 * Compatible both with React Navigation (as `tabBar={props => <Footer {...props} />}`)
 * and standalone usage with `activeTab` and `onTabChange`.
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
      style={[
        styles.wrapper,
        { paddingBottom: Math.max(bottomInset, 8) },
      ]}
    >
      {!hidePinBar ? (
        <View style={styles.pinBar}>
          <Text style={styles.lockIcon}>▢</Text>
          <Text style={styles.pinText}>Never start without the rider PIN.</Text>
        </View>
      ) : null}

      <View style={styles.floatingBar}>
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

          return (
            <Pressable
              key={tab.key}
              testID={`tab-${tab.key.toLowerCase()}`}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={tab.label}
              style={({ pressed }) => [
                styles.tabItem,
                pressed && styles.tabItemPressed,
              ]}
              onPress={() => handleTabPress(tab.key, effectiveIndex, routeKey, routeName)}
            >
              {/* Icon Container */}
              <View
                style={[
                  styles.iconSlot,
                  isActive && !tab.isDesk && styles.activeIconSlot,
                ]}
              >
                {tab.isDesk ? (
                  isActive ? (
                    <Image
                      source={icons.deskActive}
                      style={styles.deskActiveImg}
                      resizeMode="contain"
                    />
                  ) : (
                    <Image
                      source={icons.deskInactive}
                      style={styles.deskInactiveImg}
                      resizeMode="contain"
                    />
                  )
                ) : (
                  <Image
                    source={
                      isActive
                        ? tab.iconActive || tab.icon
                        : tab.iconInactive || tab.icon
                    }
                    style={[
                      styles.standardIcon,
                      isActive ? styles.activeIconTint : styles.inactiveIconTint,
                      tab.key === 'Rides' && styles.carIcon,
                      tab.key === 'Earnings' && styles.earningsIcon,
                      tab.key === 'Alerts' && styles.alertsIcon,
                      tab.key === 'Profile' && styles.profileIcon,
                    ]}
                    resizeMode="contain"
                  />
                )}
              </View>

              {/* Label */}
              <Text
                style={[
                  styles.tabLabel,
                  isActive ? styles.tabLabelActive : styles.tabLabelInactive,
                ]}
              >
                {tab.label}
              </Text>

              {/* Active Indicator Underline */}
              <View
                style={[
                  styles.indicator,
                  isActive
                    ? styles.activeIndicator
                    : styles.inactiveIndicator,
                ]}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
    paddingHorizontal: 12,
    paddingTop: 4,
  },
  pinBar: {
    alignItems: 'center',
    backgroundColor: colors.graphite950,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 6,
    height: 28,
    justifyContent: 'center',
    marginBottom: 8,
  },
  lockIcon: {
    color: colors.ivory100,
    fontSize: 11,
  },
  pinText: {
    color: colors.ivory100,
    fontSize: 10,
    fontWeight: '500',
  },
  floatingBar: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E6E8DE',
    borderRadius: 32,
    borderWidth: 1,
    elevation: 8,
    flexDirection: 'row',
    height: 74,
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  tabItemPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  iconSlot: {
    alignItems: 'center',
    height: 38,
    justifyContent: 'center',
    width: 44,
  },
  activeIconSlot: {
    backgroundColor: '#121418',
    borderRadius: 12,
    height: 36,
    width: 42,
  },
  activeIconTint: {
    tintColor: '#FFD21A',
  },
  inactiveIconTint: {
    tintColor: '#5C5E62',
  },
  deskActiveImg: {
    height: 38,
    width: 44,
  },
  deskInactiveImg: {
    height: 22,
    tintColor: '#5C5E62',
    width: 22,
  },
  standardIcon: {
    height: 22,
    width: 22,
  },
  carIcon: {
    height: 21,
    width: 23,
  },
  earningsIcon: {
    height: 23,
    width: 23,
  },
  alertsIcon: {
    height: 23,
    width: 23,
  },
  profileIcon: {
    height: 21,
    width: 21,
  },
  tabLabel: {
    fontSize: 10,
    letterSpacing: 0.5,
    marginTop: 3,
    textTransform: 'uppercase',
  },
  tabLabelActive: {
    color: '#0F1014',
    fontWeight: '800',
  },
  tabLabelInactive: {
    color: '#5C5E62',
    fontWeight: '600',
  },
  indicator: {
    borderRadius: 2,
    height: 3,
    marginTop: 3,
    width: 32,
  },
  activeIndicator: {
    backgroundColor: '#FFD21A', // Bright Dispatch Yellow
  },
  inactiveIndicator: {
    backgroundColor: 'transparent',
  },
});

export default Footer;

