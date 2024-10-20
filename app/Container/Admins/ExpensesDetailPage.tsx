import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Dimensions, Button, Alert } from 'react-native';
import { db } from '../../Data/db';
import { formatCurrency } from '../../Hooks/formatCurrency';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TextInputET from '../../Components/TextInputET';
import DropdownET from '../../Components/DropdownET';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler'
import ConfirmationModal from '../../Components/ConfirmationModal';

type RootStackParamList = {
  ExpenseDetailPageAdmin: {
    username: string;
  };
};

const width = Dimensions.get('screen').width

const ExpenseDetailPageAdmin = () => {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);
  const [newCategory, setNewCategory] = useState<string>('');
  const [newCategoryFocus, setNewCategoryFocus] = useState<boolean>(false);
  const [newNominal, setNewNominal] = useState<string>('');
  const [newNominalFocus, setNewNominalFocus] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmModal] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  
  const route = useRoute<RouteProp<RootStackParamList, 'ExpenseDetailPageAdmin'>>();
  const { username } = route.params;
  const navigation = useNavigation();

  const categoryIcons = {
    Entertainment: { name: 'shopping-music', color: 'rgba(244, 67, 54, 0.8)' },
    Food: { name: 'food', color: 'rgba(33, 150, 243, 0.8)' },
    Rent: { name: 'home-city', color: 'rgba(255, 235, 59, 0.8)' },
    Transport: { name: 'car', color: 'rgba(76, 175, 80, 0.8)' },
    Utilities: { name: 'tshirt-crew', color: 'rgba(156, 39, 176, 0.8)' }
  };

  const roleDropdownData = [
    { label: 'Entertainment', value: 'Entertainment' },
    { label: 'Food', value: 'Food' },
    { label: 'Transport', value: 'Transport' },
    { label: 'Rent', value: 'Rent' },
    { label: 'Utilities', value: 'Utilities' },
];

  useEffect(() => {
    const fetchExpenses = async () => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM userexpenses WHERE username = ? ORDER BY date DESC',
          [username],
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
  }, [username]);

  useEffect(() => {
    if (showInfo) {
      Alert.alert("Info", "Swipe left to delete");
      setShowInfo(false)
    }
  }, [showInfo])

  const openEditModal = (expense: any) => {
    setSelectedExpense(expense);
    setNewCategory(expense.category);
    setNewNominal(expense.nominal.toString());
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (selectedExpense) {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM userexpenses WHERE id = ?',
          [selectedExpense.id],
          () => {
            setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== selectedExpense.id));
            setShowConfirmModal(false);
            setSelectedExpense(null);
          },
          (tx, error) => {
            console.error('Error deleting expense:', error);
          }
        );
      });
    }
  };
  const handleSave = () => {
    if (selectedExpense) {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE userexpenses SET category = ?, nominal = ? WHERE id = ?',
          [newCategory, parseFloat(newNominal), selectedExpense.id],
          () => {
            setExpenses(prevExpenses => 
              prevExpenses.map(expense => 
                expense.id === selectedExpense.id 
                ? { ...expense, category: newCategory, nominal: parseFloat(newNominal) }
                : expense
              )
            );
            setModalVisible(false);
            setSelectedExpense(null);
          },
          (tx, error) => {
            console.error('Error updating expense:', error);
          }
        );
      });
    }
  };

  const renderExpenseItem = (item: any) => {
    const icon = categoryIcons[item?.category] || { name: 'help', color: '#000' };
    return (
      <View style={styles.expenseItem}>
        <View style={styles.expenseDetails}>
          <Text style={[styles.expenseText, {fontSize: 14, color: '#505383'}]}>Date: {item?.date}</Text>
          <Text style={styles.expenseText}>Category: {item?.category}</Text>
          <Text style={styles.expenseText}>Nominal: {formatCurrency(item?.nominal)}</Text>
        </View>
        <View style={styles.rightSection}>
          <View style={[styles.iconContainer, { backgroundColor: icon.color }]}>
            <MaterialCommunityIcons name={icon.name} size={24} color="#fff" />
          </View>
          <TouchableOpacity onPress={() => openEditModal(item)} style={styles.editButton}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const leftSwipe = (progress: any, dragX: any, item: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedExpense(item);
          setShowConfirmModal(true);
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end',
          backgroundColor: '#FFE5E8',
          height: 107,
          marginTop: 8,
          marginBottom: 0,
          marginLeft: -268,
          borderRadius: 10,
          width: width - 64,
          borderWidth: 1,
          borderColor: '#CACEDD',
        }}
      >
        <View style={{ paddingHorizontal: 12, alignItems: 'center', marginRight: 4 }}>
          <MaterialIcons name='delete-forever' color='#FF485A' size={32} />
          <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: '#D4979D' }}>Delete</Text>
        </View>
      </TouchableOpacity>
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
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#505383" />
        </TouchableOpacity>
        <Text style={styles.title}>Expenses Detail</Text>
        <TouchableOpacity onPress={() => setShowInfo(true)} style={styles.backButton}>
          <Icon name="information-circle" size={24} color="#505383" />
        </TouchableOpacity>
      </View>
      <Text style={styles.username}>{username} Expenses</Text>
      <FlatList
        data={expenses}
        renderItem={({ item }) => {
          return (
            <GestureHandlerRootView>
              <Swipeable renderRightActions={(progress, dragX) => leftSwipe(progress, dragX, item)}>
                {renderExpenseItem(item)}
              </Swipeable>
            </GestureHandlerRootView>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Expense</Text>
            <DropdownET
              data={roleDropdownData}
              title='Role'
              focus={newCategoryFocus}
              selectedChoice={newCategory}
              setSelectedChoice={text => setNewCategory(text)}
              setIsFocused={value => setNewCategoryFocus(value)}
            />
            <TextInputET 
                title='Nominal'
                placeholder='Input nominal'
                focus={newNominalFocus}
                value={newNominal}  
                setText={text => setNewNominal(text)}
                setIsFocused={value => setNewNominalFocus(value)}
            />
            <View style={{marginBottom: 20}} />
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
      <ConfirmationModal
        title={'Delete'}
        desc={'Are you sure you want to delete this item ?'}
        approveButton='Delete'
        rejectButton='Cancel'
        setShowConfirmationModal={value => setShowConfirmModal(value)}
        showConfirmationModal={showConfirmationModal}
        method={async () => {
            handleDelete()
        }}
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
  username: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
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
    fontFamily: 'Poppins-Regular'
  },
  rightSection: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  editButton: {
    backgroundColor: '#505383',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  editText: {
    color: '#fff',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: -15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
});

export default ExpenseDetailPageAdmin;
