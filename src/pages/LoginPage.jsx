import { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import usersService from "../services/usersService";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Appel API
            const response = await usersService.login(credentials);
            const token = response.data.token;

            login(token)

            const decoded = jwtDecode(token);
            if (decoded.idRole === 1) {
                navigate('/admin/sports');
            } else {
                navigate('/');
            }

        } catch (error) {
            console.error("Erreur de connexion", error);
            alert("Erreur : Email ou mot de passe incorrect");
        }
    }

    return <>
        <Container className="mt-5" style={{ maxWidth: '400px' }}>
            <h1 className="mb-4 text-center">Connexion</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="nom@exemple.com"
                        value={credentials.email}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Votre mot de passe"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100" style={{ backgroundColor: '#8A5CF5', border: 'none' }}>
                    Se connecter
                </Button>
            </Form>
        </Container>
    </>;
}

export default LoginPage;