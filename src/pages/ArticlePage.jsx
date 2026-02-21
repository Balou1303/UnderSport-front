import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // <--- L'outil magique pour lire l'URL
import articlesService from "../services/articlesService";
import { Container, Badge } from "react-bootstrap"; // Un peu de style

const ArticlePage = () => {
    // récupère l'ID qui est dans l'URL (ex: /article/42 -> id = 42)
    const { id } = useParams();

    const [article, setArticle] = useState(null);

    const fetchOneArticle = async () => {
        try {
            const response = await articlesService.getArticleById(id);
            setArticle(response.data);
        } catch (error) {
            console.error("Erreur chargement article", error);
        }
    };
    useEffect(() => {

        fetchOneArticle();
    }, [id]); // relance si l'ID change

    // Si ça charge encore, affiche un petit texte
    if (!article) return <p>Chargement...</p>;

    // Construction de l'URL de l'image (comme sur la Home)
    const API_URL = import.meta.env.VITE_URL_API;
    const SERVER_URL = API_URL ? API_URL.replace('/api', '') : '';

    // Construction de l'URL de l'image
    const imageUrl = article.picture
        ? `${SERVER_URL}${article.picture}`
        : "https://placehold.co/1200x600/1a1a1a/white?text=A+la+Une";

    return <>
        <Container className="mt-5">
            {/* En-tête de l'article */}
            <div className="text-center mb-5">
                <Badge bg="primary" className="mb-3 fs-6 px-3 py-2">
                    {article.championshipName}
                </Badge>



            </div>

            {/* Grande Image */}
            {/* La grande "boîte" qui fige la hauteur à 450px */}
            <div className="hero-card mb-5">

                {/* L'image de fond (qui prendra 100% des 450px) */}
                <div className="hero-image" style={{ backgroundImage: `url(${imageUrl})` }}></div>

                {/* Le calque noir transparent au dessus */}
                <div className="hero-overlay">

                    <Badge bg="primary" className="mb-3 fs-6 px-3 py-2">
                        {article.championshipName}
                    </Badge>

                    <h1 className="text-white fw-bold mb-3" style={{ fontSize: '3rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                        {article.title}
                    </h1>

                    <p className="text-light fs-5 mb-0">
                        Par {article.firstName} {article.lastName} | Le {new Date(article.publicationDate).toLocaleDateString()}
                    </p>

                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    <div className="article-body" dangerouslySetInnerHTML={{ __html: article.content }}>
                    </div>

                    {/* Button */}
                    <div className="text-center mt-5">
                        <a href="/" className="card-btn">
                            Retour aux articles
                        </a>
                    </div>
                </div>
            </div>
        </Container>
    </>
};

export default ArticlePage;