import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import Animated, { useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { formatCurrency } from '../Hooks/formatCurrency';

const colors = [
  'rgba(244, 67, 54, 0.8)',
  'rgba(33, 150, 243, 0.8)',
  'rgba(255, 235, 59, 0.8)',
  'rgba(76, 175, 80, 0.8)',
  'rgba(156, 39, 176, 0.8)',
];

type dataProps = {
  data: [
    {
      category: string,
      category_total: number
    }
  ]
}

const ExpenseBreakdownChart: React.FC<dataProps> = ({
  data,
}) => {
  const totalSpending = data.reduce((acc, curr) => acc + curr.category_total, 0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(1, { duration: 500, easing: Easing.bounce }) }],
  }));

  const pieData = data
    .filter(item => item.category_total > 0)
    .map((item, index) => ({
      key: `${item.category}-${index}`,
      value: item.category_total,
      svg: { fill: colors[index % colors.length] },
      arc: { outerRadius: '100%', innerRadius: '80%', cornerRadius: 0 },
    }));

  return (
    <View>
      {pieData.length === 0 ? (
        <Text>No data available</Text>
      ) : (
        <Animated.View style={[animatedStyle]}>
          <PieChart style={styles.chart} data={pieData} />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText} accessibilityLabel="Total Spending">Total</Text>
            <Text style={styles.totalAmount}>
              {formatCurrency(totalSpending)}
            </Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chart: {
    height: 200,
  },
  totalContainer: {
    position: 'absolute',
    alignItems: 'center',
    top: 75,
    left: 50,
    right: 50,
    bottom: 0
  },
  totalText: {
    fontSize: 16,
  },
  totalAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#505383',
  },
});

export default ExpenseBreakdownChart;
