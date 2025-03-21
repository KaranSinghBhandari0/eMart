import { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { Toaster } from "react-hot-toast";

import ScrollToTop from './lib/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Product from "./pages/Product";
import AllProducts from "./pages/AllProducts";
import Features from './components/Features';
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";

import { AuthContext } from "./context/AuthContext";

export default function App() {
    const {user, isAuthenticated, checkingAuth} = useContext(AuthContext);

    useEffect(()=> {
        isAuthenticated();
    }, [])

    if(checkingAuth && !user)
        return (
        <div className="flex items-center justify-center h-screen">
            <FaSpinner className="animate-spin text-primary" size={40}/>
        </div>
    );

    return (
        <>
            <Navbar />
            <ScrollToTop />
                <div className="min-h-screen w-full max-w-7xl mx-auto">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
                        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/orders" element={!user ? <Login /> : <Orders/>} />
                        <Route path="/product/:id" element={<Product/>} />
                        <Route path="/allProducts" element={<AllProducts/>} />
                        <Route path="/profile" element={user ? <Profile /> : <Login/>} />
                        <Route path="*" element={<PageNotFound/>} />
                    </Routes>
                </div>
            <Features/>
            <Footer />
            <Toaster />
        </>
    )
}