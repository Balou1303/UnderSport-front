import api from "./api"; 

function getArticles() {
    // Plus besoin de l'URL complète, juste la fin 
    // Axios ajoute automatiquement "/api" devant.
    return api.get("/articles"); 
}

function getEditors() {
    return api.get("/users");
}

export default {
    getArticles,
    getEditors
}