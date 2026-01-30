import { useEffect, useState } from "react";
import articlesService from "../services/articlesService";
import ArticlesCards from "../components/ArticlesCards";
import HeroArticle from "../components/HeroArticle";
import '../App.css';

const HomePage = () => {
    const [articles, setArticles] = useState([]);

    const fetchArticles = async () => {
        try {
            const response = await articlesService.getArticles();
            // Petite sécurité : on vérifie si c'est response.data ou response tout court
            const data = response.data ? response.data : response; 
            setArticles(data);
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

    return (
        <div className="container" style={{ marginTop: '20px' }}>
            
            <h1 className="mb-4">Bienvenue sur UnderSport</h1>

            {/* Section "à la une" */}
            {featuredArticle && (
                <section style={{ marginBottom: '50px' }}>
                    <HeroArticle article={featuredArticle} />
                </section>
            )}

            {/* Autres articles */}
            <h2 className="mb-3">Dernières actualités</h2>
            
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "space-between" }}>
                {standardArticles.map((article) => (
                    <ArticlesCards
                        key={article.articleId}
                        article={article}
                    />
                ))}
            </div>
            
        </div>
    );
}

export default HomePage;