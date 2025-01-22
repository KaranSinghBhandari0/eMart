import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {axiosInstance} from '../lib/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null)
    const [checkingAuth, setCheckingAuth] = useState(true);

    // signup
    const signup = async (formData) => {
        try {
            const res = await axiosInstance.post("/auth/signup", formData);
            setUser(res.data.user);
            transferGuestCartToUser();
            toast.success(res.data.msg);
            navigate('/');
        } catch(error) {
            console.log(error);
            toast.error(error.response?.data?.msg || "Signup failed");
        }
    }

    // login
    const login = async (formData) => {
        try {
            const res = await axiosInstance.post("/auth/login", formData);
            setUser(res.data.user);
            transferGuestCartToUser();
            toast.success(res.data.msg);
            navigate('/');
        } catch(error) {
            console.log(error);
            toast.error(error.response?.data?.msg || "Login failed");
        }
    }

    // logout
    const logout = async () => {
        try {
            const res = await axiosInstance.get("/auth/logout");
            setUser(null);
            toast.success("logout successfull");
            navigate('/login');
        } catch(error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    // checkAuth
    const isAuthenticated = async () => {
        try {
            const res = await axiosInstance.get("/auth/checkAuth");
            setUser(res.data);
        } catch(error) {
            setUser(null);
            console.log("Error in checkAuth:", error);
        } finally {
            setCheckingAuth(false);
        }
    }

    // Transfer guest cart to user cart
    const transferGuestCartToUser = async () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        if(cart.length === 0) {
            return;
        }

        try {
            const res = await axiosInstance.post(`/cart/transfer`, { cart });
            localStorage.removeItem('cart'); // Clear guest cart from local storage
        } catch (error) {
            console.log(error);
        }
    };

    // get all orders
    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState(null);

    const getOrders = async () => {
        try {
            const res = await axiosInstance.get(`/payment/orders`);
            setOrders(res.data.orders);
        } catch (error) {
            toast.error('Server Error');
            console.log(error);
        }
    };

    // fetch order details
    const fetchOrderDetails = async (searchPaymentId) => {
        try {
            const response = await axiosInstance.get(`/payment/order-details/${searchPaymentId}`);
            setOrderDetails(response.data.orderDetails);
        } catch (error) {
            console.error("Error fetching order details", error);
            toast.error('Failed to fetch order details');
        }
    };

    return (
        <AuthContext.Provider value={{
            signup, login, logout,
            user, isAuthenticated, checkingAuth,
            getOrders, orders, orderDetails, fetchOrderDetails
        }}>
            {children}
        </AuthContext.Provider>
    );
};