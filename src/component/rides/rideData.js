/**
 * XCAB Mock Ride Data
 * Structured mock ride records for Driver App Rides screen.
 * Easy to replace with real REST/GraphQL API data without altering UI components.
 */

export const MOCK_RIDES = [
  // --- TODAY: 18 Sep 2025 ---
  {
    id: 'XA3B9211',
    date: '18 Sep 2025',
    dateGroup: 'Today',
    time: '10:24 AM',
    pickup: 'Main Road',
    pickupCity: 'Ranchi',
    drop: 'Lalpur Market',
    dropCity: 'Ranchi',
    rider: 'Aarav M.',
    riderRating: '4.8',
    duration: '18 min',
    distance: '6.4 km',
    fare: '₹180',
    fareAmount: 180,
    paymentMethod: 'Cash',
    status: 'completed',
    breakdown: {
      baseFare: '₹50',
      distanceFare: '₹95',
      timeFare: '₹35',
      taxes: '₹15',
      driverEarning: '₹165',
    },
  },
  {
    id: 'XA7E2011',
    date: '18 Sep 2025',
    dateGroup: 'Today',
    time: '08:12 AM',
    pickup: 'Airport Road',
    pickupCity: 'Ranchi',
    drop: 'Kanke',
    dropCity: 'Ranchi',
    rider: 'Priya S.',
    riderRating: '4.9',
    duration: '26 min',
    distance: '9.8 km',
    fare: '₹205',
    fareAmount: 205,
    paymentMethod: 'UPI',
    status: 'completed',
    breakdown: {
      baseFare: '₹60',
      distanceFare: '₹115',
      timeFare: '₹30',
      taxes: '₹18',
      driverEarning: '₹187',
    },
  },

  // --- YESTERDAY: 17 Sep 2025 ---
  {
    id: 'XA9D4E90',
    date: '17 Sep 2025',
    dateGroup: 'Yesterday',
    time: '06:42 PM',
    pickup: 'Station Road',
    pickupCity: 'Ranchi',
    drop: 'Morabadi',
    dropCity: 'Ranchi',
    rider: '-',
    riderRating: '-',
    duration: '-',
    distance: '-',
    fare: '₹0',
    fareAmount: 0,
    paymentMethod: '-',
    status: 'cancelled',
    cancellationReason: 'Cancelled by rider before pickup',
    breakdown: {
      baseFare: '₹0',
      distanceFare: '₹0',
      timeFare: '₹0',
      taxes: '₹0',
      driverEarning: '₹0',
    },
  },
  {
    id: 'XA4C1982',
    date: '17 Sep 2025',
    dateGroup: 'Yesterday',
    time: '04:15 PM',
    pickup: 'Doranda',
    pickupCity: 'Ranchi',
    drop: 'Hinoo',
    dropCity: 'Ranchi',
    rider: 'Rohit K.',
    riderRating: '4.7',
    duration: '14 min',
    distance: '4.2 km',
    fare: '₹135',
    fareAmount: 135,
    paymentMethod: 'Cash',
    status: 'completed',
    breakdown: {
      baseFare: '₹45',
      distanceFare: '₹65',
      timeFare: '₹25',
      taxes: '₹10',
      driverEarning: '₹125',
    },
  },
  {
    id: 'XA2F8741',
    date: '17 Sep 2025',
    dateGroup: 'Yesterday',
    time: '01:50 PM',
    pickup: 'Harmu Colony',
    pickupCity: 'Ranchi',
    drop: 'Ratu Road',
    dropCity: 'Ranchi',
    rider: 'Sneha P.',
    riderRating: '5.0',
    duration: '22 min',
    distance: '7.1 km',
    fare: '₹190',
    fareAmount: 190,
    paymentMethod: 'UPI',
    status: 'completed',
    breakdown: {
      baseFare: '₹55',
      distanceFare: '₹100',
      timeFare: '₹35',
      taxes: '₹15',
      driverEarning: '₹175',
    },
  },
  {
    id: 'XA8B5620',
    date: '17 Sep 2025',
    dateGroup: 'Yesterday',
    time: '11:10 AM',
    pickup: 'Birsa Chowk',
    pickupCity: 'Ranchi',
    drop: 'Namkum',
    dropCity: 'Ranchi',
    rider: 'Vikas T.',
    riderRating: '4.6',
    duration: '31 min',
    distance: '12.4 km',
    fare: '₹280',
    fareAmount: 280,
    paymentMethod: 'Cash',
    status: 'completed',
    breakdown: {
      baseFare: '₹70',
      distanceFare: '₹160',
      timeFare: '₹50',
      taxes: '₹25',
      driverEarning: '₹255',
    },
  },
  {
    id: 'XA1D9043',
    date: '17 Sep 2025',
    dateGroup: 'Yesterday',
    time: '09:05 AM',
    pickup: 'Bariatu',
    pickupCity: 'Ranchi',
    drop: 'Circular Road',
    dropCity: 'Ranchi',
    rider: '-',
    riderRating: '-',
    duration: '-',
    distance: '-',
    fare: '₹0',
    fareAmount: 0,
    paymentMethod: '-',
    status: 'cancelled',
    cancellationReason: 'Rider cancelled due to change of plans',
    breakdown: {
      baseFare: '₹0',
      distanceFare: '₹0',
      timeFare: '₹0',
      taxes: '₹0',
      driverEarning: '₹0',
    },
  },

  // --- EARLIER: 16 Sep 2025 ---
  {
    id: 'XA6M3189',
    date: '16 Sep 2025',
    dateGroup: '16 Sep 2025',
    time: '07:30 PM',
    pickup: 'Ashok Nagar',
    pickupCity: 'Ranchi',
    drop: 'Kantatoli',
    dropCity: 'Ranchi',
    rider: 'Manish G.',
    riderRating: '4.8',
    duration: '19 min',
    distance: '5.8 km',
    fare: '₹160',
    fareAmount: 160,
    paymentMethod: 'UPI',
    status: 'completed',
    breakdown: {
      baseFare: '₹50',
      distanceFare: '₹85',
      timeFare: '₹25',
      taxes: '₹12',
      driverEarning: '₹148',
    },
  },
  {
    id: 'XA5H7721',
    date: '16 Sep 2025',
    dateGroup: '16 Sep 2025',
    time: '03:40 PM',
    pickup: 'Kokar Area',
    pickupCity: 'Ranchi',
    drop: 'Argora Chowk',
    dropCity: 'Ranchi',
    rider: 'Neha R.',
    riderRating: '4.9',
    duration: '28 min',
    distance: '8.6 km',
    fare: '₹220',
    fareAmount: 220,
    paymentMethod: 'Cash',
    status: 'completed',
    breakdown: {
      baseFare: '₹60',
      distanceFare: '₹120',
      timeFare: '₹40',
      taxes: '₹18',
      driverEarning: '₹202',
    },
  },
  {
    id: 'XA0K4412',
    date: '16 Sep 2025',
    dateGroup: '16 Sep 2025',
    time: '12:15 PM',
    pickup: 'Dhurwa',
    pickupCity: 'Ranchi',
    drop: 'HEC Township',
    dropCity: 'Ranchi',
    rider: 'Kunal S.',
    riderRating: '4.7',
    duration: '12 min',
    distance: '3.9 km',
    fare: '₹110',
    fareAmount: 110,
    paymentMethod: 'Cash',
    status: 'completed',
    breakdown: {
      baseFare: '₹40',
      distanceFare: '55',
      timeFare: '₹15',
      taxes: '₹8',
      driverEarning: '₹102',
    },
  },
  {
    id: 'XA8P9920',
    date: '16 Sep 2025',
    dateGroup: '16 Sep 2025',
    time: '10:00 AM',
    pickup: 'Chutia',
    pickupCity: 'Ranchi',
    drop: 'Overbridge',
    dropCity: 'Ranchi',
    rider: '-',
    riderRating: '-',
    duration: '-',
    distance: '-',
    fare: '₹0',
    fareAmount: 0,
    paymentMethod: '-',
    status: 'cancelled',
    cancellationReason: 'Rider found alternate transport',
    breakdown: {
      baseFare: '₹0',
      distanceFare: '₹0',
      timeFare: '₹0',
      taxes: '₹0',
      driverEarning: '₹0',
    },
  },
  {
    id: 'XA3N6518',
    date: '16 Sep 2025',
    dateGroup: '16 Sep 2025',
    time: '08:30 AM',
    pickup: 'Tupudana',
    pickupCity: 'Ranchi',
    drop: 'Hatia Station',
    dropCity: 'Ranchi',
    rider: 'Deepak V.',
    riderRating: '4.8',
    duration: '16 min',
    distance: '5.1 km',
    fare: '₹145',
    fareAmount: 145,
    paymentMethod: 'UPI',
    status: 'completed',
    breakdown: {
      baseFare: '₹45',
      distanceFare: '₹75',
      timeFare: '₹25',
      taxes: '₹12',
      driverEarning: '₹133',
    },
  },
];

/**
 * Filter rides by active tab: 'all' | 'completed' | 'cancelled'
 */
export function getFilteredRides(rides, filter) {
  if (filter === 'completed') {
    return rides.filter(r => r.status === 'completed');
  }
  if (filter === 'cancelled') {
    return rides.filter(r => r.status === 'cancelled');
  }
  return rides;
}

/**
 * Group list of rides by dateGroup (e.g. 'Today', 'Yesterday')
 * Returns array of { dateGroup: string, date: string, rides: Ride[] }
 */
export function groupRidesByDate(rides) {
  const groups = [];
  const map = new Map();

  rides.forEach(ride => {
    const key = ride.dateGroup;
    if (!map.has(key)) {
      const group = {
        dateGroup: key,
        date: ride.date,
        rides: [],
      };
      map.set(key, group);
      groups.push(group);
    }
    map.get(key).rides.push(ride);
  });

  return groups;
}

/**
 * Get count totals for filter tabs
 */
export function getFilterCounts(rides = MOCK_RIDES) {
  const completed = rides.filter(r => r.status === 'completed').length;
  const cancelled = rides.filter(r => r.status === 'cancelled').length;
  return {
    all: rides.length,
    completed,
    cancelled,
  };
}

export default MOCK_RIDES;
