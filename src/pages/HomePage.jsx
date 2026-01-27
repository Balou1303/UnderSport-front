import { useEffect, useState } from "react";
import articlesService from "../services/articlesService";

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
    },[])

    return <>
        <div>
            <h1>Bienvenue sur UnderSport</h1>
            {articles.map((article) => (
                    <div key={article.articleId}>
                        <h2>{article.title}</h2>
                    </div>
                ))}
        </div>
    </>
}

export default HomePage;