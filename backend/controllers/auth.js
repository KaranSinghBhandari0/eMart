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
        phone: req.user.phone,
    }
    
    res.status(200).json({ user });   
}

const updateProfile = async (req, res) => {
    try {
        const { username, phone, address } = req.body;

        const user = await User.findById(req.user._id);
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if(phone && phone.length !== 10) {
            return res.status(400).json({ message: 'Invalid mobile number' });
        }

        if(username) {
            user.username = username;
        }
        if(phone) {
            user.phone = phone;
        }

        if(address) {
            user.address.street = address.street || "";
            user.address.city = address.city || "";
            user.address.state = address.state || "";
            user.address.zipCode = address.zipCode || "";
        }

        await user.save();

        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ message: 'Failed to update profile', error: error.message });
    }
};

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