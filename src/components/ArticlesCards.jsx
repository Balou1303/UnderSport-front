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


// import React from 'react';
// import { Badge } from 'react-bootstrap';

// const ArticlesCards = ({ article }) => {
//     // ... tes URL et images ...
//     const BASE_URL = "http://localhost:3000";
//     const imageUrl = article.picture 
//         ? `${BASE_URL}/${article.picture}` 
//         : "https://placehold.co/600x400/8A5CF5/white?text=UnderSport";

//     // 1. LOGIQUE : On transforme la chaîne "Basket, Hand" en tableau ["Basket", "Hand"]
//     // Si pas de sport, on crée un tableau vide pour éviter que ça plante
//     const sportsList = article.sportName ? article.sportName.split(', ') : [];

//     return (
//         <div className="article-card">
//             <div className="cardPicture">
//                 <img src={imageUrl} alt={article.title} />
//             </div>

//             <div className="cardBody">
//                 <div>
//                     <h2>{article.title}</h2>
                    
//                     {/* ZONE DES BADGES */}
//                     <div style={{ marginBottom: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        
//                         {/* A. BOUCLE SUR LES SPORTS (Bleu) */}
//                         {sportsList.map((sport, index) => (
//                             <Badge key={index} bg="primary">
//                                 {sport}
//                             </Badge>
//                         ))}

//                         {/* B. LE CHAMPIONNAT (Jaune/Orange pour ressortir) */}
//                         {article.championshipName && (
//                             <Badge bg="warning" text="dark"> {/* text="dark" pour que ce soit lisible sur du jaune */}
//                                 🏆 {article.championshipName}
//                             </Badge>
//                         )}
                        
//                         {/* C. SI RIEN N'EST DÉFINI (Gris) */}
//                         {sportsList.length === 0 && !article.championshipName && (
//                             <Badge bg="secondary">Sport</Badge>
//                         )}

//                     </div>
//                 </div>

//                 <p>
//                     Publié le {new Date(article.publicationDate).toLocaleDateString()}
//                     <br />
//                     par <strong>{article.firstName} {article.lastName}</strong>
//                 </p>
                
//                 <button>Lire l'article</button>
//             </div>
//         </div>
//     );
// };

// export default ArticlesCards;