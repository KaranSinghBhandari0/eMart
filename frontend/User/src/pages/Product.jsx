import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import RatingStars from "../components/RatingStars";
import ProductCard from "../components/ProductCard";
import ProductRating from "../components/ProductRating";
import ProductDetails from "../components/ProductDetails";
import { ProductStore } from "../store/ProductStore";
import { CartStore } from "../store/CartStore";
import { ChevronDown } from "lucide-react";

export default function Product() {
    const { addToCart } = CartStore();
    const { products, handleBuy, getAllProducts } = ProductStore();

    useEffect(() => {
        getAllProducts();
    }, [])

    const { id } = useParams();
    const product = products.find((p) => p._id === id);

    const relatedProducts = products.filter((p) => p._id !== id);

    if (!product) {
        return (
            <div className='h-[80vh] w-full flex flex-col items-center justify-center'>
                <p>Loading Product...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="w-full max-w-5xl mx-auto p-4 flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="w-full max-w-xs md:max-w-sm flex flex-col items-center gap-3">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="rounded-xl w-full h-auto max-h-44 object-contain"
                    />

                    <div className="flex gap-4 mt-6">
                        {[1, 2, 3, 4].map((_, i) => (
                            <img
                                key={i}
                                src={product.image}
                                alt={`Thumbnail ${i + 1}`}
                                className="w-12 h-12 object-contain cursor-pointer border border-gray-300 rounded-md"
                            />
                        ))}
                    </div>
                </div>

                <div className="space-y-4 w-full">
                    <p className="text-2xl font-semibold text-gray-800">
                        {product.name}
                    </p>
                    <div className="flex gap-2 text-gray-600">
                        <RatingStars rating={product.rating} size={18} />
                        <small>({product.reviews})</small>
                    </div>
                    <div className="text-green-500 text-sm flex gap-2 items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        In Stock
                    </div>
                    <p className="text-gray-800 text-xl font-semibold">
                        ₹ {(product.price || 0).toLocaleString("en-IN")}
                    </p>
                    <p className="text-gray-700 text-sm md:text-base line-clamp-4">
                        {product.description}
                    </p>
                    <div className="flex gap-4 pb-6">
                        <button className="w-full sm:w-auto flex-1 border-2 border-primary text-white py-2 rounded-lg bg-primary hover:opacity-80" onClick={() => handleBuy(product.price, product)}>
                            Buy Now
                        </button>
                        <button className="w-full sm:w-auto flex-1 border-2 border-primary text-primary py-2 rounded-lg hover:bg-primary hover:text-white" onClick={() => addToCart(product)}>
                            Add to Cart
                        </button>
                    </div>

                    <ProductDetails />

                </div>
            </div>

            <ProductRating productId={product._id} product={product} />

            {/* Related Products */}
            <div className="hidden md:block">
                <p className="text-2xl text-gray-700 font-semibold text-center mt-16">
                    Related <span className="text-primary"> Products </span>
                </p>
                <div className="flex justify-evenly flex-wrap gap-6 p-4">
                    {relatedProducts.slice(0, 4).map((product) => (
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

        </div>
    );
}
