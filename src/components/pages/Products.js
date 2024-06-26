import React, { useState } from 'react';
import { useCart } from '../CartContext';
import { Currency, CurrencyMap } from '../Config';
import FilterBar from '../FilterBar';
import ListGrid from '../ListGrid';
import ShoppingCartNavbar from '../ShoppingCartNavbar';
import Title from '../Title';
import AddBotton from '../AddBotton';

const Products = () => {
  // 模拟商品数据
  const products = [
    { id: 1, name: '花生牌洗碗', image: 'someBear.jpg', price: 20.00, monthlySales: 100, note: '强烈推荐', type: Currency.CASH_INDEX },
    { id: 2, name: '花生牌做饭', image: 'noodle.jpg', price: 15.00, monthlySales: 80, note: '嘟嘟吃了都说好', type: Currency.VIRTUAL_INDEX },
    { id: 3, name: '花生牌铲猫砂', image: 'dudu1.jpg', price: 25.00, monthlySales: 120, note: '新品', type: 'Cash' },

    // 添加更多商品数据
  ];

  const filters = [
    { type: 'All', label: 'All' },
    { type: Currency.CASH, label: Currency.CASH },
    { type: Currency.VIRTUAL, label: Currency.VIRTUAL },
  ];

  const [filterType, setFilterType] = useState('All');

  const filteredProducts = filterType === 'All'
    ? products
    : products.filter(product => product.type === filterType);

  const extraFields = { 'price': 'green', 'note': 'gray' }

  const excludeList = ['quantity']

  const { amount, virtualAmount, cartItems } = useCart();

  // 初始化购物车数量
  cartItems.forEach(cartItem => {
    const product = products.find(product => product.id === cartItem.id);
    if (product !== undefined) {
      product.quantity = cartItem.quantity;
    }
  });

  return (
    <div style={styles.container}>
      <Title title="Products" />
      <FilterBar filterType={filterType} setFilterType={setFilterType} filters={filters} />
      <ListGrid lists={filteredProducts} titleName='name' coverName='image' extraFields={extraFields} excludeList={excludeList} styleName='green' extraDiv={AddBotton} />
      <ShoppingCartNavbar list={cartItems} amount={amount} virtualAmount={virtualAmount} />
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
  quantity: {
    maxWidth: '30px',
    textAlign: 'center',
  },
};

export default Products;
