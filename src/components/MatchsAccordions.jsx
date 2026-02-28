import Accordion from 'react-bootstrap/Accordion';
import LeagueMatches from './LeagueMatches';

const MatchsAccordions = ({ selectedDate, refreshKey }) => {
    return (
        <Accordion defaultActiveKey="foot">
            {/* Sport */}
            <Accordion.Item eventKey="foot">
                <Accordion.Header>⚽ FOOTBALL</Accordion.Header>
                <Accordion.Body>

                    {/* Ligues */}
                    <Accordion>
                        <Accordion.Item eventKey="l1">
                            <Accordion.Header>Ligue 1</Accordion.Header>
                            <Accordion.Body>
                                <LeagueMatches leagueId="FL1" selectedDate={selectedDate} refreshKey={refreshKey} />
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="pl">
                            <Accordion.Header>Premier League</Accordion.Header>
                            <Accordion.Body>
                                <LeagueMatches leagueId="PL" selectedDate={selectedDate} refreshKey={refreshKey} />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Accordion.Body>
            </Accordion.Item>
            {/* Autres Sports */}
            <Accordion.Item eventKey="basket">
                <Accordion.Header>🏀 BASKETBALL</Accordion.Header>
                <Accordion.Body className="text-center text-muted py-4">
                    <p>Données NBA bientôt disponibles via l'API TheSportsDB.</p>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default MatchsAccordions;