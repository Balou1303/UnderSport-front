import React from 'react';
import { Badge } from 'react-bootstrap';

const HeroArticle = ({ article }) => {
    // 1. Sécurité absolue : si pas d'article, on n'affiche rien
    if (!article) return null;

    const BASE_URL = "http://localhost:3000";
    
    // 2. Gestion de l'image (évite le bug des guillemets CSS)
    const imageUrl = article.picture 
        ? `${BASE_URL}/${article.picture}` 
        : "https://placehold.co/1200x600/111/white?text=La+Une";

    // 3. Gestion des tags (évite le crash si sportName est null)
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
                    
                    {/* 4. Sécurité sur le contenu (évite le crash si content est null) */}
                    <p className="hero-summary">
                        {article.content ? article.content.substring(0, 150) + "..." : "Lire la suite..."}
                    </p>

                    <div className="hero-meta">
                        Par {article.firstName} {article.lastName} | Le {new Date(article.publicationDate).toLocaleDateString()}
                    </div>

                    <button className="hero-btn">Lire le dossier</button>
                </div>
            </div>
        </div>
    );
};

export default HeroArticle;