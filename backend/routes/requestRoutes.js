const express = require("express");
const requestController = require("../controllers/requestController");

const router = express.Router();

router.post("/", requestController.createRequest);
router.get("/:user_id", requestController.getRequests);

module.exports = router;