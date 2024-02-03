import React from 'react';
import FilterBar from './FilterBar';
import { useState } from 'react';
import Title from './Title';
import ListGrid from './ListGrid';
import { Currency } from './Config';
import ShoppingCartNavbar from './ShoppingCartNavbar';

const Products = () => {
  // 模拟商品数据
  const products = [
    { id: 1, name: '花生牌洗碗', image: 'someBear.jpg', price: 20.00, monthlySales: 100, note: '强烈推荐', type: 'Cash' },
    { id: 2, name: '花生牌做饭', image: 'noodle.jpg', price: 15.00, monthlySales: 80, note: '嘟嘟吃了都说好', type: '花生币' },
    { id: 3, name: '花生牌铲猫砂', image: 'dudu1.jpg', price: 25.00, monthlySales: 120, note: '新品', type: 'Cash' },

    // 添加更多商品数据
  ];

  // 处理商品信息
  products.map(product => {
    product.monthlySales = 'Monthly Sales: ' + product.monthlySales;
    // product.price = product.type === 'Cash' ? 'Price: $' + product.price.toFixed(2) : 'Price: ' + product.price.toFixed(2) + ' ' + Currency.VIRTUAL_SYMBOL;
    product.price = 'Price: $' + product.price.toFixed(2);
    product.type = 'Type: ' + product.type;
    product.note = 'Note: ' + product.note;
    return product;
  });

  const filters = [
    { type: 'All', label: 'All' },
    { type: 'Cash', label: Currency.CASH },
    { type: 'Virtual Currency', label: Currency.VIRTUAL },
  ];

  const [filterType, setFilterType] = useState('All');

  const filteredProducts = filterType === 'All'
    ? products
    : products.filter(product => product.type === filterType);

  const extraFields = { 'price': 'green', 'note': 'gray' }

  return (
    <div style={styles.container}>
      <Title title="Products" />
      <FilterBar filterType={filterType} setFilterType={setFilterType} filters={filters} />
      <ListGrid lists={filteredProducts} titleName='name' coverName='image' extraFields={extraFields} styleName='green' />
      <ShoppingCartNavbar />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  productList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  product: {
    width: '70%',
    margin: '10px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
  },
  productImage: {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginRight: '10px',
  },
  productInfo: {
    flex: 1,
  },
};

export default Products;
