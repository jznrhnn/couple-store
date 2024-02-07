import React from 'react';
import FilterBar from '../FilterBar';
import { useState } from 'react';
import Title from '../Title';
import ListGrid from '../ListGrid';
import { Currency, CurrencyMap } from '../Config';
import ShoppingCartNavbar from '../ShoppingCartNavbar';
import Decimal from 'decimal.js';

const Products = () => {
  // 模拟商品数据
  const products = [
    { id: 1, name: '花生牌洗碗', image: 'someBear.jpg', price: 20.00, monthlySales: 100, note: '强烈推荐', type: Currency.CASH_INDEX },
    { id: 2, name: '花生牌做饭', image: 'noodle.jpg', price: 15.00, monthlySales: 80, note: '嘟嘟吃了都说好', type: Currency.VIRTUAL_INDEX },
    { id: 3, name: '花生牌铲猫砂', image: 'dudu1.jpg', price: 25.00, monthlySales: 120, note: '新品', type: 'Cash' },

    // 添加更多商品数据
  ];
  const originProducts = products.map(product => ({ ...product }));
  // 处理商品信息
  products.map(product => {
    product.monthlySales = 'Monthly Sales: ' + product.monthlySales;
    product.price = 'Price: ' + CurrencyMap[product.type] + product.price.toFixed(2);
    product.type = 'Type: ' + product.type;
    product.note = 'Note: ' + product.note;
    return product;
  });

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

  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState(0);
  const [virtualAmount, setVirtualAmount] = useState(0);

  // 添加购物车
  const addToCart = (productId, quantity = 1) => {
    // 计算价格
    const product = originProducts.find((product) => product.id === productId);
    //分别计算现金商品和虚拟商品的价格
    let price = 0;
    price = new Decimal(product.price).times(quantity);
    console.log('price:', price);
    if (product.type === Currency.CASH_INDEX) {
      setAmount(new Decimal(amount).plus(price));
    } else if (product.type === Currency.VIRTUAL_INDEX) {
      setVirtualAmount(new Decimal(virtualAmount).plus(price));
    }
    // 检查购物车中是否已经存在该商品
    const existingItemIndex = cart.findIndex((item) => item.id === productId);

    // 如果存在，则更新数量和价格
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      updatedCart[existingItemIndex].price = new Decimal(updatedCart[existingItemIndex].price).plus(price);
      setCart(updatedCart);
    } else {
      // 如果不存在，则添加新的商品
      setCart((prevCart) => [
        ...prevCart,
        {
          image: product.image,
          id: product.id,
          name: product.name,
          productType: product.type,
          quantity: quantity,
          price: price,
          // 可以根据你的数据结构添加其他商品信息
        },
      ]);
    }
  };

  const button = (
    <button style={styles.addButton} onClick={(productId) => addToCart(productId)}>
      +
    </button>
  );

  return (
    <div style={styles.container}>
      <Title title="Products" />
      <FilterBar filterType={filterType} setFilterType={setFilterType} filters={filters} />
      <ListGrid lists={filteredProducts} titleName='name' coverName='image' extraFields={extraFields} styleName='green' extraDiv={button} />
      <ShoppingCartNavbar list={cart} amount={amount} virtualAmount={virtualAmount} />
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
