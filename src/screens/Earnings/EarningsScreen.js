import React, { useEffect, useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { icons } from '../../assets/icons';
import styles from '../../assets/styles/styles';
import {
  EarningsPeriodSelector,
  EarningsSkeleton,
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
  const [isLoading, setIsLoading] = useState(true);

  // 2-second simulation delay for skeleton loading presentation
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [period]);

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
    <View style={{ flex: 1, backgroundColor: '#F7F5EF' }}>
      {/* Fixed Top Header (Non-scrollable) */}
      <View
        style={[
          styles.pdb12,
          styles.pdh16,
          styles.pdt12,
          {
            backgroundColor: '#F7F5EF',
            borderBottomColor: 'rgba(0, 0, 0, 0.06)',
            borderBottomWidth: 1,
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.04,
            shadowRadius: 3,
            zIndex: 10,
          },
        ]}
      >
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View style={[styles.mr12, { flex: 1 }]}>
            <Text
              style={{
                color: '#17191C',
                fontSize: 30,
                fontWeight: '800',
                letterSpacing: -0.6,
              }}
            >
              Earnings
            </Text>
            <Text
              style={[
                styles.ts14,
                styles.mt4,
                {
                  color: '#687078',
                  fontWeight: '400',
                },
              ]}
            >
              Track your income and transactions
            </Text>
          </View>

          <EarningsPeriodSelector
            activePeriod={period}
            onSelectPeriod={setPeriod}
          />
        </View>
      </View>

      {/* Scrollable Earnings Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: 110,
          paddingHorizontal: 16,
          paddingTop: 14,
        }}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <EarningsSkeleton />
        ) : (
          <>
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
                styles.pdh16,
                styles.mb16,
                {
                  alignItems: 'center',
                  backgroundColor: pressed ? '#E5B420' : '#FFC928',
                  borderRadius: 14,
                  flexDirection: 'row',
                  height: 48,
                  justifyContent: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.06,
                  shadowRadius: 4,
                  elevation: 2,
                },
              ]}
              onPress={handleViewAllTransactions}
              accessibilityRole="button"
              accessibilityLabel="View Transactions"
            >
              <Image
                source={icons.statWallet}
                style={[
                  styles.mr8,
                  {
                    height: 18,
                    width: 18,
                  },
                ]}
                tintColor="#17191C"
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.ts15,
                  {
                    color: '#17191C',
                    fontWeight: '800',
                    letterSpacing: -0.1,
                  },
                ]}
              >
                View Transactions
              </Text>
              <Text
                style={[
                  styles.ts16,
                  styles.ml8,
                  {
                    color: '#17191C',
                    fontWeight: '800',
                  },
                ]}
              >
                →
              </Text>
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
          </>
        )}
      </ScrollView>
    </View>
  );
}

export default EarningsScreen;
