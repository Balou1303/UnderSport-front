// src/pages/DashboardPage.jsx
import { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import articlesService from "../services/articlesService";

const DashboardPage = () => {
    const [stats, setStats] = useState({
        articlesLastWeek: 0,
        articlesLastMonth: 0,
        totalViews: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await articlesService.getStats();
                setStats(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchStats();
    }, []);

    return <>
        <div className="p-4">
            <h2 className="mb-4">Tableau de Bord </h2>

            <Row className="mb-4">
                {/* Carte Semaine */}
                <Col md={4}>
                    <Card className="text-center shadow-sm border-0 glassCard h-100">
                        <Card.Body className="d-flex flex-column justify-content-center">
                            <h3 className="text-primary fw-bold fs-1">{stats.articlesLastWeek}</h3>
                            <Card.Text className="text-muted">Articles (7 jours)</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Carte Mois */}
                <Col md={4}>
                    <Card className="text-center shadow-sm border-0 glassCard h-100">
                        <Card.Body className="d-flex flex-column justify-content-center">
                            <h3 className="text-success fw-bold fs-1">{stats.articlesLastMonth}</h3>
                            <Card.Text className="text-muted">Articles (30 jours)</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Carte Vues Totales */}
                <Col md={4}>
                    <Card className="text-center shadow-sm border-0 glassCard h-100">
                        <Card.Body className="d-flex flex-column justify-content-center">
                            <h3 className="text-warning fw-bold fs-1">{stats.totalViews}</h3>
                            <Card.Text className="text-muted">Vues Totales</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <h3 className="mb-4 mt-5"> Articles les plus consultés</h3>

            <Row>
                {stats.topArticles && stats.topArticles.length > 0 ? (
                    stats.topArticles.slice(0, 3).map((article, index) => (
                        <Col key={article.articleId} lg={4} md={6} className="mb-4">
                            <Card className="border-0 shadow-sm glassCard h-100 overflow-hidden position-relative hover-scale">
                                {/* Badge de rang flottant */}
                                <div
                                    className="position-absolute top-0 end-0 m-3 d-flex align-items-center justify-content-center rounded-circle shadow-sm"
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        backgroundColor: index === 0 ? "#FFD700" : index === 1 ? "#C0C0C0" : "#CD7F32",
                                        color: "#000",
                                        fontWeight: "800",
                                        fontSize: "1.2rem",
                                        zIndex: 2
                                    }}
                                >
                                    {index + 1}
                                </div>

                                <Card.Body className="p-4 d-flex flex-column h-100">
                                    <h4 className="text-white fw-bold mb-3 pe-5 leading-tight" style={{ minHeight: "3.6rem" }}>
                                        {article.title}
                                    </h4>

                                    <div className="mt-auto d-flex align-items-center">
                                        <div
                                            className="px-3 py-2 rounded-pill d-flex align-items-center gap-2 shadow-sm"
                                            style={{
                                                backgroundColor: "#22D3EE", // Cyan vif
                                                color: "#0F172A", // Texte très sombre (bleu nuit) pour contraste max
                                                fontWeight: "bold"
                                            }}
                                        >
                                            <span style={{ fontSize: "1.1rem" }}>👁️</span>
                                            <span>{article.views} vues</span>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col>
                        <div className="glassCard p-5 text-center rounded-4 border-0">
                            <p className="text-muted mb-0 fs-5">Aucune donnée de vue disponible pour le moment.</p>
                        </div>
                    </Col>
                )}
            </Row>
        </div>
    </>;
};

export default DashboardPage;