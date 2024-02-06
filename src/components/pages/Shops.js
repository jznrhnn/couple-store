import React from 'react';
import logo from '../../logo.svg';
import FilterBar from '../FilterBar';
import { useState } from 'react';
import Title from '../Title';
import ListGrid from '../ListGrid';
import { useNavigate } from 'react-router-dom';

const Shops = () => {
  // 模拟商店数据
  const shops = [
    { id: 1, name: '一家卖花生的小店', coverImage: 'dudu.jpg', sales: 1000, rating: 4.5, type: 'Public' },
    { id: 2, name: 'Shop B', coverImage: logo, sales: 800, rating: 4.0, type: 'Private' },
    { id: 3, name: 'Shop C', coverImage: logo, sales: 1200, rating: 4.8, type: 'Public' },
    // 添加更多商店数据
  ];

  //处理商店数据
  shops.map(shop => {
    shop.sales = '月销量： ' + shop.sales;
    shop.rating = '评分: ' + shop.rating;
    return shop;
  });

  const navigate = useNavigate();

  // 点击事件
  function handleClick(shopId) {
    const searchParams = new URLSearchParams();
    searchParams.set('shopId', shopId);
    navigate(`/shop?${searchParams.toString()}`);
  };

  const [filterType, setFilterType] = useState('All');
  const filters = [
    { type: 'All', label: 'All' },
    { type: 'Public', label: 'Public' },
    { type: 'Private', label: 'Private' },
  ];

  const extraFields = { 'rating': 'green' }
  const excludeList = ['type'];
  const filteredShops = filterType === 'All'
    ? shops
    : shops.filter(shop => shop.type === filterType);

  return (
    <div style={styles.container}>
      <Title title="Shops" />
      <FilterBar filterType={filterType} setFilterType={setFilterType} filters={filters} />
      {
        <ListGrid lists={filteredShops} titleName='name' coverName='coverImage' extraFields={extraFields}
          excludeList={excludeList} clickFunction={handleClick} />
      }
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  shop: {
    display: 'flex',
    width: '70%',
    margin: '10px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    textAlign: 'left',
  },
  coverImage: {
    width: '30%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginRight: '10px',
  },
  shopInfo: {
    flex: 1,
  },
  shopName: {
    fontSize: '1.2em',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  sales: {
    color: '#555',
    marginBottom: '8px',
  },
  rating: {
    color: 'green',
    fontWeight: 'bold',
  },
};

export default Shops;
