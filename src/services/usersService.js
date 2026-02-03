import api from "./api";

function login(login) {
    return api.post("users/login", login);
}

function logout() {
    localStorage.removeItem('token');
    // On peut aussi supprimer le header Authorization ici si on veut faire propre
    delete api.defaults.headers['Authorization'];
}

export default {
    login,
    logout
}