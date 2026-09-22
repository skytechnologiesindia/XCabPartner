/**
 * XCAB Earnings Mock Data
 * Structured mock data for weekly, monthly, and yearly driver earnings,
 * statistics, payout projections, and transaction histories.
 */

export const earningsData = {
  weekly: {
    periodKey: 'weekly',
    label: 'This Week',
    total: '₹4,860',
    totalAmount: 4860,
    growth: '+12% from last week',
    growthPositive: true,
    chart: [
      { day: 'Mon', amount: '₹320', value: 320, isHighest: false },
      { day: 'Tue', amount: '₹450', value: 450, isHighest: false },
      { day: 'Wed', amount: '₹620', value: 620, isHighest: false },
      { day: 'Thu', amount: '₹1,120', value: 1120, isHighest: true },
      { day: 'Fri', amount: '₹780', value: 780, isHighest: false },
      { day: 'Sat', amount: '₹620', value: 620, isHighest: false },
      { day: 'Sun', amount: '₹450', value: 450, isHighest: false },
    ],
    stats: {
      rides: 26,
      ridesLabel: 'Rides',
      onlineTime: '9h 32m',
      onlineTimeLabel: 'Online Time',
      avgFare: '₹186',
      avgFareLabel: 'Avg. Fare',
    },
    payout: {
      date: 'Tuesday, 23 Sep',
      amount: '₹4,200',
      status: 'Processing',
    },
  },

  monthly: {
    periodKey: 'monthly',
    label: 'This Month',
    total: '₹21,450',
    totalAmount: 21450,
    growth: '+18% from last month',
    growthPositive: true,
    chart: [
      { day: 'W1', amount: '₹4,860', value: 4860, isHighest: false },
      { day: 'W2', amount: '₹5,320', value: 5320, isHighest: false },
      { day: 'W3', amount: '₹6,150', value: 6150, isHighest: true },
      { day: 'W4', amount: '₹5,120', value: 5120, isHighest: false },
    ],
    stats: {
      rides: 114,
      ridesLabel: 'Rides',
      onlineTime: '42h 10m',
      onlineTimeLabel: 'Online Time',
      avgFare: '₹188',
      avgFareLabel: 'Avg. Fare',
    },
    payout: {
      date: 'Tuesday, 30 Sep',
      amount: '₹5,850',
      status: 'Processing',
    },
  },

  yearly: {
    periodKey: 'yearly',
    label: 'This Year',
    total: '₹2,48,600',
    totalAmount: 248600,
    growth: '+24% from last year',
    growthPositive: true,
    chart: [
      { day: 'Q1', amount: '₹58k', value: 58000, isHighest: false },
      { day: 'Q2', amount: '₹64k', value: 64000, isHighest: false },
      { day: 'Q3', amount: '₹72k', value: 72000, isHighest: true },
      { day: 'Q4', amount: '₹54k', value: 54000, isHighest: false },
    ],
    stats: {
      rides: 1320,
      ridesLabel: 'Rides',
      onlineTime: '512 hrs',
      onlineTimeLabel: 'Online Time',
      avgFare: '₹188',
      avgFareLabel: 'Avg. Fare',
    },
    payout: {
      date: 'Tuesday, 23 Sep',
      amount: '₹4,200',
      status: 'Processing',
    },
  },
};

export const transactionsData = [
  {
    id: 'tx-001',
    title: 'Ride Payment',
    route: 'Lalpur Market → Kanke',
    timestamp: '18 Sep 2025, 10:24 AM',
    amount: '₹180',
    method: 'Cash',
    type: 'completed',
  },
  {
    id: 'tx-002',
    title: 'Ride Payment',
    route: 'Main Road → Morabadi',
    timestamp: '18 Sep 2025, 08:12 AM',
    amount: '₹205',
    method: 'UPI',
    type: 'completed',
  },
  {
    id: 'tx-003',
    title: 'Cancelled Trip',
    route: 'Station Road → Khelgaon',
    timestamp: '17 Sep 2025, 06:42 PM',
    amount: '₹0',
    method: '-',
    type: 'cancelled',
  },
  {
    id: 'tx-004',
    title: 'Ride Payment',
    route: 'Airport Road → Hatia',
    timestamp: '17 Sep 2025, 04:18 PM',
    amount: '₹260',
    method: 'Cash',
    type: 'completed',
  },
  {
    id: 'tx-005',
    title: 'Ride Payment',
    route: 'Doranda → Hinoo',
    timestamp: '17 Sep 2025, 01:30 PM',
    amount: '₹140',
    method: 'UPI',
    type: 'completed',
  },
];

export default {
  earningsData,
  transactionsData,
};
