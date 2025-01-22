import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {axiosInstance} from '../lib/axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const navigate = useNavigate();

    const [products , setProducts] = useState([]);
    const [product , setProduct] = useState(null);
    const [categoryProducts , setCategoryProducts] = useState([]);

    // get all Products
    const getAllProducts = async () => {
        try {
            const res = await axiosInstance.get("/product/getAllProducts");
            setProducts(res.data.products);
        } catch(error) {
            console.log(error);
        }
    }

    // get Products by id
    const getProductDetails = async (id) => {
        try {
            setProduct(null);
            const res = await axiosInstance.get(`/product/${id}`);
            setProduct(res.data.product);
        } catch(error) {
            console.log(error);
        }
    }

    // get category products
    const getCategoryProducts = async (category) => {
        try {
            setCategoryProducts([]);
            const res = await axiosInstance.get(`/product/category/${category}`);
            setCategoryProducts(res.data.products);
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <ProductContext.Provider value={{
            getAllProducts, getProductDetails, getCategoryProducts,
            products, product, categoryProducts,
        }}>
            {children}
        </ProductContext.Provider>
    );
};