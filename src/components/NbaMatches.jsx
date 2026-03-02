import { useState, useEffect } from 'react';
import { Spinner, Alert, Badge } from 'react-bootstrap';
import api from '../services/api';

const NbaMatches = ({ selectedDate, refreshKey }) => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMatches = async () => {
            setLoading(true);
            setError(null);
            try {
                // On appelle notre nouvelle route NBA backend
                const response = await api.get(`/external/nba/matches/${selectedDate}`);
                setMatches(response.data.matches || []);
            } catch (err) {
                console.error(`Erreur chargement NBA:`, err);
                setError("Erreur lors de la récupération des scores NBA.");
            } finally {
                setLoading(false);
            }
        };

        if (selectedDate) {
            fetchMatches();
        }
    }, [selectedDate, refreshKey]);

    const renderStatus = (status, period) => {
        const s = status.toLowerCase();
        if (s.includes('final')) return <Badge bg="secondary">TERMINÉ</Badge>;
        if (status.includes(':')) return <Badge className="badgeUndersport">{status}</Badge>;
        if (period === 0) return <Badge bg="info">À VENIR</Badge>;
        return <Badge bg="danger" className="pulse-animation">DIRECT</Badge>;
    };

    if (loading) return <div className="text-center p-3"><Spinner animation="border" size="sm" variant="primary" /></div>;
    if (error) return <Alert variant="warning" className="small p-2">{error}</Alert>;
    if (matches.length === 0) return <div className="text-center text-muted p-3 small">Aucun match NBA prévu ce jour.</div>;

    return (
        <div className="d-flex flex-column gap-3">
            {matches.map(match => {
                const s = match.status.toLowerCase();
                const isFinal = s.includes('final');
                const isScheduled = match.period === 0 && !isFinal;

                return (
                    <div key={match.id} className="matchCard py-3 border-bottom">
                        <div className="d-flex justify-content-between align-items-center px-2">
                            {/* Equipe Domicile */}
                            <div className="text-end fw-bold d-flex flex-column align-items-end" style={{ width: '40%' }}>
                                <img
                                    src={match.homeTeam.crest}
                                    alt="logo"
                                    width="35"
                                    className="mb-1"
                                    onError={(e) => e.target.src = "https://placehold.co/40x40?text=NBA"}
                                />
                                <span className="text-truncate w-100 small">{match.homeTeam.name}</span>
                            </div>

                            {/* Score ou Statut */}
                            <div className="text-center flex-grow-1 mx-2">
                                <div className="fw-bold fs-4 mb-1">
                                    {isScheduled ? (
                                        <span className="text-muted opacity-50">vs</span>
                                    ) : (
                                        <span>{match.score.fullTime.home} - {match.score.fullTime.away}</span>
                                    )}
                                </div>
                                {renderStatus(match.status, match.period)}

                                {/* Temps de jeu NBA (Quart-temps et Chrono) */}
                                {match.period > 0 && !match.status.toLowerCase().includes('final') && (
                                    <div className="small text-danger fw-bold mt-1">
                                        Q{match.period} - {match.time || '00:00'}
                                    </div>
                                )}
                            </div>

                            {/* Equipe Extérieur */}
                            <div className="text-start fw-bold d-flex flex-column align-items-start" style={{ width: '40%' }}>
                                <img
                                    src={match.awayTeam.crest}
                                    alt="logo"
                                    width="35"
                                    className="mb-1"
                                    onError={(e) => e.target.src = "https://placehold.co/40x40?text=NBA"}
                                />
                                <span className="text-truncate w-100 small">{match.awayTeam.name}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default NbaMatches;
