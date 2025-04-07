const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
        trim: true,
    },
    phone: {
        type: String,
        unique: true,
    },
    cart: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        },
    ],
    orders: {
        type: Array
    },
    address: {
        street: {
            type: String,
            trim: true,
            default: ""
        },
        city: {
            type: String,
            trim: true,
            default: ""
        },
        state: {
            type: String,
            trim: true,
            default: ""
        },
        zipCode: {
            type: String,
            trim: true,
            default: ""
        },
    },
});

const User = mongoose.model("User", userSchema);
module.exports = User;