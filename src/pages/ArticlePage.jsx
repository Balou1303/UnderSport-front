import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import articlesService from "../services/articlesService";
import { Container, Badge } from "react-bootstrap";

const ArticlePage = () => {
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
    }, [id]);

    if (!article) return <div className="vh-100 d-flex align-items-center justify-content-center text-primary fw-bold fs-3">Chargement...</div>;

    const API_URL = import.meta.env.VITE_URL_API;
    const SERVER_URL = API_URL ? API_URL.replace('/api', '') : '';
    const imageUrl = article.picture
        ? `${SERVER_URL}${article.picture}`
        : "https://placehold.co/1200x600/1a1a1a/white?text=Article";

    return <>
        <Container className="py-5">
            {/* Grande Image Hero */}
            <div className="heroCard mb-5" style={{ height: '550px' }}>
                <div className="heroImage" style={{ backgroundImage: `url("${imageUrl}")` }}></div>
                <div className="heroOverlay">
                    <div className="hero-meta">
                        {article.sportName || "Sport"} {article.championshipName && `• ${article.championshipName.toUpperCase()}`}
                    </div>

                    <h1 style={{ textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                        {article.title}
                    </h1>

                    <div className="d-flex align-items-center gap-3 mt-3">
                        <img
                            src={`https://ui-avatars.com/api/?name=${article.firstName}+${article.lastName}&background=8A5CF5&color=fff&rounded=true`}
                            alt="Avatar"
                            style={{ width: '40px', height: '40px', border: '2px solid white' }}
                        />
                        <div className="d-flex flex-column">
                            <span className="text-white fw-bold small">{article.firstName} {article.lastName}</span>
                            <span className="text-white-50 x-small" style={{ fontSize: '0.75rem' }}>
                                Publié le {new Date(article.publicationDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    <div className="articleBody shadow-sm p-4 p-md-5 bg-white rounded-4" dangerouslySetInnerHTML={{ __html: article.content }}>
                    </div>

                    <div className="text-center mt-5">
                        <Link to="/" className="btn btn-outline-primary px-5">
                            ← Retour aux articles
                        </Link>
                    </div>
                </div>
            </div>
        </Container>
    </>
};

export default ArticlePage;