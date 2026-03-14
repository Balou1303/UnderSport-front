import { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import encyclopediaService from '../services/encyclopediaService';
import { toast } from 'react-toastify';

const EncyclopediaPage = () => {
    const [sports, setSports] = useState([]);

    useEffect(() => {
        const fetchSports = async () => {
            try {
                const response = await encyclopediaService.getAllSports();
                setSports(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des sports:", error);
                toast.error("Impossible de charger les sports.");
            }
        };

        fetchSports();
    }, []);

    return (
        <Container className="py-5">
            <header className="text-center mb-5">
                <h1 className="fw-bold display-4 mb-3">L'Encyclopédie <span className="text-primary">UnderSport</span></h1>
                <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
                    Le guide ultime pour comprendre les règles, le jargon et les subtilités de vos sports préférés.
                    Idéal pour les néophytes et les passionnés.
                </p>
                <div className="mt-4">
                    <Link to="/encyclopedia/lexicon" className="btn btn-primary px-4 py-2">
                        <i className="bi bi-search me-2"></i> Consulter le lexique global (A-Z)
                    </Link>
                </div>
            </header>

            <Row className="g-4">
                {sports.map((sport) => (
                    <Col key={sport.sportId} xs={12} sm={6} lg={4}>
                        <Link to={`/encyclopedia/sport/${sport.sportId}`} className="text-decoration-none">
                            <Card className="sportEncyclopediaCard h-100 border-0 overflow-hidden glassCard">
                                <div className="sportImageWrapper">
                                    <div className="sportCardOverlay">
                                        <h2 className="textMain fw-900 mb-0 text-uppercase">{sport.name}</h2>
                                    </div>
                                </div>
                                <Card.Body className="text-center py-4 bg-transparent">
                                    <span className="textPrimary text-uppercase fw-bold letterSpacing2 fs-6" aria-label={`Découvrir l'encyclopédie du ${sport.name}`}>DÉCOUVRIR</span>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default EncyclopediaPage;

