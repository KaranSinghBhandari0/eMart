import { useState, useEffect } from "react";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";

export default function Carousel() {
    const [current, setCurrent] = useState(0);

    const slides = [
        "/carousel_img1.jpg",
        "/carousel_img2.jpg",
        "/carousel_img3.jpg",
    ];

    // Auto-slide
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [current]);

    const previousSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="relative w-full max-h-[350px] aspect-[16/9] overflow-hidden mb-8">
            <div className="flex transition-transform duration-700 ease-in-out"
                style={{
                    transform: `translateX(-${current * 100}%)`,
                }}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                        <img
                            src={slide}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full max-h-[370px] overflow-hidden"
                        />
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <div className="absolute top-0 h-full w-full flex justify-between items-center px-4">
                <button
                    onClick={previousSlide}
                    className="p-2 rounded-full text-white hover:bg-opacity-80 focus:outline-none"
                >
                    <BsFillArrowLeftCircleFill className="text-3xl sm:text-4xl" />
                </button>
                <button
                    onClick={nextSlide}
                    className="p-2 rounded-full text-white hover:bg-opacity-80 focus:outline-none"
                >
                    <BsFillArrowRightCircleFill className="text-3xl sm:text-4xl" />
                </button>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 flex justify-center gap-3 w-full">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-2 h-2 rounded-full cursor-pointer transition ${
                            index === current ? "bg-white scale-125" : "bg-gray-500"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
