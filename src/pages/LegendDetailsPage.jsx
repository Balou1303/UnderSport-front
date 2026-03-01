import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Badge, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import legendsService from "../services/legendsService";

const LegendDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_URL_API;
    const SERVER_URL = API_URL ? API_URL.replace('/api', '') : '';

    const [legend, setLegend] = useState(null);
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [legendRes, achievementsRes] = await Promise.all([
                legendsService.getLegendById(id),
                legendsService.getAchievementsByLegendId(id)
            ]);
            setLegend(legendRes.data);
            setAchievements(achievementsRes.data);
        } catch (error) {
            toast.error("Impossible de charger les détails de cette légende.");
            navigate("/legends");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return <Container className="mt-5 text-center"><h2>Chargement...</h2></Container>;
    if (!legend) return null;

    // Filtrage précis basé sur le Dashboard
    const collective = achievements.filter(a => a.type === 'collective');
    const individual = achievements.filter(a => a.type === 'individual');
    const honorary = achievements.filter(a => a.type === 'honorary');

    return <>
        <Container className="py-5">
            {/* Header Immersif */}
            <div className="legendDetailHero mb-5">
                <Row className="gy-4 align-items-center">
                    <Col lg={4}>
                        {legend.photo ? (
                            <img
                                src={`${SERVER_URL}${legend.photo}`}
                                alt={`${legend.firstname} ${legend.lastname}`}
                                className="legendDetailPhoto"
                            />
                        ) : (
                            <div className="legendDetailPhoto bg-dark d-flex align-items-center justify-content-center text-white-50 fs-5" style={{ height: '450px' }}>
                                Photo indisponible
                            </div>
                        )}
                    </Col>
                    <Col lg={8} className="ps-lg-5">
                        <div className="mb-4">
                            <span className="text-primary fw-bold text-uppercase" style={{ letterSpacing: '4px', fontSize: '0.9rem' }}>
                                {legend.sportName} • Icône Mondiale
                            </span>
                            <h1 className="display-2 fw-800 mb-0 mt-2" style={{ letterSpacing: '-2px' }}>
                                {legend.firstname} <span className="text-primary">{legend.lastname}</span>
                            </h1>
                        </div>

                        <div className="bioCard mb-4 mt-4">
                            <h5 className="text-white mb-3 d-flex align-items-center gap-2">
                                <span className="fs-4">📖</span> Biographie & Héritage
                            </h5>
                            <p className="mb-0 text-white-50" style={{ lineHeight: '1.8', fontSize: '1.05rem', whiteSpace: "pre-wrap" }}>
                                {legend.description || "Cette légende a marqué l'histoire par ses performances hors normes et son impact durable sur le sport."}
                            </p>
                        </div>

                        <Link to="/legends" className="btn btn-outline-light rounded-pill px-4 btn-sm opacity-75">
                            ← Retour au Panthéon
                        </Link>
                    </Col>
                </Row>
            </div>

            {/* Palmarès */}
            <div className="py-4">
                <div className="mb-5">
                    <h6 className="text-uppercase fw-bold text-primary mb-2" style={{ letterSpacing: '2px' }}>Palmarès</h6>
                    <h2 className="fw-800 display-5" style={{ letterSpacing: '-1px' }}>L'Armoire à <span className="text-primary">Trophées</span></h2>
                </div>

                {achievements.length > 0 ? (
                    <>
                        {/* Section Collectifs */}
                        {collective.length > 0 && (
                            <div className="mb-5">
                                <h4 className="fw-bold mb-4 d-flex align-items-center gap-2">
                                    <span className="text-primary">🏆</span> Succès Collectifs
                                </h4>
                                <Row className="g-4">
                                    {collective.map((achiev, index) => (
                                        <Col sm={6} md={4} key={index}>
                                            <div className="achievementCard p-4 h-100 d-flex align-items-center gap-3" style={{ borderLeft: '4px solid var(--primary-color)' }}>
                                                <div className="fs-1">🏆</div>
                                                <div>
                                                    <h5 className="fw-bold mb-0 text-dark" style={{ lineHeight: '1.2' }}>{achiev.label}</h5>
                                                    <span className="text-primary fw-bold small">{achiev.years}</span>
                                                </div>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        )}

                        {/* Section Individuels */}
                        {individual.length > 0 && (
                            <div className="mb-5">
                                <h4 className="fw-bold mb-4 d-flex align-items-center gap-2">
                                    <span style={{ color: '#f59e0b' }}>🥇</span> Distinctions Individuelles
                                </h4>
                                <Row className="g-4">
                                    {individual.map((achiev, index) => (
                                        <Col sm={6} md={4} key={index}>
                                            <div className="achievementCard p-4 h-100 d-flex align-items-center gap-3" style={{ borderLeft: '4px solid #f59e0b' }}>
                                                <div className="fs-1">🥇</div>
                                                <div>
                                                    <h5 className="fw-bold mb-0 text-dark" style={{ lineHeight: '1.2' }}>{achiev.label}</h5>
                                                    <span style={{ color: '#f59e0b' }} className="fw-bold small">{achiev.years}</span>
                                                </div>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        )}

                        {/* Section Honorifiques */}
                        {honorary.length > 0 && (
                            <div className="mb-5">
                                <h4 className="fw-bold mb-4 d-flex align-items-center gap-2">
                                    <span style={{ color: '#3b82f6' }}>⭐</span> Mentions Honorifiques
                                </h4>
                                <Row className="g-4">
                                    {honorary.map((achiev, index) => (
                                        <Col sm={6} md={4} key={index}>
                                            <div className="achievementCard p-4 h-100 d-flex align-items-center gap-3" style={{ borderLeft: '4px solid #3b82f6' }}>
                                                <div className="fs-1">⭐</div>
                                                <div>
                                                    <h5 className="fw-bold mb-0 text-dark" style={{ lineHeight: '1.2' }}>{achiev.label}</h5>
                                                    <span style={{ color: '#3b82f6' }} className="fw-bold small">{achiev.years}</span>
                                                </div>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="p-5 bg-white rounded-5 text-center shadow-sm">
                        <p className="text-muted mb-0">Aucun palmarès enregistré pour le moment.</p>
                    </div>
                )}
            </div>
        </Container>
    </>;
};

export default LegendDetailsPage;
