import React, { useContext } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import RatingStars from './RatingStars';
import { CartContext } from '../context/CartContext';

export default function ProductCard({ product }) {
    const {addToCart} = useContext(CartContext);
    
    return (
        <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-all w-64 cursor-pointer">
            <div className="relative">
                <Link to={`/product/${product._id}`}>
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="h-36 w-full object-contain cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" />
                </Link>
                <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:text-red-500">
                    <AiOutlineHeart size={20} />
                </button>
            </div>
            <div className="mt-3">
                <Link to={`/product/${product._id}`}>
                    <p className="text-lg font-medium truncate">
                        {product.name}
                    </p>
                </Link>
                <RatingStars size={12} rating={product.rating} />
                <p className="text-gray-500 text-sm font-semibold mt-2">
                    ₹ {(product.price || 0).toLocaleString('en-IN')}
                </p>
                <button className="mt-3 w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 text-sm"   onClick={() => addToCart(product)}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
