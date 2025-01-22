import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://emart-wap7.onrender.com' || 'http://localhost:3000',
    withCredentials: true,
});