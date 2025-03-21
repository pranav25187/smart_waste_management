const db = require("../config/db");

const createRequest = async (req, res) => {
  const { user_id, material_id, request_quantity, preferred_date, additional_comments } = req.body;
  try {
    await db.query(
      "INSERT INTO MaterialRequests (user_id, material_id, request_quantity, preferred_date, additional_comments) VALUES (?, ?, ?, ?, ?)",
      [user_id, material_id, request_quantity, preferred_date, additional_comments]
    );
    res.status(201).json({ message: "Material request created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getRequests = async (req, res) => {
  const { user_id } = req.params;
  try {
    const [requests] = await db.query("SELECT * FROM MaterialRequests WHERE user_id = ?", [user_id]);
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createRequest, getRequests };