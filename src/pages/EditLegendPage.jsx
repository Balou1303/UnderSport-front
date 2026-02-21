import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import legendsService from "../services/legendsService";
import sportsServices from "../services/sportsService";
import achievementsService from "../services/achievementsService";

const EditLegendPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_URL_API;
    const SERVER_URL = API_URL ? API_URL.replace('/api', '') : '';

    const [legend, setLegend] = useState({
        firstname: "",
        lastname: "",
        idSport: "",
        photo: "",
        description: ""
    });

    const [sports, setSports] = useState([]);
    const [picture, setPicture] = useState(null);
    const [preview, setPreview] = useState(null);

    // Palmarès states
    const [availableAchievements, setAvailableAchievements] = useState([]);
    const [existingAchievements, setExistingAchievements] = useState([]);
    const [newAchievements, setNewAchievements] = useState([]);
    const [currentAchievement, setCurrentAchievement] = useState({ idAchievement: "", years: "" });

    const fetchData = async () => {
        try {
            const [legendRes, sportsRes, availableAchievsRes, existingAchievsRes] = await Promise.all([
                legendsService.getLegendById(id),
                sportsServices.getAllSports(),
                achievementsService.getAllAchievements(),
                legendsService.getAchievementsByLegendId(id)
            ]);

            setLegend(legendRes.data);
            setSports(sportsRes.data);
            setAvailableAchievements(availableAchievsRes.data);
            setExistingAchievements(existingAchievsRes.data || []);

            if (legendRes.data.photo) {
                setPreview(`${SERVER_URL}${legendRes.data.photo}`);
            }
        } catch (error) {
            toast.error("Erreur de chargement des données");
            navigate("/admin/legends");
        }
    };

    const handleAddAchievement = () => {
        if (!currentAchievement.idAchievement || !currentAchievement.years) {
            toast.warning("Veuillez sélectionner un palmarès et préciser l'année.");
            return;
        }
        const ach = availableAchievements.find(a => a.achievementId === parseInt(currentAchievement.idAchievement));
        if (ach) {
            setNewAchievements([...newAchievements, { ...currentAchievement, label: ach.label }]);
            setCurrentAchievement({ idAchievement: "", years: "" });
        }
    };

    const removeNewAchievement = (index) => {
        const newArr = [...newAchievements];
        newArr.splice(index, 1);
        setNewAchievements(newArr);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLegend({ ...legend, [name]: value });
    };

    const handlePictureChange = (e) => {
        const file = e.target.files[0];
        setPicture(file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('firstname', legend.firstname);
            formData.append('lastname', legend.lastname);
            formData.append('idSport', legend.idSport);
            formData.append('description', legend.description || "");

            if (picture) {
                // Si on a sélectionné un NOUVEAU fichier
                formData.append('image', picture);
            } else if (legend.photo) {
                // Très important : si on n'a PAS de nouveau fichier, 
                // on renvoie l'ancienne URL pour que le body de req.body.photo ne soit pas vide !
                formData.append('photo', legend.photo);
            }

            await legendsService.updateLegend(id, formData);

            if (newAchievements.length > 0) {
                await Promise.all(newAchievements.map(a =>
                    legendsService.addAchievementToLegend(id, { idAchievement: a.idAchievement, years: a.years })
                ));
            }

            toast.success("Légende modifiée avec succès ! 📝");
            navigate("/admin/legends");

        } catch (error) {
            console.error("Erreur API :", error);
            toast.error("Erreur lors de la modification");
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    return (
        <div className="p-4">
            <h1>Modifier la Légende ✏️</h1>
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

                <div className="row mb-4 align-items-center">
                    <div className="col-md-8">
                        <label className="form-label">Photo du Joueur</label>
                        <input type="file" className="form-control" accept="image/*" onChange={handlePictureChange} />
                        <small className="text-muted">Laissez vide pour conserver la photo actuelle.</small>
                    </div>
                    <div className="col-md-4 text-center mt-3 mt-md-0">
                        {preview ? (
                            <img src={preview} alt="Prévisualisation" className="img-thumbnail rounded-circle object-fit-cover shadow-sm" style={{ width: "120px", height: "120px" }} />
                        ) : (
                            <div className="img-thumbnail rounded-circle bg-light d-flex align-items-center justify-content-center text-muted shadow-sm mx-auto" style={{ width: "120px", height: "120px" }}>
                                Pas de photo
                            </div>
                        )}
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Biographie / Carrière</label>
                    <textarea
                        name="description"
                        className="form-control"
                        rows="5"
                        value={legend.description || ""}
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
                        <option value="">Sélectionnez un sport</option>
                        {sports.map(sport => (
                            <option key={sport.sportId} value={sport.sportId}>{sport.name}</option>
                        ))}
                    </select>
                </div>

                <hr className="my-4" />

                <h4 className="mb-3" style={{ color: "var(--primary-color)" }}>Palmarès de la Légende</h4>

                {existingAchievements.length > 0 && (
                    <div className="mb-4">
                        <label className="form-label text-muted fw-bold mb-2">Trophées déjà enregistrés (Immuables)</label>
                        <div className="d-flex flex-wrap gap-2">
                            {existingAchievements.map((ach, idx) => (
                                <span key={idx} className="badge bg-secondary px-3 py-2 shadow-sm" style={{ fontSize: "0.9rem" }}>
                                    🏆 {ach.years} - {ach.label}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="row mb-3 align-items-end bg-light p-3 rounded-3 shadow-sm mx-1">
                    <h6 className="fw-bold mb-3 d-flex align-items-center text-dark"><i className="bi bi-plus-circle-fill text-primary me-2"></i> Ajouter un nouveau titre</h6>
                    <div className="col-md-5">
                        <label className="form-label">Trophée / Titre</label>
                        <select className="form-select" value={currentAchievement.idAchievement} onChange={(e) => setCurrentAchievement({ ...currentAchievement, idAchievement: e.target.value })}>
                            <option value="">Sélectionner un titre...</option>
                            {availableAchievements.map(a => (
                                <option key={a.achievementId} value={a.achievementId}>{a.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Année</label>
                        <input type="number" className="form-control" placeholder="Ex: 2022" value={currentAchievement.years} onChange={(e) => setCurrentAchievement({ ...currentAchievement, years: e.target.value })} />
                    </div>
                    <div className="col-md-3">
                        <button type="button" className="btn btn-outline-primary w-100 fw-bold" onClick={handleAddAchievement}>
                            <i className="bi bi-plus"></i> Ajouter à la liste
                        </button>
                    </div>
                </div>

                {newAchievements.length > 0 && (
                    <div className="mb-4 mt-3">
                        <h6 className="fw-bold mb-3 text-warning">Trophées en attente de sauvegarde :</h6>
                        <ul className="list-group">
                            {newAchievements.map((ach, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center border-warning">
                                    <span><strong className="text-secondary">{ach.years}</strong> - <span className="fw-bold text-dark">{ach.label}</span></span>
                                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removeNewAchievement(index)}>
                                        Retirer
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <hr className="my-5" />

                <button type="submit" className="btn btn-warning fw-bold px-4 py-2">Sauvegarder les modifications</button>
                <button type="button" className="btn btn-secondary ms-3" onClick={() => navigate("/admin/legends")}>Annuler</button>
            </form>
        </div>
    );
};

export default EditLegendPage;
