import Accordion from 'react-bootstrap/Accordion';
import LeagueMatches from './LeagueMatches';
import { useState } from 'react';

const MatchsAccordions = ({ selectedDate, refreshKey }) => {
    const [activeSportKey, setActiveSportKey] = useState('foot'); // État pour le niveau Sport
    const [activeLeagueKey, setActiveLeagueKey] = useState('l1'); // État pour le niveau Ligue

    return (
        <Accordion activeKey={activeSportKey} onSelect={(k) => setActiveSportKey(k)}>
            {/* Sport */}
            <Accordion.Item eventKey="foot">
                <Accordion.Header>⚽ FOOTBALL</Accordion.Header>
                <Accordion.Body>

                    {/* Ligues */}
                    <Accordion activeKey={activeLeagueKey} onSelect={(k) => setActiveLeagueKey(k)}>
                        <Accordion.Item eventKey="l1">
                            <Accordion.Header>Ligue 1</Accordion.Header>
                            <Accordion.Body>
                                {activeLeagueKey === 'l1' && <LeagueMatches leagueId="FL1" selectedDate={selectedDate} refreshKey={refreshKey} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="pl">
                            <Accordion.Header>Premier League</Accordion.Header>
                            <Accordion.Body>
                                {activeLeagueKey === 'pl' && <LeagueMatches leagueId="PL" selectedDate={selectedDate} refreshKey={refreshKey} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="pd">
                            <Accordion.Header>La Liga</Accordion.Header>
                            <Accordion.Body>
                                {activeLeagueKey === 'pd' && <LeagueMatches leagueId="PD" selectedDate={selectedDate} refreshKey={refreshKey} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="bl1">
                            <Accordion.Header>Bundesliga</Accordion.Header>
                            <Accordion.Body>
                                {activeLeagueKey === 'bl1' && <LeagueMatches leagueId="BL1" selectedDate={selectedDate} refreshKey={refreshKey} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="sa">
                            <Accordion.Header>Serie A</Accordion.Header>
                            <Accordion.Body>
                                {activeLeagueKey === 'sa' && <LeagueMatches leagueId="SA" selectedDate={selectedDate} refreshKey={refreshKey} />}
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="cl">
                            <Accordion.Header>Ligue des Champions</Accordion.Header>
                            <Accordion.Body>
                                {activeLeagueKey === 'cl' && <LeagueMatches leagueId="CL" selectedDate={selectedDate} refreshKey={refreshKey} />}
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