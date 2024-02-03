import React, { useState } from 'react';
import logo from '../logo.svg';
import FilterBar from './FilterBar';
import Title from './Title';
import ListGrid from './ListGrid';

const Orders = () => {
  // 模拟订单数据
  const allOrders = [
    {
      id: 1,
      shopName: '一家卖花生的店',
      cover: logo,
      products: ['Product 1', 'Product 2'],
      status: 'Processing',
      amount: 50.00,
    },
    {
      id: 2,
      shopName: 'Shop B',
      cover: logo,
      products: ['Product 3', 'Product 4'],
      status: 'Shipped',
      amount: 80.00,
    },
    // 添加更多订单数据
  ];

  // 处理订单信息
  allOrders.map(order => {
    order.products = order.products.join(', ');
    order.status = 'Status: '+order.status;
    order.amount = 'Amount: $'+order.amount.toFixed(2);
    return order;
  });

  const [statusFilter, setStatusFilter] = useState('All');

  const filters = [
    { type: 'All', label: 'All' },
    { type: 'Processing', label: 'Processing' },
    { type: 'Shipped', label: 'Shipped' },
    { type: 'Refunded', label: 'Refunded' },
  ];

  const filteredOrders = statusFilter === 'All' ? allOrders : allOrders.filter(order => order.status === statusFilter);

  const extraFields = { 'amount': 'amount' }
  return (
    <div style={styles.container}>
      <Title title="My Orders" />
      <FilterBar filterType={statusFilter} setFilterType={setStatusFilter} filters={filters} />
      <ListGrid lists={filteredOrders} titleName='shopName' coverName='cover' extraFields={extraFields} />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  heading: {
    marginBottom: '20px',
  },
  activeFilter: {
    borderBottom: '2px solid #333',
    marginRight: '10px',
    cursor: 'pointer',
  },
  defaultFilter: {
    borderBottom: '2px #333',
    marginRight: '10px',
    cursor: 'pointer',
  },
  orderContainer: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '20px',
    overflow: 'hidden',
  },
  shopCover: {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  orderDetails: {
    flex: 1,
    padding: '20px',
  },
  shopName: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  products: {
    marginBottom: '8px',
  },
  status: {
    color: '#333',
    marginBottom: '8px',
  },
  amount: {
    fontWeight: 'bold',
    color: 'green',
  },
};

export default Orders;
