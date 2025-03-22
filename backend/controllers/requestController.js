const db = require("../config/db");

// POST /api/requests
const createRequest = async (req, res) => {
  const { buyerName, buyerMobile, buyerEmail, quantity, materialId } = req.body;
  try {
    await db.query(
      "INSERT INTO Requests (buyerName, buyerMobile, buyerEmail, quantity, materialId) VALUES (?, ?, ?, ?, ?)",
      [buyerName, buyerMobile, buyerEmail, quantity, materialId]
    );
    res.status(201).json({ message: "Request submitted successfully" });
  } catch (err) {
    console.error("Error submitting request:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/requests/manufacturer/:userId
const getRequestsForManufacturer = async (req, res) => {
  const { userId } = req.params;
  try {
    const [requests] = await db.query(
      "SELECT * FROM Requests WHERE materialId IN (SELECT material_id FROM Materials WHERE posted_by = ?)",
      [userId]
    );
    res.status(200).json(requests);
  } catch (err) {
    console.error("Error fetching requests:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { createRequest, getRequestsForManufacturer };