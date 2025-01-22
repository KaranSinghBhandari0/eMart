const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    cloudinary_id: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;