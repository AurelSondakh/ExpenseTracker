import React, {useEffect, useState} from 'react';
import AppNavigator from './app/Router/AppNavigator';
import { Provider, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './App/Redux/Reducers/index.js';
import { createUserTable,createUserExpenseTable } from './app/Data/db';
import { getToken } from './app/Data/Auth';

// const store = configureStore({
//   reducer: rootReducer
// });

const App = () => {
  const [userType, setUserType] = useState<string>('');

  useEffect(() => {
    createUserTable();
    createUserExpenseTable();
  }, []);

  return (
    // <Provider store={store}>
      <AppNavigator
      />
    // </Provider>
  );
};

export default App;
