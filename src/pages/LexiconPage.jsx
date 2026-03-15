import { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Card, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import encyclopediaService from '../services/encyclopediaService';
import { toast } from 'react-toastify';

const LexiconPage = () => {
    const [lexicon, setLexicon] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeLetter, setActiveLetter] = useState(null);

    useEffect(() => {
        const fetchLexicon = async () => {
            try {
                const response = await encyclopediaService.getAllLexicons();
                setLexicon(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération du lexique:", error);
                toast.error("Impossible de charger le lexique.");
            }
        };

        fetchLexicon();
    }, []);

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const filteredLexicon = useMemo(() => {
        return lexicon.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesLetter = activeLetter ? item.name.toUpperCase().startsWith(activeLetter) : true;
            return matchesSearch && matchesLetter;
        }).sort((a, b) => a.name.localeCompare(b.name));
    }, [lexicon, searchTerm, activeLetter]);

    const groupedLexicon = useMemo(() => {
        const groups = {};
        filteredLexicon.forEach(item => {
            const letter = item.name[0].toUpperCase();
            if (!groups[letter]) {
                groups[letter] = [];
            }
            groups[letter].push(item);
        });
        return groups;
    }, [filteredLexicon]);

    const availableLetters = useMemo(() => {
        return [...new Set(lexicon.map(item => item.name[0].toUpperCase()))].sort();
    }, [lexicon]);

    return (
        <Container className="py-5">
            <Link to="/encyclopedia" className="text-decoration-none text-muted mb-4 d-inline-block">
                <i className="bi bi-arrow-left me-2"></i> Retour à l'encyclopédie
            </Link>

            <header className="text-center mb-5">
                <h1 className="fw-bold display-4">Lexique <span className="text-primary">Sportif</span></h1>
                <p className="text-muted">Explorez tout le jargon du sport de A à Z.</p>
            </header>

            <Row className="justify-content-center mb-5">
                <Col md={8} lg={6}>
                    <InputGroup className="bg-dark rounded-pill overflow-hidden border border-secondary p-1">
                        <InputGroup.Text className="bg-transparent border-0 ps-4">
                            <i className="bi bi-search textPrimary"></i>
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Rechercher un terme ou une définition..."
                            className="border-0 bg-transparent py-3 shadow-none text-white"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setActiveLetter(null); // Reset letter filter on search
                            }}
                        />
                    </InputGroup>
                </Col>
            </Row>

            <div className="alphabetIndex glassCard mb-5">
                <button
                    className={`alphabetLetter border-0 ${activeLetter === null ? 'active' : ''}`}
                    onClick={() => {
                        setActiveLetter(null);
                        setSearchTerm('');
                    }}
                >
                    TOUS
                </button>
                {alphabet.map(letter => (
                    <button
                        key={letter}
                        className={`alphabetLetter border-0 ${activeLetter === letter ? 'active' : ''} ${!availableLetters.includes(letter) && searchTerm === '' ? 'opacity-25' : ''}`}
                        disabled={!availableLetters.includes(letter) && searchTerm === ''}
                        onClick={() => {
                            setActiveLetter(letter === activeLetter ? null : letter);
                            setSearchTerm('');
                        }}
                    >
                        {letter}
                    </button>
                ))}
            </div>

            <Row>
                <Col lg={12}>
                    {Object.keys(groupedLexicon).length > 0 ? (
                        Object.keys(groupedLexicon).sort().map(letter => (
                            <div key={letter} id={`letter-${letter}`} className="mb-5">
                                <h2 className="display-6 fw-bold text-primary mb-4 border-bottom pb-2" style={{ width: 'fit-content' }}>{letter}</h2>
                                <Row className="g-4">
                                    {groupedLexicon[letter].map(item => (
                                        <Col key={item.lexiconId} md={6} lg={4}>
                                            <Card className="h-100 lexiconTermCard glassCard border-0">
                                                <Card.Body>
                                                    <Card.Title className="fs-5 mb-3 textMain">{item.name}</Card.Title>
                                                    <Card.Text className="textMuted" style={{ whiteSpace: 'pre-wrap' }}>
                                                        {item.description}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-5">
                            <i className="bi bi-search display-1 text-muted opacity-25 mb-4"></i>
                            <h3 className="text-muted">Aucun terme trouvé</h3>
                            <p>Essayez une autre recherche ou une autre lettre.</p>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default LexiconPage;
