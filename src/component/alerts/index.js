export { default as AlertsFilterTabs } from './AlertsFilterTabs';
export { default as AlertCard } from './AlertCard';
export { default as AlertCardSkeleton } from './AlertCardSkeleton';
export { default as AlertIcon } from './AlertIcon';
export { default as MarkAllReadButton } from './MarkAllReadButton';
export {
  alertsData,
  getFilteredAlerts,
  getUnreadCount,
} from './alertsData';

export default {
  AlertsFilterTabs: require('./AlertsFilterTabs').default,
  AlertCard: require('./AlertCard').default,
  AlertCardSkeleton: require('./AlertCardSkeleton').default,
  AlertIcon: require('./AlertIcon').default,
  MarkAllReadButton: require('./MarkAllReadButton').default,
  alertsData: require('./alertsData').alertsData,
};
