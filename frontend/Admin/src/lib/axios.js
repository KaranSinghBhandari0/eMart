import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:  import.meta.env.VITE_BACKEND_URL || 'https://emart-2srq.onrender.com',
    withCredentials: true,
});