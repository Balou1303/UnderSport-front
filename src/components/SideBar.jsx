// src/components/SideBar.jsx
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const SideBar = () => {
    const { role } = useContext(AuthContext);
    const location = useLocation();

    // Fonction pour savoir si le lien est actif
    const isActive = (path) => {
        // Cas spécial pour l'accueil du dashboard (/admin)
        // Sinon il resterait allumé tout le temps car toutes les routes commencent par /admin
        if (path === "/admin") {
            return location.pathname === "/admin" ? "active" : "";
        }
        // Pour les autres liens (ex: /admin/sports), on regarde si l'URL commence par ça
        // Comme ça, le bouton reste allumé même si on est sur /admin/sports/add
        return location.pathname.startsWith(path) ? "active" : "";
    };

    return <>
        <div className="d-flex flex-column flex-shrink-0 p-3 customSidebar" style={{ width: "280px", minHeight: "100vh" }}>

            <span className="fs-4 mb-3 fw-bold text-white">Dashboard</span>

            <div className="badge bg-secondary mb-3 align-self-start">
                {role === 'admin' ? 'Administrateur' : 'Journaliste'}
            </div>

            <hr style={{ borderColor: 'gray' }} />

            <ul className="nav nav-pills flex-column mb-auto">

                {/* Statistiques */}
                <li className="nav-item mb-2">
                    <Link to="/admin" className={`navLink ${isActive('/admin')}`}>
                        📊 Vue d'ensemble
                    </Link>
                </li>

                {/* Articles */}
                {(role === "admin" || role === "journaliste") && (
                    <li className="nav-item mb-2">
                        <Link to="/admin/articles" className={`navLink ${isActive('/admin/articles')}`}>
                            📝 Gestion Articles
                        </Link>
                    </li>
                )}

                {/* Sports */}
                {role === "admin" && (
                    <li className="nav-item mb-2">
                        <Link to="/admin/sports" className={`navLink ${isActive('/admin/sports')}`}>
                            🏀 Gestion Sports
                        </Link>
                    </li>
                )}

                {/* Championnats */}
                {role === "admin" && (
                    <li className="nav-item mb-2">
                        <Link to="/admin/championships" className={`navLink ${isActive('/admin/championships')}`}>
                            🏅 Gestion Championnats
                        </Link>
                    </li>
                )}

                {/* Légendes */}
                {role === "admin" && (
                    <li className="nav-item mb-2">
                        <Link to="/admin/legends" className={`navLink ${isActive('/admin/legends')}`}>
                            🌟 Gestion Légendes
                        </Link>
                    </li>
                )}

                {/* Palmarès */}
                {role === "admin" && (
                    <li className="nav-item mb-2">
                        <Link to="/admin/achievements" className={`navLink ${isActive('/admin/achievements')}`}>
                            🏆 Gestion Palmarès
                        </Link>
                    </li>
                )}

                {/* Encyclopédie */}
                {role === "admin" && (
                    <li className="nav-item mb-2">
                        <Link to="/admin/encyclopedia" className={`navLink ${isActive('/admin/encyclopedia')}`}>
                            📖 Gestion Encyclopédie
                        </Link>
                    </li>
                )}

                {/* Rôles */}
                {role === "admin" && (
                    <li className="nav-item mb-2">
                        <Link to="/admin/users" className={`navLink ${isActive('/admin/users')}`}>
                            👥 Gestion Rôles
                        </Link>
                    </li>
                )}

            </ul>
            <hr style={{ borderColor: 'gray' }} />
            <Link to="/" className="btn btn-outline-light w-100">⬅️ Retour Site</Link>
        </div>
    </>;
}

export default SideBar;