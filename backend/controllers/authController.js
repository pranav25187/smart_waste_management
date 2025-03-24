const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await db.query("SELECT * FROM Users WHERE email = ?", [email]);
    const user = users[0];

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        location: user.location,
        mobile_no: user.mobile_no
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const signup = async (req, res) => {
  const { name, email, password, location, mobile_no } = req.body;
  try {
    // Check if email already exists
    const [existingUsers] = await db.query("SELECT * FROM Users WHERE email = ?", [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      "INSERT INTO Users (name, email, password_hash, location, mobile_no) VALUES (?, ?, ?, ?, ?)",
      [name, email, hashedPassword, location, mobile_no]
    );

    const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: result.insertId,
        name,
        email,
        location,
        mobile_no
      }
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const [users] = await db.query("SELECT * FROM Users WHERE email = ?", [email]);
    if (users.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    // In a real implementation, you would:
    // 1. Generate a password reset token
    // 2. Save it to the database with an expiration time
    // 3. Send an email with a reset link
    // For now, we'll just return a success message
    res.status(200).json({ 
      message: "Password reset instructions have been sent to your email" 
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { login, signup, forgotPassword };
