/**
 * XCAB Mock Alerts Data
 * Structured mock notification data for Driver App Alerts screen.
 * Structured to be easily replaced with live push/REST notification data.
 */

export const alertsData = [
  {
    id: 'alert-001',
    type: 'ride_request',
    category: 'trips',
    title: 'New ride request',
    subtitle: 'Pickup in 4 min',
    route: [
      { type: 'pickup', text: 'Main Road, Ranchi' },
      { type: 'drop', text: 'Lalpur Market' },
    ],
    time: 'Now',
    unread: true,
    targetScreen: 'Desk',
  },
  {
    id: 'alert-002',
    type: 'payout',
    category: 'payouts',
    title: 'Settlement confirmed',
    subtitle: 'Trip XC-1048',
    details: [
      'Payout of ₹180 credited',
      'Wallet Balance: ₹1,248',
    ],
    time: '12 min ago',
    unread: true,
    targetScreen: 'Earnings',
  },
  {
    id: 'alert-003',
    type: 'document',
    category: 'documents',
    title: 'Documents expire in 14 days',
    subtitle: 'Update RC',
    details: [
      'Your Vehicle RC will expire on 21 May 2025',
      'Update now to avoid disruptions.',
    ],
    time: 'Yesterday',
    unread: false,
    targetScreen: 'Profile',
  },
  {
    id: 'alert-004',
    type: 'high_demand',
    category: 'trips',
    title: 'High demand zone',
    subtitle: 'Morabadi',
    details: [
      'Higher earnings expected in your area',
      '7:00 PM – 10:00 PM',
    ],
    time: 'Mon 08:20',
    unread: false,
    targetScreen: 'Desk',
  },
  {
    id: 'alert-005',
    type: 'payout',
    category: 'payouts',
    title: 'Weekly payout processed',
    subtitle: 'HDFC Bank •••• 4821',
    details: [
      '₹4,200 transferred to your account',
      'Reference ID: UTR98213749',
    ],
    time: '15 Sep 2025',
    unread: false,
    targetScreen: 'Earnings',
  },
  {
    id: 'alert-006',
    type: 'ride_request',
    category: 'trips',
    title: 'Completed ride rated 5.0',
    subtitle: 'Trip XC-1042',
    details: [
      'Rider left positive feedback',
      '“Great driving and clean car!”',
    ],
    time: '15 Sep 2025',
    unread: false,
    targetScreen: 'Rides',
  },
];

/**
 * Filter alerts by category: 'all' | 'trips' | 'payouts'
 */
export function getFilteredAlerts(alerts, filter) {
  if (filter === 'trips') {
    return alerts.filter(a => a.category === 'trips');
  }
  if (filter === 'payouts') {
    return alerts.filter(a => a.category === 'payouts');
  }
  return alerts;
}

/**
 * Get count of unread alerts formatted with leading zero (e.g. "02")
 */
export function getUnreadCount(alerts) {
  const count = alerts.filter(a => a.unread).length;
  return count < 10 ? `0${count}` : `${count}`;
}

export default {
  alertsData,
  getFilteredAlerts,
  getUnreadCount,
};
