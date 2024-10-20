import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { getAdminStats } from '../../Data/StatsService';
import ExpenseBreakdownChart from '../../Components/ExpenseBreakdownChart';
import { formatCurrency } from '../../Hooks/formatCurrency';
import Font from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

type Breakdown = {
  category: string;
  category_total: number;
};

const initialBreakdown: Breakdown[] = [{
  category: '',
  category_total: 0,
}];

const colors = ['rgba(244, 67, 54, 0.8)', 'rgba(33, 150, 243, 0.8)', 'rgba(255, 235, 59, 0.8)', 'rgba(76, 175, 80, 0.8)', 'rgba(156, 39, 176, 0.8)'];
const iconName = ['shopping-music', 'food', 'home-city', 'car', 'tshirt-crew'];

const AdminStats = () => {
  const [categoryBreakdown, setCategoryBreakdown] = useState<Breakdown[]>(initialBreakdown);
  const [startDate, setStartDate] = useState<Date>(new Date('2024-10-01'));
  const [endDate, setEndDate] = useState<Date>(new Date('2024-10-31'));
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);
  const navigation = useNavigation();

  async function fetchAdminStats() {
    const breakdown = await getAdminStats(startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]);
    setCategoryBreakdown(breakdown);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchAdminStats();
    });
    return unsubscribe;
  }, [navigation]);
  
  useEffect(() => {
    fetchAdminStats();
  }, [startDate, endDate]);

  const renderStartEndDate = () => {
    return (
      <View style={styles.datePickerContainer}>
        <TouchableOpacity onPress={() => setOpenStartDatePicker(true)}>
          <Text style={styles.date}>{`Start Date: ${startDate.toISOString().split('T')[0]}`}</Text>
        </TouchableOpacity>
        <DatePicker
          modal
          open={openStartDatePicker}
          date={startDate}
          mode="date"
          onConfirm={(date) => {
            setOpenStartDatePicker(false);
            setStartDate(date);
          }}
          onCancel={() => {
            setOpenStartDatePicker(false);
          }}
        />

        <TouchableOpacity onPress={() => setOpenEndDatePicker(true)}>
          <Text style={styles.date}>{`End Date: ${endDate.toISOString().split('T')[0]}`}</Text>
        </TouchableOpacity>
        <DatePicker
          modal
          open={openEndDatePicker}
          date={endDate}
          mode="date"
          onConfirm={(date) => {
            setOpenEndDatePicker(false);
            setEndDate(date);
          }}
          onCancel={() => {
            setOpenEndDatePicker(false);
          }}
        />
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.statisticsContainer}>
        <Text style={styles.title}>All User Expenses</Text>
        {renderStartEndDate()}
        <ExpenseBreakdownChart data={categoryBreakdown} />
      </View>

      <View style={styles.bgContainer}>
        <Text style={styles.title}>Category</Text>
        <View style={styles.categoryContainer}>
          {categoryBreakdown.map((item, index) => (
            <View key={`${item.category}-${index}`} style={styles.categoryItem}>
              <Text style={styles.categoryText}>{item.category || 'No Category'}</Text>
              <View style={{ alignItems: 'center' }}>
                <View style={{ borderWidth: 2, borderColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 500, marginVertical: 20 }}>
                  <Font name={iconName[index]} size={36} color={colors[index]} style={{ margin: 20 }} />
                </View>
                <Text style={styles.categoryText}>{formatCurrency(item.category_total)}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50,
  },
  date: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#505383'
  },
  bgContainer: {
    padding: 10,
    marginBottom: 5,
  },
  statisticsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    marginBottom: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  categoryItem: {
    backgroundColor: '#505383',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    width: '45%',
    marginHorizontal: 5,
  },
  categoryText: {
    color: '#FFF',
    fontFamily: 'Poppins-SemiBold',
  },
  datePickerContainer: {
    margin: 20,
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default AdminStats;
