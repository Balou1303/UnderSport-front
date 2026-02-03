import { useState, createContext, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import api from "../services/api";

export const AuthContext = createContext({
    isConnected: false,
    role: 'USER',
    login: () => {},
    logout: () => {}
});

export const AuthProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [role, setRole] = useState('USER');

    // Fonction centrale pour gérer la connexion
    const login = (token) => {
        localStorage.setItem("token", token); // On stocke
        api.defaults.headers["Authorization"] = 'Bearer ' + token; // On configure Axios

        try {
            const decoded = jwtDecode(token);
            // On met à jour le State IMMÉDIATEMENT
            if (decoded.exp > Date.now() / 1000) {
                setIsConnected(true);
                
                if (decoded.idRole === 1) { 
                    setRole("admin");
                } else {
                    setRole("user");
                }
            }
        } catch (error) {
            logout(); // Si le token est pourri, on déconnecte tout
        }
    };

    // Fonction centrale pour gérer la déconnexion
    const logout = () => {
        localStorage.removeItem("token");
        delete api.defaults.headers["Authorization"];
        setIsConnected(false);
        setRole("USER");
    };

    // Au chargement, vérifie s'il y a déjà un token
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            login(token); //  réutilise la fonction login
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isConnected, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};