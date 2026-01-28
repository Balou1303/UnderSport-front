import React from 'react';

const ArticlesCards = ({ article }) => {
    const BASE_URL = "http://localhost:3000";
    const imageUrl = article.picture ? `${BASE_URL}/${article.picture}` : null;

    return (
        <div className="card">
            {/* BLOC GAUCHE : IMAGE */}
            <div className="cardPicture">
                {imageUrl ? (
                    <img src={imageUrl} alt={article.title} />
                ) : (
                    // Image par défaut si pas de photo
                    <div style={{width:"100%", height:"100%", background:"#eee", display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <span>No Image</span>
                    </div>
                )}
            </div>

            {/* BLOC DROITE : TEXTE */}
            <div className="cardBody">
                <h2>{article.title}</h2>
                
                <p>
                    Publié le {new Date(article.publicationDate).toLocaleDateString()} 
                    {/* Ici on utilise les données du JOIN SQL */}
                    <br/>
                    par <strong>{article.firstName} {article.lastName}</strong>
                </p>
                
                <button>Lire l'article</button>
            </div>
        </div>
    );
};

export default ArticlesCards;