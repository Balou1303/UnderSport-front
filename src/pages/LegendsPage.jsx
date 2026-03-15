import { useState, useEffect, useMemo } from "react";
import legendsService from "../services/legendsService";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import LegendCard from "../components/LegendCard";
import { toast } from "react-toastify";

const LegendsPage = () => {
    const [legends, setLegends] = useState([]);
    const [searchLegend, setSearchLegend] = useState("");
    const [selectedSport, setSelectedSport] = useState("");

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
        <Container className="py-5">
            <div className="mb-5 text-center">
                <h6 className="text-uppercase fw-bold text-primary mb-2" style={{ letterSpacing: '3px' }}>Le Panthéon</h6>
                <h1 className="fw-800 display-3 mb-3" style={{ letterSpacing: '-2px' }}>LÉGENDES DU <span className="text-primary">SPORT</span></h1>
                <p className="text-muted mx-auto" style={{ maxWidth: '600px', fontSize: '1.1rem' }}>
                    Plongez dans l'histoire des plus grands athlètes qui ont redéfini les limites de l'excellence.
                </p>
            </div>

            {/* Barre de recherche et filtre par sport */}
            <Row className="mb-5 justify-content-center">
                <Col lg={8}>
                    <div className="p-4 glassCard rounded-4 border d-flex flex-column flex-md-row gap-3">
                        <InputGroup className="flex-grow-1 border-0 bg-dark rounded-3 overflow-hidden">
                            <InputGroup.Text className="bg-transparent border-0 ps-3">
                                🔍
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Rechercher une icône..."
                                value={searchLegend}
                                onChange={(e) => setSearchLegend(e.target.value)}
                                className="bg-transparent border-0 py-2 text-white"
                            />
                        </InputGroup>

                        <Form.Select
                            value={selectedSport}
                            onChange={(e) => setSelectedSport(e.target.value)}
                            className="bg-dark border-0 rounded-3 py-2 fw-bold text-white"
                            style={{ minWidth: "180px", cursor: 'pointer' }}
                        >
                            <option value="" className="bg-dark">Tous les sports</option>
                            {uniqueSports.map(sport => (
                                <option key={sport} value={sport} className="bg-dark">{sport}</option>
                            ))}
                        </Form.Select>
                    </div>
                </Col>
            </Row>

            <Row className="g-4">
                {filteredLegends.map((legend) => (
                    <Col key={legend.legendId} md={6} lg={4} xl={3}>
                        <LegendCard legend={legend} />
                    </Col>
                ))}

                {filteredLegends.length === 0 && (
                    <Col xs={12}>
                        <div className="py-5 text-center">
                            <div className="display-1 mb-3">🏅</div>
                            <h3 className="text-muted">Aucune légende trouvée</h3>
                            <button className="btn btn-link text-primary fw-bold" onClick={() => { setSearchLegend(""); setSelectedSport("") }}>Rétablir les filtres</button>
                        </div>
                    </Col>
                )}
            </Row>
        </Container>
    </>;
};

export default LegendsPage;
