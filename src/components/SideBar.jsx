// src/components/SideBar.jsx
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const SideBar = () => {
    const { role } = useContext(AuthContext);
    const location = useLocation(); // Permet de savoir sur quelle page on est

    // Petite fonction pour savoir si le lien est actif
    const isActive = (path) => location.pathname === path ? "active" : "";

    return <> 
        <div className="d-flex flex-column flex-shrink-0 p-3 custom-sidebar" style={{ width: "280px", minHeight: "100vh" }}>
            
            <span className="fs-4 mb-3 fw-bold text-white">Dashboard ⚙️</span>
            
            <div className="badge bg-secondary mb-3 align-self-start">
                {role === 'admin' ? 'Administrateur' : 'Rédacteur'}
            </div>
            
            <hr style={{ borderColor: 'gray' }}/>
            
            <ul className="nav nav-pills flex-column mb-auto">
                
                

                {(role === "admin" || role === "redacteur") && (
                    <li className="nav-item mb-2">
                        <Link to="/admin/articles" className={`nav-link ${isActive('/admin/articles')}`}>
                            📝 Gestion Articles
                        </Link>
                    </li>
                )}

                {role === "admin" && (
                    <li className="nav-item mb-2">
                        {/* On utilise la fonction isActive pour colorier l'onglet courant */}
                        <Link to="/admin/sports" className={`nav-link ${isActive('/admin/sports')}`}>
                            🏀 Gestion Sports
                        </Link>
                    </li>
                )}

                {role === "admin" && (
                    <li className="nav-item mb-2">
                        {/* On utilise la fonction isActive pour colorier l'onglet courant */}
                        <Link to="/admin/users" className={`nav-link ${isActive('/admin/users')}`}>
                             Gestion Utilisateurs
                        </Link>
                    </li>
                )}

            </ul>
            <hr style={{ borderColor: 'gray' }}/>
            <Link to="/" className="btn btn-outline-light w-100">⬅️ Retour Site</Link>
        </div>
    </>
}

export default SideBar;