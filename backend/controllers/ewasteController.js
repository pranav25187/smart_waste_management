const db = require("../config/db");

// Create E-Waste Post
const createEwaste = async (req, res) => {
  try {
    const { material_type, description, quantity, unit, condition_status, price, location, available_dates } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    const posted_by = req.user.id; // From auth middleware

    if (!material_type || !quantity || !unit || !condition_status || !price || !location || !available_dates) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [result] = await db.query(
      `INSERT INTO Materials 
       (material_type, description, quantity, unit, condition_status, price, location, available_dates, image_path, posted_by) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [material_type, description, quantity, unit, condition_status, price, location, available_dates, imagePath, posted_by]
    );

    res.status(201).json({ 
      message: "Material posted successfully",
      material_id: result.insertId
    });
  } catch (err) {
    console.error("Error posting material:", err);
    res.status(500).json({ message: "Failed to post material", error: err.message });
  }
};

// Get All Materials
const getEwaste = async (req, res) => {
  try {
    const [materials] = await db.query(
      `SELECT m.*, u.name as seller_name 
       FROM Materials m 
       JOIN Users u ON m.posted_by = u.user_id 
       ORDER BY m.created_at DESC`
    );
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
    const [materials] = await db.query(
      `SELECT m.*, u.name as seller_name 
       FROM Materials m 
       JOIN Users u ON m.posted_by = u.user_id 
       WHERE m.material_id = ?`,
      [id]
    );
    
    if (materials.length === 0) {
      return res.status(404).json({ message: "Material not found" });
    }
    res.status(200).json(materials[0]);
  } catch (err) {
    console.error("Error fetching material:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update Material
const updateEwaste = async (req, res) => {
  const { id } = req.params;
  const { material_type, description, quantity, unit, condition_status, price, location, available_dates } = req.body;
  const userId = req.user.id;

  try {
    // Check if user owns the material
    const [materials] = await db.query(
      "SELECT posted_by FROM Materials WHERE material_id = ?",
      [id]
    );

    if (materials.length === 0) {
      return res.status(404).json({ message: "Material not found" });
    }

    if (materials[0].posted_by !== userId) {
      return res.status(403).json({ message: "Not authorized to update this material" });
    }

    await db.query(
      `UPDATE Materials 
       SET material_type = ?, description = ?, quantity = ?, unit = ?, 
           condition_status = ?, price = ?, location = ?, available_dates = ?
       WHERE material_id = ?`,
      [material_type, description, quantity, unit, condition_status, price, location, available_dates, id]
    );

    res.status(200).json({ message: "Material updated successfully" });
  } catch (err) {
    console.error("Error updating material:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete Material
const deleteEwaste = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    // Check if user owns the material
    const [materials] = await db.query(
      "SELECT posted_by FROM Materials WHERE material_id = ?",
      [id]
    );

    if (materials.length === 0) {
      return res.status(404).json({ message: "Material not found" });
    }

    if (materials[0].posted_by !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this material" });
    }

    await db.query("DELETE FROM Materials WHERE material_id = ?", [id]);
    res.status(200).json({ message: "Material deleted successfully" });
  } catch (err) {
    console.error("Error deleting material:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get Materials Posted by the Logged-in User
const getMyMaterials = async (req, res) => {
  const userId = req.user.id;

  try {
    const [materials] = await db.query(
      `SELECT m.*, u.name as seller_name 
       FROM Materials m 
       JOIN Users u ON m.posted_by = u.user_id 
       WHERE m.posted_by = ?
       ORDER BY m.created_at DESC`,
      [userId]
    );

    res.status(200).json(materials);
  } catch (error) {
    console.error("Error fetching user's materials:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createEwaste,
  getEwaste,
  getEwasteById,
  updateEwaste,
  deleteEwaste,
  getMyMaterials
};