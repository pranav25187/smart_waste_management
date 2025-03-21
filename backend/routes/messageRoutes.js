const express = require("express");
const messageController = require("../controllers/messageController");

const router = express.Router();

router.post("/", messageController.sendMessage);
router.get("/:user_id", messageController.getMessages);

module.exports = router;