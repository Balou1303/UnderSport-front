import { useState, useEffect } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import encyclopediaService from '../services/encyclopediaService';
import { toast } from 'react-toastify';

const EditRulePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [sports, setSports] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        idSport: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sportsRes = await encyclopediaService.getAllSports();
                setSports(sportsRes.data);

                const ruleRes = await encyclopediaService.getRuleById(id);
                const rule = ruleRes.data;
                setFormData({
                    name: rule.name,
                    description: rule.description,
                    idSport: rule.idSport || ''
                });
            } catch (error) {
                console.error(error);
                toast.error("Erreur lors de la récupération des données.");
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await encyclopediaService.updateRule(id, formData);
            toast.success("Règle mise à jour avec succès !");
            navigate('/admin/encyclopedia');
        } catch (error) {
            toast.error("Erreur lors de la mise à jour de la règle.");
        }
    };

    return (
        <Container className="p-4">
            <h1 className="mb-4">Modifier la règle</h1>
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
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={8}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <div className="d-flex gap-2">
                        <Button variant="primary" type="submit">Mettre à jour</Button>
                        <Button variant="secondary" onClick={() => navigate('/admin/encyclopedia')}>Annuler</Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default EditRulePage;
