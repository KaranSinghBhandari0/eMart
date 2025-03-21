const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../Middlewares/auth');
const { getAllProducts, updateProductRating } = require('../controllers/product');

router.get('/getAllProducts', getAllProducts);
router.post('/update-rating', isAuthenticated, updateProductRating);

module.exports = router;