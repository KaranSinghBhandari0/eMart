import React from "react";
import { Truck, ShieldCheck, RefreshCw } from "lucide-react";

export default function ProductDetails() {
    return (
        <div className="space-y-4 p-3 border shadow-md rounded-lg w-64 text-gray-700">
            <p className="flex gap-2 items-center">
                <Truck size={24} className="text-black" />
                Safe & Secure Delivery
            </p>
            <p className="flex gap-2 items-center">
                <ShieldCheck size={24} className="text-black" />
                Verified Seller
            </p>
            <p className="flex gap-2 items-center">
                <RefreshCw size={24} className="text-black" />
                3 Days Replacement
            </p>
        </div>
    );
}
