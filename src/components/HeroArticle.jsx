import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HeroArticle = ({ article }) => {
    // si pas d'article, on n'affiche rien
    if (!article) return null;

    const API_URL = import.meta.env.VITE_URL_API;
    const SERVER_URL = API_URL ? API_URL.replace('/api', '') : '';

    // Construction de l'URL de l'image
    const imageUrl = article.picture
        ? `${SERVER_URL}${article.picture}`
        : "https://placehold.co/1200x600/1a1a1a/white?text=A+la+Une";

    //  Gestion des tags (évite le crash si sportName est null)
    const tags = article.sportName ? article.sportName.split(',') : [];

    return <>
        <div className="heroCard">
            {/* Ajout des guillemets dans l'URL pour éviter les bugs CSS */}
            <div className="heroImage" style={{ backgroundImage: `url("${imageUrl}")` }}>
                <div className="heroOverlay">
                    <div className="hero-meta">
                        À LA UNE {tags.length > 0 && `• ${tags[0].toUpperCase()}`}
                    </div>

                    <h1>{article.title}</h1>

                    <p className="heroSummary">
                        {article.content ? article.content.substring(0, 150) + "..." : "Lire la suite..."}
                    </p>

                    <div className="d-flex align-items-center gap-3 mb-4">
                        <span className="text-white-50 small">
                            Par <span className="text-white fw-bold">{article.firstName} {article.lastName}</span>
                        </span>
                        <span className="text-white-50 small">|</span>
                        <span className="text-white-50 small">
                            {new Date(article.publicationDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                        </span>
                    </div>

                    <Link to={`/article/${article.articleId}`} className="btn btn-primary btn-lg">Lire l'article</Link>
                </div>
            </div>
        </div>
    </>;
};

export default HeroArticle;