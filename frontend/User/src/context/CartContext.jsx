import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {axiosInstance} from '../lib/axios';

import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const navigate = useNavigate();

    const {user} = useContext(AuthContext);
    const [cartProducts, setCartProducts] = useState([]);

    // add to cart
    const addToCart = async (product) => {
        // If not logged in
        if(!user) {
            addToGuestCart(product);
            return;
        }

        try {
            const res = await axiosInstance.post('/cart/add', {product : product});
            toast.success('Added to cart');
        } catch (error) {
            toast.error('Failed to add');
            console.log(error);
        }
    }

    // get cart products
    const getCart = async () => {
        // if not logged in
        if(!user) {
            setCartProducts(getGuestCart()); // Get guest cart products
            return;
        }

        try {
            const res = await axiosInstance.get('/cart/items');
            setCartProducts(res.data.products);
        } catch (error) {
            console.log(error);
        }
    }

    // update cart items
    const updateCart = async (productId, newQuantity) => {
        if(newQuantity === 0) {
            const confirmDelete = window.confirm("Are you sure you want to remove this item from your cart?");
        
            if(!confirmDelete) {
                return;
            }
        }

        // If not logged in
        if (!user) {
            updateGuestCart(productId, newQuantity);
            await getCart(); // Refresh cart products
            return;
        }

        try {
            await axiosInstance.put(`/cart/update`, { productId, quantity: newQuantity } );
            await getCart(); // Refresh cart products
        } catch (error) {
          console.error("Error updating cart quantity:", error);
        }
    };

    // delete cart item
    const deleteCartItem = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to remove this item from your cart?");
        
        if(!confirmDelete) {
          return;
        }

        // If not logged in
        if (!user) {
            deleteGuestCart(id);
            await getCart(); // Refresh cart products
            return;
        }
    
        try {
            const res = await axiosInstance.delete(`/cart/remove/${id}`);
            toast.success('Item removed from cart');
            await getCart();
        } catch (error) {
            toast.error('Failed to delete');
            console.log(error);
        }
    };


    // --------------- Guest Cart functions ------------------

    // Function to add guest cart products
    const addToGuestCart = (product) => {
        const productID = product._id;
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if the product already exists in the cart
        const existingProductIndex = cart.findIndex(item => item.productID === productID);
        
        if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
        } else {
        cart.push({ productID, product, quantity: 1 });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        toast.success('Added to cart');
    };

    // Function to get guest cart products
    const getGuestCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        return cart;
    };

    // Function to delete a product from the guest cart
    const deleteGuestCart = (productID) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Filter out the product to be deleted
        cart = cart.filter(item => item.productID !== productID);
        
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    // Function to update quantity in the guest cart
    const updateGuestCart = (productID, newQuantity) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Update the quantity of the specified product
        const existingProductIndex = cart.findIndex(item => item.productID === productID);
        
        if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        } else {
        toast.error('Product not found');
        }
    };

    return (
        <CartContext.Provider value={{
            cartProducts, addToCart, getCart, updateCart, deleteCartItem,
        }}>
            {children}
        </CartContext.Provider>
    );
};