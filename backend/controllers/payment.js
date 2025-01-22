const Razorpay = require('razorpay');
const User = require('../models/User');

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create an order
const createOrder = async (req, res) => {
    try {
        const {amount} = req.body;

        const options = {
            amount: amount * 100,
            currency: 'INR',
            receipt: `receipt_order_${new Date().getTime()}`,
        };
        const order = await razorpayInstance.orders.create(options);
        res.status(200).json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// Store orderId and paymentId in user DB
const saveOrder = async (req, res) => {
    try {
        const { orderId, paymentId } = req.body;

        await User.findByIdAndUpdate(
            req.user._id,
            { $push: { orders: { orderId, paymentId } } },
            { new: true }
        );

        res.status(200).json({ message: 'Order saved successfully' });
    } catch (error) {
        console.error('Error saving Order:', error);
        res.status(500).json({ message: 'Order not saved' });
    }
}

// Fetch all orders of a user
const Orders = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const orders = user.orders;
        res.status(200).json({ orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
}

// Fetch order details by payment ID
const paymentDetails = async (req, res) => {
    const {paymentId} = req.params;

    try {
        const payment = await razorpayInstance.payments.fetch(paymentId)
        if(!payment){
            return res.status(500).json({ message : "Error at razorpay loading"})
        }
        res.status(200).json({ orderDetails : payment });
    } catch(error) {
        res.status(500).json("failed to fetch payment")
    }
}

// Fetch all orders of a user
const orders = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const orders = user.orders;
        res.status(200).json({ orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
}

// Fetch order details by payment ID
const orderDetails = async (req, res) => {
    const {paymentId} = req.params;

    try {
        const payment = await razorpayInstance.payments.fetch(paymentId)
        if(!payment){
            return res.status(500).json({ message : "Error at razorpay loading"})
        }
        res.status(200).json({ orderDetails : payment });
    } catch(error) {
        res.status(500).json("failed to fetch payment")
    }
}

module.exports = {createOrder, saveOrder, Orders, paymentDetails, orders, orderDetails};