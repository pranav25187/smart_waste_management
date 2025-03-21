const db = require("../config/db");

const getTransactions = async (req, res) => {
  try {
    const [transactions] = await db.query("SELECT * FROM Transactions");
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getTransactionHistory = async (req, res) => {
  const { user_id } = req.params;
  try {
    const [history] = await db.query(
      "SELECT * FROM Transactions WHERE post_id IN (SELECT post_id FROM EwastePosts WHERE user_id = ?)",
      [user_id]
    );
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getTransactions, getTransactionHistory };