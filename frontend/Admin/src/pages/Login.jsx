import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { LoaderCircle } from 'lucide-react';

export default function Login() {
    const { login, logging } = useContext(AppContext);

    const [email, setEmail] = useState("admin@gmail.com");
    const [password, setPassword] = useState("admin123");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login({email,password});
        setEmail('');
        setPassword('');
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white border shadow-md rounded-lg p-8 w-[90%] max-w-sm">
                <h2 className="text-2xl font-semibold text-center">
                    <span className="text-secondary"> Admin </span> Login
                </h2>
                <small className="text-stone-500 mb-3">
                    Login with Admin Credentitals
                </small>

                <form className="mt-6" autoComplete="off" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-medium text-gray-700 text-sm mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-4 py-2 border rounded-lg"
                            onChange={(e) => {setEmail(e.target.value)}}
                            value={email}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="w-full px-4 py-2 border rounded-lg"
                            onChange={(e) => {setPassword(e.target.value)}}
                            value={password}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
                        disabled={logging}
                    >
                        {logging ? (
                            <div className="flex items-center justify-center gap-2">
                                <LoaderCircle className="animate-spin" />
                                <p>Logging...</p>
                            </div>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
