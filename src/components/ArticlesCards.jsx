const ArticlesCards = ({ article }) => {
  return <>

    {/* Partie Gauche */}
    <div className="card">
      <div className="cardPicture">
        <img src={article.picture} alt={article.title} />
      </div>

      {/* Partie droite */}
      <div className="cardBody">
        <h3>{article.title}</h3>
        <p>Publié le : {new Date(article.publicationDate).toLocaleDateString()} par <strong>
          {article.firstName} {article.lastName}</strong></p>
        <button>Lire l'article</button>
      </div>
    </div>
  </>;
}

export default ArticlesCards;