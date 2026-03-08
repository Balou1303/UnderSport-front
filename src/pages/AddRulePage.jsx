import { useState, useEffect } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import encyclopediaService from '../services/encyclopediaService';
import { toast } from 'react-toastify';

const AddRulePage = () => {
    const navigate = useNavigate();
    const [sports, setSports] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        idSport: ''
    });

    useEffect(() => {
        const fetchSports = async () => {
            try {
                const res = await encyclopediaService.getAllSports();
                setSports(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchSports();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await encyclopediaService.addRule(formData);
            toast.success("Règle ajoutée avec succès !");
            navigate('/admin/encyclopedia');
        } catch (error) {
            toast.error("Erreur lors de l'ajout de la règle.");
        }
    };

    return (
        <Container className="p-4">
            <h1 className="mb-4">Ajouter une règle</h1>
            <Card className="p-4 shadow-sm border-0">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Sport</Form.Label>
                        <Form.Select
                            name="idSport"
                            value={formData.idSport}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Sélectionnez un sport</option>
                            {sports.map(sport => (
                                <option key={sport.sportId} value={sport.sportId}>{sport.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Titre de la règle</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ex: Le Hors-jeu"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Expliquez la règle en détail..."
                            required
                        />
                    </Form.Group>

                    <div className="d-flex gap-2">
                        <Button variant="primary" type="submit">Enregistrer</Button>
                        <Button variant="secondary" onClick={() => navigate('/admin/encyclopedia')}>Annuler</Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default AddRulePage;
