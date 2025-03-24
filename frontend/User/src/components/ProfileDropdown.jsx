import React, { useState, useEffect, useRef } from "react";
import { UserCircle, LogIn, ShoppingBag, LogOut, ShoppingCart, Settings, User2 } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthStore } from "../store/AuthStore";

export default function ProfileDropdown() {
    const { user, logout } = AuthStore();
    const [isOpen, setIsOpen] = useState(false);
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

    return (
        <div className="relative inline-block text-left z-50" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 text-black hover:text-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
                <UserCircle size={20} />
                <span className="hidden md:block">Profile</span>
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg border w-48 dark:bg-gray-700 shadow-lg z-50"
                >
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        {user ? (
                            <>
                                <Link to="/profile" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100">
                                    <User2 size={18} />
                                    <span>Profile</span>
                                </Link>
                                <Link to="/cart" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100">
                                    <ShoppingCart size={18} />
                                    <span>Cart</span>
                                </Link>
                                <Link to="/orders" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100">
                                    <ShoppingBag size={18} />
                                    <span>Orders</span>
                                </Link>
                                <p className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 md:hidden cursor-pointer" onClick={() => window.open('https://emart-admin-by-karan.vercel.app', '_blank', 'noopener,noreferrer')}>
                                    <Settings size={18} />
                                    <span>Admin</span>
                                </p>
                                <p
                                    className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 border-t cursor-pointer"
                                    onClick={() => {
                                        logout();
                                        setIsOpen(false);
                                    }}
                                >
                                    <LogOut size={18} />
                                    <span>Logout</span>
                                </p>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100">
                                    <LogIn size={18} />
                                    <span>Login</span>
                                </Link>
                                <Link to="/cart" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 md:hidden">
                                    <ShoppingCart size={18} />
                                    <span>Cart</span>
                                </Link>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
