const Razorpay = require("razorpay");
const User = require("../models/User");

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create an order
const createOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        if (req.user.address === "") {
            return res.status(400).json({ message: "Please select delivery address" });
        }

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_order_${new Date().getTime()}`,
        };
        const order = await razorpayInstance.orders.create(options);
        res.status(200).json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Store orderId and paymentId in user DB
const saveOrder = async (req, res) => {
    try {
        const { orderId, paymentId, cart } = req.body;
        const date = new Date().toISOString().split("T")[0];

        // Creating an array of individual orders for each product in the cart
        const orderEntries = cart.map((item) => ({
            orderId,
            paymentId,
            productId: item.product._id,
            productName: item.product.name,
            productImage: item.product.image,
            amount: item.product.price,
            quantity: item.quantity,
            date,
            status: "Shipping",
        }));

        // Save each product as a separate order entry under orders array
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $push: { orders: { $each: orderEntries } }, // Push multiple orders
            },
            { new: true }
        );

        res.status(200).json({ message: "Order saved successfully" });
    } catch (error) {
        console.error("Error saving Order:", error);
        res.status(500).json({ message: "Order not saved" });
    }
};

// Fetch all orders of a user
const Orders = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const orders = user.orders;
        res.status(200).json({ orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};

module.exports = { createOrder, saveOrder, Orders };
