import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();

    const [admin, setAdmin] = useState(null);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [loading, setLoading] = useState(false);

    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    const [currProduct, setCurrProduct] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        if(admin) {
            allOrders();
            getAllProducts();
        }
    }, [admin])

    // login
    const login = async (formData) => {
        try {
            setLoading(true);
            const res = await axiosInstance.post("/admin/login", formData);
            setAdmin(res.data.admin);
            allOrders();
            toast.success(res.data.message);
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }

    // logout
    const logout = async () => {
        try {
            const res = await axiosInstance.get("/admin/logout");
            setAdmin(null);
            toast.success("logout successfull");
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    // checkAuth
    const isAuthorized = async () => {
        try {
            const res = await axiosInstance.get("/admin/checkAuth");
            setAdmin(res.data);
        } catch (error) {
            setAdmin(null);
            console.log("Error in checkAuth:", error);
        } finally {
            setCheckingAuth(false);
        }
    }

    // add new Product
    const addNewProduct = async (productData) => {
        try {
            setLoading(true);
            const res = await axiosInstance.post("/admin/addNewProduct", productData);
            getAllProducts();
            navigate('/')
            toast.success(res.data.message);
        } catch (error) {
            toast.error(res.data.message);
            console.log("Error in Adding Product:", error);
        } finally {
            setLoading(false);
        }
    }

    // get all Products
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get("/product/getAllProducts");
            setProducts(res.data.products);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    // update Product
    const updateProduct = async (id, formData) => {
        try {
            setLoading(true);
            const res = await axiosInstance.put(`/admin/updateProduct/${id}`, formData);
            getAllProducts();
            toast.success('Product Updated');
        } catch (error) {
            toast.error('Failed to update product');
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    // delete Product
    const deleteProduct = async (id) => {
        try {
            const res = await axiosInstance.delete(`/admin/deleteProduct/${id}`);
            getAllProducts();
            toast.success('Product removed');
        } catch (error) {
            toast.error('Failed to delete product');
            console.log(error);
        }
    }

    // get all orders
    const allOrders = async () => {
        try {
            const res = await axiosInstance.get(`/admin/allOrders`);
            setOrders(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    // update order status
    const updateOrderStatus = async (order, newStatus) => {
        try {
            await axiosInstance.put(`/admin/updateOrderStatus`, {order, newStatus});
            await allOrders();
            toast.success('Order status updated');
        } catch (error) {
            toast.error('Failed to Update order status');
            console.log(error);
        }
    };

    return (
        <AppContext.Provider value={{
            login, logout,
            admin, isAuthorized, checkingAuth,
            addNewProduct,
            getAllProducts, products,
            currProduct, setCurrProduct, openModal, setOpenModal,
            updateProduct, deleteProduct,
            loading, selectedCategory, setSelectedCategory, allOrders, orders, updateOrderStatus,
        }}>
            {children}
        </AppContext.Provider>
    );
};