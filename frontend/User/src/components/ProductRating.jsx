import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { ProductStore } from "../store/ProductStore";
import RatingStars from "./RatingStars";

export default function ProductRating({ productId, product }) {
    const { updateRating } = ProductStore();

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [review, setReview] = useState("");

    const handleRating = (index) => {
        setRating(index);
    };

    const handleSubmit = async () => {
        await updateRating(productId, rating, review);
        setRating(0);
        setHover(0);
        setReview("");
    };

    return (
        <div className="w-full border-t p-3">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>
            <div className="flex items-center mb-3">
                <div className="text-5xl font-semibold mr-4 text-gray-800">
                    {product.rating.toFixed(1)}
                </div>
                <div>
                    <RatingStars rating={product.rating} size={24} />
                    <p className="text-gray-600">{product.reviews} reviews</p>
                </div>
            </div>

            <div className="p-4 rounded-lg w-full max-w-[750px] mx-auto">
                <h2 className="text-lg text-gray-800 font-semibold mb-2">
                    Rate this product
                </h2>
                <div className="flex gap-2 mb-3">
                    {[1, 2, 3, 4, 5].map((index) => (
                        <span
                            key={index}
                            className={`text-2xl cursor-pointer transition-colors ${(hover || rating) >= index ? "text-orange-500" : "text-gray-400"
                                }`}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(0)}
                            onClick={() => handleRating(index)}
                        >
                            <AiFillStar />
                        </span>
                    ))}
                </div>
                <textarea
                    placeholder="Write your review..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="w-full p-2 border rounded-md resize-none h-20"
                />
                <button
                    onClick={handleSubmit}
                    className="w-full mt-3 p-2 bg-secondary text-white rounded-md hover:opacity-80 transition"
                >
                    Submit
                </button>
            </div>

        </div>
    );
}
