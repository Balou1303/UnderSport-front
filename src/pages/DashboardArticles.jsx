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

    const handleFeatured = async (id) => {
        try {
            await articlesService.defineFeatured(id);

            // On met à jour l'affichage localement sans recharger la page
            setArticles(articles.map(article => {
                // Celui qu'on a cliqué devient 1 (True), les autres deviennent 0 (False)
                if (article.articleId === id) {
                    return { ...article, isFeatured: 1 };
                } else {
                    return { ...article, isFeatured: 0 };
                }
            }));

            toast.success("Article mis à la Une ! 🌟");
        } catch (error) {
            console.error(error);
            toast.error("Erreur lors de la mise à la une");
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
                                <div className="d-flex gap-2 align-items-center">


                                    {/* article à la une */}
                                    <button
                                    style={{ minWidth: "90px" }}
                                        className={`btn btn-sm ${article.isFeatured ? "btn-outline-secondary" : "btn-outline-secondary"} me-2`}
                                        onClick={() => handleFeatured(article.articleId)}
                                        title="Mettre à la une"
                                    >
                                        {article.isFeatured ? "⭐​" : "☆"}
                                    </button>

                                    {/* modifier l'article */}
                                    <button
                                        className="btn btn-sm btn-warning me-2"
                                        onClick={() => navigate(`/admin/articles/edit/${article.articleId}`)}
                                        title="Modifier l'article"
                                    >
                                        ✏️
                                    </button>

                                    {/* supprimer l'article */}
                                    <button
                                        className="btn btn-sm btn-danger me-2"
                                        onClick={() => handleDelete(article.articleId, article.title)}
                                        title="Supprimer l'article"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DashboardArticles;