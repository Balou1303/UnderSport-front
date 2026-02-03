import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const { isConnected, role } = useContext(AuthContext);

    if (!isConnected || role !== "admin") {
        return <Navigate to="/" replace />
    }
    return children
};

export default AdminRoute;