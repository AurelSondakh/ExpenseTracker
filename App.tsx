import React, {useEffect, useState} from 'react';
import AppNavigator from './app/Router/AppNavigator';
import { Provider, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './App/Redux/Reducers/index.js';
import { createUserTable } from './app/Data/db';
import { getToken } from './app/Data/Auth';
import { jwtDecode } from 'jwt-decode';

// const store = configureStore({
//   reducer: rootReducer
// });

const App = () => {
  const [userType, setUserType] = useState<string>('');

  useEffect(() => {
    createUserTable();
    console.log(userType)
    const fetchUserType = async () => {
      const token = await getToken();
      if (token) {
        const decoded: { role: string } = jwtDecode(token);
        setUserType(decoded.role);
      }
    };

    fetchUserType();
  }, []);

  return (
    // <Provider store={store}>
      <AppNavigator
      />
    // </Provider>
  );
};

export default App;
