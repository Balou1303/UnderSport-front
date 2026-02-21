import api from "./api";

function getArticles() {
    return api.get("/articles");
}

// Récupère les articles pour le back-office en envoyant le Token
function getDashboardArticles() {
    return api.get("/articles/dashboard");
}

function getArticleById(id, isAdmin = false) {
    // Si isAdmin est true, on ajoute ?admin=true à l'URL
    const url = isAdmin ? `/articles/${id}?admin=true` : `/articles/${id}`;
    return api.get(url);
};

function createArticle(data) {
    return api.post(`/articles`, data);
}

function updateArticle(id, data) {
    return api.put(`/articles/${id}`, data);
}

function getSportsByArticle(idArticle) {
    return api.get(`/articles/${idArticle}/sports`);
};

function deleteArticle(id) {
    return api.delete(`/articles/${id}`);
}

function defineFeatured(id) {
    return api.patch(`/articles/${id}/featured`);
};

function getStats() {
    return api.get('/articles/stats');
}


export default {
    getArticles,
    getDashboardArticles,
    getArticleById,
    createArticle,
    updateArticle,
    getSportsByArticle,
    deleteArticle,
    defineFeatured,
    getStats


}