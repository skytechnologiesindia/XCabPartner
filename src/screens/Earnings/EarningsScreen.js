import React, { useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { icons } from '../../assets/icons';
import {
  EarningsPeriodSelector,
  EarningsStats,
  EarningsSummaryCard,
  EmptyTransactions,
  PayoutCard,
  TransactionCard,
  TransactionsHeader,
  earningsData,
  transactionsData,
} from '../../component/earnings';

/**
 * EarningsScreen
 * Clean container screen for driver financial performance, charts,
 * payout schedules, and recent ride payment transactions.
 */
function EarningsScreen({ navigation }) {
  const [period, setPeriod] = useState('weekly');

  // Dynamic period data
  const currentPeriodData = useMemo(() => {
    return earningsData[period] || earningsData.weekly;
  }, [period]);

  const handleViewAllTransactions = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('Rides');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Page Title & Period Selector */}
        <View style={styles.headerSection}>
          <View style={styles.titleCol}>
            <Text style={styles.titleText}>Earnings</Text>
            <Text style={styles.subtitleText}>
              Track your income and transactions
            </Text>
          </View>

          <EarningsPeriodSelector
            activePeriod={period}
            onSelectPeriod={setPeriod}
          />
        </View>

        {/* 2. Total Earnings Hero Card with Embedded Chart */}
        <EarningsSummaryCard
          total={currentPeriodData.total}
          growth={currentPeriodData.growth}
          growthPositive={currentPeriodData.growthPositive}
          chartData={currentPeriodData.chart}
        />

        {/* 3. Performance Metrics (Rides, Online Time, Avg Fare) */}
        <EarningsStats
          rides={currentPeriodData.stats.rides}
          ridesLabel={currentPeriodData.stats.ridesLabel}
          onlineTime={currentPeriodData.stats.onlineTime}
          onlineTimeLabel={currentPeriodData.stats.onlineTimeLabel}
          avgFare={currentPeriodData.stats.avgFare}
          avgFareLabel={currentPeriodData.stats.avgFareLabel}
        />

        {/* 4. Next Payout Schedule Card */}
        <PayoutCard
          date={currentPeriodData.payout.date}
          amount={currentPeriodData.payout.amount}
          status={currentPeriodData.payout.status}
          onPress={handleViewAllTransactions}
        />

        {/* 5. Primary Action Button: View Transactions */}
        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.primaryButtonPressed,
          ]}
          onPress={handleViewAllTransactions}
          accessibilityRole="button"
          accessibilityLabel="View Transactions"
        >
          <Image
            source={icons.statWallet}
            style={styles.buttonWalletIcon}
            tintColor="#17191C"
            resizeMode="contain"
          />
          <Text style={styles.primaryButtonText}>View Transactions</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </Pressable>

        {/* 6. Recent Transactions Section */}
        <TransactionsHeader onPressViewAll={handleViewAllTransactions} />

        {/* 7. Transaction Cards List */}
        {transactionsData && transactionsData.length > 0 ? (
          transactionsData.map(item => (
            <TransactionCard
              key={item.id}
              transaction={item}
              onPress={handleViewAllTransactions}
            />
          ))
        ) : (
          <EmptyTransactions />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F5EF',
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 110,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  headerSection: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  titleCol: {
    flex: 1,
    marginRight: 10,
  },
  titleText: {
    color: '#17191C',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  subtitleText: {
    color: '#687078',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 4,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#FFC928',
    borderRadius: 14,
    flexDirection: 'row',
    height: 48,
    justifyContent: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryButtonPressed: {
    backgroundColor: '#E5B420',
  },
  buttonWalletIcon: {
    height: 18,
    marginRight: 8,
    width: 18,
  },
  primaryButtonText: {
    color: '#17191C',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.1,
  },
  buttonArrow: {
    color: '#17191C',
    fontSize: 16,
    fontWeight: '800',
    marginLeft: 8,
  },
});

export default EarningsScreen;
