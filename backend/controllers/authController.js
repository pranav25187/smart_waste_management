const db = require("../config/db");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Fetch user from the database
    const [users] = await db.query("SELECT * FROM Users WHERE email = ?", [email]);
    const user = users[0]; // Extract the user object

    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Validate password_hash
    if (!user.password_hash) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Login successful
    res.status(200).json({ message: "Login successful", user: user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const signup = async (req, res) => {
  const { name, email, password, role, location, mobile_no } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Fixed SQL query: Added missing placeholder for mobile_no
    await db.query(
      "INSERT INTO Users (name, email, password_hash, role, location, mobile_no) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, hashedPassword, role, location, mobile_no]
    );

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { login, signup };