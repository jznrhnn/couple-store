import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Shops from './components/Shops';
import UserProfile from './components/UserProfile';
import Order from './components/Orders';
import TransactionHistory from './components/TransactionHistory';
import Products from './components/Products';

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
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Shops />} />
        {menu.map((item, index) => (
          <Route key={index} path={`/${item.path}`} element={item.component} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
