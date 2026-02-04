import { Link } from "react-router-dom";

const SideBar = () => {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: "280px", minHeight: "100vh" }}>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-4">Admin Panel ⚙️</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to="/admin/sports" className="nav-link text-white active" aria-current="page">
                        🏀 Gestion Sports
                    </Link>
                </li>
                <li>
                    <Link to="/admin/articles" className="nav-link text-white">
                        📝 Gestion Articles
                    </Link>
                </li>
            </ul>
            <hr />
            <div>
                <Link to="/" className="btn btn-outline-light w-100">
                   ⬅️ Retour Site
                </Link>
            </div>
        </div>
    );
}

export default SideBar;