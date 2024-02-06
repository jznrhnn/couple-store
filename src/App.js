import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Shops from './components/pages/Shops';
import UserProfile from './components/pages/UserProfile';
import Order from './components/pages/Orders';
import TransactionHistory from './components/pages/TransactionHistory';
import Products from './components/pages/Products';

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
