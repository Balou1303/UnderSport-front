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
        <Link to={`/article/${article.articleId}`} className="heroCard text-decoration-none">
            {/* Image en haut sur mobile, fond sur desktop */}
            <div
                className="heroImage"
                style={{ backgroundImage: `url("${imageUrl}")` }}
                role="img"
                aria-label={`Photo d'illustration de l'article : ${article.title}`}
            ></div>
            <div className="heroOverlay">
                <div className="heroContent">
                    <div className="heroMeta">
                        À LA UNE {tags.length > 0 && `• ${tags[0].toUpperCase()}`}
                    </div>

                    <h1 className="text-white">{article.title}</h1>

                    <div className="d-flex align-items-center gap-3 mb-4">
                        <span className="text-white-50">
                            Par <span className="text-white fw-bold">{article.firstName} {article.lastName}</span>
                        </span>
                        <span className="text-white-50">•</span>
                        <span className="text-white-50">
                            {new Date(article.publicationDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                    </div>

                    <span className="btnPrimary">Lire l'article</span>
                </div>
            </div>
        </Link>
    </>;
};

export default HeroArticle;