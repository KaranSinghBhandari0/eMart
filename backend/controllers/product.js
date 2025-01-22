const Product = require('../models/Product');

// get all products
const getAllProducts = async (req,res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ message: 'Products fetched successfully', products });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching all products', error });
    }
}

// get products by category
const categoryProducts = async (req, res) => {
    const { category } = req.params;

    try {
        const products = await Product.find({ category });
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }
        res.status(200).json({ message: 'Products fetched successfully', products });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category products', error });
    }
}

// get product by id
const getProductDetails = async (req,res)=> {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if(!product) {
            return res.status(404).json({ message: 'No product found' });
        }

        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
}

module.exports = { getAllProducts, categoryProducts, getProductDetails }