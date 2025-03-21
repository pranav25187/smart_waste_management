const db = require("../config/db");

const getMaterials = async (req, res) => {
  try {
    const [materials] = await db.query("SELECT * FROM Materials");
    res.status(200).json(materials);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getMaterials };