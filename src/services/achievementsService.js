import api from "./api";

const getAllAchievements = () => {
    return api.get("/achievements");
};

const createAchievement = (data) => {
    return api.post("/achievements", data);
};

const updateAchievement = (id, data) => {
    return api.put(`/achievements/${id}`, data);
};

const deleteAchievement = (id) => {
    return api.delete(`/achievements/${id}`);
};

export default {
    getAllAchievements,
    createAchievement,
    updateAchievement,
    deleteAchievement
};
