import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { store } from 'app/store';
import { Provider } from 'react-redux';
import { apiSlice } from 'features/api/apiSlice';
import { authLogin } from 'features/auth/authSlice';
import Cookies from 'js-cookie';

const initializeAuth = async () => {
  if (Cookies.get("token")) {
    const payload = await store.dispatch(apiSlice.endpoints.getMe.initiate());

    store.dispatch(authLogin({ userId: payload.data.id }));
  }
}

initializeAuth();

render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
