import { useEffect, useState } from "react";
import articlesService from "../services/articlesService";
import ArticlesCards from "../components/ArticlesCards";
import HeroArticle from "../components/HeroArticle";
import { Link } from 'react-router-dom';
import '../App.css';

const HomePage = () => {
    const [articles, setArticles] = useState([]);

    const fetchArticles = async () => {
        try {
            const response = await articlesService.getArticles();
            setArticles(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement :", error);
        }
    }

    useEffect(() => {
        fetchArticles();
    }, []);

    // Si on a des articles, le premier va à la Une
    const featuredArticle = articles.length > 0 ? articles[0] : null;

    // Les autres vont dans la liste standard
    const standardArticles = articles.length > 1 ? articles.slice(1) : [];

    return <>
        <div className="container py-5">

            {/* Section "à la une" */}
            {featuredArticle && (
                <section className="mb-5">
                    <header className="mb-4">
                        <h6 className="textPrimary text-uppercase fw-bold mb-1" style={{ letterSpacing: '2px' }}>Actualités</h6>
                        <h1 className="fw-900 display-4 mb-0" style={{ letterSpacing: '-2px' }}>À LA <span className="textPrimary">UNE</span></h1>
                    </header>
                    <HeroArticle article={featuredArticle} />
                </section>
            )}

            {/* Autres articles */}
            <div className="mb-4 d-flex justify-content-between align-items-end">
                <h2 className="fw-bold mb-0" style={{ letterSpacing: '-1px' }}>Dernières actus</h2>
                <Link to="/articles" className="text-primary fw-bold text-decoration-none small">Voir tout →</Link>
            </div>

            <div className="row">
                {standardArticles.map((article) => (
                    <div key={article.articleId} className="col-lg-6">
                        <ArticlesCards article={article} />
                    </div>
                ))}
            </div>

        </div>
    </>
}

export default HomePage;