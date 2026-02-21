import api from "./api";

const getAllAchievements = () => {
    return api.get("/achievements");
};

export default {
    getAllAchievements
};
