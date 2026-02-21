import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_URL_API}/api`,
});

// Intercepteur global des réponses HTTP du serveur
api.interceptors.response.use(
    (response) => {
        return response; // Si tout va bien (200), on laisse passer
    },
    (error) => {
        // Intercepte spécifiquement l'erreur "401 Non Autorisé" (Token expiré)
        if (error.response && error.response.status === 401) {
            const currentPath = window.location.pathname;

            // Si l'utilisateur est en train d'écrire un contenu long
            if (currentPath.includes('/admin/articles/add') ||
                currentPath.includes('/admin/articles/edit') ||
                currentPath.includes('/admin/legends/add') ||
                currentPath.includes('/admin/legends/edit')) {
                toast.error("Votre session a expiré ! Copiez votre texte (Ctrl+C) en sécurité avant de rafraîchir la page ou de vous reconnecter, sinon il sera perdu !", {
                    autoClose: false, // Le message reste affiché tant qu'on ne le ferme pas
                    position: "top-center"
                });
            } else {
                // Pour toutes les autres pages (Accueil, Liste...), déconnexion classique
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;