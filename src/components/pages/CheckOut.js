import React, { useState } from 'react';
import { useCart } from '../CartContext';
import { Currency, CurrencyMap } from '../Config';
import FilterBar from '../FilterBar';
import ListGrid from '../ListGrid';
import Title from '../Title';
import AddBotton from '../AddBotton';
import { useTranslation } from 'react-i18next';
import RegularButton from '../RugularButton';
import TextList from '../TextList';

const CheckOut = () => {
  const { t } = useTranslation();

  const filters = [
    { type: 'All', label: 'All' },
    { type: Currency.CASH_INDEX, label: t(Currency.CASH_INDEX)},
    { type: Currency.VIRTUAL_INDEX, label: t(Currency.VIRTUAL_INDEX)},
  ];

  const extraFields = { 'price': 'green', 'amount': 'red' }

  const excludeList = ['quantity']

  const { amount, virtualAmount, cartItems } = useCart();

  const [filterType, setFilterType] = useState('All');

  // 过滤购物车商品
  const filteredCartItems = filterType === 'All'
    ? cartItems
    : cartItems.filter(item => item.type === filterType);

  // 订单显示信息
  const infoList = {
    // 'deliveryFee': 0,
    // 'discount': 0,
    'amount': amount,
    'virtualAmount': virtualAmount,
  };

  // 添加标签信息，每个key添加前缀'checkout.',金额添加金币标志
  const prefix = 'checkout.';
  const prefixInfoList = Object.keys(infoList).reduce((acc, key) => {
    acc[prefix + key] = infoList[key];
    if (key === 'amount') {
      acc[prefix + key] = acc[prefix + key] + CurrencyMap[Currency.CASH_INDEX];
    }
    if (key === 'virtualAmount') {
      acc[prefix + key] = acc[prefix + key] + CurrencyMap[Currency.VIRTUAL_INDEX];
    }
    return acc;
  }, {});

  return (
    <div style={styles.container}>
      <Title title={t('checkout.title')} />
      <FilterBar filterType={filterType} setFilterType={setFilterType} filters={filters} />
      <ListGrid lists={filteredCartItems} titleName='name' coverName='image' extraFields={extraFields} excludeList={excludeList} styleName='green' extraDiv={AddBotton} />
      <TextList infoList={prefixInfoList} />
      <RegularButton text='提交订单' />

    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  }
};

export default CheckOut;
