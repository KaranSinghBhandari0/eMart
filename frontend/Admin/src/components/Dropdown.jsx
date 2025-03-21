import React, { useState, useEffect, useRef, useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Dropdown() {

    const { setSelectedCategory } = useContext(AppContext);

    const [isOpen, setIsOpen] = useState(false);
    const [category, setCategory] = useState("");
    const dropdownRef = useRef(null);

    // Toggle dropdown on button click
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Handle category selection
    const selectCategory = (categoryName) => {
        setSelectedCategory(categoryName)
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left z-50" ref={dropdownRef}>
            {/* Button to toggle dropdown */}
            <button 
                className="px-2 py-1 rounded text-sm border text-slate-500 flex gap-1 items-center hover:bg-gray-200"
                onClick={toggleDropdown}
            >
                <i className="fa-solid fa-filter"></i> {category || "Filter"}
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg border w-48 shadow-lg z-50">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        {["All", "Electronics", "Clothing", "Furniture"].map((item) => (
                            <button
                                key={item}
                                onClick={() => selectCategory(item)}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                {item}
                            </button>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
