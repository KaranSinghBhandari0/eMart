import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { ProductStore } from "../store/ProductStore";

export default function ProductRating({productId}) {
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
        <div className="p-4 border rounded-lg shadow-md w-full max-w-[450px] bg-white">
            <h2 className="text-lg text-gray-800 font-semibold mb-2">
                Rate this product
            </h2>
            <div className="flex gap-2 mb-3">
                {[1, 2, 3, 4, 5].map((index) => (
                    <span
                        key={index}
                        className={`text-2xl cursor-pointer transition-colors ${
                            (hover || rating) >= index ? "text-orange-500" : "text-gray-400"
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
    );
}
