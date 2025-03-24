const db = require("../config/db");

const getUser = async (req, res) => {
  const { user_id } = req.params;
  try {
    const [user] = await db.query("SELECT * FROM Users WHERE user_id = ?", [user_id]);
    res.status(200).json(user[0]);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateUser = async (req, res) => {
  const { user_id } = req.params;
  const { name, email, location, mobile_no } = req.body;
  try {
    await db.query(
      "UPDATE Users SET name = ?, email = ?, location = ?, mobile_no = ? WHERE user_id = ?",
      [name, email, location, mobile_no, user_id]
    );
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getUser, updateUser };