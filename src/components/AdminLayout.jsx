import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const AdminLayout = () => {
    return <>
        <div style={{ display: "flex" }}>
           
            <SideBar />

            <div style={{ flex: 1, padding: "20px", backgroundColor: "#f8f9fa" }}>
                
                <Outlet /> 
                
            </div>
        </div>
    </>;
};

export default AdminLayout;