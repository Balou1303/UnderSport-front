import api from "./api"; 

function getArticles() {
    // Plus besoin de l'URL complète, juste la fin 
    // Axios ajoute automatiquement "/api" devant.
    return api.get("/articles"); 
}

function getArticleById(id) {
    return api.get(`/articles/${id}`);
}

function getEditors() {
    return api.get("/users");
}


export default {
    getArticles,
    getArticleById,
    getEditors

}