import api from "./api";

function getAllSports() {
    return api.get("/sports");
}

function deleteSport(id) {
    return api.delete(`/sports/${id}`);
}

function getSportById(id) {
    return api.get(`/sports/${id}`);
}

function updateSport(id, sportData) {
    return api.put(`/sports/${id}`, sportData)
}

export default {
    getAllSports,
    deleteSport,
    getSportById,
    updateSport

}