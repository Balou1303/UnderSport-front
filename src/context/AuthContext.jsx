import { useState, createContext, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import api from "../services/api";

export const AuthContext = createContext({
    isConnected: false,
    setIsConnected: () => {},
    role: 'USER',
    setRole: () => {}
});

export const AuthProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [role, setRole] = useState('USER');

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // Vérif date expiration
                if (decoded.exp > Date.now() / 1000) {
                    setIsConnected(true);
                    setRole(decoded.role);
                    api.defaults.headers["Authorization"] = 'Bearer ' + token;
                } else {
                    localStorage.removeItem('token');
                    delete api.defaults.headers['Authorization']
                    setIsConnected(false); // Important de reset
                }
            } catch (error) {
                // Si le token est invalide
                localStorage.removeItem('token');
                delete api.defaults.headers['Authorization']
                setIsConnected(false);
            }
        }
    }, [])

    return (
        <AuthContext.Provider value={{ isConnected, setIsConnected, role, setRole }}>
            {children}
        </AuthContext.Provider>
    )
}