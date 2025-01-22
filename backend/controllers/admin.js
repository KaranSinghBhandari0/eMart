const jwt = require("jsonwebtoken");
const Product = require('../models/Product');
const cloudinary = require('../lib/cloudConfig');
const path = require("path");

// cookies option
const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
};

// Admin login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ msg: "Email and password are required" });
        }

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
            // Generate a JWT token
            const admin_token = jwt.sign( 
                { email, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" }
            );
            res.cookie("admin_token", admin_token, cookieOptions);

            const admin = {
                email: process.env.ADMIN_EMAIL,
            };

            return res.status(200).json({ msg: "Login successful", admin });
        } else {
            return res.status(401).json({ msg: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};

// Admin logout
const logout = async (req, res) => {
    try {
        res.clearCookie("admin_token", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });
        res.status(200).json({ msg: "Logout successful" });
    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
};

// Check admin authentication
const checkAuth = async (req, res) => {
    try {
        return res.status(200).json(req.admin);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
};

// create new product
const addNewProduct = async (req, res) => {
    try {
		const { name, description, price, category } = req.body;
        const result = await cloudinary.uploader.upload(req.file.path);

        const newProduct = new Product({
            name,
            description,
			price,
			category,
            image: result.secure_url,
            cloudinary_id: result.public_id,
        });
        await newProduct.save();

		res.status(200).json({message: 'Product added' , product: newProduct});
	} catch (error) {
		console.log("Error in createProduct", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (req.file) {
            // Delete old image from Cloudinary
            await cloudinary.uploader.destroy(product.cloudinary_id);

            // Upload new image
            const result = await cloudinary.uploader.upload(req.file.path);
            product.image = result.secure_url;
            product.cloudinary_id = result.public_id;
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;

        await product.save();

        res.status(200).json({ message: 'Product updated' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
}

// delete product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Delete image from Cloudinary
        await cloudinary.uploader.destroy(product.cloudinary_id);

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting product', error: err });
    }
}

module.exports = { login, logout, checkAuth, addNewProduct, updateProduct, deleteProduct };
