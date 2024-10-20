import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../../Data/db';
import { getToken } from '../../Data/Auth';
import { decode } from "react-native-pure-jwt";
import { SECRET_KEY } from '@env';
import { formatCurrency } from '../../Hooks/formatCurrency';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ExpenseDetailPage = () => {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const categoryIcons = {
    Entertainment: { name: 'shopping-music', color: 'rgba(244, 67, 54, 0.8)' },
    Food: { name: 'food', color: 'rgba(33, 150, 243, 0.8)' },
    Rent: { name: 'home-city', color: 'rgba(255, 235, 59, 0.8)' },
    Transport: { name: 'car', color: 'rgba(76, 175, 80, 0.8)' },
    Utilities: { name: 'tshirt-crew', color: 'rgba(156, 39, 176, 0.8)' }
  };

  const handleDecodeToken = async (token: string, secret: string) => {
    try {
      const decodedToken = await decode(token, secret);
      return decodedToken?.payload;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      const token = await getToken();
      const decoded = await handleDecodeToken(token, SECRET_KEY);
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM userexpenses WHERE username = ? ORDER BY date DESC',
          [decoded?.username],
          (_, { rows }) => {
            const fetchedExpenses = [];
            for (let i = 0; i < rows.length; i++) {
              fetchedExpenses.push(rows.item(i));
            }
            setExpenses(fetchedExpenses);
            setLoading(false);
          },
          (tx, error) => {
            console.error('Error fetching expenses:', error);
            setLoading(false);
          }
        );
      });
    };

    fetchExpenses();
  }, []);

  const renderExpenseItem = ({ item }: { item: any }) => {
    const icon = categoryIcons[item.category] || { name: 'help', color: '#000' };
    return (
      <View style={styles.expenseItem}>
        <View style={styles.expenseDetails}>
          <Text style={[styles.expenseText, {fontSize: 14, color: '#505383'}]}>Date: {item.date}</Text>
          <Text style={styles.expenseText}>Category: {item.category}</Text>
          <Text style={styles.expenseText}>Nominal: {formatCurrency(item.nominal)}</Text>
        </View>
        <View style={[styles.iconContainer, { backgroundColor: icon.color }]}>
          <MaterialCommunityIcons name={icon.name} size={24} color="#fff" />
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expenses Detail</Text>
      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    marginBottom: 20,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  expenseDetails: {
    flex: 1,
  },
  expenseText: {
    fontSize: 12,
    marginBottom: 4,
    fontFamily: 'Poppins-Regular',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExpenseDetailPage;
