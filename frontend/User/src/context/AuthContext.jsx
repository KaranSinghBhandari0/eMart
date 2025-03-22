import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    // checkAuth
    const isAuthenticated = async () => {
        try {
            const res = await axiosInstance.get("/auth/checkAuth");
            setUser(res.data);
            setOrders(res.data.orders);
        } catch (error) {
            setUser(null);
            console.log("Error in checkAuth:", error);
        } finally {
            setCheckingAuth(false);
        }
    }

    // login
    const login = async (formData) => {
        try {
            setLoading(true);
            const res = await axiosInstance.post("/auth/login", formData);
            setUser(res.data.user);
            await transferGuestCartToUser();
            redirectToPath();
            toast.success(res.data.msg);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.msg || "Login failed");
        } finally {
            setLoading(false);
        }
    }

    // signup
    const signup = async (formData) => {
        try {
            setLoading(true);
            const res = await axiosInstance.post("/auth/signup", formData);
            setUser(res.data.user);
            await transferGuestCartToUser();
            redirectToPath();
            toast.success(res.data.msg);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.msg || "Signup failed");
        } finally {
            setLoading(false);
        }
    }

    // redirect url 
    const redirectToPath = () => {
        const redirectPath = localStorage.getItem("redirectPath") || "/";
        setTimeout(() => {
            navigate(redirectPath);
        }, 100);
        localStorage.removeItem("redirectPath");
    }

    // logout
    const logout = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get("/auth/logout");
            setUser(null);
            toast.success("logout successfull");
            navigate('/login');
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    // Transfer guest cart to user cart
    const transferGuestCartToUser = async () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length === 0) {
            return;
        }

        try {
            const res = await axiosInstance.post(`/cart/transfer`, { cart });
            localStorage.removeItem('cart'); // Clear guest cart from local storage
        } catch (error) {
            console.log(error);
        }
    };

    // update profile
    const updateProfile = async (username, address) => {
        try {
            setLoading(true);
            await axiosInstance.post("/auth/updateProfile", { username, address });
            await isAuthenticated();
            toast.success("Profile Updated !!!");
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.msg || "failed to update profile");
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{
            signup, login, logout, isAuthenticated, updateProfile,
            user, checkingAuth, loading, orders,
        }}>
            {children}
        </AuthContext.Provider>
    );
};