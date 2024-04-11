import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../CartContext';

const Checkout = () => {
  const { t } = useTranslation();
  const { cartItems, removeFromCart } = useCart();
  const [totalAmount, setTotalAmount] = useState(0);

  // 计算订单总金额
  useEffect(() => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.quantity * item.price;
    });
    setTotalAmount(total);
  }, [cartItems]);

  return (
    <div>
      <h2>{t('checkout.title')}</h2>
      <div>
        <h3>{t('checkout.cartItems')}</h3>
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              <span>{item.name}</span>
              <span>{item.quantity}</span>
              <span>{item.price * item.quantity}</span>
              <button onClick={() => removeFromCart(item.id)}>{t('checkout.removeItem')}</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>{t('checkout.totalAmount')}</h3>
        <p>{totalAmount}</p>
      </div>
      <div>
        {/* 提供选择配送地址和付款方式的选项 */}
        {/* 这里可以根据需要添加表单元素 */}
      </div>
      <button>{t('checkout.placeOrder')}</button>
    </div>
  );
};

export default Checkout;
