import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // <--- L'outil magique pour lire l'URL
import articlesService from "../services/articlesService";
import { Container, Badge } from "react-bootstrap"; // Un peu de style

const ArticlePage = () => {
    // 1. On récupère l'ID qui est dans l'URL (ex: /article/42 -> id = 42)
    const { id } = useParams(); 
    
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const fetchOneArticle = async () => {
            try {
                // On utilise ton service pour récupérer juste CET article
                const response = await articlesService.getArticleById(id);
                setArticle(response.data);
            } catch (error) {
                console.error("Erreur chargement article", error);
            }
        };

        fetchOneArticle();
    }, [id]); // On relance si l'ID change

    // Si ça charge encore, on affiche un petit texte
    if (!article) return <p>Chargement...</p>;

    // Construction de l'URL de l'image (comme sur la Home)
    const imageUrl = article.picture 
        ? `${import.meta.env.VITE_URL_API}/${article.picture}` 
        : "https://placehold.co/1200x600?text=Pas+d'image";

    return (
        <Container className="mt-5">
            {/* En-tête de l'article */}
            <div className="text-center mb-5">
                <Badge bg="primary" className="mb-2">{article.championshipName}</Badge>
                <h1>{article.title}</h1>
                <p className="text-muted">
                    Par {article.firstName} {article.lastName} | Le {new Date(article.publicationDate).toLocaleDateString()}
                </p>
            </div>

            {/* Grande Image */}
            <img 
                src={imageUrl} 
                alt={article.title} 
                style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', borderRadius: '10px' }} 
                className="mb-4"
            />

            {/* Contenu du texte */}
            <div className="article-content" style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                {/* Attention : pour l'instant on affiche le texte brut. 
                    Plus tard, on verra comment gérer les sauts de ligne */}
                {article.content}
            </div>
        </Container>
    );
};

export default ArticlePage;