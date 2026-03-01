import { useState, useEffect } from 'react';
import { Spinner, Alert, Badge } from 'react-bootstrap';
import api from '../services/api';

const LeagueMatches = ({ leagueId, selectedDate, refreshKey }) => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMatches = async () => {
            setLoading(true);
            setError(null);
            try {
                // On récupère les matchs via les deux sources
                const [dateResult, liveResult] = await Promise.allSettled([
                    api.get(`/external/matches/${leagueId}?dateFrom=${selectedDate}&dateTo=${selectedDate}`),
                    api.get(`/external/live/${leagueId}`)
                ]);

                // Gestion d'erreur plus fine pour éviter le "Silencieux" si Rate-Limit
                if (dateResult.status === 'rejected') {
                    console.error(`API Error for ${leagueId}:`, dateResult.reason);
                    const isRateLimit = dateResult.reason?.response?.status === 429;
                    setError(isRateLimit ? "Limite de requêtes atteinte. Patientez 60 sec." : "Erreur API.");
                    setLoading(false);
                    return;
                }

                const dateMatches = dateResult.value.data?.matches || [];
                const liveMatches = liveResult.status === 'fulfilled' ? (liveResult.value.data?.matches || []) : [];

                // Fusion par Map pour que les données du direct écrasent les données de calendrier
                const mergedMap = new Map();

                // met les matchs du calendrier
                dateMatches.forEach(m => mergedMap.set(m.id, m));

                // écrase avec les matchs du direct (si l'ID existe)
                liveMatches.forEach(m => mergedMap.set(m.id, m));

                const merged = Array.from(mergedMap.values());

                // Filtre STRICT : Un match n'appartient qu'à sa date (UTC)
                // Cela évite de polluer les jours précédents avec les scores d'aujourd'hui
                const filtered = merged.filter(m => m.utcDate.split('T')[0] === selectedDate);

                // Tri par date
                filtered.sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate));

                setMatches(filtered);
            } catch (err) {
                console.error(`Erreur chargement ${leagueId}:`, err);
                setError("Erreur de connexion.");
            } finally {
                setLoading(false);
            }
        };

        if (leagueId && selectedDate) {
            fetchMatches();
        }
    }, [leagueId, selectedDate, refreshKey]);

    // Fonction pour afficher le statut du match avec du style
    const renderStatus = (match) => {
        switch (match.status) {
            case 'IN_PLAY':
            case 'PAUSED':
            case 'LIVE':
                return <Badge bg="danger" className="pulse-animation">DIRECT</Badge>;
            case 'FINISHED':
                return <Badge bg="secondary">TERMINÉ</Badge>;
            default:
                // Pour les matchs à venir, on affiche l'heure
                const time = new Date(match.utcDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
                return <Badge className="badge-undersport">{time}</Badge>;
        }
    };

    if (loading) return <div className="text-center p-3"><Spinner animation="border" size="sm" variant="primary" /></div>;
    if (error) return <Alert variant="warning" className="small p-2">{error}</Alert>;
    if (matches.length === 0) return <div className="text-center text-muted p-3 small">Aucun match prévu ce jour.</div>;

    return (
        <div className="d-flex flex-column gap-3">
            {matches.map(match => (
                <div key={match.id} className="matchCard py-3 border-bottom">
                    <div className="d-flex justify-content-between align-items-center px-2">
                        {/* Equipe Domicile */}
                        <div className="text-end fw-bold d-flex flex-column align-items-end" style={{ width: '40%' }}>
                            <img src={match.homeTeam.crest} alt="logo" width="30" className="mb-1" />
                            <span className="text-truncate w-100 small">{match.homeTeam.shortName || match.homeTeam.name}</span>
                        </div>

                        {/* Score ou Statut */}
                        <div className="text-center flex-grow-1 mx-2">
                            <div className="fw-bold fs-5 mb-1">
                                {match.status === 'SCHEDULED' || match.status === 'TIMED' ? (
                                    <span className="text-muted opacity-50">vs</span>
                                ) : (
                                    <span>{match.score.fullTime.home} - {match.score.fullTime.away}</span>
                                )}
                            </div>
                            {renderStatus(match)}
                        </div>

                        {/* Equipe Extérieur */}
                        <div className="text-start fw-bold d-flex flex-column align-items-start" style={{ width: '40%' }}>
                            <img src={match.awayTeam.crest} alt="logo" width="30" className="mb-1" />
                            <span className="text-truncate w-100 small">{match.awayTeam.shortName || match.awayTeam.name}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LeagueMatches;
