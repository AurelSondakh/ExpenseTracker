import React, {useEffect, useState} from 'react';
import AppNavigator from './app/Router/AppNavigator';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './app/Redux/Reducer/index.tsx';
import { createUserTable,createUserExpenseTable } from './app/Data/db';

const store = configureStore({
  reducer: rootReducer
});

const App = () => {
  useEffect(() => {
    createUserTable();
    createUserExpenseTable();
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator
      />
    </Provider>
  );
};

export default App;
