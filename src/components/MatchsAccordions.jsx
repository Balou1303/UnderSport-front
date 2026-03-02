import Accordion from 'react-bootstrap/Accordion';
import LeagueMatches from './LeagueMatches';
import NbaMatches from './NbaMatches';
import { useState } from 'react';

const MatchsAccordions = ({ selectedDate, refreshKey }) => {
    const [activeSportKey, setActiveSportKey] = useState(); // État pour le niveau Sport
    const [activeLeagueKey, setActiveLeagueKey] = useState(); // État pour le niveau Ligue

    return (
        <Accordion activeKey={activeSportKey} onSelect={(k) => setActiveSportKey(k)}>
            {/* Sport : Foot */}
            <Accordion.Item eventKey="foot">
                <Accordion.Header>⚽ FOOTBALL</Accordion.Header>
                <Accordion.Body>
                    {/* ... (contenu foot identique) ... */}
                    <Accordion activeKey={activeLeagueKey} onSelect={(k) => setActiveLeagueKey(k)}>
                        <Accordion.Item eventKey="l1">
                            <Accordion.Header>Ligue 1  (FRA)</Accordion.Header>
                            <Accordion.Body>
                                {activeLeagueKey === 'l1' && <LeagueMatches leagueId="FL1" selectedDate={selectedDate} refreshKey={refreshKey} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="pl">
                            <Accordion.Header>Premier League (ANG)</Accordion.Header>
                            <Accordion.Body>
                                {activeLeagueKey === 'pl' && <LeagueMatches leagueId="PL" selectedDate={selectedDate} refreshKey={refreshKey} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="pd">
                            <Accordion.Header>La Liga (ESP)</Accordion.Header>
                            <Accordion.Body>
                                {activeLeagueKey === 'pd' && <LeagueMatches leagueId="PD" selectedDate={selectedDate} refreshKey={refreshKey} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="bl1">
                            <Accordion.Header>Bundesliga (ALL)</Accordion.Header>
                            <Accordion.Body>
                                {activeLeagueKey === 'bl1' && <LeagueMatches leagueId="BL1" selectedDate={selectedDate} refreshKey={refreshKey} />}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="sa">
                            <Accordion.Header>Serie A (ITA)</Accordion.Header>
                            <Accordion.Body>
                                {activeLeagueKey === 'sa' && <LeagueMatches leagueId="SA" selectedDate={selectedDate} refreshKey={refreshKey} />}
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="cl">
                            <Accordion.Header>Ligue des Champions (EUR)</Accordion.Header>
                            <Accordion.Body>
                                {activeLeagueKey === 'cl' && <LeagueMatches leagueId="CL" selectedDate={selectedDate} refreshKey={refreshKey} />}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Accordion.Body>
            </Accordion.Item>

            {/* Sport : Basketball */}
            <Accordion.Item eventKey="basket">
                <Accordion.Header>🏀 BASKETBALL</Accordion.Header>
                <Accordion.Body>
                    <Accordion>
                        <Accordion.Item eventKey="nba">
                            <Accordion.Header>NBA (USA)</Accordion.Header>
                            <Accordion.Body>
                                <NbaMatches selectedDate={selectedDate} refreshKey={refreshKey} />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default MatchsAccordions;