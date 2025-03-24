import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import ProductCard from "../components/ProductCard";
import Carousel from "../components/Carousel";
import { ProductStore } from "../store/ProductStore";

export default function Home() {
    const { products, getAllProducts } = ProductStore();

    useEffect(() => {
        getAllProducts();
    }, [])

    return (
        <div className="py-3 w-full">
            <Carousel />

            <p className="text-2xl font-semibold mt-4 text-gray-700">
                🔥 Trending Now
            </p>

            <div className="flex justify-evenly flex-wrap gap-6 p-4">
                {products.slice(0, 8).map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

            <div className="relative flex items-center my-6">
                <div className="flex-1 border-t border-gray-300"></div>

                <Link
                    to="/allProducts"
                    className="flex items-center justify-center bg-gray-300 border w-10 h-10 rounded-full mx-4"
                >
                    <ChevronDown size={18} />
                </Link>

                <div className="flex-1 border-t border-gray-300"></div>
            </div>
        </div>
    );
}
