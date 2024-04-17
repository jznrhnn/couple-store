import React, { useEffect, useRef, useState } from 'react';
import { Currency } from './Config';
import CartPreview from './CartPreview';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

/**
 * 购物车导航栏
 * @param {products} 商品列表
 * @param {amount} 价格总价
 * @param {virtualAmount} 虚拟价格总价
 * @returns 
 */
const ShoppingCartNavbar = ({ products, amount = 0, virtualAmount = 0}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // 点击外部区域收起购物车
  const containerRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      // 如果购物车展开了，且点击的区域不在购物车内部，则收起购物车
      if (!isExpanded) {
        return;
      }
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const navigate = useNavigate();
  const { cartItems } = useCart();
  // 跳转结算界面
  function checkout(shopId) {
    if(cartItems.length === 0){
      
      return;
    }
    const searchParams = new URLSearchParams();
    searchParams.set('shopId', shopId);
    navigate(`/checkout?${searchParams.toString()}`);
  };

  return (
    <div ref={containerRef} style={styles.container}>
      {isExpanded && <CartPreview products={products} />}
      <div style={{ ...styles.navbar, ...(isExpanded && styles.navbar_extend) }}>
        <div style={styles.totalAmount}>
          Total: {amount !== 0 && Currency.CASH_SYMBOL + amount} {virtualAmount !== 0 && Currency.VIRTUAL_SYMBOL + virtualAmount}
        </div>
        <span style={styles.viewButton} onClick={toggleExpand}>
          {isExpanded ? '收起购物车⬇ ' : '查看购物车 ⬆'}
        </span>
        <button style={styles.checkoutButton} onClick={() => checkout()}>
          Checkout
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: '10px',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    color: '#000',
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    borderTop: '1px solid #fff',
    boxShadow: '0px -5px 10px 0px rgba(0,0,0,0.1)',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#fff',
    color: '#000',
    bottom: 0,
    left: 0,
    width: '100%',
    borderTop: '1px solid #fff',
    boxShadow: '0px -5px 10px 0px rgba(0,0,0,0.1)',
  },
  navbar_extend: {
    backgroundColor: '#fff',
  },
  totalAmount: {
    fontWeight: 'bold',
    fontSize: '1.2em',
  },
  viewButton: {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.1em',
  },
  checkoutButton: {
    padding: '10px 20px',
    backgroundColor: '#06B6FD',
    color: '#fff',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.1em',
  },
};

export default ShoppingCartNavbar;