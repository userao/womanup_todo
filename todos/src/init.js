import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './components/App.js';
import todosReducer from './slices/todosSlice.js';
import todoModalReducer from './slices/todoModalSlice.js';

const runApp = () => {
  const store = configureStore({
    reducer: {
      todos: todosReducer,
      todoModal: todoModalReducer,
    },
  });

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default runApp;
