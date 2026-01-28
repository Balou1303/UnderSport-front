import axios from "axios";

function getArticles () {
    return axios.get("http://localhost:3000/api/articles")
}

function getEditors () {
    return axios.get("http://localhost:3000/api/users")
}

export default {
    getArticles,
    getEditors
}