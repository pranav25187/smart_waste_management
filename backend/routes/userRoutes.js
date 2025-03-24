const express = require("express");
const userController = require("../controllers/userController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:user_id", authenticate, userController.getUser);
router.put("/:user_id", authenticate, userController.updateUser);

module.exports = router;