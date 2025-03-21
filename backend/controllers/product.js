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

const updateProductRating = async (req, res) => {
    try {
        const { productId, rating, review } = req.body;

        if (!req.user) {
            return res.status(401).json({ message: 'Login to continue' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
 
        if(rating === 0) {
            return res.status(400).json({ message: 'Please select rating' });
        }

        // Calculate new average rating
        const totalReviews = product.reviews + 1;
        const newRating = ((product.rating * product.reviews) + rating) / totalReviews;

        product.reviews = totalReviews;
        product.rating = newRating;

        await product.save();
        res.status(200).json({ message: 'Product rating updated' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product rating', error });
    }
};

module.exports = { getAllProducts, updateProductRating }