import { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AppContext } from "./context/AppContext";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

import Dashboard from './pages/Dashboard';
import AddNewProduct from './pages/AddNewProduct'
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Orders from "./pages/Orders";

export default function App() {

    const { admin, isAuthorized, checkingAuth } = useContext(AppContext);

    useEffect(() => {
        isAuthorized();
    }, [])

    if(checkingAuth && !admin)
        return (
            <div className="flex items-center justify-center h-screen bg-blue-100">
                <Loader className="animate-spin" />
            </div>
        );

    return (
        <div className='bg-blue-50'>
            <Routes>
                <Route path="/" element={!admin ? <Login /> : <Dashboard />} />
                <Route path="/newProduct" element={!admin ? <Login /> : <AddNewProduct />} />
                <Route path="/analytics" element={!admin ? <Login /> : <Analytics />} />
                <Route path="/settings" element={!admin ? <Login /> : <Settings />} />
                <Route path="/orders" element={!admin ? <Login /> : <Orders />} />
            </Routes>
            <Toaster />
        </div>
    )
}
