import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const AdminLayout = () => {
    return (
        <div style={{ display: "flex" }}>
            {/* 1. Le Menu Fixe */}
            <SideBar />

            {/* 2. Le Contenu Variable */}
            {/* flex: 1 permet de prendre tout l'espace restant à droite */}
            <div style={{ flex: 1, padding: "20px", backgroundColor: "#f8f9fa" }}>
                
                {/* 👇 C'est ICI que s'afficheront DashboardPage, AddSportPage, etc. */}
                <Outlet /> 
                
            </div>
        </div>
    );
};

export default AdminLayout;