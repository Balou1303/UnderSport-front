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

function createUser(user) {
    return api.post("users", user);
};

function updateRole(id, idRole) {
    return api.patch(`/users/role/${id}`, { idRole });
}

export default {
    getAllUsers,
    login,
    logout,
    createUser,
    updateRole
}