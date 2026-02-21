import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import legendsService from "../services/legendsService";
import sportsServices from "../services/sportsService";
import achievementsService from "../services/achievementsService";

const AddLegendPage = () => {
    const navigate = useNavigate();

    const [legend, setLegend] = useState({
        firstname: "",
        lastname: "",
        idSport: "",
        description: ""
    });

    const [sports, setSports] = useState([]);
    const [picture, setPicture] = useState(null);
    const [availableAchievements, setAvailableAchievements] = useState([]);
    const [selectedAchievements, setSelectedAchievements] = useState([]);
    const [currentAchievement, setCurrentAchievement] = useState({ idAchievement: "", years: "" });

    const fetchSports = async () => {
        try {
            const [sportsRes, achievementsRes] = await Promise.all([
                sportsServices.getAllSports(),
                achievementsService.getAllAchievements()
            ]);
            setSports(sportsRes.data);
            setAvailableAchievements(achievementsRes.data);
        } catch (error) {
            toast.error("Erreur de chargement des données initiales");
        }
    };

    const handleAddAchievement = () => {
        if (!currentAchievement.idAchievement || !currentAchievement.years) {
            toast.warning("Veuillez sélectionner un palmarès et préciser l'année.");
            return;
        }
        const ach = availableAchievements.find(a => a.achievementId === parseInt(currentAchievement.idAchievement));
        if (ach) {
            setSelectedAchievements([...selectedAchievements, { ...currentAchievement, label: ach.label }]);
            setCurrentAchievement({ idAchievement: "", years: "" });
        }
    };

    const removeAchievement = (index) => {
        const newArr = [...selectedAchievements];
        newArr.splice(index, 1);
        setSelectedAchievements(newArr);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLegend({ ...legend, [name]: value });
    };

    const handlePictureChange = (e) => {
        setPicture(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('firstname', legend.firstname);
            formData.append('lastname', legend.lastname);
            formData.append('idSport', legend.idSport);
            formData.append('description', legend.description);

            if (picture) {
                formData.append('image', picture);
            }

            const res = await legendsService.addLegend(formData);
            const newLegendId = res.data.id;

            if (selectedAchievements.length > 0) {
                // Créer tous les trophées attachés à la nouvelle légende
                await Promise.all(selectedAchievements.map(a =>
                    legendsService.addAchievementToLegend(newLegendId, { idAchievement: a.idAchievement, years: a.years })
                ));
            }

            toast.success("Joueur de légende ajouté !");
            navigate("/admin/legends");

        } catch (error) {
            console.error("Erreur API complète :", error);
            toast.error("Erreur lors de la création de la légende");
        }
    };

    useEffect(() => {
        fetchSports();
    }, []);

    return (
        <div className="p-4">
            <h1>Nouvelle Légende 🌟</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Prénom</label>
                        <input type="text" name="firstname" className="form-control" value={legend.firstname} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Nom</label>
                        <input type="text" name="lastname" className="form-control" value={legend.lastname} onChange={handleChange} required />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Photo du Joueur</label>
                    <input type="file" className="form-control" accept="image/*" onChange={handlePictureChange} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Biographie / Carrière</label>
                    <textarea
                        name="description"
                        className="form-control"
                        rows="5"
                        value={legend.description}
                        onChange={handleChange}
                        placeholder="Rédigez un résumé de sa carrière..."
                        required
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="form-label">Sport pratiqué</label>
                    <select
                        name="idSport"
                        className="form-select"
                        value={legend.idSport}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selectionnez un sport</option>
                        {sports.map(sport => (
                            <option key={sport.sportId} value={sport.sportId}>{sport.name}</option>
                        ))}
                    </select>
                </div>

                <hr className="my-4" />

                <h4 className="mb-3" style={{ color: "var(--primary-color)" }}>Palmarès de la Légende</h4>

                <div className="row mb-3 align-items-end">
                    <div className="col-md-5">
                        <label className="form-label fw-bold">Trophée / Titre</label>
                        <select className="form-select" value={currentAchievement.idAchievement} onChange={(e) => setCurrentAchievement({ ...currentAchievement, idAchievement: e.target.value })}>
                            <option value="">Sélectionner un titre...</option>
                            {availableAchievements.map(a => (
                                <option key={a.achievementId} value={a.achievementId}>{a.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label fw-bold">Année</label>
                        <input type="number" className="form-control" placeholder="Ex: 2022" value={currentAchievement.years} onChange={(e) => setCurrentAchievement({ ...currentAchievement, years: e.target.value })} />
                    </div>
                    <div className="col-md-3">
                        <button type="button" className="btn btn-outline-primary w-100 fw-bold" onClick={handleAddAchievement}>
                            <i className="bi bi-plus-circle me-1"></i> Ajouter
                        </button>
                    </div>
                </div>

                {selectedAchievements.length > 0 && (
                    <div className="mb-4 p-3 bg-light rounded-3 shadow-sm" style={{ borderLeft: "5px solid var(--primary-color)" }}>
                        <h6 className="fw-bold mb-3 d-flex align-items-center"><span className="fs-5 me-2">🏆</span> Titres ajoutés en attente d'enregistrement :</h6>
                        <ul className="list-group">
                            {selectedAchievements.map((ach, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span><strong className="text-secondary">{ach.years}</strong> - <span className="fw-bold">{ach.label}</span></span>
                                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removeAchievement(index)}>
                                        Retirer
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <hr className="my-4" />

                <button type="submit" className="btn btn-primary fw-bold px-4 py-2">Valider et Créer la Légende</button>
                <button type="button" className="btn btn-secondary ms-3" onClick={() => navigate("/admin/legends")}>Annuler</button>
            </form>
        </div>
    );
};

export default AddLegendPage;
