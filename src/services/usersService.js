import api from "./api";

function getAllUsers(){
    return api.get("users")
};

function login(login) {
    return api.post("users/login", login);
};

function logout() {
    localStorage.removeItem('token');
    delete api.defaults.headers['Authorization'];
};



export default {
    getAllUsers,
    login,
    logout
}