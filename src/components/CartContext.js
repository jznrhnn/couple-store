import Decimal from 'decimal.js';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Currency } from './Config';

// 创建 CartContext
const CartContext = createContext();

// 提供者组件
const CartProvider = ({ children }) => {
  // 初始化购物车商品列表、商品总价和虚拟货币总价
  const [cartItems, setCartItems] = useState([]);
  const [amount, setAmount] = useState(new Decimal(0));
  const [virtualAmount, setVirtualAmount] = useState(new Decimal(0));

  // 计算商品总价
  const calculateAmount = (items) => {
    let total = new Decimal(0);
    items.forEach(item => {
      total = total.plus(new Decimal(item.price).times(item.quantity));
    });
    return total;
  };

  useEffect(() => {
    updateAmount();
  }, [cartItems]);

  // 当购物车商品列表发生变化时，重新计算商品总价
  const updateAmount = () => {
    // 过滤出虚拟货币商品
    const virtualItems = cartItems.filter(item => item.type === Currency.VIRTUAL_INDEX);
    setVirtualAmount(calculateAmount(virtualItems));
    // 过滤出现金商品
    const cashItems = cartItems.filter(item => item.type === Currency.CASH_INDEX);
    setAmount(calculateAmount(cashItems));
  };

  /**
   * 更新购物车商品到指定数量
   * @param {Array<item>} item 商品信息：包含类型、价格、图片等
   * @param {number} quantity 需要更新的商品数量
   */
  const updateCartItem = (item, quantity = 1) => {
    // 检查购物车中是否已经存在该商品
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    // 如果存在，则更新数量和价格
    if (existingItemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity = quantity;
      updatedCart[existingItemIndex].price = new Decimal(item.price).times(quantity);
      setCartItems(updatedCart);
    } else {
      setCartItems((prevCart) => [
        ...prevCart,
        {
          image: item.image,
          id: item.id,
          name: item.name,
          type: item.type,
          quantity: quantity,
          price: item.price,
          amount: new Decimal(item.price).times(quantity),
        },
      ]);
    }
  }

  /**
   * 添加指定数量商品到购物车
   * @param {Array<item>} item 商品信息：包含类型、价格、图片等
   * @param {number} quantity 商品数量：默认为 1
   */
  const addToCart = (item, quantity = 1) => {
    //TODO 调用更新购物车商品方法持久化
    // 检查购物车中是否已经存在该商品
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    // 如果存在，则更新数量和价格
    if (existingItemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += quantity;
      updatedCart[existingItemIndex].amount = new Decimal(updatedCart[existingItemIndex].price).plus(item.price);
      setCartItems(updatedCart);
    } else {
      // 如果不存在，则添加新的商品
      setCartItems((prevCart) => [
        ...prevCart,
        {
          image: item.image,
          id: item.id,
          name: item.name,
          type: item.type,
          quantity: quantity,
          price: item.price,
          amount: new Decimal(item.price).times(quantity),
        },
      ]);
    }

  };

  /**   
   * 从购物车中删除指定数量商品
   * @param {string} itemId 商品 ID
   * @param {number} quantity 商品数量：默认为 1
   */
  const removeFromCart = (itemId, quantity = 1) => {
    // 找到要删除的商品
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === itemId);
    // 更新购物车商品数量列表
    if (existingItemIndex === -1) {
      return;
    }
    const updatedCart = [...cartItems];
    updatedCart[existingItemIndex].quantity -= quantity;
    // 如果商品数量小于等于 0，则从购物车中删除该商品
    if (updatedCart[existingItemIndex].quantity <= 0) {
      updatedCart.splice(existingItemIndex, 1);
    }
    setCartItems(updatedCart);
    // 重新计算商品总价
    updateAmount();
  };

  // 提供 Context 的值
  const contextValue = {
    cartItems,
    amount: amount.valueOf(),
    virtualAmount: virtualAmount.valueOf(),
    setAmount,
    setVirtualAmount,
    addToCart,
    removeFromCart,
    updateCartItem,
  };

  // 渲染提供者和子组件
  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// 自定义 hook 用于在组件中使用 CartContext
const useCart = () => {
  return useContext(CartContext);
};

export { CartProvider, useCart };

