import { useEffect, useState } from "react";
import usersService from "../services/usersService";
import { toast } from "react-toastify";
import { Badge, Table, Form, Row, Col, InputGroup } from "react-bootstrap";

const UserAdminRolePage = () => {
    const [userRole, setUserRole] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

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
            await usersService.updateRole(userId, newRoleId);
            toast.success("Rôle modifié avec succès");
            fetchUsers(); // recharge la liste pour être sur que l'affichage est à jour
        } catch (error) {
            toast.error("Erreur lors de la modification du rôle");
            console.error(error);
        }
    }

    const filteredUsers = userRole.filter(user => {
        const matchesSearch = 
            user.nickname.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase());

        const matchesFilter = filter === "all" || user.idRole === parseInt(filter);

        return matchesSearch && matchesFilter;
    });

    return <>
    
        <div className="p-4">
            <h2>Gestion des Utilisateurs</h2>
            
            {/* Barre de recherche et filtre */}
            <Row className="mb-4 mt-3">
                <Col md={8}>
                    <InputGroup>
                        <InputGroup.Text id="search-icon">🔍</InputGroup.Text>
                        <Form.Control 
                            type="text"
                            placeholder="Rechercher par pseudo ou email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col md={4}>
                    <Form.Select 
                        value={filter} 
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">Tous les rôles</option>
                        <option value="1">Admin</option>
                        <option value="2">User</option>
                        <option value="3">Editor</option>
                    </Form.Select>
                </Col>
            </Row>

            <Table striped bordered hover responsive>
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
                    {/* On utilise la liste filtrée calculée au dessus */}
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <tr key={user.userId}>
                                <td>{user.userId}</td>
                                <td>{user.nickname}</td>
                                <td>{user.email}</td>
                                
                                <td>
                                    {user.idRole === 1 && <Badge bg="danger">Admin</Badge>}
                                    {user.idRole === 2 && <Badge bg="secondary">User</Badge>}
                                    {user.idRole === 3 && <Badge bg="info">Editor</Badge>}
                                </td>

                                <td>
                                    <Form.Select 
                                        size="sm"
                                        value={user.idRole}
                                        onChange={(e) => handleRoleChange(user.userId, e.target.value)}
                                        style={{ maxWidth: "150px" }}
                                    >
                                        <option value="1">Admin</option>
                                        <option value="2">Editor</option>
                                        <option value="3">User</option>
                                    </Form.Select>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">Aucun utilisateur trouvé 😕</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    </>
}

export default UserAdminRolePage;