import React from 'react';
import AppNavigator from './app/Router/AppNavigator';
import { Provider, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './App/Redux/Reducers/index.js';

// const store = configureStore({
//   reducer: rootReducer
// });

const App = () => {

  return (
    // <Provider store={store}>
      <AppNavigator />
    // </Provider>
  );
};

export default App;
