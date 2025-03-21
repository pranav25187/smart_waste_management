const express = require("express");
const ewasteController = require("../controllers/ewasteController");
const upload = require("../config/multer"); // Import Multer configuration

const router = express.Router();

// Use Multer middleware for file uploads in the createEwaste route
router.post("/", upload.single("image"), ewasteController.createEwaste);
router.get("/", ewasteController.getEwaste);
router.put("/:id", ewasteController.updateEwaste);
router.delete("/:id", ewasteController.deleteEwaste);

module.exports = router;