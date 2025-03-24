const express = require("express");
const messagingController = require("../controllers/messagingController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticate, messagingController.sendMessage);
router.get("/:user_id", authenticate, messagingController.getMessages);
router.get("/:user_id/unread", authenticate, messagingController.getUnreadCount);

module.exports = router;