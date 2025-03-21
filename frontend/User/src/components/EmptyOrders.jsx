import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react"; // Using lucide-react for a cleaner icon

export default function EmptyCart() {
    return (
        <div className="h-[80vh] flex justify-center items-center w-full mx-auto max-w-7xl px-4">
            <div className="flex flex-col items-center text-center">
                <img
                    src="/noOrders.png"
                    alt="Empty Cart"
                    className="h-[200px] w-[200px]"
                />
                <h3 className="text-xl font-medium text-gray-800">
                    You Have No <span className="text-red-500">Orders!</span>
                </h3>
                <p className="text-gray-500 mt-1 mb-6">
                    Looks like you haven't ordered anything yet.
                </p>

                <Link
                    to="/allProducts"
                    className="px-6 py-3 bg-primary text-white font-semibold rounded-full transition-transform duration-300 ease-in-out hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
                >
                    Continue Shopping <ArrowRight size={20} />
                </Link>
            </div>
        </div>
    );
}
