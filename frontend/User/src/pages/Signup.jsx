import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react";
import { AuthStore } from "../store/AuthStore";

export default function Signup() {
    
    const { signup, loading } = AuthStore();
    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const tooglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup({ username, email, password });
    };

    return (
        <div className="h-[80vh] w-full flex justify-center items-center">
            <form
                className="flex flex-col w-[88%] max-w-[400px] gap-4 p-6 border rounded-xl shadow-md bg-white"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col gap-2">
                    <p className="text-2xl font-semibold text-gray-800 text-center">SignUp</p>
                    <small className="text-gray-500 text-center">Create an account for free</small>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="username" className="text-gray-600 text-xs mb-1">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="John Doe"
                        className="border border-2 border-gray-300 rounded-2xl px-3 py-2 focus:border-primary focus:outline-none"
                        onChange={(e)=> setUsername(e.target.value)}
                        value={username}
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="email" className="text-gray-600 text-xs mb-1">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="example@gmail.com"
                        className="border border-2 border-gray-300 rounded-2xl px-3 py-2 focus:border-primary focus:outline-none"
                        onChange={(e)=> setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </div>

                <div className="flex flex-col relative">
                    <label htmlFor="password" className="text-gray-600 text-xs mb-1">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="border border-2 border-gray-300 rounded-2xl px-3 py-2 focus:border-primary focus:outline-none"
                        onChange={(e)=> setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <button
                        type="button"
                        onClick={tooglePassword}
                        className="absolute right-3 top-[68%] transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <button
                    type="submit"
                    className={`bg-primary text-white rounded-3xl py-2 font-semibold transition ${loading ? 'bg-opacity-60 cursor-not-allowed' : 'hover:bg-hover'}`}
                    disabled={loading}
                >
                    {loading ? "Signing in..." : "Signup"}
                </button>

                <p className="text-sm text-center text-gray-600">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="text-primary font-medium cursor-pointer hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}
