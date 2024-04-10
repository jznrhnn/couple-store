import React from 'react';
import ListGrid from './ListGrid';
import { useContext } from 'react';
import { useCart } from './CartContext';
import AddBotton from './AddBotton';

const CartPreview = ({ }) => {

  const { cartItems } = useCart();

  const excludeList = ['quantity', 'amount']

  const extraFields = { 'price': 'green', 'note': 'gray' }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3>购物车</h3>
      </div>
      <ListGrid lists={cartItems} titleName='name' coverName='image' extraFields={extraFields} excludeList={excludeList} extraDiv={AddBotton} />
    </div>
  );
};


const styles = {
  container: {
    width: '80%', // 占宽度的80%
    margin: '0 auto', // 水平居中
    overflowY: 'auto',
    border: '1px solid #ddd', // 添加边框
    borderRadius: '8px', // 添加圆角
    maxHeight: '400px', // 最大高度
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    padding: '1px',
  },
  cartItems: {
    maxHeight: '300px',
    overflowY: 'auto',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    padding: '10px',
  },
  itemActions: {
    display: 'flex',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#ddd',
    border: 'none',
    borderRadius: '50%',
    padding: '5px',
    margin: '0 5px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#ff6b6b',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default CartPreview;
