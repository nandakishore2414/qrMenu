import axios from 'axios';

// Get URL from environment variables, strictly checking it
const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL) {
    console.error("VITE_API_URL environment variable is missing!");
}

const api = axios.create({
    baseURL: baseURL || window.location.origin, // Fallback gracefully if somehow missing
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a response interceptor for global error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Network Error:", error.message);
        if (!error.response) {
            console.error("Server is unreachable. Check CORS or if the backend is down.");
        }
        return Promise.reject(error);
    }
);

export default api;
