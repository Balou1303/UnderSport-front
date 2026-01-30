import api from "./api";

function login(login) {
    return api.post("users/login", login);
}

export default {
    login
}