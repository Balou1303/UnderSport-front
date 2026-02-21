import api from "./api";

const getAllLegends = () => {
    return api.get("/legends");
};

const getLegendById = (id) => {
    return api.get(`/legends/${id}`);
};

const addLegend = (data) => {
    return api.post("/legends", data);
};

const updateLegend = (id, data) => {
    return api.put(`/legends/${id}`, data);
};

const deleteLegend = (id) => {
    return api.delete(`/legends/${id}`);
};

const getAchievementsByLegendId = (id) => {
    return api.get(`/legends/${id}/achievements`);
};

const addAchievementToLegend = (id, data) => {
    return api.post(`/legends/${id}/achievements`, data);
};

export default {
    getAllLegends,
    getLegendById,
    addLegend,
    updateLegend,
    deleteLegend,
    getAchievementsByLegendId,
    addAchievementToLegend
};
