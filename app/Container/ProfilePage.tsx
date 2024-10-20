import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Portal, Provider } from 'react-native-paper';
import { getToken, removeToken } from '../Data/Auth';
import { db } from '../Data/db';
import { decode } from "react-native-pure-jwt";
import { SECRET_KEY } from '@env';
import ConfirmationModal from '../Components/ConfirmationModal';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    LoginPage: undefined;
    ProfilePage: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfilePage'>;

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const [newPassword, setNewPassword] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();

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
    const fetchUser = async () => {
      const token = await getToken();
      const decoded = await handleDecodeToken(token, SECRET_KEY);
      if (token) {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM users WHERE username = ?',
            [decoded?.username],
            (tx, results) => {
              if (results.rows.length > 0) {
                const fetchedUser = results.rows.item(0);
                setUser({ username: fetchedUser.username, role: fetchedUser.role });
              }
            },
            (tx, error) => console.error('Error fetching user:', error)
          );
        });
      }
    };

    fetchUser();
  }, []);

  const handleChangePassword = () => {
    if (newPassword.trim() === '') {
      Alert.alert('Error', 'Password cannot be empty.');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'UPDATE users SET password = ? WHERE username = ?',
        [newPassword, user?.username],
        () => {
          Alert.alert('Success', 'Password changed successfully');
          setNewPassword('');
          setModalVisible(false);
        },
        (tx, error) => console.error('Error changing password:', error)
      );
    });
  };

  const handleLogout = async () => {
    setConfirmModal(true);
  };

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.label}>Username: {user.username}</Text>
        <Text style={styles.label}>Role: {user.role}</Text>

        <TouchableOpacity style={styles.buttonContainerEdit} onPress={() => setModalVisible(true)}>
            <Text style={styles.editButtonText}>
                Change Password
            </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainerLogout} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>
                Logout
            </Text>
        </TouchableOpacity>

        <Portal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Change Password</Text>
                <TextInput
                  label="New Password"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                  style={styles.input}
                />
                <Button title="Submit" onPress={handleChangePassword} />
                <Button title="Cancel" onPress={() => setModalVisible(false)} color="grey" />
              </View>
            </View>
          </Modal>
        </Portal>
        <ConfirmationModal 
            title={'Logout'}
            desc={'Are you sure you want to log out ?'}
            approveButton='Yes'
            rejectButton='No'
            setShowConfirmationModal={value => setConfirmModal(value)}
            showConfirmationModal={confirmModal}
            method={async () => {
                await removeToken()
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'LoginPage' }],
                });
            }}
        />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  buttonContainerEdit: {
    marginTop: 15,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#505383'
  },
  editButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#FFF'
  },
  buttonContainerLogout: {
    marginTop: 15,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A52A2A'
  },
  logoutButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#FFF'
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium'
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
  },
});

export default ProfilePage;
