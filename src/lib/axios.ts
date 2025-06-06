import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    withCredentials: true,
})