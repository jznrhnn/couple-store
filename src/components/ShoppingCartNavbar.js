import React from 'react';
import { Currency } from './Config';

/**
 * 购物车导航栏
 * @param {products} 商品列表
 * @param {price} 价格
 * @param {virtualPrice} 虚拟价格
 * @returns 
 */
const ShoppingCartNavbar = ({products,price=0,virtualPrice=0}) => {
  return (
    <div style={styles.navbar}>
      <div style={styles.totalAmount}>
        Total: {price!==0 && Currency.CASH_SYMBOL+price} {virtualPrice!==0 && Currency.VIRTUAL_SYMBOL+virtualPrice}
      </div>
      <button style={styles.checkoutButton} onClick={() => alert('Checkout button clicked!')}>
        Checkout
      </button>
    </div>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#ddd',
    color: '#000',
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    borderTop: '1px solid #ddd',
    boxShadow: '0px -5px 10px 0px rgba(0,0,0,0.1)',
  },
  totalAmount: {
    fontWeight: 'bold',
    fontSize: '1.2em',
  },
  checkoutButton: {
    padding: '10px 20px',
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.1em',
  },
};

export default ShoppingCartNavbar;
