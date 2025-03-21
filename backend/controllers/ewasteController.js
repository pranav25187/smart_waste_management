const db = require("../config/db");

const createEwaste = async (req, res) => {
  const { user_id, item_name, type, quantity, condition, description, price, available_dates } = req.body;
  const imagePath = req.file ? req.file.path : null; // Get the uploaded file path if available

  try {
    // Insert into EwastePosts
    await db.query(
      "INSERT INTO EwastePosts (user_id, item_name, type, quantity, `condition`, description, price, available_dates, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [user_id, item_name, type, quantity, condition, description, price, available_dates, imagePath]
    );

    // Insert into Materials
    await db.query(
      "INSERT INTO Materials (material_type, location, availability, `condition`, price_range) VALUES (?, ?, ?, ?, ?)",
      [type, "Default Location", true, condition, price.toString()] // Adjust location and availability as needed
    );

    res.status(201).json({ message: "E-Waste posted successfully" });
  } catch (err) {
    console.error("Error posting e-waste:", err); // Log the error
    res.status(500).json({ message: "Server error", error: err.message }); // Include error message in response
  }
};

const getEwaste = async (req, res) => {
  try {
    const [ewaste] = await db.query("SELECT * FROM EwastePosts");
    res.status(200).json(ewaste);
  } catch (err) {
    console.error("Error fetching e-waste:", err); // Log the error
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateEwaste = async (req, res) => {
  const { id } = req.params;
  const { item_name, type, quantity, condition, description, price, available_dates } = req.body;

  try {
    await db.query(
      "UPDATE EwastePosts SET item_name = ?, type = ?, quantity = ?, `condition` = ?, description = ?, price = ?, available_dates = ? WHERE post_id = ?",
      [item_name, type, quantity, condition, description, price, available_dates, id]
    );

    res.status(200).json({ message: "E-Waste updated successfully" });
  } catch (err) {
    console.error("Error updating e-waste:", err); // Log the error
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteEwaste = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM EwastePosts WHERE post_id = ?", [id]);
    res.status(200).json({ message: "E-Waste deleted successfully" });
  } catch (err) {
    console.error("Error deleting e-waste:", err); // Log the error
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { createEwaste, getEwaste, updateEwaste, deleteEwaste };