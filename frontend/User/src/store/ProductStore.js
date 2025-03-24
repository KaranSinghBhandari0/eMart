import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { navigateTo } from "../lib/navigation";
import { AuthStore } from "./AuthStore";
import { CartStore } from "./CartStore";

export const ProductStore = create((set, get) => ({
    products: [],
    loading: false,

    // Get all Products
    getAllProducts: async () => {
        try {
            const res = await axiosInstance.get("/product/getAllProducts");
            set({ products: res.data.products });
        } catch (error) {
            console.log(error);
        }
    },

    // Update product rating
    updateRating: async (productId, rating, review) => {
        const { user } = AuthStore.getState(); // ✅ Correct way to access AuthStore

        if (!user) {
            toast.error("Login to continue");

            // Store intended URL
            localStorage.setItem("redirectPath", window.location.pathname);
            navigateTo("/login");
            return;
        }

        try {
            set({ loading: true });
            const res = await axiosInstance.post("/product/update-rating", {
                productId,
                rating,
                review,
            });
            toast.success(res.data.message);
            get().getAllProducts();
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to rate product");
        } finally {
            set({ loading: false });
        }
    },

    // Buy product
    handleBuy: async (amount, product) => {
        const { user } = AuthStore.getState();

        if (!user) {
            toast.error("Login to continue");

            // Store intended URL
            localStorage.setItem("redirectPath", window.location.pathname);
            navigateTo("/login");
            return;
        }

        if (user.address === "") {
            toast.error("Add Delivery address");
            navigateTo("/profile");
            return;
        }

        try {
            const { data } = await axiosInstance.post("/payment/create-order", { amount });

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
                            const { cartProducts } = CartStore.getState();

                            await axiosInstance.post(`/payment/save-order`, {
                                orderId: data.order.id,
                                paymentId: response.razorpay_payment_id,
                                cart: product ? [{ product, quantity: 1 }] : cartProducts,
                            });
                            toast.success(`Payment successful`);
                        } catch (error) {
                            console.error("Error saving payment:", error);
                            toast.error("Failed to save payment information");
                        }
                    };
                    savePayment();
                },
                prefill: {
                    email: "testuser@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Error in creating Razorpay order", error);
            toast.error("Failed to create order. Please try again later.");
        }
    },
}));
