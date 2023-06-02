import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import { CartProvider } from './components/checkout-page/CartContext';
import { UserProvider } from './components/app/userContext';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
