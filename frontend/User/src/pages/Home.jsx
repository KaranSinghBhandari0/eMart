import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Carousel from "../components/Carousel";
import { ProductContext } from '../context/ProductContext';

export default function Home() {
    const { products } = useContext(ProductContext);
    
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

            <Link to="/allProducts" className="bg-gray-300 border px-4 py-2 rounded-lg mx-auto block text-center w-fit">
                See more
            </Link>
        </div>
    );
}
