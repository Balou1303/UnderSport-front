import api from "./api";

function getAllSports() {
    return api.get("/sports");
}

function deleteSport(id) {
    return api.delete(`/sports/${id}`);
}

export default {
    getAllSports,
    deleteSport

}