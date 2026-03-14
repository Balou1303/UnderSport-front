import { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Tabs, Tab, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import encyclopediaService from '../services/encyclopediaService';
import { toast } from 'react-toastify';

const DashboardEncyclopedia = () => {
    const navigate = useNavigate();
    const [sports, setSports] = useState([]);
    const [rules, setRules] = useState([]);
    const [lexicons, setLexicons] = useState([]);
    const [selectedSportId, setSelectedSportId] = useState('all');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const sportsRes = await encyclopediaService.getAllSports();
            setSports(sportsRes.data);

            const rulesRes = await encyclopediaService.getAllRules();
            setRules(rulesRes.data || []);

            const lexiconsRes = await encyclopediaService.getAllLexicons();
            setLexicons(lexiconsRes.data || []);
        } catch (error) {
            console.error("Erreur lors du chargement des données:", error);
            toast.error("Échec du chargement des données. Vérifiez l'API.");
        }
    };


    const handleDeleteRule = async (id) => {
        if (window.confirm("Supprimer cette règle ?")) {
            try {
                await encyclopediaService.deleteRule(id);
                setRules(rules.filter(r => r.ruleId !== id));
                toast.success("Règle supprimée");
            } catch (error) {
                toast.error("Erreur lors de la suppression");
            }
        }
    };

    const handleDeleteLexicon = async (id) => {
        if (window.confirm("Supprimer ce terme du lexique ?")) {
            try {
                await encyclopediaService.deleteLexicon(id);
                setLexicons(lexicons.filter(l => l.lexiconId !== id));
                toast.success("Terme supprimé");
            } catch (error) {
                toast.error("Erreur lors de la suppression");
            }
        }
    };

    const filteredRules = selectedSportId === 'all'
        ? rules
        : rules.filter(r => r.idSport === parseInt(selectedSportId));

    const filteredLexicons = selectedSportId === 'all'
        ? lexicons
        : lexicons.filter(l => l.idSport === parseInt(selectedSportId));

    return (
        <Container fluid className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Gestion de l'Encyclopédie</h1>
                <div className="d-flex gap-2">
                    <Button variant="primary" onClick={() => navigate('/admin/encyclopedia/rules/add')}>
                        + Ajouter une règle
                    </Button>
                    <Button variant="success" onClick={() => navigate('/admin/encyclopedia/lexicon/add')}>
                        + Ajouter un terme
                    </Button>
                </div>
            </div>

            <Row className="mb-4">
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Filtrer par sport</Form.Label>
                        <Form.Select
                            value={selectedSportId}
                            onChange={(e) => setSelectedSportId(e.target.value)}
                            className="bg-dark text-white border-secondary"
                        >
                            <option value="all">Tous les sports</option>
                            {sports.map(sport => (
                                <option key={sport.sportId} value={sport.sportId}>{sport.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            <Tabs defaultActiveKey="rules" className="mb-4">
                <Tab eventKey="rules" title={`Règles (${filteredRules.length})`}>
                    <Table variant="dark" hover responsive className="mt-3">
                        <thead>
                            <tr>
                                <th>Sport</th>
                                <th>Titre</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRules.map((rule, index) => (
                                <tr key={`${rule.ruleId}-${rule.idSport}-${index}`}>
                                    <td>{sports.find(s => s.sportId == rule.idSport)?.name || 'Inconnu'}</td>
                                    <td>{rule.name}</td>
                                    <td>{rule.description.substring(0, 100)}...</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Button variant="warning" size="sm"
                                                onClick={() => navigate(`/admin/encyclopedia/rules/edit/${rule.ruleId}`)}
                                                title="Modifier">
                                                ✏️
                                            </Button>
                                            <Button variant="danger" size="sm"
                                                onClick={() => handleDeleteRule(rule.ruleId)}
                                                title="Supprimer">
                                                🗑️
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey="lexicon" title={`Lexique (${filteredLexicons.length})`}>
                    <Table variant="dark" hover responsive className="mt-3">
                        <thead>
                            <tr>
                                <th>Sport</th>
                                <th>Terme</th>
                                <th>Définition</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLexicons.map((lex, index) => (
                                <tr key={`${lex.lexiconId}-${lex.idSport}-${index}`}>
                                    <td>{sports.find(s => s.sportId == lex.idSport)?.name || 'Inconnu'}</td>
                                    <td>{lex.name}</td>
                                    <td>{lex.description.substring(0, 100)}...</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Button variant="warning" size="sm"
                                                onClick={() => navigate(`/admin/encyclopedia/lexicon/edit/${lex.lexiconId}`)}
                                                title="Modifier">
                                                ✏️
                                            </Button>
                                            <Button variant="danger" size="sm"
                                                onClick={() => handleDeleteLexicon(lex.lexiconId)}
                                                title="Supprimer">
                                                🗑️
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tab>
            </Tabs>
        </Container>
    );
};

export default DashboardEncyclopedia;
