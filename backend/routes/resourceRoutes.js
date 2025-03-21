const express = require("express");
const resourceController = require("../controllers/resourceController");

const router = express.Router();

router.get("/", resourceController.getResources);
router.post("/", resourceController.uploadResource);

module.exports = router;