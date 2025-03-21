const db = require("../config/db");

const getResources = async (req, res) => {
  try {
    const [resources] = await db.query("SELECT * FROM Resources");
    res.status(200).json(resources);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const uploadResource = async (req, res) => {
  const { title, description, file_path } = req.body;
  try {
    await db.query(
      "INSERT INTO Resources (title, description, file_path) VALUES (?, ?, ?)",
      [title, description, file_path]
    );
    res.status(201).json({ message: "Resource uploaded successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getResources, uploadResource };