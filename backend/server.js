const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const ewasteRoutes = require("./routes/ewasteRoutes");
const messagingRoutes = require("./routes/messagingRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ewaste", ewasteRoutes);
app.use("/api/messages", messagingRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});