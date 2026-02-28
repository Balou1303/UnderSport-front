import { Container, Badge } from 'react-bootstrap';
import ChampionshipsAccordions from '../components/MatchsAccordions';
import { useState, useEffect } from 'react';

const MatchsPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [refreshKey, setRefreshKey] = useState(0);

    // Auto-refresh toutes les 60 secondes pour les scores en direct
    useEffect(() => {
        const interval = setInterval(() => {
            setRefreshKey(prev => prev + 1);
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const changeDate = (days) => {
        const d = new Date(selectedDate);
        d.setDate(d.getDate() + days);
        setSelectedDate(d.toISOString().split('T')[0]);
    };

    const resetDate = () => {
        setSelectedDate(new Date().toISOString().split('T')[0]);
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
                        <Badge bg="primary" className="mb-3 px-3 py-2 fs-6 shadow-sm text-uppercase">
                            OMNISPORT • SAISON 2025/2026
                        </Badge>
                        <h1 className="text-white fw-bold mb-0 text-uppercase" style={{ fontSize: '3.5rem', textShadow: '0 4px 6px rgba(0,0,0,0.5)' }}>
                            CENTRE DE <span style={{ color: 'var(--primary-color)' }}>MATCHS</span>
                        </h1>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center align-items-center gap-3 mb-4">
                <button onClick={() => changeDate(-1)} className="btn btn-outline-primary shadow-sm">⬅️ Hier</button>

                <div className="text-center px-3">
                    <div className="fw-bold fs-4" style={{ color: 'var(--sidebar-bg)' }}>{selectedDate}</div>
                    <button onClick={resetDate} className="btn btn-sm btn-link text-decoration-none text-muted">Revenir à la date du jour</button>
                </div>

                <button onClick={() => changeDate(1)} className="btn btn-outline-primary shadow-sm">Demain ➡️</button>
            </div>

            {/*  accordéons imbriqués */}
            <ChampionshipsAccordions selectedDate={selectedDate} refreshKey={refreshKey} />

        </Container>
    );
};

export default MatchsPage;

