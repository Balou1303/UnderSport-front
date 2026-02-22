import { useState, useEffect, useMemo } from "react";
import legendsService from "../services/legendsService";
import { Container, Row, Col, Card, Badge, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const LegendsPage = () => {
    const [legends, setLegends] = useState([]);
    const [searchLegend, setSearchLegend] = useState("");
    const [selectedSport, setSelectedSport] = useState("");

    const API_URL = import.meta.env.VITE_URL_API;
    const SERVER_URL = API_URL ? API_URL.replace('/api', '') : '';

    const uniqueSports = useMemo(() => {
        const sports = legends.map(l => l.sportName).filter(Boolean);
        return [...new Set(sports)].sort();
    }, [legends]);

    const filteredLegends = useMemo(() => {
        return legends.filter(legend => {
            const fullName = `${legend.firstname || ""} ${legend.lastname || ""}`.toLowerCase();
            const matchesSearch = fullName.includes(searchLegend.toLowerCase());
            const matchesSport = selectedSport === "" || legend.sportName === selectedSport;
            return matchesSearch && matchesSport;
        });
    }, [legends, searchLegend, selectedSport]);

    const fetchLegends = async () => {
        try {
            const response = await legendsService.getAllLegends();
            setLegends(response.data);
        } catch (error) {
            console.error("Erreur de récupération des légendes :", error);
            toast.error("Impossible de charger les légendes");
        }
    };

    useEffect(() => {
        fetchLegends();
    }, []);

    return <>
        <Container className="my-5">
            <h1 className="text-center mb-5 fw-bold text-uppercase" style={{ color: "var(--primary-color)" }}>
                Légendes du Sport 🏆
            </h1>
            <p className="text-center text-muted mb-5">
                Découvrez les profils des sportifs et sportives qui ont marqué l'histoire de leur discipline à jamais.
            </p>

            {/* Barre de recherche et filtre par sport */}
            <Row className="mb-5 justify-content-center">
                <Col md={8} lg={6}>
                    <div className="d-flex flex-column flex-md-row gap-3">
                        <InputGroup className="flex-grow-1 shadow-sm">
                            <InputGroup.Text className="bg-white border-end-0">
                                🔍
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Rechercher une légende..."
                                value={searchLegend}
                                onChange={(e) => setSearchLegend(e.target.value)}
                                className="border-start-0 ps-0"
                            />
                        </InputGroup>

                        <Form.Select
                            value={selectedSport}
                            onChange={(e) => setSelectedSport(e.target.value)}
                            className="shadow-sm"
                            style={{ minWidth: "200px" }}
                        >
                            <option value="">Tous les sports</option>
                            {uniqueSports.map(sport => (
                                <option key={sport} value={sport}>{sport}</option>
                            ))}
                        </Form.Select>
                    </div>
                </Col>
            </Row>

            <Row className="gy-4">
                {filteredLegends.map((legend) => (
                    <Col key={legend.legendId} md={6} lg={4} xl={3}>
                        <Link to={`/legends/${legend.legendId}`} className="text-decoration-none">
                            <Card className="h-100 border-0 legend-card" style={{ transition: 'all 0.3s ease', boxShadow: "0 6px 12px rgba(0,0,0,0.08)", borderRadius: "16px", overflow: "hidden" }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 0 25px var(--primary-color)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.08)';
                                }}>
                                <div style={{ height: "250px", overflow: "hidden", backgroundColor: "#f8f9fa", borderBottom: "4px solid var(--primary-color)" }}>
                                    {legend.photo ? (
                                        <Card.Img
                                            variant="top"
                                            src={`${SERVER_URL}${legend.photo}`}
                                            alt={`${legend.firstname} ${legend.lastname}`}
                                            style={{ height: "100%", width: "100%", objectFit: "cover", objectPosition: "top center" }}
                                        />
                                    ) : (
                                        <div className="w-100 h-100 d-flex justify-content-center align-items-center text-muted fs-5">
                                            Photo indisponible
                                        </div>
                                    )}
                                </div>
                                <Card.Body className="text-center d-flex flex-column justify-content-center py-4 bg-white">
                                    <Card.Title className="fw-bold fs-4 mb-2 text-dark text-decoration-none d-flex flex-column">
                                        <span className="fs-5 text-muted fw-normal">{legend.firstname}</span>
                                        <span className="text-uppercase" style={{ color: "var(--primary-color)", fontSize: "1.6rem" }}>{legend.lastname}</span>
                                    </Card.Title>
                                    <div>
                                        <Badge bg="dark" className="px-3 py-2 rounded-pill mt-2 shadow-sm" style={{ backgroundColor: "#111827", fontSize: "0.9rem" }}>
                                            {legend.sportName}
                                        </Badge>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}

                {filteredLegends.length === 0 && (
                    <Col>
                        <p className="text-center text-muted py-5">
                            Aucune légende ne correspond à votre recherche.
                        </p>
                    </Col>
                )}
            </Row>
        </Container>
    </>;
};

export default LegendsPage;
