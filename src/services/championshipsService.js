import api from './api';

function getAllChampionships() {
    return api.get("/championships");
}

const getChampionshipById = (id) => {
    return api.get(`/championships/${id}`);
};

const getChampionshipsBySport = (idSport) => {
    return api.get(`/championships/sport/${idSport}`);
};

const addChampionship = (data) => {
    return api.post("/championships", data, {
        headers: { "Content-Type": "multipart/form-data" }
    });
};

const updateChampionship = (id, data) => {
    return api.put(`/championships/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
    });
};

const deleteChampionship = (id) => {
    return api.delete(`/championships/${id}`);
};

export default{
    getAllChampionships,
    getChampionshipById,
    getChampionshipsBySport,
    addChampionship,
    updateChampionship,
    deleteChampionship
}