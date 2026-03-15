import api from "./api";

function getAllUsers(){
    return api.get("users")
};

function getUserById(id){
    return api.get(`users/${id}`)
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

function updateUser(user) {
    return api.put(`users/${user.userId}`, user);
};
function deleteUser(user) {
    return api.delete(`users/${user.userId}`);
};

function updatePassword(id, password) {
    // envoie un objet avec la clé "newPassword" attendue par le backend
    return api.patch(`/users/password/${id}`, { newPassword: password }); 
}

function updateRole(id, idRole) {
    return api.patch(`/users/role/${id}`, { idRole });
}


export default {
    getAllUsers,
    getUserById,
    login,
    logout,
    createUser,
    updateUser,
    deleteUser,
    updatePassword,
    updateRole
}