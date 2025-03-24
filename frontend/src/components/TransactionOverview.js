import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./styles/TransactionOverview.css";

const TransactionOverview = () => {
  const [transactions, setTransactions] = useState([]);
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/transactions/${userId}`
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, [userId]);

  return (
    <div className="transaction-overview">
      <Navbar />
      <h2>Transaction Overview</h2>
      {transactions.length === 0 ? (
        <p>No transactions yet</p>
      ) : (
        <div className="transactions-list">
          {transactions.map((transaction) => (
            <div key={transaction.transaction_id} className="transaction-card">
              <h3>Transaction #{transaction.transaction_id}</h3>
              <p>Material: {transaction.material_type}</p>
              <p>Quantity: {transaction.quantity}</p>
              <p>Total Price: ₹{transaction.total_price}</p>
              <p>Status: {transaction.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionOverview;