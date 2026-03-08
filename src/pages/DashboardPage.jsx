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
                    <Card className="text-center shadow-sm border-primary mb-3">
                        <Card.Body>
                            <h3 className="text-primary fw-bold">{stats.articlesLastWeek}</h3>
                            <Card.Text className="text-muted">Articles (7 jours)</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Carte Mois */}
                <Col md={4}>
                    <Card className="text-center shadow-sm border-success mb-3">
                        <Card.Body>
                            <h3 className="text-success fw-bold">{stats.articlesLastMonth}</h3>
                            <Card.Text className="text-muted">Articles (30 jours)</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Carte Vues Totales */}
                <Col md={4}>
                    <Card className="text-center shadow-sm border-warning mb-3">
                        <Card.Body>
                            <h3 className="text-warning fw-bold">{stats.totalViews}</h3>
                            <Card.Text className="text-muted">Vues Totales</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    </>;
};

export default DashboardPage;