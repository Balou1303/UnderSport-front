import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_URL_API}/api`,
    
    // On peut définir des headers par défaut (ex: JSON)
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;