const express = require('express');
const router = express.Router();

const { getAllProducts, categoryProducts, getProductDetails } = require('../controllers/product');

router.get('/getAllProducts', getAllProducts);
router.get('/category/:category', categoryProducts);
router.get('/:id', getProductDetails);

module.exports = router;