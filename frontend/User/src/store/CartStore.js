import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { AuthStore } from "./AuthStore";
import { ProductStore } from "./ProductStore";

export const CartStore = create((set, get) => ({
    cartProducts: [],
    loading: false,

    // Fetch cart products
    getCart: async () => {
        const { user} = AuthStore.getState();

        if (!user) {
            set({ cartProducts: get().getGuestCart() });
            return;
        }

        try {
            set({ loading: true });
            const res = await axiosInstance.get("/cart/items");
            set({ cartProducts: res.data.products });
        } catch (error) {
            console.error("Error fetching cart:", error);
        } finally {
            set({ loading: false });
        }
    },

    // Add to cart
    addToCart: async (product) => {
        const { user } = AuthStore.getState();

        if (!user) {
            get().addToGuestCart(product);
            get().getCart();
            return;
        }

        try {
            await axiosInstance.post("/cart/add", { product });
            await get().getCart();
            toast.success("Added to cart");
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Failed to add");
        }
    },

    // Update cart quantity
    updateCart: async (productId, newQuantity) => {
        if (newQuantity === 0) {
            const confirmDelete = window.confirm("Are you sure you want to remove this item from your cart?");
            if (!confirmDelete) return;
        }

        const { user } = AuthStore.getState();

        if (!user) {
            get().updateGuestCart(productId, newQuantity);
            get().getCart();
            return;
        }

        try {
            await axiosInstance.put("/cart/update", { productId, quantity: newQuantity });
            await get().getCart();
        } catch (error) {
            console.error("Error updating cart:", error);
        }
    },

    // Delete cart item
    deleteCartItem: async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to remove this item from your cart?");
        if (!confirmDelete) return;

        const { user } = AuthStore.getState();

        if (!user) {
            get().deleteGuestCart(id);
            get().getCart();
            return;
        }

        try {
            await axiosInstance.delete(`/cart/remove/${id}`);
            toast.success("Item removed from cart");
            await get().getCart();
        } catch (error) {
            console.error("Error deleting cart item:", error);
            toast.error("Failed to delete");
        }
    },

    // ----------------- Guest Cart Functions -----------------

    addToGuestCart: (product) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const productID = product._id;

        const existingProductIndex = cart.findIndex((item) => item.productID === productID);
        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({ productID, product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        toast.success("Added to cart");
    },

    getGuestCart: () => {
        return JSON.parse(localStorage.getItem("cart")) || [];
    },

    deleteGuestCart: (productID) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart = cart.filter((item) => item.productID !== productID);
        localStorage.setItem("cart", JSON.stringify(cart));
    },

    updateGuestCart: (productID, newQuantity) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProductIndex = cart.findIndex((item) => item.productID === productID);

        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity = newQuantity;
            localStorage.setItem("cart", JSON.stringify(cart));
        } else {
            toast.error("Product not found");
        }
    },
}));
