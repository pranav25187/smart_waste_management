const express = require("express");
const requestController = require("../controllers/requestController");

const router = express.Router();

router.post("/", requestController.createRequest);
router.get("/manufacturer/:userId", requestController.getRequestsForManufacturer);

module.exports = router;