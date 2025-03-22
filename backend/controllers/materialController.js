const db = require("../config/db");

const getMaterials = async (req, res) => {
  try {
    const [materials] = await db.query("SELECT * FROM Materials");
    res.status(200).json(materials);
  } catch (err) {
    console.error("Error fetching materials:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const createMaterial = async (req, res) => {
  const { material_type, location, availability, condition, price_range } = req.body;
  try {
    await db.query(
      "INSERT INTO Materials (material_type, location, availability, `condition`, price_range) VALUES (?, ?, ?, ?, ?)",
      [material_type, location, availability, condition, price_range]
    );
    res.status(201).json({ message: "Material added successfully" });
  } catch (err) {
    console.error("Error adding material:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getMaterials, createMaterial };