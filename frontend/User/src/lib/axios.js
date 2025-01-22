import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://emart-2srq.onrender.com' || 'http://localhost:3000',
    withCredentials: true,
});