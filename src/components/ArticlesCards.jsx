import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ArticlesCards = ({ article }) => {
    // Utilisation de la variable d'environnement pour l'image
    const API_URL = import.meta.env.VITE_URL_API;
    //  On crée l'URL "Racine" du serveur (ex: http://localhost:3000)
    // Astuce : On enlève le "/api" de la fin s'il est présent pour avoir juste la racine
    const SERVER_URL = API_URL.replace('/api', '');
    const imageUrl = article.picture
        ? `${SERVER_URL}${article.picture}`
        : "https://placehold.co/600x400/8A5CF5/white?text=UnderSport";

    return <>
        <div className="articleCard">
            <div className="cardPicture">
                <img src={imageUrl} alt={article.title} className="card-img-fixed" />
            </div>

            <div className="cardBody">
                <div>
                    <h2>{article.title}</h2>
                </div>

                {/* ZONE DES BADGES */}
                <div style={{ marginBottom: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>

                    <Badge bg="secondary">
                        {article.sportName ? article.sportName : "Sport"}
                    </Badge>

                    {/* BADGE CHAMPIONNAT */}
                    {article.championshipName && (
                        <Badge bg="dark">
                            {article.championshipName}
                        </Badge>
                    )}
                </div>

                <p>
                    Publié le {new Date(article.publicationDate).toLocaleDateString()}
                    <br />
                    {/* Sécurité si l'auteur est null comme dans ton JSON */}
                    {article.firstName && article.lastName && (
                        <span>par <strong>{article.firstName} {article.lastName}</strong></span>
                    )}
                </p>

                <Link to={`/article/${article.articleId}`} className="cardBtn">Lire l'article</Link>
            </div>
        </div>
    </>
};

export default ArticlesCards;