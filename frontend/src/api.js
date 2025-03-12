import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(              //This interceptor is used so that manual adding of authorization headers of JWT token is avoided.
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);  //Direclty authorization header is added into api.get("/profile")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default api;