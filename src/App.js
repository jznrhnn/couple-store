import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';

import { CartProvider } from './components/CartContext';
import Navbar from './components/Navbar';
import Order from './components/pages/Orders';
import Products from './components/pages/Products';
import Shops from './components/pages/Shops';
import TransactionHistory from './components/pages/TransactionHistory';
import UserProfile from './components/pages/UserProfile';


function App() {
  const menu = [
    { path: '/', component: <Shops /> },
    { path: 'home', component: <Shops /> },
    { path: 'order', component: <Order /> },
    { path: 'my', component: <UserProfile /> },
    { path: 'transactionHistory', component: <TransactionHistory /> },
    { path: 'shop', component: <Products /> }
  ];

  return (
    <CartProvider>

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Shops />} />
          {menu.map((item, index) => (
            <Route key={index} path={`/${item.path}`} element={item.component} />
          ))}
        </Routes>
      </Router>
    </CartProvider>

  );
}

export default App;
