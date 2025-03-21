const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../Middlewares/auth');
const { createOrder, saveOrder, Orders } = require('../controllers/payment');

router.post('/create-order', isAuthenticated, createOrder);
router.post('/save-order', isAuthenticated, saveOrder);
router.get('/orders', isAuthenticated, Orders);

module.exports = router;