import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {axiosInstance} from '../lib/axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();

    const [admin, setAdmin] = useState(null)
    const [checkingAuth, setCheckingAuth] = useState(true);

    const [products , setProducts] = useState([]);
    const [currProduct, setCurrProduct] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    // login
    const login = async (formData) => {
        console.log(formData)
        try {
            const res = await axiosInstance.post("/admin/login", formData);
            setAdmin(res.data.admin);
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
            const res = await axiosInstance.get("/admin/logout");
            setAdmin(null);
            toast.success("logout successfull");
            navigate('/');
        } catch(error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    // checkAuth
    const isAuthorized = async () => {
        try {
            const res = await axiosInstance.get("/admin/checkAuth");
            setAdmin(res.data);
        } catch(error) {
            setAdmin(null);
            console.log("Error in checkAuth:", error);
        } finally {
            setCheckingAuth(false);
        }
    }

    // add new Product
    const addNewProduct = async (productData) => {
        try {
            const res = await axiosInstance.post("/admin/addNewProduct", productData);
            navigate('/')
            toast.success(res.data.message);
        } catch(error) {
            toast.error(res.data.message);
            console.log("Error in Adding Product:", error);
        }
    }

    // get all Products
    const getAllProducts = async () => {
        try {
            const res = await axiosInstance.get("/product/getAllProducts");
            setProducts(res.data.products);
        } catch(error) {
            console.log(error);
        }
    }

    // update Product
    const updateProduct = async (id,formData) => {
        try {
            const res = await axiosInstance.put(`/admin/updateProduct/${id}`, formData);
            getAllProducts();
            toast.success('Product Updated');
        } catch (error) {
            toast.error('Failed to update product');
            console.log(error);
        }
    }

    // delete Product
    const deleteProduct = async (id) => {
        try {
            const res = await axiosInstance.delete(`/admin/deleteProduct/${id}`);
            getAllProducts();
            toast.success('Product Deleted');
        } catch (error) {
            toast.error('Failed to delete product');
            console.log(error);
        }
    }

    return (
        <AppContext.Provider value={{
            login, logout,
            admin, isAuthorized, checkingAuth,
            addNewProduct,
            getAllProducts, products,
            currProduct, setCurrProduct, openModal, setOpenModal,
            updateProduct, deleteProduct
        }}>
            {children}
        </AppContext.Provider>
    );
};