import { useEffect, useState } from "react";
import usersService from "../services/usersService";
import { toast } from "react-toastify";
import { Badge, Table, Form  } from "react-bootstrap";

const UserAdminRolePage = () => {
    const [userRole, setUserRole] = useState([]);
    const fetchUsers = async () => {
        try {
            const response = await usersService.getAllUsers();
            setUserRole(response.data);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {   
        fetchUsers()
    }, []);

    const handleRoleChange = async (userId, newRoleId) => {
        try {
            const response = await usersService.updateRole(userId, newRoleId);
            toast.success("Rôle modifié avec succès");
            fetchUsers() // recharge la liste pour être sur que l'affichage est à jour
        } catch (error) {
            toast.error("Erreur lors de la modification du rôle");
            console.error(error);

        }
    }

    return <>
    <div className="p-4">
            <h2>Gestion des Utilisateurs 👥</h2>
            
            <Table striped bordered hover responsive className="mt-3">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Pseudo</th>
                        <th>Email</th>
                        <th>Rôle Actuel</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userRole.map((user) => (
                        <tr key={user.userId}>
                            <td>{user.userId}</td>
                            <td>{user.nickname}</td>
                            <td>{user.email}</td>
                            
                            {/* Affichage visuel du rôle */}
                            <td>
                                {user.idRole === 1 && <Badge bg="danger">Admin</Badge>}
                                {user.idRole === 2 && <Badge bg="secondary">User</Badge>}
                                {user.idRole === 3 && <Badge bg="info">Editor</Badge>}
                            </td>

                            {/* Le Menu Déroulant pour changer le rôle */}
                            <td>
                                <Form.Select 
                                    size="sm"
                                    value={user.idRole} // La valeur sélectionnée par défaut est le rôle actuel
                                    onChange={(e) => handleRoleChange(user.userId, e.target.value)}
                                    style={{ maxWidth: "150px" }}
                                >
                                    <option value="2">User</option>
                                    <option value="3">Editor</option>
                                    <option value="1">Admin</option>
                                </Form.Select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    </>;
}

export default UserAdminRolePage;