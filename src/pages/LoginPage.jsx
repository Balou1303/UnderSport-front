import { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import usersService from "../services/usersService";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const LoginPage = () => {
    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    // On récupère les fonctions du Context pour mettre à jour l'app globalement
    const { setIsConnected, setRole } = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Appel API
            const response = await usersService.login(login);
            const token = response.data.token;

            // Stockage du token
            localStorage.setItem('token', token);

            // Configuration d'Axios pour les futures requêtes
            axios.defaults.headers["Authorization"] = 'Bearer ' + token;

            // Décodage pour récupérer le rôle
            const decoded = jwtDecode(token);

            //Mise à jour du Contexte Global (Le "Cerveau")
            setIsConnected(true);
            setRole(decoded.role);

            // Redirection vers l'accueil
            navigate('/');

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
                        value={login.email}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Votre mot de passe"
                        value={login.password}
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