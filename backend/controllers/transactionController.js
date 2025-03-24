const db = require("../config/db");

const createTransaction = async (req, res) => {
  const { material_id, buyer_id, quantity, unit, delivery_address, payment_method } = req.body;
  try {
    // Get material details
    const [materials] = await db.query(
      "SELECT * FROM Materials WHERE material_id = ?",
      [material_id]
    );

    if (materials.length === 0) {
      return res.status(404).json({ message: "Material not found" });
    }

    const material = materials[0];
    const total_price = material.price * quantity;

    // Create transaction
    const [result] = await db.query(
      `INSERT INTO Transactions 
       (material_id, buyer_id, seller_id, quantity, unit, total_price, delivery_address, payment_method) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [material_id, buyer_id, material.posted_by, quantity, unit, total_price, delivery_address, payment_method]
    );

    res.status(201).json({
      message: "Order placed successfully",
      transaction_id: result.insertId,
      total_price
    });
  } catch (err) {
    console.error("Error creating transaction:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getTransactions = async (req, res) => {
  const { user_id } = req.params;
  try {
    // Get transactions where user is either buyer or seller
    const [transactions] = await db.query(
      `SELECT t.*, 
        m.material_type,
        m.image_path,
        b.name as buyer_name,
        s.name as seller_name
       FROM Transactions t
       JOIN Materials m ON t.material_id = m.material_id
       JOIN Users b ON t.buyer_id = b.user_id
       JOIN Users s ON t.seller_id = s.user_id
       WHERE t.buyer_id = ? OR t.seller_id = ?
       ORDER BY t.created_at DESC`,
      [user_id, user_id]
    );

    res.status(200).json(transactions);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateTransactionStatus = async (req, res) => {
  const { transaction_id } = req.params;
  const { status } = req.body;
  try {
    await db.query(
      "UPDATE Transactions SET status = ? WHERE transaction_id = ?",
      [status, transaction_id]
    );

    res.status(200).json({ message: "Transaction status updated successfully" });
  } catch (err) {
    console.error("Error updating transaction status:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { createTransaction, getTransactions, updateTransactionStatus };