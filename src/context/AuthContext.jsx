import { useState, createContext, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";

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
                    axios.defaults.headers["Authorization"] = 'Bearer ' + token;
                } else {
                    localStorage.removeItem('token');
                    setIsConnected(false); // Important de reset
                }
            } catch (error) {
                // Si le token est invalide
                localStorage.removeItem('token');
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