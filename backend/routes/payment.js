const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../Middlewares/auth');
const { createOrder, saveOrder, Orders, paymentDetails, orders, orderDetails } = require('../controllers/payment');

router.post('/create-order', isAuthenticated, createOrder);
router.post('/save-order', isAuthenticated, saveOrder);
router.get('/orders', isAuthenticated, Orders);
router.get('/order-details/:paymentId', paymentDetails);
router.get('/orders', isAuthenticated, orders);
router.get('/order-details/:paymentId', orderDetails);

module.exports = router;