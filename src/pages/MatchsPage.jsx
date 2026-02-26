import { useState, useEffect } from 'react';
import { Container, Spinner, Alert, Badge, Row, Col, Card } from 'react-bootstrap';
import api from '../services/api';

const MatchsPage = () => {
    const [standings, setStandings] = useState(null);
    const [recentMatches, setRecentMatches] = useState([]);
    const [upcomingMatches, setUpcomingMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // On lance les deux requêtes en parallèle pour aller plus vite
                const [standingsRes, matchesRes] = await Promise.all([
                    api.get('/external/standings/FL1'),
                    api.get('/external/matches/FL1')
                ]);

                // 1. Classement
                if (standingsRes.data && standingsRes.data.standings && standingsRes.data.standings.length > 0) {
                    setStandings(standingsRes.data.standings[0].table);
                } else {
                    setError("Format de données inattendu (Classement).");
                }

                // 2. Matchs
                if (matchesRes.data && matchesRes.data.matches) {
                    const allMatches = matchesRes.data.matches;

                    // Matchs terminés (triés du plus récent au plus ancien)
                    const finished = allMatches
                        .filter(m => m.status === 'FINISHED')
                        .sort((a, b) => new Date(b.utcDate) - new Date(a.utcDate))
                        .slice(0, 10);

                    // Matchs à venir (triés du plus proche au plus lointain)
                    const scheduled = allMatches
                        .filter(m => ['SCHEDULED', 'TIMED'].includes(m.status))
                        .sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate))
                        .slice(0, 10);

                    setRecentMatches(finished);
                    setUpcomingMatches(scheduled);
                }

            } catch (err) {
                console.error("Erreur lors du chargement des données :", err);
                setError("Impossible de charger les données sportives actuelles.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Formatage de la date à la française
    const formatDate = (dateString) => {
        const options = { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    return (
        <Container className="py-5" style={{ maxWidth: "1200px" }}>

            {/* HERO BANNER SECTION */}
            <div className="heroCard mb-5" style={{ height: "300px" }}>
                <div
                    className="heroImage"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-15dfcbbfedfb4-df427a1fc603?auto=format&fit=crop&q=80&w=2000')` }}
                >
                    <div className="heroOverlay d-flex justify-content-center align-items-center text-center">
                        <Badge bg="primary" className="mb-3 px-3 py-2 fs-6 shadow-sm">
                            FOOTBALL • SAISON 2024/2025
                        </Badge>
                        <h1 className="text-white fw-bold mb-0" style={{ fontSize: '3.5rem', textShadow: '0 4px 6px rgba(0,0,0,0.5)' }}>
                            CENTRE DE MATCHS <span style={{ color: 'var(--primary-color)' }}>LIGUE 1</span>
                        </h1>
                    </div>
                </div>
            </div>

            {loading && (
                <div className="text-center my-5 py-5">
                    <Spinner animation="border" style={{ color: "var(--primary-color)", width: '3rem', height: '3rem' }} />
                    <p className="mt-3 text-muted fs-5">Contact des arbitres en cours...</p>
                </div>
            )}

            {error && (
                <Alert variant="danger" className="text-center rounded-4 shadow-sm py-4">
                    <i className="bi bi-exclamation-triangle-fill fs-3 d-block mb-2"></i>
                    {error}
                </Alert>
            )}

            {!loading && !error && standings && (
                <>
                    {/* LE CLASSEMENT */}
                    <div className="mb-5">
                        <div className="d-flex align-items-center mb-4">
                            <h3 className="fw-bold m-0" style={{ color: 'var(--sidebar-bg)' }}>
                                Classement <span style={{ color: 'var(--primary-color)' }}>Général</span>
                            </h3>
                            <div className="flex-grow-1 ms-4" style={{ height: '2px', background: 'linear-gradient(to right, var(--primary-color), transparent)' }}></div>
                        </div>

                        <div className="table-responsive">
                            <table className="standingsTable">
                                <thead>
                                    <tr>
                                        <th className="text-center" style={{ width: '50px' }}>Pos</th>
                                        <th>Club</th>
                                        <th className="text-center" style={{ width: '60px' }}>Pts</th>
                                        <th className="text-center text-muted" style={{ width: '60px' }}>J</th>
                                        <th className="text-center text-muted d-none d-md-table-cell" style={{ width: '60px' }}>G</th>
                                        <th className="text-center text-muted d-none d-md-table-cell" style={{ width: '60px' }}>N</th>
                                        <th className="text-center text-muted d-none d-md-table-cell" style={{ width: '60px' }}>P</th>
                                        <th className="text-center text-muted" style={{ width: '60px' }}>Diff</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {standings.map((row) => (
                                        <tr key={row.team.id}>
                                            <td className="text-center fw-bold text-muted">{row.position}</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={row.team.crest}
                                                        alt={row.team.shortName || row.team.name}
                                                        width="32"
                                                        height="32"
                                                        className="me-3 object-fit-contain drop-shadow-sm"
                                                    />
                                                    <span className="fw-bold" style={{ color: 'var(--sidebar-bg)' }}>{row.team.name}</span>
                                                </div>
                                            </td>
                                            <td className="text-center fw-bold fs-5" style={{ color: 'var(--primary-color)' }}>{row.points}</td>
                                            <td className="text-center text-muted fw-semibold">{row.playedGames}</td>
                                            <td className="text-center text-muted d-none d-md-table-cell">{row.won}</td>
                                            <td className="text-center text-muted d-none d-md-table-cell">{row.draw}</td>
                                            <td className="text-center text-muted d-none d-md-table-cell">{row.lost}</td>
                                            <td className="text-center fw-semibold">
                                                <Badge bg={row.goalDifference > 0 ? "success" : row.goalDifference < 0 ? "danger" : "secondary"} className="rounded-pill">
                                                    {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* LES RÉSULTATS ET MATCHS À VENIR */}
                    <Row className="g-5">
                        {/* Derniers résultats */}
                        <Col lg={6}>
                            <h4 className="fw-bold mb-4" style={{ color: 'var(--sidebar-bg)' }}>
                                <i className="bi bi-clock-history me-2" style={{ color: 'var(--primary-color)' }}></i>
                                Derniers Résultats
                            </h4>
                            <div className="d-flex flex-column gap-3">
                                {recentMatches.map(match => (
                                    <div key={match.id} className="matchCard">
                                        <div className="text-center text-muted small mb-3 fw-bold text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.7rem' }}>
                                            Journée {match.matchday} <span className="mx-2">•</span> {formatDate(match.utcDate)}
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center px-2">
                                            <div className="text-end fw-bold d-flex flex-column align-items-end" style={{ width: '38%' }}>
                                                <img src={match.homeTeam.crest} alt="logo" width="40" className="mb-2" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
                                                <span className="text-truncate w-100">{match.homeTeam.shortName || match.homeTeam.name}</span>
                                            </div>

                                            <div className="matchScore fw-bold d-flex align-items-center justify-content-center mx-3">
                                                <span>{match.score.fullTime.home}</span>
                                                <span className="mx-2 text-muted">-</span>
                                                <span>{match.score.fullTime.away}</span>
                                            </div>

                                            <div className="text-start fw-bold d-flex flex-column align-items-start" style={{ width: '38%' }}>
                                                <img src={match.awayTeam.crest} alt="logo" width="40" className="mb-2" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
                                                <span className="text-truncate w-100">{match.awayTeam.shortName || match.awayTeam.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Col>

                        {/* Matchs à venir */}
                        <Col lg={6}>
                            <h4 className="fw-bold mb-4" style={{ color: 'var(--sidebar-bg)' }}>
                                <i className="bi bi-calendar-event me-2" style={{ color: 'var(--primary-color)' }}></i>
                                Prochains Matchs
                            </h4>
                            <div className="d-flex flex-column gap-3">
                                {upcomingMatches.map(match => (
                                    <div key={match.id} className="matchCard" style={{ opacity: "0.9" }}>
                                        <div className="text-center text-muted small mb-3 fw-bold text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.7rem' }}>
                                            Journée {match.matchday} <span className="mx-2">•</span> {formatDate(match.utcDate)}
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center px-2">
                                            <div className="text-end fw-bold d-flex flex-column align-items-end" style={{ width: '38%' }}>
                                                <img src={match.homeTeam.crest} alt="logo" width="30" className="mb-2 grayscale-hover" />
                                                <span className="text-truncate w-100 text-muted">{match.homeTeam.shortName || match.homeTeam.name}</span>
                                            </div>

                                            <div className="mx-3 text-center">
                                                <Badge bg="light" text="dark" className="px-3 py-2 border shadow-sm fw-bold">VS</Badge>
                                            </div>

                                            <div className="text-start fw-bold d-flex flex-column align-items-start" style={{ width: '38%' }}>
                                                <img src={match.awayTeam.crest} alt="logo" width="30" className="mb-2 grayscale-hover" />
                                                <span className="text-truncate w-100 text-muted">{match.awayTeam.shortName || match.awayTeam.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default MatchsPage;
