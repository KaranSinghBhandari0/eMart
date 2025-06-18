import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();

    const [admin, setAdmin] = useState(null);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [callingAI, setCallingAI] = useState(false);

    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    const [currProduct, setCurrProduct] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const [logging, setLogging] = useState(false);
    const [addingProduct, setAddingProduct] = useState(false);
    const [updatingProduct, setUpdatingProduct] = useState(false);

    useEffect(() => {
        if(admin) {
            allOrders();
            getAllProducts();
        }
    }, [admin])

    // login
    const login = async (formData) => {
        try {
            setLogging(true);
            const res = await axiosInstance.post("/admin/login", formData);
            setAdmin(res.data.admin);
            allOrders();
            toast.success(res.data.message);
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setLogging(false);
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
            setAddingProduct(true);
            const res = await axiosInstance.post("/admin/addNewProduct", productData);
            getAllProducts();
            navigate('/')
            toast.success(res.data.message);
        } catch (error) {
            toast.error(res.data.message);
            console.log("Error in Adding Product:", error);
        } finally {
            setAddingProduct(false);
        }
    }

    // get all Products
    const getAllProducts = async () => {
        try {
            const res = await axiosInstance.get("/product/getAllProducts");
            setProducts(res.data.products);
        } catch (error) {
            console.log(error);
        }
    }

    // update Product
    const updateProduct = async (id, formData) => {
        try {
            setUpdatingProduct(true);
            const res = await axiosInstance.put(`/admin/updateProduct/${id}`, formData);
            getAllProducts();
            toast.success('Product Updated');
        } catch (error) {
            toast.error('Failed to update product');
            console.log(error);
        } finally {
            setUpdatingProduct(false);
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

    const autofillProductDetails = async (image) => {
        try {
            setCallingAI(true);
            const aiForm = new FormData();
            aiForm.append('image', image);

            const res = await axiosInstance.post('/admin/generate-product-info', aiForm );
            toast.success('AI Autofill Successfully');
            return res;
        } catch (error) {
            toast.error(error.response?.data?.message || "AI Autofill failed:");
            console.log("AI Autofill failed:", error);
        } finally {
            setCallingAI(false);
        }
    };

    return (
        <AppContext.Provider value={{
            login, logout, logging,
            admin, isAuthorized, checkingAuth,
            addNewProduct, addingProduct,
            getAllProducts, products,
            currProduct, setCurrProduct, openModal, setOpenModal,
            updatingProduct, deleteProduct, updateProduct,
            selectedCategory, setSelectedCategory, allOrders, orders, updateOrderStatus,
            autofillProductDetails, callingAI
        }}>
            {children}
        </AppContext.Provider>
    );
};