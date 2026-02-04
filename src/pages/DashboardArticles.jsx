import { useEffect, useState } from "react";
import articlesService from "../services/articlesService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DashboardArticles = () => {
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();

    const fetchArticles = async () => {
        try {
            const response = await articlesService.getArticles();
            const data = response.data ? response.data : response;
            setArticles(data);

        } catch (error) {
            console.error(error);
            toast.error("Impossible de charger les articles");
        }
    };

    // Suppression
    const handleDelete = async (id, title) => {
        if (!window.confirm(`Supprimer l'article "${title}" ?`)) return;
        try {
            await articlesService.deleteArticle(id);
            setArticles(articles.filter(a => a.articleId !== id));
            toast.success("Article supprimé ! 🗑️");
        } catch (error) {
            toast.error("Erreur lors de la suppression");
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    return (
        <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Gestion des Articles 📝</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/admin/articles/add')}
                >
                    + Nouvel Article
                </button>
            </div>

            <table className="table table-hover table-bordered shadow-sm bg-white">
                <thead className="table-dark">
                    <tr>
                        <th>Titre</th>
                        <th>Auteur</th>
                        <th>Date de Publication</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((article) => (
                        <tr key={article.articleId}>
                            <td>
                                <span className="fw-bold">{article.title}</span>
                                {article.isFeatured === 1 && <span className="badge bg-warning text-dark ms-2">⭐ Une</span>}
                            </td>

                            <td>
                                {article.firstName} {article.lastName}
                            </td>

                            <td>
                                {new Date(article.publicationDate).toLocaleDateString()}
                            </td>

                            <td style={{ width: '180px' }}>
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => navigate(`/admin/articles/edit/${article.articleId}`)}
                                >
                                    ✏️
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(article.articleId, article.title)}
                                >
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DashboardArticles;