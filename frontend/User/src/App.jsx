import { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from "./pages/Home";
import Cart from './pages/Cart';
import ShowProduct from "./pages/ShowProduct";
import CategoryProducts from "./pages/CategoryProducts";
import Orders from "./pages/Orders";

import PageNotFound from "./pages/PageNotFound";
import Spinner from "./components/Spinner";

import ScrollToTop from './lib/ScrollToTop'
import { AuthContext } from "./context/AuthContext";

export default function App() {

    const {user, isAuthenticated, checkingAuth} = useContext(AuthContext);

    useEffect(()=> {
        isAuthenticated();
    }, [])

    if(checkingAuth && !user)
        return (
        <div className="flex items-center justify-center h-screen">
            <Spinner/>
        </div>
    );

  return (
    <div>
      <Navbar/>
      <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/product/:id" element={<ShowProduct/>} />
          <Route path="/product/category/:category" element={<CategoryProducts/>} />
          <Route path="/orders" element={!user ? <Login /> : <Orders/>} />
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      <Toaster />
      <Footer/>
    </div>
)}
