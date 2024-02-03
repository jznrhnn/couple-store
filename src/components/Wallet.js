import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Currency } from './Config';

const Wallet = () => {
  const navigate = useNavigate();
  // 模拟钱包数据
  const [balance, setBalance] = useState(1000);
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'Deposit', amount: 500 },
    { id: 2, type: 'Withdrawal', amount: -200 },
    // 添加更多交易数据
  ]);

  const handleTransaction = (type) => {
    // 模拟处理交易逻辑
    const amount = parseFloat(prompt(`Enter the ${type} amount:`));

    if (isNaN(amount) || amount <= 0) {
      alert('Invalid amount. Please enter a valid amount.');
      return;
    }

    const newTransaction = { id: transactions.length + 1, type, amount };
    setTransactions([...transactions, newTransaction]);

    if (type === 'Deposit') {
      setBalance(balance + amount);
    } else {
      // Ensure withdrawal does not exceed the current balance
      if (amount > balance) {
        alert('Insufficient balance for withdrawal.');
        return;
      }

      setBalance(balance - amount);
    }
  };

  const historyClick = () => {
    navigate('/transactionHistory');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Wallet</h2>
      <p style={styles.balance}>{Currency.CASH}: {Currency.CASH_SYMBOL}{balance.toFixed(2)}</p>
      <p style={styles.balance}>{Currency.VIRTUAL}:{Currency.VIRTUAL_SYMBOL}{balance.toFixed(2)}</p>

      <div style={styles.buttons}>
        <button style={styles.button} onClick={() => handleTransaction('Deposit')}>Deposit</button>
        <button style={styles.button} onClick={() => handleTransaction('Withdrawal')}>Withdrawal</button>
      </div>

      <h3 style={styles.transactionHistory}>Transaction History</h3>
      <ul style={styles.transactionList}>
        {transactions.map(transaction => (
          <li key={transaction.id} style={transaction.amount < 0 ? styles.withdrawal : styles.deposit}>
            {transaction.type}: ${Math.abs(transaction.amount).toFixed(2)}
          </li>
        ))}
      </ul>
      <button onClick={historyClick}>TransactionHistory</button>
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
    marginBottom: '10px',
  },
  balance: {
    marginBottom: '20px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1em',
    cursor: 'pointer',
  },
  transactionHistory: {
    fontSize: '1.2em',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  transactionList: {
    listStyle: 'none',
    padding: 0,
  },
  deposit: {
    color: 'green',
  },
  withdrawal: {
    color: 'red',
  },
};

export default Wallet;
