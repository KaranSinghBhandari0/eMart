const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../Middlewares/auth');

const { addToCart, getCart, updateCart, deleteItem, transfer } = require('../controllers/cart');

router.post('/add', isAuthenticated, addToCart);
router.get('/items', isAuthenticated, getCart);
router.put('/update', isAuthenticated, updateCart);
router.delete('/remove/:productID', isAuthenticated, deleteItem);
router.post('/transfer', isAuthenticated, transfer);

module.exports = router;