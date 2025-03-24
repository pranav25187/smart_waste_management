const db = require("../config/db");

const createTransaction = async (req, res) => {
  const { buyer_id, material_id, quantity, total_price, status } = req.body;
  try {
    await db.query(
      "INSERT INTO Transactions (buyer_id, material_id, quantity, total_price, status) VALUES (?, ?, ?, ?, ?)",
      [buyer_id, material_id, quantity, total_price, status]
    );
    res.status(201).json({ message: "Transaction created successfully" });
  } catch (err) {
    console.error("Error creating transaction:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getTransactions = async (req, res) => {
  const { user_id } = req.params;
  try {
    const [transactions] = await db.query(
      "SELECT * FROM Transactions WHERE buyer_id = ? OR material_id IN (SELECT material_id FROM Materials WHERE posted_by = ?)",
      [user_id, user_id]
    );
    res.status(200).json(transactions);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { createTransaction, getTransactions };