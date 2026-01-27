import axios from "axios";

function getArticles () {
    return axios.get("http://localhost:3000/api/articles")

}

export default {
    getArticles
}