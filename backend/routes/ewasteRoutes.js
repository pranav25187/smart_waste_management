const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const ewasteController = require("../controllers/ewasteController");
const upload = require("../config/multer");

// ✅ Create an e-waste post (Requires Auth & Image Upload)
router.post("/", authenticate, upload.single("image"), ewasteController.createEwaste);

// ✅ Get all e-waste posts (Public)
router.get("/", ewasteController.getEwaste);

// ✅ Get logged-in user's materials (Requires Auth)
router.get("/my", authenticate, ewasteController.getMyMaterials);

// ✅ Get a specific e-waste post by ID (Public)
router.get("/:id", ewasteController.getEwasteById);

// ✅ Update an e-waste post (Only Authorized User)
router.put("/:id", authenticate, ewasteController.updateEwaste);

// ✅ Delete an e-waste post (Only Authorized User)
router.delete("/:id", authenticate, ewasteController.deleteEwaste);

module.exports = router;


