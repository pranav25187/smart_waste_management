const express = require("express");
const transactionController = require("../controllers/transactionController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticate, transactionController.createTransaction);
router.get("/:user_id", authenticate, transactionController.getTransactions);

module.exports = router;