const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const ewasteRoutes = require("./routes/ewasteRoutes");
const materialRoutes = require("./routes/materialRoutes");
const requestRoutes = require("./routes/requestRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const messageRoutes = require("./routes/messageRoutes");
const resourceRoutes = require("./routes/resourceRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ewaste", ewasteRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/resources", resourceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});