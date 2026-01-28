import { useEffect, useState } from "react";
import articlesService from "../services/articlesService";
import ArticlesCards from "../components/ArticlesCards";
import '../App.css'

const HomePage = () => {
    const [articles, setArticles] = useState([]);

    const fetchArticles = async () => {
        try {
            const response = await articlesService.getArticles();
            setArticles(response.data)
            console.log(response);

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchArticles()
    }, [])

    return <>

            <h1>Bienvenue sur UnderSport</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {articles.map((article) => (
                    <ArticlesCards 
                        key={article.articleId} 
                        article={article} 
                    />
                ))}

            </div>
        </>
}

export default HomePage;