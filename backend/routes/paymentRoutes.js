const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post("/confirm", paymentController.confirmPayment);
router.get("/sale/:saleId", paymentController.getPaymentBySaleId);

module.exports = router;