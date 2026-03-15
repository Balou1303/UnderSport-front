import { useState, createContext, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import api from "../services/api";

export const AuthContext = createContext({
    isConnected: false,
    role: 'USER',
    loading: true,
    login: () => { },
    logout: () => { }
});

export const AuthProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [role, setRole] = useState('USER');
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    // Fonction centrale pour gérer la connexion
    const login = (token) => {
        localStorage.setItem("token", token); // stocke
        api.defaults.headers["Authorization"] = 'Bearer ' + token; // configure Axios

        try {
            const decoded = jwtDecode(token);
            // met à jour le State immédiatement
            if (decoded.exp > Date.now() / 1000) {
                setIsConnected(true);
                setUser(decoded);

                if (decoded.idRole === 1) {
                    setRole("admin");
                } else if (decoded.idRole === 2) {
                    setRole("journaliste");
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
            login(token);
            setLoading(false);
        }
    }, []);

    return <>
        <AuthContext.Provider value={{ isConnected, role, login, logout, loading, user }}>
            {children}
        </AuthContext.Provider>
    </>;
};