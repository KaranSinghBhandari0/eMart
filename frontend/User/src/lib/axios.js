import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://emart-2srq.onrender.com',
    withCredentials: true,
});