import api from "./api";

const getAllSports = () => {
    return api.get("/sports");
};

const getAllRules = () => {
    return api.get("/rules");
};

const getRulesBySport = (idSport) => {
    return api.get(`/rules/sports/${idSport}`);
};

const getLexiconBySport = (idSport) => {
    return api.get(`/sports/${idSport}/lexicons`);
};

const getAllLexicons = () => {
    return api.get("/lexicons");
};

const addRule = (ruleData) => {
    return api.post("/rules", ruleData);
};

const getRuleById = (id) => {
    return api.get(`/rules/${id}`);
};

const updateRule = (id, ruleData) => {
    return api.put(`/rules/${id}`, ruleData);
};

const deleteRule = (id) => {
    return api.delete(`/rules/${id}`);
};

const getLexiconById = (id) => {
    return api.get(`/lexicons/${id}`);
};

const addLexicon = (lexiconData) => {
    return api.post("/lexicons", lexiconData);
};

const updateLexicon = (id, lexiconData) => {
    return api.put(`/lexicons/${id}`, lexiconData);
};

const deleteLexicon = (id) => {
    return api.delete(`/lexicons/${id}`);
};

export default {
    getAllSports,
    getAllRules,
    getRuleById,
    getRulesBySport,
    updateRule,
    getLexiconBySport,
    getAllLexicons,
    getLexiconById,
    addRule,
    deleteRule,
    addLexicon,
    updateLexicon,
    deleteLexicon
};
