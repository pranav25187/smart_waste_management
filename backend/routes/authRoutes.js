const express = require("express");
const authController = require("../controllers/authController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ User Authentication Routes
router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.post("/forgot-password", authController.forgotPassword);

// ✅ Token Verification Route
router.get("/verify-token", authenticate, (req, res) => {
    res.status(200).json({ message: "Token is valid", user: req.user });
});

module.exports = router;

