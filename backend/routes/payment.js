const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../Middlewares/auth');
const { createOrder, saveOrder } = require('../controllers/payment');

router.post('/create-order', isAuthenticated, createOrder);
router.post('/save-order', isAuthenticated, saveOrder);

module.exports = router;