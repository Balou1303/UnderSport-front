import { Badge } from 'react-bootstrap';
import {Link} from 'react-router-dom';

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

    return (
        <div className="hero-card">
            {/* Ajout des guillemets dans l'URL pour éviter les bugs CSS */}
            <div className="hero-image" style={{ backgroundImage: `url("${imageUrl}")` }}>
                <div className="hero-overlay">
                    <div style={{ marginBottom: '15px' }}>
                        <Badge bg="primary" className="me-2">À LA UNE</Badge>
                        {tags.map((tag, i) => (
                             <Badge key={i} bg="dark" className="me-1">{tag.trim()}</Badge>
                        ))}
                         {article.championshipName && <Badge bg="info">{article.championshipName}</Badge>}
                    </div>

                    <h1>{article.title}</h1>
                    
                    {/* évite le crash si content est null */}
                    <p className="hero-summary">
                        {article.content ? article.content.substring(0, 150) + "..." : "Lire la suite..."}
                    </p>

                    <div className="hero-meta">
                        Par {article.firstName} {article.lastName} | Le {new Date(article.publicationDate).toLocaleDateString()}
                    </div>

                    <Link to={`/article/${article.articleId}`} className="hero-btn">Lire l'article</Link>
                </div>
            </div>
        </div>
    );
};

export default HeroArticle;