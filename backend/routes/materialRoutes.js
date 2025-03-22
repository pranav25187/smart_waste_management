const express = require("express");
const materialController = require("../controllers/materialController"); // Ensure this path is correct

const router = express.Router();

// Define your routes
router.get("/", materialController.getMaterials); // Ensure getMaterials is defined in materialController
router.post("/", materialController.createMaterial); // Ensure createMaterial is defined in materialController

module.exports = router;