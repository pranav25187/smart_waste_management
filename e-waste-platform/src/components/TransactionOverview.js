import React, { useEffect, useState } from 'react';
import { getTransactions } from '../api';

const TransactionOverview = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await getTransactions();
      setTransactions(response.data);
    };
    fetchTransactions();
  }, []);

  return (
    <div>
      <h2>Transaction Overview</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.description} - ${transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionOverview;