import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function EmptyCart() {
    return (
        <div className="h-[80vh] flex justify-center items-center w-full mx-auto max-w-7xl">
            <div className="empty-cart-div flex flex-col items-center mt-3">
                <img
                    src="/emptyCart.webp"
                    alt="Empty Cart"
                    className="h-[200px] w-[200px] animate-bounce"
                />
                <h3 className="text-xl font-semibold text-gray-600">
                    Your Cart is <span className="text-red-500">Empty!</span>
                </h3>
                <p className="text-gray-500 mt-1 mb-4">
                    Looks like you haven't added anything yet.
                </p>
                <Link
                    to="/allProducts"
                    className="px-6 py-3 bg-primary text-white font-medium rounded-full transition-transform duration-300 ease-in-out hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
                >
                    Continue Shopping <ArrowRight size={20} />
                </Link>
            </div>
        </div>
    );
}
