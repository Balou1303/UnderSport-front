import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const LegendCard = ({ legend }) => {
    const API_URL = import.meta.env.VITE_URL_API;
    const SERVER_URL = API_URL ? API_URL.replace('/api', '') : '';

    return (
        <Link to={`/legends/${legend.legendId}`} className="text-decoration-none">
            <div className="legend-card">
                <div className="legendCardPicture">
                    {legend.photo ? (
                        <img
                            src={`${SERVER_URL}${legend.photo}`}
                            alt={`${legend.firstname} ${legend.lastname}`}
                        />
                    ) : (
                        <div className="legendCardPlaceholder">
                            Photo indisponible
                        </div>
                    )}
                </div>

                <div className="legendCardBody">
                    <h2>
                        <span className="legendFirstname">{legend.firstname}</span>
                        <span className="legendLastname">{legend.lastname}</span>
                    </h2>

                    <div className="legendBadges">
                        <Badge bg="dark" className="legendBadge">
                            {legend.sportName}
                        </Badge>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default LegendCard;
