import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

const LoginPage = () => {
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(login);

    }


    return <>
        <Container className="mt-5" style={{ maxWidth: '400px' }}>
            <h1 className="mb-4 text-center">Connexion</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email" // INDISPENSABLE pour que handleChange fonctionne
                        placeholder="nom@exemple.com"
                        value={login.email}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                        type="password"
                        name="password" // INDISPENSABLE aussi
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


    </>
}

export default LoginPage;