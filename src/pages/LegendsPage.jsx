import { useState, useEffect, useMemo } from "react";
import legendsService from "../services/legendsService";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import LegendCard from "../components/LegendCard";
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
                        <LegendCard legend={legend} />
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
