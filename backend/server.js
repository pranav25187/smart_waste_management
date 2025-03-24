const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const ewasteRoutes = require("./routes/ewasteRoutes");
const messagingRoutes = require("./routes/messagingRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const authenticate = require("./middleware/authMiddleware");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ewaste", ewasteRoutes);
app.use("/api/messages", authenticate, messagingRoutes);
app.use("/api/transactions", authenticate, transactionRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});