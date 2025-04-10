import React from 'react'
import { AiFillStar } from "react-icons/ai";

export default function RatingStars({ rating, size }) {
    return (
        <div className="flex items-center text-orange-500 mb-2">
            {[...Array(5)].map((_, i) => (
                <AiFillStar
                    key={i}
                    size={size}
                    className={i < Math.floor(rating) ? "text-orange-500" : "text-gray-300"}
                    aria-label={i < Math.floor(rating) ? "Filled Star" : "Empty Star"}
                />
            ))}
        </div>
    )
}
