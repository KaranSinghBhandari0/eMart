const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// cookies option
const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: 'e-mail already exists' });
        }

        // checking for strong password
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Generate a JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        // store in cookies
        res.cookie('token', token, cookieOptions);

        // Save the user to the database
        await newUser.save();
        const { password: _, orders: __, ...userWithoutSensitiveData } = newUser._doc;

        res.status(200).json({ message: `Welcome ${newUser.username}` , user: userWithoutSensitiveData});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Checking email
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        // store in cookies
        res.cookie('token', token, cookieOptions);

        const { password: _, orders: __, ...userWithoutSensitiveData } = user._doc;

        res.status(200).json({ message: 'Login successful', user: userWithoutSensitiveData});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const logout = async (req,res) => {
    res.clearCookie('token' , {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    });
    res.status(200).json({message: 'logout successfull'})
}

const checkAuth = async (req,res) => {
    const user = {
        userId: req.user._id,
        username: req.user.username,
        email: req.user.email,
        address: req.user.address,
    }
    
    res.status(200).json({ user });   
}

const updateProfile = async (req, res) => {
    try {
        const { username, address } = req.body;

        const user = await User.findById(req.user._id);

        const newUsername = username.trim();
        const newAddress = address.trim();

        if(newUsername !== "") {
            user.username = newUsername;
        }
        
        user.address = newAddress;

        await user.save();
        res.status(200).json({ message: 'Profile Updated !!!'});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const fetchOrders = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if(!user) {
            return res.status(400).json({ message: 'user not authenticated' });
        }

        const orders = user.orders;

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = { signup, login, logout, checkAuth, updateProfile, fetchOrders };