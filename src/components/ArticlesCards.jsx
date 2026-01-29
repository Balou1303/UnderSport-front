import React from 'react';
import { Badge } from 'react-bootstrap';

const ArticlesCards = ({ article }) => {
    const BASE_URL = "http://localhost:3000";
    const imageUrl = article.picture 
        ? `${BASE_URL}/${article.picture}` 
        : "https://placehold.co/600x400/8A5CF5/white?text=UnderSport";

    return (
        <div className="article-card">
            <div className="cardPicture">
                <img src={imageUrl} alt={article.title} />
            </div>

            <div className="cardBody">
                <div>
                    <h2>{article.title}</h2>
                    
                </div>
                    <div style={{ marginBottom: '10px', display: 'flex', gap: '8px' }}>
                        <Badge bg="secondary">
                            {article.sportName ? article.sportName : "Sport"}
                        </Badge>
                        {article.championshipName && (
                            <Badge bg="secondary">
                                {article.championshipName}
                            </Badge>
                        )}
                    </div>

                <p>
                    Publié le {new Date(article.publicationDate).toLocaleDateString()}
                    <br />
                    par <strong>{article.firstName} {article.lastName}</strong>
                </p>
                
                <button>Lire l'article</button>
            </div>
        </div>
    );
};

export default ArticlesCards;

