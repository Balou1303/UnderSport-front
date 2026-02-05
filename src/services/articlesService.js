import api from "./api";

function getArticles() {
    return api.get("/articles");
}

function getArticleById(id) {
    return api.get(`/articles/${id}`);
}

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


export default {
    getArticles,
    getArticleById,
    createArticle,
    updateArticle,
    getSportsByArticle,
    deleteArticle,
    defineFeatured


}