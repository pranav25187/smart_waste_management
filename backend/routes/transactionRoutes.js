const express = require("express");
const transactionController = require("../controllers/transactionController");

const router = express.Router();

router.get("/", transactionController.getTransactions);
router.get("/history/:user_id", transactionController.getTransactionHistory);

module.exports = router;