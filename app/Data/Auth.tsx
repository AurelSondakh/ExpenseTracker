import { db } from './db';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SECRET_KEY } from '@env';
import { sign } from 'react-native-pure-jwt';

interface User {
  id: number;
  username: string;
  role: string;
}

interface RegisterForm {
  username: string;
  password: string;
  role: string
}

interface LoginForm {
  username: string;
  password: string;
}

const registerUser = async (registerForm: RegisterForm): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
        [registerForm?.username, registerForm?.password, registerForm?.role],
        () => {
          console.log('Registration success');
          resolve();
        },
        (tx, error) => {
          console.error('SQL Error:', error);
          if (error.message?.includes('UNIQUE constraint failed')) {
            reject('Username already exists. Please choose a different one.');
          } else {
            reject(`Registration failed: ${error.message || error}`);
          }
        }
      );
    }, 
    (txError) => {
      console.error('Transaction Error:', txError);
      reject(`Transaction failed: ${txError.message || txError}`);
    });
  });
};



const loginUser = async (loginForm: LoginForm): Promise<{ user: User; token: string }> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE username = ?',
        [loginForm?.username],
        async (tx, results) => {
          if (results.rows.length > 0) {
            const user = results.rows.item(0);
            const isMatch = loginForm?.password === user?.password;

            if (isMatch) {
              try {
                const token = await sign(
                  { 
                    id: user.id, 
                    username: user.username, 
                    role: user.role,
                  },
                  SECRET_KEY,
                  {
                    alg: 'HS256',
                  }
                );
                await AsyncStorage.setItem('userToken', token);
                resolve({ user, token });
              } catch (error) {
                reject('Error generating token');
              }
            } else {
              reject('Invalid username or password');
            }
          } else {
            reject('Invalid username or password');
          }
        },
        (tx, error) => {
          reject(`Login error: ${error.message || error}`);
        }
      );
    });
  });
};


const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('userToken');
};

const removeToken = async (): Promise<void> => {
  await AsyncStorage.removeItem('userToken');
};

export { registerUser, loginUser, getToken, removeToken };
