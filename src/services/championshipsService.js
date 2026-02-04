import api from './api';

function getAllChampionships() {
    return api.get("/championships");
}

const getChampionshipById = (id) => {
    return api.get(`/championships/${id}`);
};

export default{
    getAllChampionships,
    getChampionshipById
}