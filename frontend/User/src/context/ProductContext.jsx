import React, { createContext, useContext, useEffect, useState } from 'react';
import {axiosInstance} from '../lib/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

    const { user } = useContext(AuthContext);
    const [cart, setCart] = useState([]);

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAllProducts();
    }, [products])
    
    // get all Products
    const getAllProducts = async () => {
        try {
            const res = await axiosInstance.get("/product/getAllProducts");
            setProducts(res.data.products);
        } catch(error) {
            console.log(error);
        }
    }

    // update product rating
    const updateRating = async (productId, rating, review) => {
        if (!user) {
            toast.error('Login to continue');
            
            // Store intended URL
            localStorage.setItem("redirectPath", window.location.pathname);
    
            navigate('/login');
            return;
        }
    
        try {
            setLoading(true);
            const res = await axiosInstance.post("/product/update-rating", { productId, rating, review });
            toast.success(res.data.message);
            await getAllProducts();
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to rate product");
        } finally {
            setLoading(false);
        }
    };
    
    // buy product
    const handleBuy = async (amount, product) => {
        if (!user) {
            toast.error('Login to continue');
    
            // Store intended URL
            localStorage.setItem("redirectPath", window.location.pathname);
    
            navigate('/login');
            return;
        }
    
        if (user.address === "") {
            toast.error('Add Delivery address');
            navigate('/profile');
            return;
        }
    
        try {
            const { data } = await axiosInstance.post('/payment/create-order', { amount });
    
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
                            await axiosInstance.post(`/payment/save-order`, {
                                orderId: data.order.id,
                                paymentId: response.razorpay_payment_id,
                                cart: product ? [{ product, quantity: 1 }] : cart
                            });
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

    return (
        <ProductContext.Provider value={{
            getAllProducts, products, updateRating, loading, handleBuy, setCart
        }}>
            {children}
        </ProductContext.Provider>
    );
};