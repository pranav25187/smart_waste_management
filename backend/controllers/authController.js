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

    // Debugging logs
    console.log("Fetched user:", user);
    console.log("Password hash from DB:", user.password_hash);

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
  const { email, password, role, location } = req.body;
  try {
    // Ensure required fields are provided
    if (!email || !password || !role || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    await db.query(
      "INSERT INTO Users (email, password_hash, role, location) VALUES (?, ?, ?, ?)",
      [email, hashedPassword, role, location]
    );

    console.log("User created successfully:", { email, role, location });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { login, signup };