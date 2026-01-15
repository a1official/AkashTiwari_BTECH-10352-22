import axios from 'axios';

// Use environment variable, or fall back to production URL
const API_URL = import.meta.env.VITE_API_URL || 'https://akashtiwari-btech-10352-22.onrender.com/api';

const api = axios.create({
    baseURL: API_URL,
});

// Add a request interceptor to add the token to headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
