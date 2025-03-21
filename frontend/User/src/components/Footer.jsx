import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="w-full bg-gray-900 text-white mt-16">
            <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h2 className="text-2xl font-bold">eMart</h2>
                    <p className="text-gray-400 text-sm mt-2">
                        Your one-stop shop for the best products online. Secure shopping with fast delivery. Stay home & get your daily needs from our shop
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold">Company</h2>
                    <ul className="mt-2 space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white text-sm">Home</a></li>
                        <li><a href="#" className="hover:text-white text-sm">Contact</a></li>
                        <li><a href="#" className="hover:text-white text-sm">Shipping</a></li>
                        <li><a href="#" className="hover:text-white text-sm">Privacy Policy</a></li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-lg font-semibold">Follow Us</h2>
                    <div className="flex space-x-4 mt-2">
                        <a href="#" className="text-gray-400 hover:text-white text-xl">
                            <FaFacebook />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white text-xl">
                            <FaTwitter />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white text-xl">
                            <FaInstagram />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white text-xl">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700 text-center py-4 text-gray-500 text-sm">
                Copyright 2025 © eMart All Rights Reserved.
            </div>
        </footer>
    );
}
