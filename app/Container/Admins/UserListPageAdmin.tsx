import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { db } from '../../Data/db';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    UserListPageAdmin: undefined;
    ExpenseDetailPageAdmin: { username: string };
};

type UserListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UserListPageAdmin'>;

const UserList = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigation = useNavigation<UserListScreenNavigationProp>();

  useEffect(() => {
    const fetchUsers = async () => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM users WHERE role = ?',
          ['user'],
          (_, { rows }) => {
            const fetchedUsers = [];
            for (let i = 0; i < rows.length; i++) {
              fetchedUsers.push(rows.item(i));
            }
            setUsers(fetchedUsers);
            setFilteredUsers(fetchedUsers);
            setLoading(false);
          },
          (tx, error) => {
            console.error('Error fetching users:', error);
            setLoading(false);
          }
        );
      });
    };

    fetchUsers();
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text) {
      const filteredData = users.filter((user) => 
        user.username.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredUsers(filteredData);
    } else {
      setFilteredUsers(users);
    }
  };

  const renderUserItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.userItem}
      onPress={() => navigation.navigate('ExpenseDetailPageAdmin', { username: item.username })}
    >
      <Text style={styles.userText}>{item.username}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User List</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Users"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredUsers}
        renderItem={renderUserItem}
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
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  userItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  userText: {
    fontSize: 14,
    color: '#505383',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default UserList;
