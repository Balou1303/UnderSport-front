import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const LegendCard = ({ legend }) => {
    const API_URL = import.meta.env.VITE_URL_API;
    const SERVER_URL = API_URL ? API_URL.replace('/api', '') : '';

    return (
        <Link to={`/legends/${legend.legendId}`} className="text-decoration-none">
            <div className="legendCardPremium">
                <div className="legendImgWrapper">
                    {legend.photo ? (
                        <img
                            src={`${SERVER_URL}${legend.photo}`}
                            alt={`Portrait de la légende : ${legend.firstname} ${legend.lastname}`}
                        />
                    ) : (
                        <div className="d-flex align-items-center justify-content-center h-100 bg-light text-muted">
                            Photo indisponible
                        </div>
                    )}
                </div>

                <div className="legendInfo">
                    <span className="legendFirstnamePremium">{legend.firstname}</span>
                    <span className="legendLastnamePremium">{legend.lastname}</span>
                    <div>
                        <span className="legendSportTag">
                            {legend.sportName}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default LegendCard;
