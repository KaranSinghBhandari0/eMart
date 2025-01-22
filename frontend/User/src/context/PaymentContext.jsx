import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {axiosInstance} from '../lib/axios';
import {AuthContext} from './AuthContext'

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
    const navigate = useNavigate();

    const { user } = useContext(AuthContext)

    const [orderDetails, setOrderDetails] = useState(null);
    const [orders, setOrders] = useState([]);

    // buy product
    const handleBuy = async (amount) => {
        if (!user) {
            toast.error('Login to continue');
            navigate('/login');
            return;
        }
    
        try {
            const { data } = await axiosInstance.post('/payment/create-order', { amount } );
    
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: data.order.amount,
                currency: data.order.currency,
                name: "Test Payment",
                description: "Demo Transaction",
                order_id: data.order.id,
            handler: function (response) {
            const savePayment = async () => {
                try {
                await axiosInstance.post( `/payment/save-order`, { orderId: data.order.id, paymentId: response.razorpay_payment_id }
                );
                    toast.success(`Payment successful`);
                } catch (error) {
                    console.error('Error saving payment:', error);
                    toast.error('Failed to save payment information');
                }
            };
                savePayment();
            },
                prefill: {
                email: "testuser@example.com",
                contact: "9999999999"
            },
                theme: {
                color: "#3399cc"
            }
        };
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Error in creating Razorpay order", error);
            toast.error('Failed to create order. Please try again later.');
        }
    };

      

    // get all orders
    const getOrders = async () => {
        try {
            const res = await  axiosInstance.get('/payment/orders');
            setOrders(res.data.orders);
        } catch (error) {
            toast.error('Server Error');
            console.log(error);
        }
    };

    // fetch order details
    const fetchOrderDetails = async (searchPaymentId) => {
        try {
            const response = await axiosInstance.get('/payment/order-details/${searchPaymentId}');
            setOrderDetails(response.data.orderDetails);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <PaymentContext.Provider value={{
            handleBuy, getOrders, fetchOrderDetails,
            orders, orderDetails
        }}>
            {children}
        </PaymentContext.Provider>
    );
};