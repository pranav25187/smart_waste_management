const db = require("../config/db");

// Create E-Waste Post
const createEwaste = async (req, res) => {
  try {
    const { user_id, item_name, type, quantity, condition, description, price, available_dates } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Save file path

    console.log("Uploaded Image Path:", imagePath); // Debugging

    if (!user_id || !item_name || !type || !quantity || !condition || !description || !price || !available_dates) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Insert into EwastePosts
    await db.query(
      "INSERT INTO EwastePosts (user_id, item_name, type, quantity, `condition`, description, price, available_dates, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [user_id, item_name, type, quantity, condition, description, price, available_dates, imagePath]
    );

    // Insert into Materials
    await db.query(
      "INSERT INTO Materials (material_type, location, availability, `condition`, price_range, posted_by, image_path) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [type, "Default Location", true, condition, price, user_id, imagePath]
    );

    res.status(201).json({ message: "E-Waste posted successfully" });
  } catch (err) {
    console.error("Error posting e-waste:", err);
    res.status(500).json({ message: "Failed to post e-waste. Please try again.", error: err.message });
  }
};

// Get All Materials
const getEwaste = async (req, res) => {
  try {
    const [materials] = await db.query("SELECT * FROM Materials");
    res.status(200).json(materials);
  } catch (err) {
    console.error("Error fetching materials:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get Material by ID
const getEwasteById = async (req, res) => {
  const { id } = req.params;
  try {
    const [material] = await db.query("SELECT * FROM Materials WHERE material_id = ?", [id]);
    if (material.length === 0) {
      return res.status(404).json({ message: "Material not found" });
    }
    res.status(200).json(material[0]);
  } catch (err) {
    console.error("Error fetching material:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update E-Waste Post
const updateEwaste = async (req, res) => {
  const { id } = req.params;
  const { item_name, type, quantity, condition, description, price, available_dates } = req.body;
  try {
    // Update EwastePosts
    await db.query(
      "UPDATE EwastePosts SET item_name = ?, type = ?, quantity = ?, `condition` = ?, description = ?, price = ?, available_dates = ? WHERE post_id = ?",
      [item_name, type, quantity, condition, description, price, available_dates, id]
    );

    // Update Materials
    await db.query(
      "UPDATE Materials SET material_type = ?, `condition` = ?, price_range = ? WHERE material_id = ?",
      [type, condition, price, id]
    );

    res.status(200).json({ message: "E-Waste updated successfully" });
  } catch (err) {
    console.error("Error updating e-waste:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete E-Waste Post
const deleteEwaste = async (req, res) => {
  const { id } = req.params;
  try {
    // Delete from EwastePosts
    await db.query("DELETE FROM EwastePosts WHERE post_id = ?", [id]);

    // Delete from Materials
    await db.query("DELETE FROM Materials WHERE material_id = ?", [id]);

    res.status(200).json({ message: "E-Waste deleted successfully" });
  } catch (err) {
    console.error("Error deleting e-waste:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get Materials Posted by the Logged-in User
const getMyMaterials = async (req, res) => {
  const userId = req.user.id; // Extracted from the token in authMiddleware
  console.log("Extracted User ID from Token:", req.user);

  try {
    const [materials] = await db.query(
      "SELECT * FROM Materials WHERE posted_by = ?",
      [userId]
    );

    res.status(200).json(materials);
  } catch (error) {
    console.error("Error fetching user's materials:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Export all functions
module.exports = {
  createEwaste,
  getEwaste,
  getEwasteById,
  updateEwaste,
  deleteEwaste,
  getMyMaterials, // Ensure this is exported
};