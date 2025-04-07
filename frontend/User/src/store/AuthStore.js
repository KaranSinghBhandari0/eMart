import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast';
import { navigateTo } from '../lib/navigation';

export const AuthStore = create((set, get) => ({
    user: null,
    checkingAuth: true,
    orders: [],
    loading: false,
    updatingProfile: false,
    fetchingOrders: false,

    // check authentication
    isAuthenticated: async () => {
        try {
            const res = await axiosInstance.get("/auth/checkAuth");
            set({ user: res.data.user });
        } catch (error) {
            set({ user: null });
            console.log("Error in checkAuth:", error);
        } finally {
            set({ checkingAuth: false });
        }
    },

    // login
    login: async (formData) => {
        try {
            set({ loading: true });
            const res = await axiosInstance.post("/auth/login", formData);
            set({ user: res.data.user });
            await get().transferGuestCartToUser();
            get().redirectToPath();
            toast.success(res.data.message);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            set({ loading: false });
        }
    },

    // signup
    signup: async (formData) => {
        try {
            set({ loading: true });
            const res = await axiosInstance.post("/auth/signup", formData);
            set({ user: res.data.user });
            await get().transferGuestCartToUser();
            get().redirectToPath();
            toast.success(res.data.message);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Signup failed");
        } finally {
            set({ loading: false });
        }
    },

    // logout
    logout: async () => {
        try {
            set({ loading: true });
            await axiosInstance.get("/auth/logout");
            set({ user: null });
            toast.success("Logout successful");
            navigateTo('/login');
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message);
        } finally {
            set({ loading: false });
        }
    },

    // redirect logic
    redirectToPath: () => {
        const redirectPath = localStorage.getItem("redirectPath") || "/";
        navigateTo(redirectPath);
        localStorage.removeItem("redirectPath");
    },

    // transfer guest cart to user cart
    transferGuestCartToUser: async () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) return;
        try {
            await axiosInstance.post("/cart/transfer", { cart });
            localStorage.removeItem('cart');
        } catch (error) {
            console.log(error);
        }
    },

    // profile update
    updateProfile: async (userData) => {
        try {
            set({ updatingProfile: true });
            await axiosInstance.post("/auth/updateProfile", userData);
            await get().isAuthenticated();
            if(localStorage.getItem("isAddress")) {
                toast.success("Address added successfully");
                navigateTo(localStorage.getItem("isAddress"));
                localStorage.removeItem("isAddress");
            } else {
                toast.success("Profile updated successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            set({ updatingProfile: false });
        }
    },

    // fetch prders
    fetchOrders: async () => {
        try {
            set({ fetchingOrders: true });
            const res = await axiosInstance.get("/auth/fetchOrders");
            set({ orders: res.data.orders })
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to fetch orders");
        } finally {
            set({ fetchingOrders: false });
        }
    },

}));