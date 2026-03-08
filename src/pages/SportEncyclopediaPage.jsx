import { useState, useEffect } from 'react';
import { Container, Nav, Tab, Card, Row, Col, Badge } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import encyclopediaService from '../services/encyclopediaService';
import { toast } from 'react-toastify';

const SportEncyclopediaPage = () => {
    const { id } = useParams();
    const [sport, setSport] = useState(null);
    const [rules, setRules] = useState([]);
    const [lexicon, setLexicon] = useState([]);

    useEffect(() => {
        const fetchSportData = async () => {
            try {
                // On récupère le sport par son ID pour le nom
                const sportsRes = await encyclopediaService.getAllSports();
                const currentSport = sportsRes.data.find(s => s.sportId === parseInt(id));
                setSport(currentSport);

                const rulesRes = await encyclopediaService.getRulesBySport(id);
                setRules(rulesRes.data);

                const lexiconRes = await encyclopediaService.getLexiconBySport(id);
                setLexicon(lexiconRes.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données du sport:", error);
                toast.error("Impossible de charger les données du sport.");
            }
        };

        fetchSportData();
    }, [id]);

    if (!sport) {
        return (
            <Container className="text-center mt-5">
                <h2>Sport non trouvé</h2>
                <Link to="/encyclopedia" className="btn btn-primary mt-3">Retour à l'encyclopédie</Link>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <Link to="/encyclopedia" className="text-decoration-none text-muted mb-4 d-inline-block">
                <i className="bi bi-arrow-left me-2"></i> Retour à l'encyclopédie
            </Link>

            <header className="mb-5 text-center">
                <Badge bg="primary" className="mb-2 text-uppercase letterSpacing1 px-3 py-2">Encyclopédie</Badge>
                <h1 className="fw-bold display-3 mb-0">{sport.name}</h1>
                <div className="mt-3 mx-auto" style={{ width: '60px', height: '4px', background: 'var(--primary-color)', borderRadius: '2px' }}></div>
            </header>

            <Tab.Container defaultActiveKey="rules">
                <Nav variant="pills" className="encyclopediaTabs mb-5">
                    <Nav.Item>
                        <Nav.Link eventKey="rules">Règles du jeu</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="lexicon">Lexique & Jargon</Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content>
                    <Tab.Pane eventKey="rules">
                        <Row className="justify-content-center">
                            <Col lg={10}>
                                {sport.rulesDescription && (
                                    <div className="mb-5 p-4 glassCard border-0 position-relative animate-fade-in" style={{ borderLeft: '4px solid var(--primary-color) !important' }}>
                                        <h3 className="fs-4 mb-3 d-flex align-items-center">
                                            <i className="bi bi-info-circle-fill me-2 text-primary"></i>
                                            Introduction aux règles
                                        </h3>
                                        <p className="text-muted fs-5 mb-0 lh-base italic" style={{ whiteSpace: 'pre-wrap' }}>
                                            {sport.rulesDescription}
                                        </p>
                                    </div>
                                )}

                                {rules.length > 0 ? (
                                    rules.map((rule, index) => (
                                        <Card key={rule.ruleId} className="lexiconTermCard glassCard mb-4 border-0 p-3">
                                            <Card.Body>
                                                <div className="d-flex align-items-center mb-3">
                                                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '32px', height: '32px', fontWeight: 'bold' }}>
                                                        {index + 1}
                                                    </div>
                                                    <Card.Title className="mb-0 fs-4">{rule.name}</Card.Title>
                                                </div>
                                                <Card.Text className="text-muted fs-5 lh-base" style={{ whiteSpace: 'pre-wrap' }}>
                                                    {rule.description}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    ))
                                ) : (
                                    <div className="text-center py-5">
                                        <p className="text-muted">Aucune règle disponible pour ce sport pour le moment.</p>
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </Tab.Pane>

                    <Tab.Pane eventKey="lexicon">
                        <Row>
                            {lexicon.length > 0 ? (
                                lexicon.sort((a, b) => a.name.localeCompare(b.name)).map((term) => (
                                    <Col key={term.lexiconId} md={6} lg={4} className="mb-4">
                                        <Card className="h-100 lexiconTermCard glassCard border-0">
                                            <Card.Body>
                                                <Card.Title className="fs-5 mb-3">{term.name}</Card.Title>
                                                <Card.Text className="text-muted small" style={{ whiteSpace: 'pre-wrap' }}>
                                                    {term.description}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                            ) : (
                                <Col className="text-center py-5">
                                    <p className="text-muted">Aucun terme de lexique disponible pour ce sport.</p>
                                </Col>
                            )}
                        </Row>
                        <div className="text-center mt-5">
                            <Link to="/encyclopedia/lexicon" className="btn btn-outline-primary rounded-pill px-4">
                                Voir le lexique complet
                            </Link>
                        </div>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </Container>
    );
};

export default SportEncyclopediaPage;

