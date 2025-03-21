import React, { useState } from "react";
import { Menu, X, Home, ShoppingCart, Settings } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import { Link } from "react-router-dom";

export default function Navbar() {

    return (
        <nav className="w-full bg-white text-black z-50 border-b">
            <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

                <Link to='/' className="text-2xl font-bold tracking-wider text-gray-800">
                    eMart
                </Link>

                <div className="hidden md:flex space-x-6">
                    <Link to='/' className="flex items-center space-x-2 text-black hover:text-gray-700 transition duration-300 ease-in-out transform hover:scale-105">
                        <Home size={20} />
                        <span>Home</span>
                    </Link>
                    <Link to='/cart' className="flex items-center space-x-2 text-black hover:text-gray-700 transition duration-300 ease-in-out transform hover:scale-105">
                        <ShoppingCart size={20} />
                        <span>Cart</span>
                    </Link>
                    <p to='/cart' className="flex items-center space-x-2 text-black hover:text-gray-700 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer" onClick={() => window.open('https://emart-admin-by-karan.vercel.app', '_blank', 'noopener,noreferrer')}>
                        <Settings size={20} />
                        <span>Admin</span>
                    </p>
                </div>
                <ProfileDropdown />
            </div>
        </nav>
    );
}
