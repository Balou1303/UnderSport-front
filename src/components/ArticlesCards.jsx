import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ArticlesCards = ({ article }) => {
    // Utilisation de la variable d'environnement pour l'image
    const API_URL = import.meta.env.VITE_URL_API;
    
    //  crée l'URL "Racine" du serveur (ex: http://localhost:3000)
    // enlève le "/api" de la fin s'il est présent pour avoir juste la racine
    const SERVER_URL = API_URL.replace('/api', '');
    const imageUrl = article.picture
        ? `${SERVER_URL}${article.picture}`
        : "https://placehold.co/600x400/8A5CF5/white?text=UnderSport";

    return <>
        <div className="articleCard">
            <div className="cardPicture">
                <img src={imageUrl} alt={`Couverture de l'article : ${article.title}`} className="card-img-fixed" />
            </div>

            <div className="cardBody">
                <div>
                    <div className="d-flex gap-2 mb-2">
                        <Badge bg="primary" style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>
                            {article.sportName || "Sport"}
                        </Badge>
                        {article.championshipName && (
                            <Badge bg="dark" style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>
                                {article.championshipName}
                            </Badge>
                        )}
                    </div>
                    <h2 className="fw-bold mb-3" style={{ fontSize: '1.4rem', lineHeight: '1.3' }}>{article.title}</h2>
                </div>

                <div className="mt-auto w-100 d-flex justify-content-between align-items-center">
                    <span className="text-muted small">
                        {new Date(article.publicationDate).toLocaleDateString('fr-FR')}
                    </span>
                    <Link to={`/article/${article.articleId}`} className="cardBtn">Lire l'article</Link>
                </div>
            </div>
        </div>
    </>
};

export default ArticlesCards;