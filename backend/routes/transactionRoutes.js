const express = require("express");
const transactionController = require("../controllers/transactionController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticate, transactionController.createTransaction);
router.get("/:user_id", authenticate, transactionController.getTransactions);
router.put("/:transaction_id/status", authenticate, transactionController.updateTransactionStatus);

module.exports = router;