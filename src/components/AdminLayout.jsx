import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const AdminLayout = () => {
    return <>
        <div style={{ display: "flex" }}>
           
            <SideBar />

            <div style={{ flex: 1, padding: "20px", backgroundColor: "#0F172A", minHeight: "100vh" }}>
                <Outlet /> 
            </div>
        </div>
    </>;
};

export default AdminLayout;