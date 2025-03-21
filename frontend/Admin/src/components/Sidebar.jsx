import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function Sidebar() {
    const location = useLocation();
    const { logout } = useContext(AppContext);

    const isActive = (path) => location.pathname === path;

    return (
        <div className="bg-neutral-900 flex-shrink-0 w-[60px] sm:w-[220px] rounded-l-3xl h-screen px-2 sm:px-4 py-8 transition-all duration-300">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                <p className="text-white text-xl font-bold hidden sm:block">eMart</p>
            </div>

            {/* Menu Items */}
            <div className="mt-10">
                <div className="flex flex-col gap-4">
                    <Link to="/">
                        <div className={`group flex gap-4 p-2 items-center rounded cursor-pointer ${isActive("/") ? "bg-blue-500" : "hover:bg-blue-500"}`} >
                            <img src="/dashboards.png" alt="" className="w-6 h-6" />
                            <p className={`text-stone-500 font-semibold group-hover:text-white hidden sm:block ${isActive("/") ? "text-white" : ""}`} >
                                Dashboard
                            </p>
                        </div>
                    </Link>
                    <Link to="/newProduct">
                        <div className={`group flex gap-4 p-2 items-center rounded cursor-pointer ${isActive("/newProduct") ? "bg-blue-500" : "hover:bg-blue-500"
                            }`}
                        >
                            <img src="/shipping.png" alt="" className="w-6 h-6" />
                            <p className={`text-stone-500 font-semibold group-hover:text-white hidden sm:block ${isActive("/newProduct") ? "text-white" : ""}`} >
                                New Product
                            </p>
                        </div>
                    </Link>
                    <Link to="/orders">
                        <div className={`group flex gap-4 p-2 items-center rounded cursor-pointer ${isActive("/orders") ? "bg-blue-500" : "hover:bg-blue-500"}`} >
                            <img src="/orders.png" alt="" className="w-6 h-6" />
                            <p className={`text-stone-500 font-semibold group-hover:text-white hidden sm:block ${isActive("/orders") ? "text-white" : ""}`} >
                                Orders
                            </p>
                        </div>
                    </Link>
                    <Link to="/analytics">
                        <div className={`group flex gap-4 p-2 items-center rounded cursor-pointer ${isActive("/analytics") ? "bg-blue-500" : "hover:bg-blue-500"}`} >
                            <img src="/analytics.png" alt="" className="w-6 h-6" />
                            <p className={`text-stone-500 font-semibold group-hover:text-white hidden sm:block ${isActive("/analytics") ? "text-white" : ""}`} >
                                Analytics
                            </p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Footer Items */}
            <div className="mt-16 flex flex-col gap-4">
                <div className={`group flex gap-4 p-2 items-center rounded cursor-pointer ${isActive("/logout") ? "bg-blue-500" : "hover:bg-blue-500"}`} onClick={() => logout()} >
                    <img src="/logout.png" alt="" className="w-6 h-6" />
                    <p className={`text-stone-500 font-semibold group-hover:text-white hidden sm:block ${isActive("/logout") ? "text-white" : ""}`} > Logout </p>
                </div>
                <Link to="/settings">
                    <div
                        className={`group flex gap-4 p-2 items-center rounded cursor-pointer ${isActive("/settings") ? "bg-blue-500" : "hover:bg-blue-500"}`} >
                        <img src="/management.png" alt="" className="w-6 h-6" />
                        <p className={`text-stone-500 font-semibold group-hover:text-white hidden sm:block ${isActive("/settings") ? "text-white" : ""}`} >
                            Settings
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
