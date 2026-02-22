import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

    const collective = achievements.filter(a => a.type === 'collective' || !a.type);
    const individual = achievements.filter(a => a.type === 'individual');
    const honorary = achievements.filter(a => a.type === 'honorary');

    const renderAchievementGroup = (list, title, icon, color) => {
        if (list.length === 0) return null;
        return (
            <div className="mb-5">
                <h4 className="mb-3 d-flex align-items-center fw-bold" style={{ color: color }}>
                    <span className="me-2 fs-3">{icon}</span> {title}
                </h4>
                <Row className="g-3">
                    {list.map((achiev, index) => (
                        <Col sm={6} md={6} xl={4} key={index}>
                            <Card className="h-100 border-0 text-center bg-white" style={{ transition: "transform 0.2s", borderBottom: `4px solid ${index % 2 === 0 ? color : "#111827"}`, boxShadow: "0 6px 12px rgba(0,0,0,0.08)" }}>
                                <Card.Body className="d-flex flex-column justify-content-center py-4">
                                    <div className="display-4 mb-2" style={{ color: color }}>{icon}</div>
                                    <h5 className="fw-bold text-dark mb-1">{achiev.label}</h5>
                                    <span className="text-muted fw-bold fs-5">{achiev.years}</span>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        );
    };

    return <>
        <Container className="my-5">
            {/* Bouton retour avec le style principal */}
            <button className="btn btn-primary mb-4 shadow-sm" onClick={() => navigate("/legends")}>
                <i className="bi bi-arrow-left me-2"></i> Retour au Panthéon
            </button>

            <Row className="g-5">
                {/* Colonne gauche : Photo et Titre */}
                <Col md={5} lg={4}>
                    <Card className="border-0 text-center bg-white rounded-4 overflow-hidden" style={{ borderTop: "5px solid var(--primary-color)", boxShadow: "0 12px 24px rgba(0,0,0,0.12)" }}>
                        {legend.photo ? (
                            <div style={{ padding: "15px", backgroundColor: "#f8f9fa", display: "flex", justifyContent: "center" }}>
                                <img
                                    src={`${SERVER_URL}${legend.photo}`}
                                    alt={`${legend.firstname} ${legend.lastname}`}
                                    className="img-fluid rounded-3 shadow-sm"
                                    style={{
                                        width: "100%",
                                        height: "400px",
                                        objectFit: "cover",
                                        objectPosition: "top center"
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="py-5 bg-light text-muted d-flex align-items-center justify-content-center" style={{ height: "400px" }}>
                                <span className="fs-5">Photo indisponible</span>
                            </div>
                        )}
                        <Card.Body className="py-4">
                            <h2 className="fw-bold mb-1 text-uppercase" style={{ color: "var(--primary-color)" }}>{legend.lastname}</h2>
                            <h4 className="fw-light mb-3 text-dark">{legend.firstname}</h4>
                            <Badge bg="dark" className="fs-6 py-2 px-3 rounded-pill shadow-sm" style={{ backgroundColor: "#111827" }}>
                                🏅 {legend.sportName}
                            </Badge>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Colonne droite : Biographe & Palmarès */}
                <Col md={7} lg={8}>
                    {/* Biographie */}
                    <div className="mb-5">
                        <h3 className="mb-4 d-flex align-items-center fw-bold" style={{ color: "var(--primary-color)" }}>
                            <span className="me-2 fs-2">📖</span> Biographie & Carrière
                        </h3>
                        {legend.description ? (
                            <div className="p-4 bg-white rounded-4" style={{ borderLeft: "5px solid var(--primary-color)", boxShadow: "0 8px 16px rgba(0,0,0,0.06)" }}>
                                <p className="mb-0 text-dark" style={{ lineHeight: "1.8", whiteSpace: "pre-wrap", fontSize: "1.05rem" }}>
                                    {legend.description}
                                </p>
                            </div>
                        ) : (
                            <p className="text-muted fst-italic">Cette légende est trop grande pour être décrite en quelques mots...</p>
                        )}
                    </div>

                    {/* Palmarès */}
                    <div>
                        <h3 className="mb-4 d-flex align-items-center fw-bold" style={{ color: "var(--primary-color)" }}>
                            <span className="me-2 fs-2">🏆</span> L'Armoire à Trophées
                        </h3>
                        {achievements.length > 0 ? (
                            <>
                                {renderAchievementGroup(collective, "Trophées Collectifs", "🏆", "var(--primary-color)")}
                                {renderAchievementGroup(individual, "Récompenses Individuelles", "🥇", "#eab308")}
                                {renderAchievementGroup(honorary, "Mentions Honorifiques", "⭐", "#3b82f6")}
                            </>
                        ) : (
                            <div className="p-4 border-0 rounded-4 text-center text-muted bg-white shadow-sm">
                                Aucun palmarès n'a encore été enregistré pour ce joueur.
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    </>;
};

export default LegendDetailsPage;
