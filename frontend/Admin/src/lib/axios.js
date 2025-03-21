import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5173' || 'https://emart-2srq.onrender.com',
    withCredentials: true,
});