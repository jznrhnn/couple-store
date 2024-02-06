import React, { useState } from 'react';
import FilterBar from '../FilterBar';
import Title from '../Title';
import { Currency } from '../Config';

const TransactionHistory = () => {
    const transactions = [
        { id: 1, type: 'Cash', amount: 50.00 },
        { id: 2, type: 'Virtual Currency', amount: -20.00 },
        { id: 3, type: 'Cash', amount: 30.00 },
        // 添加更多交易数据
    ];

    const [filterType, setFilterType] = useState('All');

    const filteredTransactions = filterType === 'All'
        ? transactions
        : transactions.filter(transaction => transaction.type === filterType);

    const filters = [
        { type: 'All', label: 'All' },
        { type: 'Cash', label: Currency.CASH },
        { type: 'Virtual Currency', label: Currency.VIRTUAL },
    ];

    return (
        <div style={styles.container}>
            <Title title="Transaction History" />
            <FilterBar filterType={filterType} setFilterType={setFilterType} filters={filters} />
            <ul style={styles.transactionList}>
                {filteredTransactions.map(transaction => (
                    <li key={transaction.id} style={transaction.amount < 0 ? styles.withdrawal : styles.deposit}>
                        {transaction.type}: ${Math.abs(transaction.amount).toFixed(2)}
                    </li>
                ))}
            </ul>
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
    statusBar: {
        display: 'flex',
        marginBottom: '20px',
        borderBottom: '2px solid #ddd',
        paddingBottom: '10px',
    },
    activeFilter: {
        borderBottom: '2px solid #333',
        marginRight: '10px',
        cursor: 'pointer',
    },
    defaultFilter: {
        borderBottom: '2px #333',
        marginRight: '10px',
        cursor: 'pointer',
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

export default TransactionHistory;
